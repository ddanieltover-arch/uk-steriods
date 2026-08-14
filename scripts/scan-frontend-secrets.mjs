/**
 * Scans Vite production build output for obvious leaked server-secret patterns.
 * Does not print secret values.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(root, 'dist', 'assets');

const patterns = [
  { name: 'DATABASE_URL', re: /postgresql:\/\/[^\s"']+/i },
  { name: 'AUTH_SECRET assignment', re: /AUTH_SECRET\s*[:=]\s*['"][^'"]{8,}/i },
  { name: 'EMAIL_API_KEY assignment', re: /EMAIL_API_KEY\s*[:=]\s*['"][^'"]{8,}/i },
  { name: 'Bearer live token-looking', re: /Bearer\s+sess_[A-Za-z0-9]{20,}/ },
  { name: 'AWS-looking key', re: /AKIA[0-9A-Z]{16}/ },
  { name: 'private key block', re: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/ },
];

if (!fs.existsSync(assetsDir)) {
  console.error('dist/assets not found. Run npm run build first.');
  process.exit(1);
}

const files = fs.readdirSync(assetsDir).filter((f) => f.endsWith('.js'));
let findings = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(assetsDir, file), 'utf8');
  for (const p of patterns) {
    if (p.re.test(content)) {
      findings += 1;
      console.error(`[LEAK?] ${p.name} matched in ${file}`);
    }
  }
}

// Code-splitting sanity
const names = files.join(',');
const checks = [
  ['admin chunk', /admin-/i.test(names)],
  ['checkout chunk', /CheckoutPage-/i.test(names)],
  ['account chunk', /AccountDashboardPage-/i.test(names)],
];

for (const [label, ok] of checks) {
  if (ok) console.log(`[OK] ${label} present in build`);
  else {
    findings += 1;
    console.error(`[MISS] ${label} not found in dist/assets`);
  }
}

if (findings > 0) {
  console.error(`\nSecret/build scan finished with ${findings} issue(s).`);
  process.exit(1);
}

console.log(`\nScanned ${files.length} JS assets — no obvious server-secret leaks; code-split chunks present.`);
