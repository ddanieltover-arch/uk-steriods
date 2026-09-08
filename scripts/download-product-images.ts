import { PrismaClient } from '@prisma/client';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const productImageDir = path.join(projectRoot, 'public', 'media', 'products');
const brandLogoDir = path.join(projectRoot, 'public', 'media', 'brands');
const seedJsonPath = path.join(projectRoot, 'prisma', 'seed-catalog.json');

const prisma = new PrismaClient();

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
          Accept: 'image/webp,image/*,*/*;q=0.8',
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
    req.setTimeout(25000, () => {
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

function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

async function downloadImage(
  remoteUrl: string,
  destDir: string,
  filenameBase: string,
  retries = 3
): Promise<string | null> {
  if (!remoteUrl || !isExternalUrl(remoteUrl)) return remoteUrl.startsWith('/') ? remoteUrl : null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    if (attempt > 1) await new Promise((r) => setTimeout(r, 1500 * attempt));

    const res = await fetchUrl(remoteUrl);
    if (res.status === 200 && res.body.length >= 200) {
      fs.mkdirSync(destDir, { recursive: true });
      const ext = extFromUrl(remoteUrl, res.contentType);
      const filename = `${filenameBase}${ext}`;
      fs.writeFileSync(path.join(destDir, filename), res.body);

      const publicDir = path.join(projectRoot, 'public');
      const relPath = '/' + path.relative(publicDir, path.join(destDir, filename)).replace(/\\/g, '/');
      return relPath;
    }

    if (attempt === retries) {
      console.log(`  [skip] ${filenameBase}: HTTP ${res.status} (${res.body.length} bytes)`);
    }
  }

  return null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function ensureDefaultProductImage(): Promise<string> {
  const defaultPath = path.join(productImageDir, 'default.webp');
  if (fs.existsSync(defaultPath)) return '/media/products/default.webp';

  fs.mkdirSync(productImageDir, { recursive: true });

  const res = await fetchUrl('https://steroids-uk.com/og-default.jpg');
  if (res.status === 200 && res.body.length >= 200 && !String(res.contentType).includes('text/html')) {
    fs.writeFileSync(defaultPath, res.body);
    return '/media/products/default.webp';
  }

  // Remote default often 500 — copy any existing product webp so the path resolves.
  const existing = fs
    .readdirSync(productImageDir)
    .find((f) => f.endsWith('.webp') && f !== 'default.webp');
  if (existing) {
    fs.copyFileSync(path.join(productImageDir, existing), defaultPath);
    return '/media/products/default.webp';
  }

  return '/media/products/default.webp';
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T, i: number) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return out;
}

async function migrateProductImages(): Promise<{ updated: number; skipped: number; failed: number }> {
  const images = await prisma.productImage.findMany({
    include: { product: { select: { slug: true, name: true } } },
  });

  const external = images.filter((img) => isExternalUrl(img.url));
  console.log(`Found ${external.length} product images with external URLs (of ${images.length} total).`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  await mapLimit(external, 6, async (img) => {
    const localPath = await downloadImage(img.url, productImageDir, img.product.slug);
    if (!localPath) {
      failed++;
      return;
    }
    if (localPath === img.url) {
      skipped++;
      return;
    }

    await prisma.productImage.update({
      where: { id: img.id },
      data: { url: localPath },
    });
    updated++;
    console.log(`  ✓ ${img.product.slug} → ${localPath}`);
  });

  return { updated, skipped, failed };
}

async function migrateBrandLogos(): Promise<number> {
  const brands = await prisma.brand.findMany();
  let updated = 0;

  for (const brand of brands) {
    if (!brand.logoUrl || !isExternalUrl(brand.logoUrl)) continue;
    const localPath = await downloadImage(brand.logoUrl, brandLogoDir, brand.slug);
    if (!localPath || localPath === brand.logoUrl) continue;

    await prisma.brand.update({
      where: { id: brand.id },
      data: { logoUrl: localPath },
    });
    updated++;
    console.log(`  ✓ brand ${brand.slug} → ${localPath}`);
  }

  return updated;
}

function syncSeedCatalogJson(): number {
  if (!fs.existsSync(seedJsonPath)) return 0;

  const catalog = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
  let changed = 0;

  for (const product of catalog.products || []) {
    if (!product.imageUrl || !isExternalUrl(product.imageUrl)) continue;

    const ext = extFromUrl(product.imageUrl, '');
    const filename = `${product.slug}${ext}`;
    const localFile = path.join(productImageDir, filename);

    if (fs.existsSync(localFile)) {
      const publicPath = `/media/products/${filename}`;
      if (product.imageUrl !== publicPath) {
        product.imageUrl = publicPath;
        changed++;
      }
      continue;
    }

    // Try any extension on disk
    for (const tryExt of ['.webp', '.jpg', '.png']) {
      const altFile = path.join(productImageDir, `${product.slug}${tryExt}`);
      if (fs.existsSync(altFile)) {
        product.imageUrl = `/media/products/${product.slug}${tryExt}`;
        changed++;
        break;
      }
    }
  }

  for (const brand of catalog.brands || []) {
    for (const tryExt of ['.webp', '.jpg', '.png']) {
      const altFile = path.join(brandLogoDir, `${brand.slug}${tryExt}`);
      if (fs.existsSync(altFile)) {
        brand.logoUrl = `/media/brands/${brand.slug}${tryExt}`;
        changed++;
        break;
      }
    }
  }

  if (changed > 0) {
    fs.writeFileSync(seedJsonPath, JSON.stringify(catalog, null, 2));
  }

  return changed;
}

async function syncCatalogImagesToDatabase(): Promise<number> {
  if (!fs.existsSync(seedJsonPath)) return 0;

  const catalog = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
  let updated = 0;

  for (const item of catalog.products || []) {
    const product = await prisma.product.findUnique({ where: { slug: item.slug } });
    if (!product || !item.imageUrl) continue;

    const images = await prisma.productImage.findMany({ where: { productId: product.id } });
    if (images.length === 0) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: item.imageUrl,
          altText: `${product.name} cover`,
          isPrimary: true,
          displayOrder: 0,
        },
      });
      updated++;
      continue;
    }

    for (const img of images) {
      if (img.url !== item.imageUrl) {
        await prisma.productImage.update({ where: { id: img.id }, data: { url: item.imageUrl } });
        updated++;
      }
    }
  }

  for (const brand of catalog.brands || []) {
    if (!brand.logoUrl) continue;
    await prisma.brand.updateMany({
      where: { slug: brand.slug, logoUrl: { not: brand.logoUrl } },
      data: { logoUrl: brand.logoUrl },
    });
  }

  return updated;
}

