/**
 * Sync shop categories + products from steroids-uk.com reference chips.
 * Reference is a Nuxt app — product lists live in __NUXT_DATA__, not static HTML links.
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

export const REFERENCE_CATEGORIES = [
  { name: 'Injectable', slug: 'injectable', sourcePath: '/product-category/injectable/', description: 'Injectable anabolic steroids' },
  { name: 'Oral', slug: 'oral', sourcePath: '/product-category/oral/', description: 'Oral steroid tablets and capsules' },
  { name: 'SARMs', slug: 'sarms', sourcePath: '/product-category/sarms/', description: 'Selective Androgen Receptor Modulators' },
  { name: 'PCT', slug: 'pct', sourcePath: '/product-category/pct/', description: 'Post Cycle Therapy' },
  { name: 'Peptides', slug: 'peptides', sourcePath: '/product-category/peptides/', description: 'Research peptides' },
  { name: 'HGH', slug: 'hgh', sourcePath: '/product-category/growth-hormone/', description: 'Human growth hormone' },
  { name: 'ED Meds', slug: 'ed-meds', sourcePath: '/product-category/ed-meds/', description: 'Erectile dysfunction medication' },
  { name: 'Viagra', slug: 'viagra', sourcePath: '/product-category/viagra/', description: 'Viagra tablets' },
  { name: 'Kamagra', slug: 'kamagra', sourcePath: '/product-category/kamagra/', description: 'Kamagra products' },
  { name: 'Fat Loss', slug: 'fat-loss', sourcePath: '/product-category/fat-loss/', description: 'Fat burners and cutting aids' },
  {
    name: 'Accessories',
    slug: 'accessories',
    sourcePath: '/product-category/needles-syringes/',
    description: 'Needles, syringes and injection supplies',
    extraPaths: ['/product-category/injection-stuff-water/'],
  },
] as const;

const CHIP_SLUGS = new Set(REFERENCE_CATEGORIES.map((c) => c.slug));

/** Map reference category_slugs onto our chip slugs */
const SOURCE_TO_CHIP: Record<string, string> = {
  injectable: 'injectable',
  oral: 'oral',
  sarms: 'sarms',
  pct: 'pct',
  peptides: 'peptides',
  'growth-hormone': 'hgh',
  hgh: 'hgh',
  'ed-meds': 'ed-meds',
  viagra: 'viagra',
  kamagra: 'kamagra',
  'fat-loss': 'fat-loss',
  'needles-syringes': 'accessories',
  'injection-stuff-water': 'accessories',
  // NOTE: do not map needs-needles — injectables carry that tag and would steal Accessories
};

const CATEGORY_PRIORITY: Record<string, number> = {
  viagra: 100,
  kamagra: 95,
  'ed-meds': 90,
  peptides: 80,
  hgh: 75,
  sarms: 70,
  pct: 60,
  'fat-loss': 50,
  oral: 35,
  injectable: 30,
  accessories: 10, // lowest — many injectables share needle-related tags
};

type RefProduct = {
  slug: string;
  name: string;
  sku?: string;
  brandName?: string;
  brandSlug?: string;
  shortDescription?: string;
  price?: number;
  imageUrl?: string;
  categorySlugs: string[];
};

function fetchPage(pathUrl: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve) => {
    const req = https.request(
      {
        hostname: 'steroids-uk.com',
        path: pathUrl,
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      },
      (res) => {
        const loc = res.headers.location;
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && loc) {
          const next = loc.startsWith('http')
            ? new URL(loc).pathname + new URL(loc).search
            : loc;
          res.resume();
          fetchPage(next).then(resolve);
          return;
        }
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve({ status: res.statusCode || 500, body: data }));
      }
    );
    req.on('error', () => resolve({ status: 500, body: '' }));
    req.setTimeout(45000, () => {
      req.destroy();
      resolve({ status: 500, body: '' });
    });
    req.end();
  });
}

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
    req.setTimeout(30000, () => {
      req.destroy();
      resolve({ status: 0, body: Buffer.alloc(0), contentType: '' });
    });
    req.end();
  });
}

