import { NotificationService } from './notification.service';

let timer: NodeJS.Timeout | null = null;
let running = false;

/**
 * Lightweight PostgreSQL-backed outbox poller for single/multi Node processes.
 * Does not block HTTP handlers. Safe claim uses conditional status updates.
 */
export function startNotificationWorker(options: { intervalMs?: number; batchSize?: number } = {}) {
  const intervalMs = options.intervalMs || Number(process.env.NOTIFICATION_POLL_MS || 5000);
  const batchSize = options.batchSize || 10;

  if (timer) return;

  const tick = async () => {
    if (running) return;
    running = true;
    try {
      await NotificationService.processPending(batchSize);
    } catch (err) {
      console.error('[notification-worker] tick failed', err);
    } finally {
      running = false;
    }
  };

  timer = setInterval(tick, intervalMs);
  if (typeof timer.unref === 'function') timer.unref();
  // Kick once shortly after boot
  setTimeout(tick, 1500).unref?.();
}

export function stopNotificationWorker() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