async function migrateFromSeedCatalog(): Promise<{ downloaded: number; failed: number }> {
  if (!fs.existsSync(seedJsonPath)) return { downloaded: 0, failed: 0 };

  const catalog = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
  let downloaded = 0;
  let failed = 0;

  console.log(`   Using seed-catalog.json (${catalog.products?.length || 0} products)...`);

  const defaultImage = await ensureDefaultProductImage();

  for (const product of catalog.products || []) {
    if (!product.imageUrl?.startsWith('http')) continue;

    if (product.imageUrl.includes('og-default')) {
      product.imageUrl = defaultImage;
      downloaded++;
      continue;
    }

    await sleep(400);
    const localPath = await downloadImage(product.imageUrl, productImageDir, product.slug);
    if (localPath) {
      product.imageUrl = localPath;
      downloaded++;
      console.log(`  ✓ ${product.slug} → ${localPath}`);
    } else {
      product.imageUrl = defaultImage;
      failed++;
      console.log(`  ~ ${product.slug} → ${defaultImage} (fallback)`);
    }
  }

  for (const brand of catalog.brands || []) {
    const remoteLogo = brand.logoUrl || `https://steroids-uk.com/logos/brands/${brand.slug}.webp`;
    if (!remoteLogo.startsWith('http')) continue;
    await sleep(400);
    const localPath = await downloadImage(remoteLogo, brandLogoDir, brand.slug);
    if (localPath) {
      brand.logoUrl = localPath;
      downloaded++;
      console.log(`  ✓ brand ${brand.slug} → ${localPath}`);
    }
  }

  fs.writeFileSync(seedJsonPath, JSON.stringify(catalog, null, 2));
  return { downloaded, failed };
}

async function main() {
  console.log('==========================================');
  console.log('  PRODUCT IMAGE LOCALIZATION');
  console.log('  Downloading images → public/media/');
  console.log('==========================================\n');

  fs.mkdirSync(productImageDir, { recursive: true });
  fs.mkdirSync(brandLogoDir, { recursive: true });

  let dbAvailable = true;
  try {
    await prisma.$connect();
  } catch {
    dbAvailable = false;
  }

  // Always localize images referenced in seed-catalog.json (source of truth for catalog)
  const seedHasExternal = fs.existsSync(seedJsonPath) &&
    JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8')).products?.some(
      (p: { imageUrl?: string }) => p.imageUrl?.startsWith('http')
    );

  if (seedHasExternal) {
    console.log('1. Downloading product images from seed-catalog.json...');
    const seedStats = await migrateFromSeedCatalog();
    console.log(`   Downloaded: ${seedStats.downloaded}, Failed: ${seedStats.failed}\n`);
  }

  if (dbAvailable) {
    try {
      console.log('2. Syncing local image paths to database...');
      const synced = await syncCatalogImagesToDatabase();
      console.log(`   Synced ${synced} product image records.\n`);

      console.log('3. Migrating any remaining external product images...');
      const productStats = await migrateProductImages();
      console.log(`   Updated: ${productStats.updated}, Skipped: ${productStats.skipped}, Failed: ${productStats.failed}\n`);

      console.log('4. Migrating brand logos in database...');
      const brandUpdated = await migrateBrandLogos();
      console.log(`   Updated ${brandUpdated} brand logos.\n`);
    } catch (err: any) {
      console.log(`   Database sync skipped: ${err.message}\n`);
      dbAvailable = false;
    }
  } else if (!seedHasExternal) {
    console.log('2–4. Database offline and no external URLs in seed-catalog.json.\n');
  }

  console.log('5. Regenerating src/data/initialData.ts...');
  const { execSync } = await import('child_process');
  execSync('npx tsx scripts/update-initial-data.ts', { cwd: projectRoot, stdio: 'inherit' });

  console.log('\n==========================================');
  console.log('  PRODUCT IMAGE MIGRATION COMPLETE');
  console.log('==========================================');
  if (!dbAvailable) {
    console.log('\nWhen PostgreSQL is running, re-run to sync DB:');
    console.log('  npm run products:download-images');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
