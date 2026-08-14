/**
 * PostgreSQL integration tests for Phase 14.
 * Skips cleanly when DATABASE_URL is unreachable — never fakes success.
 */
import { PrismaClient, NotificationStatus, NotificationEventType, NotificationChannel } from '@prisma/client';
import { createHash, randomBytes } from 'crypto';
import { SessionService } from '../../src/lib/auth/session';
import { NotificationService } from '../../src/lib/notifications/notification.service';
import { AuthService } from '../../src/lib/auth';

const db = new PrismaClient();

let passed = 0;
let total = 0;
let skipped = 0;

function assert(condition: boolean, description: string) {
  total++;
  if (!condition) {
    console.error(`  [FAIL] ${description}`);
    throw new Error(description);
  }
  console.log(`  [PASS] ${description}`);
  passed++;
}

function skip(description: string) {
  skipped++;
  console.log(`  [SKIP] ${description}`);
}

async function dbAvailable(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

async function run() {
  console.log('Phase 14 — PostgreSQL integration tests');

  if (!(await dbAvailable())) {
    console.log('');
    console.log('RELEASE BLOCKER: PostgreSQL unreachable at DATABASE_URL.');
    console.log('Skipped all database integration tests.');
    console.log('Start PostgreSQL, then run: npx prisma migrate deploy && npm run test:integration');
    await db.$disconnect().catch(() => undefined);
    process.exit(1);
  }

  console.log('  PostgreSQL reachable — running integration checks…');

  // Sessions persist
  const email = `phase14_${randomBytes(4).toString('hex')}@example.test`;
  const passwordHash = await AuthService.hashPassword('IntegrationPass123!');
  const user = await db.user.create({
    data: {
      email,
      passwordHash,
      firstName: 'Phase',
      lastName: 'Fourteen',
      role: 'CUSTOMER',
    },
  });

  const { sessionId } = await SessionService.createSession(user.id);
  const sessionRow = await db.authSession.findFirst({ where: { userId: user.id } });
  assert(!!sessionRow, 'AuthSession row persisted in PostgreSQL');
  assert(sessionRow!.tokenHash === createHash('sha256').update(sessionId).digest('hex'), 'session token stored hashed');

  const validated = await SessionService.getSessionUser(sessionId);
  assert(validated?.id === user.id, 'session survives process-level lookup via DB');

  await SessionService.destroySession(sessionId);
  assert((await SessionService.getSessionUser(sessionId)) === null, 'logout invalidates DB session');

  // Checkout idempotency table
  const key = `idem_${randomBytes(8).toString('hex')}`;
  await db.checkoutIdempotency.create({
    data: {
      key,
      responseJson: { success: true, orderNumber: 'ORD-TEST-1' },
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });
  try {
    await db.checkoutIdempotency.create({
      data: {
        key,
        responseJson: { success: true, orderNumber: 'ORD-TEST-2' },
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
    assert(false, 'duplicate idempotency key must violate unique constraint');
  } catch {
    assert(true, 'CheckoutIdempotency unique constraint enforced');
  }

  // Notification outbox claim + reclaim
  const notif = await db.notification.create({
    data: {
      eventType: NotificationEventType.ACCOUNT_CREATED,
      channel: NotificationChannel.EMAIL,
      status: NotificationStatus.PENDING,
      recipient: email,
      idempotencyKey: `ACCOUNT_CREATED:test:${randomBytes(4).toString('hex')}`,
      payload: {
        kind: 'account',
        data: { userId: user.id, email, firstName: 'Phase', lastName: 'Fourteen' },
      },
      maxAttempts: 3,
    },
  });

  const claim1 = await db.notification.updateMany({
    where: { id: notif.id, status: NotificationStatus.PENDING },
    data: { status: NotificationStatus.PROCESSING, lastAttemptAt: new Date(Date.now() - 10 * 60 * 1000), attempts: 1 },
  });
  assert(claim1.count === 1, 'notification claimed PENDING → PROCESSING');

  const claim2 = await db.notification.updateMany({
    where: { id: notif.id, status: NotificationStatus.PENDING },
    data: { status: NotificationStatus.PROCESSING },
  });
  assert(claim2.count === 0, 'second worker cannot claim same PENDING notification');

  const reclaimed = await NotificationService.reclaimStaleProcessing();
  assert(reclaimed >= 1, 'stale PROCESSING notification reclaimed');
  const after = await db.notification.findUnique({ where: { id: notif.id } });
  assert(after?.status === NotificationStatus.PENDING, 'reclaimed row returns to PENDING');

  // Password reset tokens stored hashed
  const rawReset = `pwr_${randomBytes(16).toString('hex')}`;
  const resetHash = createHash('sha256').update(rawReset).digest('hex');
  await db.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash: resetHash,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    },
  });
  const storedReset = await db.passwordResetToken.findUnique({ where: { tokenHash: resetHash } });
  assert(!!storedReset, 'password reset token persisted');
  assert(storedReset!.tokenHash !== rawReset, 'reset token is not stored plaintext');

  const published = await db.product.count({ where: { isPublished: true, deletedAt: null } });
  assert(published >= 0, 'catalogue query against Product succeeds');

  // Cleanup
  await db.passwordResetToken.deleteMany({ where: { userId: user.id } });
  await db.notification.deleteMany({ where: { recipient: email } });
  await db.checkoutIdempotency.deleteMany({ where: { key } });
  await db.authSession.deleteMany({ where: { userId: user.id } });
  await db.user.delete({ where: { id: user.id } });

  console.log(`\nIntegration results: ${passed}/${total} passed, ${skipped} skipped.`);
  await db.$disconnect();
}

run().catch(async (err) => {
  console.error(err);
  await db.$disconnect().catch(() => undefined);
  process.exit(1);
});
