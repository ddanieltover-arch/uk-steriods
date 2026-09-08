/**
 * Backfill products that point at missing /media/products/default.webp
 * by scraping og:image from https://steroids-uk.com/product/{slug}/
 * then syncing seed-catalog.json + DB + initialData.ts.
 */
import { PrismaClient } from '@prisma/client';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const productImageDir = path.join(projectRoot, 'public', 'media', 'products');
const seedJsonPath = path.join(projectRoot, 'prisma', 'seed-catalog.json');

const prisma = new PrismaClient();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function fetchUrl(urlStr: string, redirects = 0): Promise<{ status: number; body: Buffer; contentType: string }> {
  return new Promise((resolve) => {
    if (redirects > 6) {
      resolve({ status: 0, body: Buffer.alloc(0), contentType: '' });
      return;
    }
    const url = new URL(urlStr);
    const lib = url.protocol === 'http:' ? http : https;
    const req = lib.request(
      {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,image/webp,image/*,*/*;q=0.8',
        },
      },
      (res) => {
        const loc = res.headers.location;
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && loc) {
          const next = loc.startsWith('http') ? loc : `${url.protocol}//${url.host}${loc}`;
          res.resume();
          fetchUrl(next, redirects + 1).then(resolve);
          return;
        }
        const chunks: Buffer[] = [];
        res.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
        res.on('end', () =>
          resolve({
            status: res.statusCode || 500,
            body: Buffer.concat(chunks),
            contentType: String(res.headers['content-type'] || ''),
          })
        );
      }
    );
    req.on('error', () => resolve({ status: 0, body: Buffer.alloc(0), contentType: '' }));
    req.setTimeout(30000, () => {
      req.destroy();
      resolve({ status: 0, body: Buffer.alloc(0), contentType: '' });
    });
    req.end();
  });
}

function extFromUrl(url: string, contentType: string): string {
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return '.jpg';
  if (contentType.includes('webp')) return '.webp';
  const m = url.match(/\.(webp|jpg|jpeg|png)(\?|$)/i);
  return m ? `.${m[1].toLowerCase().replace('jpeg', 'jpg')}` : '.webp';
}

function extractOgImage(html: string): string | null {
  const patterns = [
    /property=["']og:image["']\s+content=["']([^"']+)["']/i,
    /content=["']([^"']+)["']\s+property=["']og:image["']/i,
    /"image"\s*:\s*"(https?:[^"]+\.(?:webp|jpg|jpeg|png)[^"]*)"/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1] && !m[1].includes('og-default')) return m[1];
  }
  return null;
}

async function downloadImage(remoteUrl: string, filenameBase: string): Promise<string | null> {
  const res = await fetchUrl(remoteUrl);
  if (res.status !== 200 || res.body.length < 200) return null;
  if (res.contentType.includes('text/html')) return null;

  fs.mkdirSync(productImageDir, { recursive: true });
  const ext = extFromUrl(remoteUrl, res.contentType);
  const filename = `${filenameBase}${ext}`;
  fs.writeFileSync(path.join(productImageDir, filename), res.body);
  return `/media/products/${filename}`;
}

function localFileExists(publicPath: string): boolean {
  if (!publicPath.startsWith('/')) return false;
  return fs.existsSync(path.join(projectRoot, 'public', publicPath.replace(/^\//, '')));
}

async function ensureDefaultImage(): Promise<string> {
  const defaultPath = path.join(productImageDir, 'default.webp');
  if (fs.existsSync(defaultPath)) return '/media/products/default.webp';

  // Prefer copying an existing product webp as a neutral catalog fallback.
  const existing = fs
    .readdirSync(productImageDir)
    .find((f) => f.endsWith('.webp') && f !== 'default.webp');
  if (existing) {
    fs.copyFileSync(path.join(productImageDir, existing), defaultPath);
    console.log(`  Created default.webp from ${existing}`);
    return '/media/products/default.webp';
  }

  return '/media/products/default.webp';
}

async function main() {
  console.log('==========================================');
  console.log('  BACKFILL MISSING PRODUCT IMAGES');
  console.log('==========================================\n');

  fs.mkdirSync(productImageDir, { recursive: true });
  const catalog = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
  const products: Array<{ slug: string; imageUrl?: string; name?: string }> = catalog.products || [];

  const needsWork = products.filter((p) => {
    const url = p.imageUrl || '';
    if (!url || url.includes('default.webp')) return true;
    return !localFileExists(url);
  });

  console.log(`Products needing images: ${needsWork.length} / ${products.length}\n`);

  let downloaded = 0;
  let failed = 0;
  let alreadyLocal = 0;

  for (const product of needsWork) {
    // Reuse file if a previous run already saved it
    for (const ext of ['.webp', '.jpg', '.png']) {
      const existing = `/media/products/${product.slug}${ext}`;
      if (localFileExists(existing)) {
        product.imageUrl = existing;
        alreadyLocal++;
        console.log(`  · ${product.slug} → ${existing} (on disk)`);
        break;
      }
    }
    if (product.imageUrl && !product.imageUrl.includes('default.webp') && localFileExists(product.imageUrl)) {
      continue;
    }

    await sleep(350);
    const pageUrl = `https://steroids-uk.com/product/${product.slug}/`;
    const page = await fetchUrl(pageUrl);
    if (page.status !== 200) {
      failed++;
      console.log(`  ✗ ${product.slug}: page HTTP ${page.status}`);
      continue;
    }

    const html = page.body.toString('utf8');
    const og = extractOgImage(html);
    if (!og) {
      failed++;
      console.log(`  ✗ ${product.slug}: no og:image`);
      continue;
    }

    const localPath = await downloadImage(og, product.slug);
    if (!localPath) {
      failed++;
      console.log(`  ✗ ${product.slug}: download failed (${og})`);
      continue;
    }

    product.imageUrl = localPath;
    downloaded++;
    console.log(`  ✓ ${product.slug} → ${localPath}`);
  }

  const defaultImage = await ensureDefaultImage();
  for (const product of products) {
    if (!product.imageUrl || product.imageUrl.includes('default.webp') || !localFileExists(product.imageUrl)) {
      product.imageUrl = defaultImage;
    }
  }

  fs.writeFileSync(seedJsonPath, JSON.stringify(catalog, null, 2));
  console.log(`\nSeed updated. Downloaded: ${downloaded}, reused: ${alreadyLocal}, failed→default: ${failed}`);

  try {
    await prisma.$connect();
    let synced = 0;
    for (const item of products) {
      const dbProduct = await prisma.product.findUnique({ where: { slug: item.slug } });
      if (!dbProduct || !item.imageUrl) continue;
      const images = await prisma.productImage.findMany({ where: { productId: dbProduct.id } });
      if (images.length === 0) {
        await prisma.productImage.create({
          data: {
            productId: dbProduct.id,
            url: item.imageUrl,
            altText: `${dbProduct.name} cover`,
            isPrimary: true,
            displayOrder: 0,
          },
        });
        synced++;
      } else {
        for (const img of images) {
          if (img.url !== item.imageUrl) {
            await prisma.productImage.update({ where: { id: img.id }, data: { url: item.imageUrl } });
            synced++;
          }
        }
      }
    }
    console.log(`Database image rows updated: ${synced}`);
  } catch (err: any) {
    console.log(`Database sync skipped: ${err.message}`);
  }

  console.log('Regenerating initialData.ts...');
  execSync('npx tsx scripts/update-initial-data.ts', { cwd: projectRoot, stdio: 'inherit' });

  console.log('\nDone. Hard-refresh the storefront if images were cached as errors.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
