import {
  NotificationEventType,
  NotificationFailureClass,
  NotificationStatus,
  Prisma,
} from '@prisma/client';
import { db } from '../db';
import {
  AccountNotificationContext,
  buildIdempotencyKey,
  isValidEmail,
  NotificationPayload,
  OrderNotificationContext,
} from './notification.types';
import {
  createEmailProvider,
  getEmailFromConfig,
  getEmailReplyTo,
  EmailProvider,
} from './email.provider';
import { renderNotificationEmail } from './email.registry';

export interface EnqueueNotificationInput {
  eventType: NotificationEventType;
  recipient: string;
  payload: NotificationPayload;
  userId?: string | null;
  orderId?: string | null;
  idempotencyParts: string[];
  isManualResend?: boolean;
  /** Optional Prisma transaction client for outbox-in-transaction writes */
  tx?: Prisma.TransactionClient;
}

export class NotificationService {
  private static provider: EmailProvider | null = null;

  static getProvider(): EmailProvider {
    if (!this.provider) {
      this.provider = createEmailProvider();
    }
    return this.provider;
  }

  /** Test hook — allows injecting a mock/dev provider */
  static setProvider(provider: EmailProvider | null) {
    this.provider = provider;
  }

  /**
   * Creates a PENDING outbox row. Safe to call after business commit,
   * or inside the same transaction via `tx`. Never calls the email provider.
   */
  static async enqueue(input: EnqueueNotificationInput) {
    const recipient = input.recipient.trim().toLowerCase();
    if (!isValidEmail(recipient)) {
      console.warn('[notification] skip enqueue — invalid recipient', {
        eventType: input.eventType,
      });
      return null;
    }

    const baseKey = buildIdempotencyKey(input.eventType, input.idempotencyParts);
    const idempotencyKey = input.isManualResend
      ? `${baseKey}:resend:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
      : baseKey;

    const client = input.tx || db;

    try {
      const row = await client.notification.create({
        data: {
          eventType: input.eventType,
          channel: 'EMAIL',
          status: NotificationStatus.PENDING,
          recipient,
          userId: input.userId || null,
          orderId: input.orderId || null,
          idempotencyKey,
          payload: input.payload as unknown as Prisma.InputJsonValue,
          isManualResend: Boolean(input.isManualResend),
          nextAttemptAt: new Date(),
        },
      });
      return row;
    } catch (err: any) {
      // Unique idempotency — treat as success (already queued)
      if (err?.code === 'P2002') {
        const existing = await db.notification.findUnique({
          where: { idempotencyKey },
        });
        return existing;
      }
      throw err;
    }
  }

  static async enqueueOrderEvent(
    eventType: NotificationEventType,
    data: OrderNotificationContext,
    options: { isManualResend?: boolean; tx?: Prisma.TransactionClient; idempotencyParts?: string[] } = {}
  ) {
    return this.enqueue({
      eventType,
      recipient: data.recipientEmail,
      payload: { kind: 'order', data },
      userId: data.userId,
      orderId: data.orderId,
      idempotencyParts: options.idempotencyParts || [data.orderId],
      isManualResend: options.isManualResend,
      tx: options.tx,
    });
  }

  static async enqueueAccountEvent(
    eventType: NotificationEventType,
    data: AccountNotificationContext,
    options: { isManualResend?: boolean; idempotencyParts?: string[]; tx?: Prisma.TransactionClient } = {}
  ) {
    return this.enqueue({
      eventType,
      recipient: data.email,
      payload: { kind: 'account', data },
      userId: data.userId,
      orderId: null,
      idempotencyParts: options.idempotencyParts || [data.userId],
      isManualResend: options.isManualResend,
      tx: options.tx,
    });
  }

  /**
   * Claims and processes due PENDING notifications.
   * Uses conditional update for multi-worker safety.
   */
  /** Stale PROCESSING rows older than this are reclaimed as PENDING. */
  private static STALE_PROCESSING_MS = 5 * 60 * 1000;

  /**
   * Reclaim notifications stuck in PROCESSING (crashed worker / process restart).
   */
  static async reclaimStaleProcessing(): Promise<number> {
    const cutoff = new Date(Date.now() - this.STALE_PROCESSING_MS);
    const result = await db.notification.updateMany({
      where: {
        status: NotificationStatus.PROCESSING,
        lastAttemptAt: { lt: cutoff },
      },
      data: {
        status: NotificationStatus.PENDING,
        nextAttemptAt: new Date(),
        errorMessage: 'Reclaimed stale PROCESSING state',
      },
    });
    return result.count;
  }

  static async processPending(limit = 10): Promise<{ processed: number; sent: number; failed: number }> {
    const now = new Date();
    await this.reclaimStaleProcessing().catch(() => 0);

    const due = await db.notification.findMany({
      where: {
        status: NotificationStatus.PENDING,
        OR: [{ nextAttemptAt: null }, { nextAttemptAt: { lte: now } }],
      },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });

    let processed = 0;
    let sent = 0;
    let failed = 0;

    for (const row of due) {
      const claimed = await db.notification.updateMany({
        where: { id: row.id, status: NotificationStatus.PENDING },
        data: {
          status: NotificationStatus.PROCESSING,
          attempts: { increment: 1 },
          lastAttemptAt: now,
        },
      });

      if (claimed.count === 0) {
        continue; // another worker claimed it
      }

      processed += 1;
      const result = await this.deliver(row.id);
      if (result === 'SENT') sent += 1;
      else failed += 1;
    }

    return { processed, sent, failed };
  }

  private static async deliver(notificationId: string): Promise<'SENT' | 'FAILED'> {
    const start = Date.now();
    const notification = await db.notification.findUnique({ where: { id: notificationId } });
    if (!notification) return 'FAILED';

    try {
      const payload = notification.payload as unknown as NotificationPayload;
      if (!payload || !payload.kind) {
        await this.markFailed(notification.id, notification.attempts, {
          failureClass: NotificationFailureClass.PERMANENT,
          errorCode: 'INVALID_PAYLOAD',
          errorMessage: 'Notification payload missing.',
        });
        return 'FAILED';
      }

      if (!isValidEmail(notification.recipient)) {
        await this.markFailed(notification.id, notification.attempts, {
          failureClass: NotificationFailureClass.INVALID_RECIPIENT,
          errorCode: 'INVALID_RECIPIENT',
          errorMessage: 'Recipient email is invalid.',
        });
        return 'FAILED';
      }

      const rendered = renderNotificationEmail(notification.eventType, payload);
      const provider = this.getProvider();
      const from = getEmailFromConfig();

      const sendResult = await provider.send({
        to: { email: notification.recipient },
        from,
        replyTo: getEmailReplyTo(),
        subject: rendered.subject,
        html: rendered.html,
        text: rendered.text,
        idempotencyKey: notification.idempotencyKey,
        tags: [notification.eventType],
      });

      if (sendResult.success) {
        await db.notification.update({
          where: { id: notification.id },
          data: {
            status: NotificationStatus.SENT,
            subject: rendered.subject,
            provider: sendResult.provider,
            providerMessageId: sendResult.messageId || null,
            sentAt: new Date(),
            errorCode: null,
            errorMessage: null,
            failureClass: null,
          },
        });

        console.info('[notification:sent]', {
          id: notification.id,
          eventType: notification.eventType,
          orderId: notification.orderId,
          provider: sendResult.provider,
          attempt: notification.attempts,
          durationMs: Date.now() - start,
        });
        return 'SENT';
      }

      const failureClass =
        (sendResult.failureClass as NotificationFailureClass) || NotificationFailureClass.PROVIDER_ERROR;
      await this.markFailed(notification.id, notification.attempts, {
        failureClass,
        errorCode: sendResult.errorCode || 'SEND_FAILED',
        errorMessage: sendResult.errorMessage || 'Email send failed.',
        provider: sendResult.provider,
      });

      console.warn('[notification:failed]', {
        id: notification.id,
        eventType: notification.eventType,
        attempt: notification.attempts,
        failureClass,
        errorCode: sendResult.errorCode,
        durationMs: Date.now() - start,
      });
      return 'FAILED';
    } catch (err: any) {
      await this.markFailed(notification.id, notification.attempts, {
        failureClass: NotificationFailureClass.TRANSIENT,
        errorCode: 'UNEXPECTED',
        errorMessage: err?.message || 'Unexpected delivery error.',
      });
      console.warn('[notification:error]', {
        id: notification.id,
        eventType: notification.eventType,
        attempt: notification.attempts,
        durationMs: Date.now() - start,
      });
      return 'FAILED';
    }
  }

  private static async markFailed(
    id: string,
    attempts: number,
    info: {
      failureClass: NotificationFailureClass;
      errorCode: string;
      errorMessage: string;
      provider?: string;
    }
  ) {
    const notification = await db.notification.findUnique({ where: { id } });
    if (!notification) return;

    const permanent =
      info.failureClass === NotificationFailureClass.PERMANENT ||
      info.failureClass === NotificationFailureClass.INVALID_RECIPIENT;

    const exhausted = attempts >= notification.maxAttempts || permanent;

    if (exhausted) {
      await db.notification.update({
        where: { id },
        data: {
          status: NotificationStatus.FAILED,
          failedAt: new Date(),
          failureClass: info.failureClass,
          errorCode: info.errorCode,
          errorMessage: info.errorMessage.slice(0, 500),
          provider: info.provider || notification.provider,
          nextAttemptAt: null,
        },
      });
      return;
    }

    const delayMs = this.retryDelayMs(attempts);
    await db.notification.update({
      where: { id },
      data: {
        status: NotificationStatus.PENDING,
        failureClass: info.failureClass,
        errorCode: info.errorCode,
        errorMessage: info.errorMessage.slice(0, 500),
        provider: info.provider || notification.provider,
        nextAttemptAt: new Date(Date.now() + delayMs),
      },
    });
  }

  /** Bounded exponential-ish delays: 30s, 2m, 10m */
  static retryDelayMs(attempt: number): number {
    if (attempt <= 1) return 30_000;
    if (attempt === 2) return 120_000;
    return 600_000;
  }

  static async listForAdmin(options: {
    status?: NotificationStatus;
    eventType?: NotificationEventType;
    orderId?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 20));
    const skip = (page - 1) * limit;
    const where: Prisma.NotificationWhereInput = {};
    if (options.status) where.status = options.status;
    if (options.eventType) where.eventType = options.eventType;
    if (options.orderId) where.orderId = options.orderId;

    const [rows, total] = await Promise.all([
      db.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          eventType: true,
          channel: true,
          status: true,
          recipient: true,
          subject: true,
          userId: true,
          orderId: true,
          provider: true,
          providerMessageId: true,
          attempts: true,
          maxAttempts: true,
          nextAttemptAt: true,
          lastAttemptAt: true,
          sentAt: true,
          failedAt: true,
          failureClass: true,
          errorCode: true,
          errorMessage: true,
          isManualResend: true,
          createdAt: true,
          updatedAt: true,
          order: { select: { orderNumber: true } },
        },
      }),
      db.notification.count({ where }),
    ]);

    return {
      notifications: rows.map((n) => ({
        ...n,
        recipient: this.maskRecipient(n.recipient),
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  static maskRecipient(email: string): string {
    const [local, domain] = email.split('@');
    if (!domain) return '***';
    return `${(local || '*').slice(0, 1)}***@${domain}`;
  }

  static async resend(notificationId: string, actorUserId: string) {
    const existing = await db.notification.findUnique({ where: { id: notificationId } });
    if (!existing) {
      throw new Error('Notification not found.');
    }
    if (!existing.payload) {
      throw new Error('Cannot resend notification without payload.');
    }

    const payload = existing.payload as unknown as NotificationPayload;
    const created = await this.enqueue({
      eventType: existing.eventType,
      recipient: existing.recipient,
      payload,
      userId: existing.userId,
      orderId: existing.orderId,
      idempotencyParts: [existing.id, 'manual'],
      isManualResend: true,
    });

    return { created, sourceId: existing.id, actorUserId };
  }
}
