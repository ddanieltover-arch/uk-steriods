/**
 * Re-queue notifications that were falsely marked SENT via DevLogging,
 * then flush them through the real Resend provider.
 *
 * Usage:
 *   npx tsx scripts/requeue-dev-logged-emails.ts
 *   npx tsx scripts/requeue-dev-logged-emails.ts --flush
 */
import 'dotenv/config';
import { PrismaClient, NotificationStatus } from '@prisma/client';
import { NotificationService } from '../src/lib/notifications/notification.service';

const prisma = new PrismaClient();
const shouldFlush = process.argv.includes('--flush');

async function main() {
  const health = NotificationService.getEmailHealth();
  console.log('Email health:', health);
  if (!health.ready) {
    throw new Error(
      'Resend is not active. Set EMAIL_PROVIDER=resend and EMAIL_API_KEY before re-queueing.'
    );
  }

  const fakeSent = await prisma.notification.findMany({
    where: {
      status: NotificationStatus.SENT,
      provider: 'dev-logging',
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  console.log(`Found ${fakeSent.length} notifications marked SENT via dev-logging`);

  let created = 0;
  for (const row of fakeSent) {
    const result = await NotificationService.resend(row.id, 'system-requeue');
    if (result.created) {
      created += 1;
      console.log(`  queued ${row.eventType} → ${row.recipient} (${result.created.id})`);
    }
  }

  if (shouldFlush && created > 0) {
    console.log('Flushing pending notifications…');
    const flush = await NotificationService.processPending(Math.max(created, 20));
    console.log('Flush result:', flush);
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
