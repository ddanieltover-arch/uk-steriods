/**
 * Re-queue notifications that were falsely marked SENT via DevLogging,
 * then flush them through the real Resend provider.
 *
 * Usage:
 *   npx tsx scripts/requeue-dev-logged-emails.ts
 *   npx tsx scripts/requeue-dev-logged-emails.ts --flush
 *   npx tsx scripts/requeue-dev-logged-emails.ts --flush --orders-only
 */
import 'dotenv/config';
import { PrismaClient, NotificationStatus, NotificationEventType } from '@prisma/client';
import { NotificationService } from '../src/lib/notifications/notification.service';

const prisma = new PrismaClient();
const shouldFlush = process.argv.includes('--flush');
const ordersOnly = process.argv.includes('--orders-only');

const ORDER_EVENTS: NotificationEventType[] = [
  NotificationEventType.ORDER_CREATED,
  NotificationEventType.PAYMENT_CONFIRMED,
  NotificationEventType.ORDER_PROCESSING,
  NotificationEventType.ORDER_SHIPPED,
  NotificationEventType.ORDER_DELIVERED,
  NotificationEventType.ORDER_CANCELLED,
];

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  return `${(local || '*').slice(0, 1)}***@${domain}`;
}

async function main() {
  const health = NotificationService.getEmailHealth();
  console.log('Email health:', {
    configured: health.configured,
    active: health.active,
    ready: health.ready,
    hasApiKey: health.hasApiKey,
    from: health.from,
    adminEmail: health.adminEmail,
  });
  if (!health.ready) {
    throw new Error(
      'Resend is not active. Set EMAIL_API_KEY or RESEND_API_KEY before re-queueing.'
    );
  }

  const alreadyDelivered = await prisma.notification.findMany({
    where: {
      status: NotificationStatus.SENT,
      provider: 'resend',
      ...(ordersOnly ? { eventType: { in: ORDER_EVENTS } } : {}),
    },
    select: { eventType: true, orderId: true, recipient: true },
  });
  const deliveredKey = new Set(
    alreadyDelivered.map((row) => `${row.eventType}|${row.orderId || ''}|${row.recipient.toLowerCase()}`)
  );

  const fakeSent = await prisma.notification.findMany({
    where: {
      status: NotificationStatus.SENT,
      provider: 'dev-logging',
      ...(ordersOnly ? { eventType: { in: ORDER_EVENTS } } : {}),
    },
    orderBy: { createdAt: 'asc' },
    take: 100,
  });

  const pending = fakeSent.filter(
    (row) => !deliveredKey.has(`${row.eventType}|${row.orderId || ''}|${row.recipient.toLowerCase()}`)
  );

  console.log(
    `Found ${fakeSent.length} dev-logged notifications; ${pending.length} still need a real send`
  );

  let created = 0;
  for (const row of pending) {
    const result = await NotificationService.resend(row.id, 'system-requeue');
    if (result.created) {
      created += 1;
      console.log(`  queued ${row.eventType} → ${maskEmail(row.recipient)}`);
    }
  }

  if (shouldFlush && created > 0) {
    console.log('Flushing pending notifications…');
    let sent = 0;
    let failed = 0;
    for (let i = 0; i < created; i += 1) {
      const flush = await NotificationService.processPending(1);
      sent += flush.sent;
      failed += flush.failed;
      if (flush.processed === 0) break;
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
    console.log('Flush result:', { sent, failed });
    const errors = await prisma.notification.findMany({
      where: { status: NotificationStatus.FAILED, provider: 'resend' },
      orderBy: { failedAt: 'desc' },
      take: 8,
      select: { eventType: true, errorCode: true, errorMessage: true, recipient: true },
    });
    for (const row of errors) {
      console.log(`  failed ${row.eventType} ${maskEmail(row.recipient)} ${row.errorCode} ${row.errorMessage}`);
    }
  } else if (created > 0) {
    console.log('Queued only. Re-run with --flush to deliver now, or wait for the worker/cron.');
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