function extractNuxtArray(html: string): any[] | null {
  const marker = 'id="__NUXT_DATA__"';
  const i = html.indexOf(marker);
  if (i < 0) return null;
  const start = html.indexOf('>', i) + 1;
  const end = html.indexOf('</script>', start);
  if (start <= 0 || end < 0) return null;
  try {
    return JSON.parse(html.slice(start, end));
  } catch {
    return null;
  }
}

function createResolver(data: any[]) {
  const cache = new Map<number, any>();
  function resolve(node: any, depth = 0): any {
    if (depth > 30) return null;
    if (typeof node === 'number' && Number.isInteger(node) && node >= 0 && node < data.length) {
      if (cache.has(node)) return cache.get(node);
      cache.set(node, undefined);
      const resolved = resolve(data[node], depth + 1);
      cache.set(node, resolved);
      return resolved;
    }
    if (Array.isArray(node)) {
      const tag = node[0];
      if (tag === 'Reactive' || tag === 'ShallowReactive' || tag === 'Ref') return resolve(node[1], depth + 1);
      return node.map((x) => resolve(x, depth + 1));
    }
    if (node && typeof node === 'object') {
      const out: any = {};
      for (const [k, v] of Object.entries(node)) out[k] = resolve(v, depth + 1);
      return out;
    }
    return node;
  }
  return resolve;
}

function chipSlugsFromSource(slugs: string[]): string[] {
  const out = new Set<string>();
  for (const s of slugs || []) {
    const mapped = SOURCE_TO_CHIP[s] || (CHIP_SLUGS.has(s) ? s : null);
    if (mapped) out.add(mapped);
  }
  return [...out];
}

function pickPreferredCategory(candidates: string[], fallback = 'injectable'): string {
  if (!candidates.length) return fallback;
  return candidates.sort((a, b) => (CATEGORY_PRIORITY[b] || 0) - (CATEGORY_PRIORITY[a] || 0))[0];
}

/** Split overlapping ED shop chips by product naming (single-category schema). */
function resolveEdFamily(candidates: string[], name: string, slug: string): string | null {
  const chips = new Set(candidates);
  const text = `${name} ${slug}`.toLowerCase();
  const inFamily =
    chips.has('ed-meds') ||
    chips.has('viagra') ||
    chips.has('kamagra') ||
    /kamagra|lovegra|viagra|sildenafil|tadalafil|cialis|dapoxetine|levitra|vidalista|tadafire|xxx tabs|power proper|power-proper/.test(
      text
    );
  if (!inFamily) return null;
  if (/kamagra|lovegra/.test(text)) return 'kamagra';
  if (/\bviagra\b|\bsildenafil\b/.test(text) && !/kamagra|lovegra|tadalafil|cialis|dapoxetine/.test(text)) return 'viagra';
  return 'ed-meds';
}

function normalizeProduct(raw: any, forcedChip?: string): RefProduct | null {
  if (!raw?.slug || !raw?.name) return null;
  const categorySlugs = chipSlugsFromSource([
    ...(Array.isArray(raw.category_slugs) ? raw.category_slugs : []),
    raw.category_slug,
    forcedChip,
  ].filter(Boolean));

  const price =
    typeof raw.effective_price === 'number'
      ? raw.effective_price
      : typeof raw.price === 'number'
        ? raw.price
        : typeof raw.sale_price === 'number'
          ? raw.sale_price
          : undefined;

  let imageUrl = raw.image_url || '';
  if (imageUrl && imageUrl.startsWith('/')) imageUrl = `https://steroids-uk.com${imageUrl}`;

  return {
    slug: String(raw.slug),
    name: String(raw.name),
    sku: raw.sku ? String(raw.sku) : undefined,
    brandName: raw.brand_name || raw.brand || undefined,
    brandSlug: raw.brand_slug || undefined,
    shortDescription: raw.short_description || undefined,
    price,
    imageUrl: imageUrl || undefined,
    categorySlugs,
  };
}

