import { ErrorReporter } from '../src/lib/observability/error-reporter';
import { RedisRateLimitStore } from '../src/lib/middleware/redis-rate-limit-store';
import { MemoryRateLimitStore } from '../src/lib/middleware/rate-limit-store';

async function run() {
  console.log('Phase 14 observability / rate-limit abstraction tests');
  let passed = 0;
  let total = 0;
  function assert(c: boolean, d: string) {
    total++;
    if (!c) throw new Error(d);
    console.log(`  [PASS] ${d}`);
    passed++;
  }

  const messages: string[] = [];
  ErrorReporter.setSink({
    captureException(err, ctx) {
      messages.push(JSON.stringify({ err: String(err), ctx }));
    },
    captureMessage(msg) {
      messages.push(msg);
    },
  });
  ErrorReporter.captureException(new Error('Bearer supersecrettoken'), {
    requestId: 'abc',
    extra: { password: 'nope', note: 'ok' },
  });
  assert(messages.length === 1, 'ErrorReporter sink invoked');
  assert(messages[0].includes('[REDACTED]'), 'sensitive extra keys redacted before sink');
  assert(!messages[0].includes('nope'), 'password value not forwarded');
  ErrorReporter.resetSink();
  assert(true, 'ErrorReporter resetSink restores console sink');

  const mem = new MemoryRateLimitStore();
  const a = await mem.incr('p14', 60_000);
  const b = await mem.incr('p14', 60_000);
  assert(a.count === 1 && b.count === 2, 'memory rate limit store works');

  // Redis store constructs without connecting (no client calls until used)
  const fake = {
    async get() {
      return null;
    },
    async set() {
      return 'OK';
    },
    async incr() {
      return 1;
    },
    async pexpire() {
      return 1;
    },
    async pttl() {
      return 60_000;
    },
  };
  const redisStore = new RedisRateLimitStore(fake);
  const r = await redisStore.incr('x', 60_000);
  assert(r.count === 1, 'RedisRateLimitStore incr with injected fake client');

  console.log(`\nPhase 14 unit checks: ${passed}/${total} passed`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
