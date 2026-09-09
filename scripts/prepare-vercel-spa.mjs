/**
 * Vercel serves static files before rewrites. A root dist/index.html therefore
 * short-circuits `/` and skips Express SEO injection. Rename the shell so only
 * hashed assets remain statically routable; the API reads spa-shell.html.
 */
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const from = path.join(distDir, 'index.html');
const to = path.join(distDir, 'spa-shell.html');

if (!fs.existsSync(from)) {
  console.error('[prepare-vercel-spa] dist/index.html missing — run vite build first');
  process.exit(1);
}

fs.renameSync(from, to);
console.info('[prepare-vercel-spa] moved dist/index.html → dist/spa-shell.html');