async function scrapeCategoryPath(sourcePath: string, forcedChip: string): Promise<RefProduct[]> {
  const products: RefProduct[] = [];
  let page = 1;
  let hasNext = true;

  while (hasNext && page <= 20) {
    const sep = sourcePath.includes('?') ? '&' : '?';
    const pathUrl = `${sourcePath}${sep}page=${page}`;
    const res = await fetchPage(pathUrl);
    if (res.status !== 200) break;

    const data = extractNuxtArray(res.body);
    if (!data) break;
    const resolve = createResolver(data);
    const root = resolve(data[1] ?? data[0]);
    const bag = root?.data || {};

    let pageProducts: any[] = [];
    let nextFlag = false;
    for (const [key, val] of Object.entries(bag)) {
      if (key.startsWith('category-') && val && typeof val === 'object' && Array.isArray((val as any).products)) {
        pageProducts = (val as any).products;
        nextFlag = Boolean((val as any).hasNext);
        break;
      }
    }

    for (const raw of pageProducts) {
      const p = normalizeProduct(raw, forcedChip);
      if (p) products.push(p);
    }

    hasNext = nextFlag && pageProducts.length > 0;
    page += 1;
    await sleep(300);
  }

  return products;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extFromUrl(url: string, contentType: string): string {
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return '.jpg';
  if (contentType.includes('webp')) return '.webp';
  const m = url.match(/\.(webp|jpg|jpeg|png)(\?|$)/i);
  return m ? `.${m[1].toLowerCase().replace('jpeg', 'jpg')}` : '.webp';
}

async function downloadImage(remoteUrl: string, slug: string): Promise<string | null> {
  if (!remoteUrl?.startsWith('http')) return remoteUrl?.startsWith('/') ? remoteUrl : null;
  const localWebp = path.join(productImageDir, `${slug}.webp`);
  const localJpg = path.join(productImageDir, `${slug}.jpg`);
  const localPng = path.join(productImageDir, `${slug}.png`);
  if (fs.existsSync(localWebp)) return `/media/products/${slug}.webp`;
  if (fs.existsSync(localJpg)) return `/media/products/${slug}.jpg`;
  if (fs.existsSync(localPng)) return `/media/products/${slug}.png`;

  const res = await fetchUrl(remoteUrl);
  if (res.status !== 200 || res.body.length < 200 || res.contentType.includes('text/html')) return null;
  fs.mkdirSync(productImageDir, { recursive: true });
  const ext = extFromUrl(remoteUrl, res.contentType);
  const filename = `${slug}${ext}`;
  fs.writeFileSync(path.join(productImageDir, filename), res.body);
  return `/media/products/${filename}`;
}

function detectCategoryFromText(text: string): string {
  const lower = text.toLowerCase();
  if (/\bkamagra\b/.test(lower)) return 'kamagra';
  if (/\bviagra\b|\bsildenafil\b/.test(lower)) return 'viagra';
  if (/\bdapoxetine\b|\btadalafil\b|\bcialis\b|\bed med/.test(lower)) return 'ed-meds';
  if (/\bpeptide\b|\bbpc-?157\b|\btb-?500\b|\bigf\b|\bmgf\b|\bmelanotan\b|\bmt-?2\b/.test(lower)) return 'peptides';
  if (/\bhgh\b|\bgrowth hormone\b|\bqomatropin\b|\bsomatropin\b/.test(lower)) return 'hgh';
  if (/\bsarm\b|\brad-?140\b|\bmk-?677\b|\bmk677\b|\bgw-?501516\b|\blgd|ostarine|cardarine|yk-?11|sr-?9009|andarine|\bs23\b/.test(lower))
    return 'sarms';
  if (/\bpct\b|\bnolvadex\b|\btamoxifen\b|\bclomid\b|\bclomiphene\b|\barimidex\b|\banastrozole\b|\barmidex\b|\bcaber|\bcabergoline\b|\bproviron\b|\bliv\.?52\b/.test(lower))
    return 'pct';
  if (/\bclenbuterol\b|\bt3\b|\bcytomel\b|\bsalbutamol\b|\bfat burn|\bfat loss|\bfastrip\b/.test(lower)) return 'fat-loss';
  if (/\bneedle\b|\bsyringe\b|\bbacteriostatic\b|\binjection water\b|\baccessories\b/.test(lower)) return 'accessories';
  if (/\btab\b|\bpill\b|\boral\b|\banavar\b|\bdianabol\b|\banadrol\b|\banapolon\b|\bwinstrol\b|\bturinabol\b|\bhalotestin\b|\bsuperdrol\b/.test(lower))
    return 'oral';
  return 'injectable';
}

async function main() {
  console.log('==========================================');
  console.log('  SYNC REFERENCE SHOP CATEGORIES (Nuxt)');
  console.log('==========================================\n');

  const catalog = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
  const existingBySlug = new Map<string, any>((catalog.products || []).map((p: any) => [p.slug, p]));
  const brandMap = new Map<string, any>((catalog.brands || []).map((b: any) => [b.slug, b]));

  const refBySlug = new Map<string, RefProduct>();
  const membership = new Map<string, Set<string>>();

  for (const cat of REFERENCE_CATEGORIES) {
    console.log(`Scraping ${cat.name} (${cat.sourcePath})...`);
    const paths = [cat.sourcePath, ...((cat as any).extraPaths || [])];
    let total = 0;
    for (const p of paths) {
      const items = await scrapeCategoryPath(p, cat.slug);
      total += items.length;
      for (const item of items) {
        const prev = refBySlug.get(item.slug);
        const mergedSlugs = [...new Set([...(prev?.categorySlugs || []), ...item.categorySlugs, cat.slug])];
        refBySlug.set(item.slug, { ...(prev || item), ...item, categorySlugs: mergedSlugs });
        if (!membership.has(item.slug)) membership.set(item.slug, new Set());
        membership.get(item.slug)!.add(cat.slug);
        for (const cs of mergedSlugs) membership.get(item.slug)!.add(cs);
      }
      await sleep(200);
    }
    console.log(`  → ${total} listings`);
  }

  console.log(`\nUnique reference products: ${refBySlug.size}`);

  // Reclassify / update existing
  let reclassified = 0;
  for (const product of catalog.products || []) {
    const chips = ref ? [...(membership.get(product.slug) || [])] : [];
    const ed = resolveEdFamily(chips, product.name, product.slug);
    const next =
      ed ||
      pickPreferredCategory(chips, '') ||
      detectCategoryFromText(`${product.name} ${product.shortDescription || ''} ${product.description || ''}`);
    if (product.categorySlug !== next) reclassified++;
    product.categorySlug = next;
    if (ref?.imageUrl && (!product.imageUrl || product.imageUrl.includes('default.webp'))) {
      const local = await downloadImage(ref.imageUrl, product.slug);
      if (local) product.imageUrl = local;
    }
  }
  console.log(`Reclassified existing: ${reclassified}`);

  // Import missing
  const missing = [...refBySlug.keys()].filter((s) => !existingBySlug.has(s));
  console.log(`Missing to import: ${missing.length}`);

  let imported = 0;
  let failed = 0;
  for (let i = 0; i < missing.length; i++) {
    const slug = missing[i];
    const ref = refBySlug.get(slug)!;
    process.stdout.write(`  Import ${i + 1}/${missing.length}: ${slug}\r`);
    try {
      const brandName = ref.brandName || 'Steroids UK';
      const brandSlug = ref.brandSlug || slugify(brandName);
      if (!brandMap.has(brandSlug)) {
        brandMap.set(brandSlug, { name: brandName, slug: brandSlug, keys: [brandSlug] });
      }

      let imageUrl = `/media/products/default.webp`;
      if (ref.imageUrl) {
        const local = await downloadImage(ref.imageUrl, slug);
        if (local) imageUrl = local;
      }

      const chips = [...(membership.get(slug) || [])];
      const categorySlug =
        resolveEdFamily(chips, ref.name, slug) ||
        pickPreferredCategory(chips, detectCategoryFromText(`${ref.name} ${ref.shortDescription || ''}`));

      const row = {
        name: ref.name,
        slug,
        sku: ref.sku || `${brandSlug.toUpperCase()}-${slug.slice(0, 18).toUpperCase()}`,
        brandName,
        brandSlug,
        categorySlug,
        shortDescription: ref.shortDescription || `${ref.name} by ${brandName}`,
        description: ref.shortDescription
          ? `<p>${ref.shortDescription}</p>`
          : `<p>${ref.name} by ${brandName}.</p>`,
        pricePence: Math.round((ref.price || 29.99) * 100),
        imageUrl,
      };
      catalog.products.push(row);
      existingBySlug.set(slug, row);
      imported++;
      await sleep(120);
    } catch (e: any) {
      failed++;
      console.log(`\n  ✗ ${slug}: ${e.message}`);
    }
  }
  console.log(`\nImported: ${imported}, failed: ${failed}`);

  catalog.categories = REFERENCE_CATEGORIES.map(({ name, slug, description }) => ({ name, slug, description }));
  catalog.brands = [...brandMap.values()];

  const counts: Record<string, number> = {};
  for (const p of catalog.products) counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
  console.log('\nCategory counts:');
  for (const cat of REFERENCE_CATEGORIES) console.log(`  ${cat.name}: ${counts[cat.slug] || 0}`);
  console.log(`  TOTAL: ${catalog.products.length}`);

  fs.writeFileSync(seedJsonPath, JSON.stringify(catalog, null, 2));
  console.log(`\nWrote ${seedJsonPath}`);

  try {
    await prisma.$connect();
    console.log('\nSyncing database...');

    const categoryIdBySlug = new Map<string, string>();
    for (const cat of catalog.categories) {
      const row = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name, description: cat.description },
        create: { name: cat.name, slug: cat.slug, description: cat.description },
      });
      categoryIdBySlug.set(cat.slug, row.id);
    }

    const brandIdBySlug = new Map<string, string>();
    for (const brand of catalog.brands) {
      const row = await prisma.brand.upsert({
        where: { slug: brand.slug },
        update: { name: brand.name },
        create: { name: brand.name, slug: brand.slug, logoUrl: brand.logoUrl || null },
      });
      brandIdBySlug.set(brand.slug, row.id);
    }

    let upserted = 0;
    for (const item of catalog.products) {
      const categoryId = categoryIdBySlug.get(item.categorySlug) || categoryIdBySlug.get('injectable');
      const brandId = brandIdBySlug.get(item.brandSlug);
      if (!categoryId || !brandId) continue;

      const skuOwner = await prisma.product.findUnique({ where: { sku: item.sku } });
      const skuSafe =
        !skuOwner || skuOwner.slug === item.slug ? item.sku : `${item.sku}-${item.slug}`.slice(0, 64);

      const product = await prisma.product.upsert({
        where: { slug: item.slug },
        update: {
          name: item.name,
          brandId,
          categoryId,
          shortDescription: item.shortDescription,
          description: item.description,
          basePricePence: item.pricePence,
          isPublished: true,
        },
        create: {
          name: item.name,
          slug: item.slug,
          sku: skuSafe,
          brandId,
          categoryId,
          shortDescription: item.shortDescription,
          description: item.description,
          basePricePence: item.pricePence,
          isPublished: true,
          inventory: {
            create: {
              quantity: 100,
              availableQuantity: 100,
              stockStatus: 'IN_STOCK',
            },
          },
        },
      });

      const images = await prisma.productImage.findMany({ where: { productId: product.id } });
      if (images.length === 0) {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            url: item.imageUrl,
            altText: `${item.name} cover`,
            isPrimary: true,
            displayOrder: 0,
          },
        });
      } else if (item.imageUrl && images[0].url !== item.imageUrl) {
        await prisma.productImage.update({ where: { id: images[0].id }, data: { url: item.imageUrl } });
      }
      upserted++;
    }
    console.log(`  Upserted ${upserted} products`);

    // Move any leftover products off obsolete categories, then delete empties
    const keep = new Set(catalog.categories.map((c: any) => c.slug));
    const fallbackId = categoryIdBySlug.get('injectable')!;
    const allCats = await prisma.category.findMany();
    for (const cat of allCats) {
      if (keep.has(cat.slug)) continue;
      await prisma.product.updateMany({ where: { categoryId: cat.id }, data: { categoryId: fallbackId } });
      await prisma.category.delete({ where: { id: cat.id } });
      console.log(`  Removed obsolete category ${cat.slug}`);
    }
  } catch (err: any) {
    console.log(`Database sync skipped: ${err.message}`);
  }

  console.log('\nRegenerating initialData.ts...');
  execSync('npx tsx scripts/update-initial-data.ts', { cwd: projectRoot, stdio: 'inherit' });
  console.log('\nDone.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
