/**
 * HTTP smoke checks against a running server (default http://127.0.0.1:3001).
 * Starts nothing — pass BASE_URL if needed.
 *
 * Usage: npx tsx scripts/smoke-api.ts
 */
const BASE = (process.env.BASE_URL || 'http://127.0.0.1:3001').replace(/\/$/, '');

type Result = { name: string; ok: boolean; detail?: string };

const results: Result[] = [];

async function check(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    results.push({ name, ok: false, detail });
    console.error(`  [FAIL] ${name}: ${detail}`);
  }
}

async function main() {
  console.log(`API smoke against ${BASE}`);

  await check('GET /health', async () => {
    const res = await fetch(`${BASE}/health`);
    if (!res.ok) throw new Error(`status ${res.status}`);
    const body = (await res.json()) as { status?: string };
    if (body.status !== 'ok') throw new Error('unexpected body');
  });

  let dbReady = false;

  await check('GET /ready (status recorded honestly)', async () => {
    const res = await fetch(`${BASE}/ready`);
    const body = (await res.json()) as { status?: string; checks?: { database?: string } };
    if (res.status === 200 && body.status === 'ok') {
      dbReady = true;
      console.log('    readiness: database ok');
      return;
    }
    if (res.status === 503) {
      console.log('    readiness: database unavailable (expected if Postgres down)');
      return;
    }
    throw new Error(`unexpected readiness ${res.status} ${JSON.stringify(body)}`);
  });

  await check('GET /api/v1/health', async () => {
    const res = await fetch(`${BASE}/api/v1/health`);
    if (!res.ok) throw new Error(`status ${res.status}`);
  });

  if (dbReady) {
    await check('GET /api/v1/catalogue', async () => {
      const res = await fetch(`${BASE}/api/v1/catalogue?page=1&limit=5`);
      if (!res.ok) throw new Error(`status ${res.status}`);
    });

    await check('GET suggestions', async () => {
      const res = await fetch(`${BASE}/api/v1/catalogue/suggestions?q=test`);
      if (!res.ok) throw new Error(`status ${res.status}`);
    });
  } else {
    console.log('  [SKIP] GET /api/v1/catalogue (PostgreSQL unavailable)');
    console.log('  [SKIP] GET suggestions (PostgreSQL unavailable)');
  }

  await check('unauthenticated admin rejected', async () => {
    const res = await fetch(`${BASE}/api/v1/admin/dashboard`);
    if (res.status !== 401 && res.status !== 403) throw new Error(`expected 401/403 got ${res.status}`);
  });

  await check('guest tracking without token rejected', async () => {
    const res = await fetch(`${BASE}/api/v1/orders/ORD-DOES-NOT-EXIST/track`);
    if (res.status === 200) throw new Error('must not succeed without token');
  });

  await check('X-Request-ID echoed', async () => {
    const id = 'smoke-req-12345678';
    const res = await fetch(`${BASE}/health`, { headers: { 'X-Request-ID': id } });
    const echoed = res.headers.get('x-request-id');
    if (echoed !== id) throw new Error(`expected ${id} got ${echoed}`);
  });

  const failed = results.filter((r) => !r.ok);
  console.log(`\nSmoke: ${results.length - failed.length}/${results.length} passed`);
  if (failed.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  console.error('Is the server running? npm run build && npm start   (or npm run dev)');
  process.exit(1);
});
