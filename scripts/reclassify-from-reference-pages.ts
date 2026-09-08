/**
 * Re-assign product categories using ONLY which reference category pages
 * list each product (ignores tangential tags like needs-needles).
 */
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const seedJsonPath = path.join(projectRoot, 'prisma', 'seed-catalog.json');
const prisma = new PrismaClient();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const REFERENCE_CATEGORIES = [
  { name: 'Injectable', slug: 'injectable', sourcePath: '/product-category/injectable/' },
  { name: 'Oral', slug: 'oral', sourcePath: '/product-category/oral/' },
  { name: 'SARMs', slug: 'sarms', sourcePath: '/product-category/sarms/' },
  { name: 'PCT', slug: 'pct', sourcePath: '/product-category/pct/' },
  { name: 'Peptides', slug: 'peptides', sourcePath: '/product-category/peptides/' },
  { name: 'HGH', slug: 'hgh', sourcePath: '/product-category/growth-hormone/' },
  { name: 'ED Meds', slug: 'ed-meds', sourcePath: '/product-category/ed-meds/' },
  { name: 'Viagra', slug: 'viagra', sourcePath: '/product-category/viagra/' },
  { name: 'Kamagra', slug: 'kamagra', sourcePath: '/product-category/kamagra/' },
  { name: 'Fat Loss', slug: 'fat-loss', sourcePath: '/product-category/fat-loss/' },
  {
    name: 'Accessories',
    slug: 'accessories',
    sourcePath: '/product-category/needles-syringes/',
    extra: ['/product-category/injection-stuff-water/'],
  },
] as const;

/** Prefer specific medical chips over broad form chips; accessories last. */
const PRIORITY: Record<string, number> = {
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
  accessories: 10,
};

function fetchPage(pathUrl: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve) => {
    const req = https.request(
      {
        hostname: 'steroids-uk.com',
        path: pathUrl,
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0' },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const loc = res.headers.location;
          const next = loc.startsWith('http') ? new URL(loc).pathname + new URL(loc).search : loc;
          res.resume();
          fetchPage(next).then(resolve);
          return;
        }
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve({ status: res.statusCode || 500, body: d }));
      }
    );
    req.on('error', () => resolve({ status: 500, body: '' }));
    req.end();
  });
}

function extractNuxt(html: string): any[] | null {
  const i = html.indexOf('id="__NUXT_DATA__"');
  if (i < 0) return null;
  const s = html.indexOf('>', i) + 1;
  const e = html.indexOf('</script>', s);
  try {
    return JSON.parse(html.slice(s, e));
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
      const r = resolve(data[node], depth + 1);
      cache.set(node, r);
      return r;
    }
    if (Array.isArray(node)) {
      const t = node[0];
      if (t === 'Reactive' || t === 'ShallowReactive' || t === 'Ref') return resolve(node[1], depth + 1);
      return node.map((x) => resolve(x, depth + 1));
    }
    if (node && typeof node === 'object') {
      const o: any = {};
      for (const [k, v] of Object.entries(node)) o[k] = resolve(v, depth + 1);
      return o;
    }
    return node;
  }
  return resolve;
}

async function scrapePath(pathUrl: string, chip: string): Promise<Map<string, Set<string>>> {
  const membership = new Map<string, Set<string>>();
  let page = 1;
  let hasNext = true;
  while (hasNext && page <= 20) {
    const sep = pathUrl.includes('?') ? '&' : '?';
    const res = await fetchPage(`${pathUrl}${sep}page=${page}`);
    if (res.status !== 200) break;
    const data = extractNuxt(res.body);
    if (!data) break;
    const resolve = createResolver(data);
    const root = resolve(data[1] ?? data[0]);
    const bag = root?.data || {};
    let products: any[] = [];
    let next = false;
    for (const [k, v] of Object.entries(bag)) {
      if (k.startsWith('category-') && v && Array.isArray((v as any).products)) {
        products = (v as any).products;
        next = Boolean((v as any).hasNext);
        break;
      }
    }
    for (const p of products) {
      if (!p?.slug) continue;
      if (!membership.has(p.slug)) membership.set(p.slug, new Set());
      membership.get(p.slug)!.add(chip);
    }
    hasNext = next && products.length > 0;
    page += 1;
    await sleep(250);
  }
  return membership;
}

function pick(cands: Set<string>): string {
  return [...cands].sort((a, b) => (PRIORITY[b] || 0) - (PRIORITY[a] || 0))[0] || 'injectable';
}

async function main() {
  const all = new Map<string, Set<string>>();
  for (const cat of REFERENCE_CATEGORIES) {
    const paths = [cat.sourcePath, ...((cat as any).extra || [])];
    for (const p of paths) {
      console.log(`Scraping ${cat.slug}: ${p}`);
      const m = await scrapePath(p, cat.slug);
      console.log(`  → ${m.size} products`);
      for (const [slug, set] of m) {
        if (!all.has(slug)) all.set(slug, new Set());
        for (const c of set) all.get(slug)!.add(c);
      }
    }
  }

  const catalog = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
  catalog.categories = REFERENCE_CATEGORIES.map(({ name, slug }) => ({
    name,
    slug,
    description: name,
  }));

  let changed = 0;
  for (const p of catalog.products) {
    const chips = all.get(p.slug);
    if (!chips) continue;
    const next = pick(chips);
    if (p.categorySlug !== next) {
      p.categorySlug = next;
      changed++;
    }
  }

  const counts: Record<string, number> = {};
  for (const p of catalog.products) counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
  console.log(`\nReassigned: ${changed}`);
  for (const cat of REFERENCE_CATEGORIES) console.log(`  ${cat.name}: ${counts[cat.slug] || 0}`);
  console.log(`  TOTAL: ${catalog.products.length}`);

  fs.writeFileSync(seedJsonPath, JSON.stringify(catalog, null, 2));

  await prisma.$connect();
  const bySlug = new Map<string, string>();
  for (const cat of REFERENCE_CATEGORIES) {
    const row = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug, description: cat.name },
    });
    bySlug.set(cat.slug, row.id);
  }

  let upd = 0;
  for (const p of catalog.products) {
    const cid = bySlug.get(p.categorySlug);
    if (!cid) continue;
    const r = await prisma.product.updateMany({ where: { slug: p.slug }, data: { categoryId: cid } });
    upd += r.count;
  }
  console.log(`DB products updated: ${upd}`);
  await prisma.$disconnect();

  execSync('npx tsx scripts/update-initial-data.ts', { cwd: projectRoot, stdio: 'inherit' });
  console.log('Done.');
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
