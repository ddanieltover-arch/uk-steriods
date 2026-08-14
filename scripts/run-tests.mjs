/**
 * Runs unit suites always; integration suite reports skip/blocker when DB down.
 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const unitSuites = [
  'test/phase13-hardening.test.ts',
  'test/phase14-observability.test.ts',
  'test/security.test.ts',
  'test/notifications.test.ts',
  'test/search-seo.test.ts',
  'test/inventory-race.test.ts',
  'test/historical-order.test.ts',
];

function runSuite(rel) {
  console.log(`\n=== ${rel} ===`);
  const result = spawnSync('npx', ['tsx', rel], {
    cwd: root,
    stdio: 'inherit',
    shell: true,
  });
  return result.status ?? 1;
}

let failed = 0;
for (const suite of unitSuites) {
  const code = runSuite(suite);
  if (code !== 0) failed += 1;
}

const integrationCode = runSuite('test/integration/postgres.integration.test.ts');
// Integration exits 0 when skipped due to unavailable DB; treat failures as real failures.
if (integrationCode !== 0) failed += 1;

if (failed > 0) {
  console.error(`\n${failed} suite(s) failed.`);
  process.exit(1);
}

console.log('\nAll runnable test suites completed.');
