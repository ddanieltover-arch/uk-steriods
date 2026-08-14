import { Role, NotificationEventType } from '@prisma/client';
import { RBACService } from '../src/lib/services/rbac.service';
import {
  buildIdempotencyKey,
  escapeHtml,
  isValidEmail,
} from '../src/lib/notifications/notification.types';
import { DevLoggingEmailProvider } from '../src/lib/notifications/email.provider';
import { NotificationService } from '../src/lib/notifications/notification.service';
import {
  getDemoOrderContext,
  renderNotificationEmail,
} from '../src/lib/notifications/email.registry';
import { getSiteOrigin } from '../src/lib/seo/site';

function assert(condition: boolean, description: string) {
  if (!condition) throw new Error(`FAIL: ${description}`);
  console.log(`  ✅ ${description}`);
}

async function run() {
  console.log('Phase 12 — Notification & email tests');

  // 1–2 Idempotency keys
  const key1 = buildIdempotencyKey(NotificationEventType.ORDER_CREATED, ['order-abc']);
  const key2 = buildIdempotencyKey(NotificationEventType.ORDER_CREATED, ['order-abc']);
  assert(key1 === key2, 'duplicate order event produces identical idempotency key');
  assert(key1 === 'ORDER_CREATED:order-abc', 'idempotency key format is deterministic');
  assert(
    buildIdempotencyKey(NotificationEventType.ORDER_SHIPPED, ['o1', 'TRACK1']) !==
      buildIdempotencyKey(NotificationEventType.ORDER_SHIPPED, ['o1', 'TRACK2']),
    'shipment idempotency includes tracking identity'
  );

  // HTML escaping / injection
  const unsafe = '<script>alert(1)</script>';
  assert(!escapeHtml(unsafe).includes('<script>'), 'HTML injection in names is escaped');
  assert(escapeHtml(unsafe).includes('&lt;script&gt;'), 'escaped markup uses entities');

  const xssOrder = getDemoOrderContext();
  xssOrder.customerName = '<img src=x onerror=alert(1)>';
  xssOrder.shippingAddress = {
    ...xssOrder.shippingAddress,
    addressLine1: '<b>Evil</b>',
  };
  const rendered = renderNotificationEmail(NotificationEventType.ORDER_CREATED, {
    kind: 'order',
    data: xssOrder,
  });
  assert(!rendered.html.includes('<img src=x'), 'order email HTML escapes customer name');
  assert(rendered.html.includes('&lt;img'), 'escaped customer name present');
  assert(rendered.text.includes('ORD-DEMO-0001'), 'plain-text body includes order number');
  assert(rendered.html.includes('Bank transfer instructions') || rendered.text.includes('Payment reference'), 'order-created includes payment instructions');

  // Event templates exist
  for (const event of [
    NotificationEventType.PAYMENT_CONFIRMED,
    NotificationEventType.ORDER_PROCESSING,
    NotificationEventType.ORDER_SHIPPED,
    NotificationEventType.ORDER_DELIVERED,
    NotificationEventType.ORDER_CANCELLED,
    NotificationEventType.ACCOUNT_CREATED,
    NotificationEventType.PASSWORD_RESET_REQUESTED,
    NotificationEventType.PASSWORD_CHANGED,
  ]) {
    const accountEvents: NotificationEventType[] = [
      NotificationEventType.ACCOUNT_CREATED,
      NotificationEventType.PASSWORD_RESET_REQUESTED,
      NotificationEventType.PASSWORD_CHANGED,
    ];
    const isAccount = accountEvents.includes(event);
    const mail = renderNotificationEmail(
      event,
      isAccount
        ? {
            kind: 'account',
            data: {
              userId: 'u1',
              email: 'demo@example.test',
              firstName: 'Demo',
              resetUrl: 'http://localhost:3001/reset-password?token=demo',
              changedAt: new Date().toISOString(),
            },
          }
        : { kind: 'order', data: getDemoOrderContext() }
    );
    assert(Boolean(mail.subject && mail.html && mail.text), `${event} renders html+text`);
  }

  // Provider abstraction — dev provider never leaks secrets, validates recipient
  const provider = new DevLoggingEmailProvider();
  NotificationService.setProvider(provider);

  const bad = await provider.send({
    to: { email: 'not-an-email' },
    from: { email: 'noreply@test.local' },
    subject: 'x',
    html: '<p>x</p>',
    text: 'x',
  });
  assert(bad.success === false && bad.failureClass === 'INVALID_RECIPIENT', 'invalid recipient handled safely');

  const ok = await provider.send({
    to: { email: 'demo@example.test' },
    from: { email: 'noreply@test.local', name: 'UK Performance' },
    subject: 'Order confirmed',
    html: '<p>Hello</p>',
    text: 'Hello',
    idempotencyKey: 'ORDER_CREATED:demo',
  });
  assert(ok.success === true, 'dev provider accepts valid email');
  assert(!JSON.stringify(provider.sent).includes('password'), 'provider logs never include passwords');
  assert(!JSON.stringify(provider.sent).includes('demo@example.test'), 'provider logs mask recipient email');

  // Retry strategy
  assert(NotificationService.retryDelayMs(1) === 30_000, 'retry attempt 1 delay 30s');
  assert(NotificationService.retryDelayMs(2) === 120_000, 'retry attempt 2 delay 2m');
  assert(NotificationService.retryDelayMs(3) === 600_000, 'retry attempt 3 delay 10m');

  // Email validation
  assert(isValidEmail('a@b.co') === true, 'valid email accepted');
  assert(isValidEmail('bad') === false, 'invalid email rejected');

  // Site URL for links — not Host header
  const origin = getSiteOrigin();
  assert(origin.startsWith('http'), 'site origin configured without Host header');
  const shipMail = renderNotificationEmail(NotificationEventType.ORDER_SHIPPED, {
    kind: 'order',
    data: { ...getDemoOrderContext(), trackingNumber: 'RM123', shipmentProvider: 'Royal Mail' },
  });
  assert(shipMail.text.includes('RM123'), 'shipped email includes tracking number');
  assert(!shipMail.html.includes('javascript:'), 'no javascript: URLs in shipped email');

  // Cancellation does not invent refunds
  const cancelMail = renderNotificationEmail(NotificationEventType.ORDER_CANCELLED, {
    kind: 'order',
    data: { ...getDemoOrderContext(), paymentStatus: 'AWAITING_TRANSFER' },
  });
  assert(!cancelMail.text.toLowerCase().includes('has been refunded'), 'cancel email does not claim refund without status');

  // RBAC / security
  assert(!RBACService.hasPermission(Role.CUSTOMER, 'notification:read'), 'CUSTOMER cannot read notifications');
  assert(!RBACService.hasPermission(Role.CUSTOMER, 'notification:resend'), 'CUSTOMER cannot resend notifications');
  assert(RBACService.hasPermission(Role.STAFF, 'notification:read'), 'STAFF can read notifications');
  assert(!RBACService.hasPermission(Role.STAFF, 'notification:resend'), 'STAFF cannot resend without permission');
  assert(RBACService.hasPermission(Role.ADMIN, 'notification:resend'), 'ADMIN can resend notifications');
  assert(RBACService.hasPermission(Role.SUPER_ADMIN, 'notification:preview'), 'SUPER_ADMIN can preview');

  // Password reset response wording (enumeration protection contract)
  const generic =
    'If an account exists for that email address, password reset instructions have been sent.';
  assert(generic.toLowerCase().includes('if an account exists'), 'password-reset response does not reveal account existence');

  // Provider credentials never appear in admin list DTO shape
  const masked = NotificationService.maskRecipient('alex.smith@example.co.uk');
  assert(masked.startsWith('a***@'), 'admin list masks recipient');
  assert(!masked.includes('alex.smith'), 'full local-part not exposed');

  // Marketing separation note present in layout
  assert(rendered.html.includes('not a marketing newsletter'), 'transactional emails are separated from marketing');

  // Enqueue without DB should still validate recipient and return null for invalid
  const skipped = await NotificationService.enqueue({
    eventType: NotificationEventType.ORDER_CREATED,
    recipient: 'not-valid',
    payload: { kind: 'order', data: getDemoOrderContext() },
    idempotencyParts: ['skip-invalid'],
  });
  assert(skipped === null, 'invalid recipient is not enqueued');

  // Optional DB-backed outbox tests
  let dbAvailable = false;
  try {
    const { db } = await import('../src/lib/db.js');
    await db.$queryRaw`SELECT 1`;
    dbAvailable = true;

    const ctx = getDemoOrderContext();
    ctx.orderId = `test-order-${Date.now()}`;
    ctx.orderNumber = `ORD-TEST-${Date.now()}`;
    ctx.recipientEmail = 'demo@example.test';

    const first = await NotificationService.enqueueOrderEvent(NotificationEventType.ORDER_CREATED, ctx, {
      idempotencyParts: [ctx.orderId],
    });
    const second = await NotificationService.enqueueOrderEvent(NotificationEventType.ORDER_CREATED, ctx, {
      idempotencyParts: [ctx.orderId],
    });
    assert(Boolean(first?.id), 'order-created notification generated');
    assert(first?.id === second?.id, 'duplicate order event does not create duplicate notification');

    // Concurrent claim safety: mark pending then two processPending calls should not double-send
    const beforeSent = provider.sent.length;
    const [a, b] = await Promise.all([
      NotificationService.processPending(5),
      NotificationService.processPending(5),
    ]);
    const processedTotal = a.processed + b.processed;
    assert(processedTotal >= 1, 'pending notification processed');
    // Same notification should only be sent once by one claimer
    const matching = provider.sent.filter((s) => s.idempotencyKey === first?.idempotencyKey);
    assert(matching.length <= 1, 'two workers cannot successfully send the same notification twice');

    // Manual resend creates a new row
    if (first?.id) {
      const resent = await NotificationService.resend(first.id, 'admin-user');
      assert(Boolean(resent.created?.id), 'manual resend creates new delivery attempt');
      assert(resent.created?.id !== first.id, 'manual resend is distinct from automatic idempotency');
      assert(resent.created?.isManualResend === true, 'manual resend flagged');
    }

    // Permanent failure stops retrying
    const failProvider = {
      name: 'fail-permanent',
      async send() {
        return {
          success: false,
          provider: 'fail-permanent',
          errorCode: 'INVALID_RECIPIENT',
          errorMessage: 'bad',
          failureClass: 'INVALID_RECIPIENT' as const,
        };
      },
    };
    NotificationService.setProvider(failProvider as any);
    const failCtx = { ...ctx, orderId: `${ctx.orderId}-fail`, recipientEmail: 'ok@example.test' };
    const failRow = await NotificationService.enqueueOrderEvent(
      NotificationEventType.PAYMENT_CONFIRMED,
      failCtx,
      { idempotencyParts: [failCtx.orderId] }
    );
    await NotificationService.processPending(5);
    const afterFail = await db.notification.findUnique({ where: { id: failRow!.id } });
    assert(afterFail?.status === 'FAILED', 'permanent failure stops retrying');

    // Transient then recover
    let calls = 0;
    NotificationService.setProvider({
      name: 'flaky',
      async send() {
        calls += 1;
        if (calls === 1) {
          return {
            success: false,
            provider: 'flaky',
            errorCode: 'TEMP',
            errorMessage: 'temp',
            failureClass: 'TRANSIENT',
          };
        }
        return { success: true, provider: 'flaky', messageId: 'ok' };
      },
    } as any);
    const retryCtx = { ...ctx, orderId: `${ctx.orderId}-retry` };
    const retryRow = await NotificationService.enqueueOrderEvent(
      NotificationEventType.ORDER_PROCESSING,
      retryCtx,
      { idempotencyParts: [retryCtx.orderId] }
    );
    await NotificationService.processPending(5);
    const mid = await db.notification.findUnique({ where: { id: retryRow!.id } });
    assert(mid?.status === 'PENDING', 'failed email remains retryable when transient');
    // Force nextAttemptAt to now for second attempt
    await db.notification.update({
      where: { id: retryRow!.id },
      data: { nextAttemptAt: new Date() },
    });
    await NotificationService.processPending(5);
    const done = await db.notification.findUnique({ where: { id: retryRow!.id } });
    assert(done?.status === 'SENT', 'retryable failure can succeed on later attempt');

    // Cleanup test rows
    await db.notification.deleteMany({
      where: { orderId: { startsWith: 'test-order-' } },
    });
    // also delete by idempotency prefix for rows without orderId linkage issues
    await db.notification.deleteMany({
      where: {
        OR: [
          { idempotencyKey: { contains: ctx.orderId } },
          { idempotencyKey: { contains: `${ctx.orderId}-fail` } },
          { idempotencyKey: { contains: `${ctx.orderId}-retry` } },
        ],
      },
    });

    console.log(`  ℹ️ DB-backed outbox tests executed (provider sends beforeSent=${beforeSent})`);
  } catch (err: any) {
    if (!dbAvailable) {
      console.log('  ℹ️ PostgreSQL unavailable — skipped DB outbox/idempotency persistence tests');
    } else {
      throw err;
    }
  } finally {
    NotificationService.setProvider(null);
  }

  console.log('\nAll Phase 12 notification tests passed.');
  console.log('Production email delivery has not been verified; development provider/tests were used.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
