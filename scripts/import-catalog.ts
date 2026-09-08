import { PrismaClient, StockStatus } from '@prisma/client';
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

const prisma = new PrismaClient();

const TARGET_BRANDS = [
  { name: 'Pharmaqo Labs', slug: 'pharmaqo-labs', keys: ['pharmaqo'] },
  { name: 'Proper Labs', slug: 'proper-labs', keys: ['proper'] },
  { name: 'Viogen Labs', slug: 'viogen-labs', keys: ['viogen'] },
  { name: 'Intex Pharma', slug: 'intex-pharma', keys: ['intex'] },
  { name: 'Hilma Biocare', slug: 'hilma-biocare', keys: ['hilma'] },
];

const DEFAULT_CATEGORIES = [
  { name: 'Injectable', slug: 'injectable', description: 'Injectable anabolic steroids' },
  { name: 'Oral', slug: 'oral', description: 'Oral steroid tablets and capsules' },
  { name: 'SARMs', slug: 'sarms', description: 'Selective Androgen Receptor Modulators' },
  { name: 'PCT', slug: 'pct', description: 'Post Cycle Therapy' },
  { name: 'Peptides', slug: 'peptides', description: 'Research peptides' },
  { name: 'HGH', slug: 'hgh', description: 'Human growth hormone' },
  { name: 'ED Meds', slug: 'ed-meds', description: 'Erectile dysfunction medication' },
  { name: 'Viagra', slug: 'viagra', description: 'Viagra tablets' },
  { name: 'Kamagra', slug: 'kamagra', description: 'Kamagra products' },
  { name: 'Fat Loss', slug: 'fat-loss', description: 'Fat burners and cutting aids' },
  { name: 'Accessories', slug: 'accessories', description: 'Needles, syringes and injection supplies' },
];

async function fetchPage(pathUrl: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve) => {
    const options = {
      hostname: 'steroids-uk.com',
      path: pathUrl,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode || 500, body: data }));
    });
    req.on('error', () => resolve({ status: 500, body: '' }));
    req.end();
  });
}

function fetchBinary(urlStr: string, redirects = 0): Promise<{ status: number; body: Buffer; contentType: string }> {
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
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          Accept: 'image/webp,image/*,*/*;q=0.8',
        },
      },
      (res) => {
        const loc = res.headers.location;
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && loc) {
          const next = loc.startsWith('http') ? loc : `${url.protocol}//${url.host}${loc}`;
          res.resume();
          fetchBinary(next, redirects + 1).then(resolve);
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

async function downloadProductImage(remoteUrl: string, slug: string): Promise<string> {
  if (!remoteUrl.startsWith('http')) return remoteUrl;

  const res = await fetchBinary(remoteUrl);
  if (res.status !== 200 || res.body.length < 200) return remoteUrl;

  fs.mkdirSync(productImageDir, { recursive: true });
  const ext = extFromUrl(remoteUrl, res.contentType);
  const filename = `${slug}${ext}`;
  fs.writeFileSync(path.join(productImageDir, filename), res.body);
  return `/media/products/${filename}`;
}

async function downloadBrandLogo(remoteUrl: string, slug: string): Promise<string> {
  if (!remoteUrl.startsWith('http')) return remoteUrl;

  const res = await fetchBinary(remoteUrl);
  if (res.status !== 200 || res.body.length < 200) return remoteUrl;

  fs.mkdirSync(brandLogoDir, { recursive: true });
  const ext = extFromUrl(remoteUrl, res.contentType);
  const filename = `${slug}${ext}`;
  fs.writeFileSync(path.join(brandLogoDir, filename), res.body);
  return `/media/brands/${filename}`;
}

function detectCategorySlug(title: string, description: string, breadcrumbs: string[]): string {
  const lower = (title + ' ' + description + ' ' + breadcrumbs.join(' ')).toLowerCase();

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
  console.log('  UK STEROIDS CATALOG SCRAPER & SEEDER');
  console.log('  Target Brands: Pharmaqo, Proper, Viogen, Intex, Hilma');
  console.log('==========================================\n');

  // Fetch Sitemap
  console.log('1. Fetching catalog sitemap from steroids-uk.com...');
  const sitemapRes = await fetchPage('/sitemap.xml');
  const locMatches = sitemapRes.body.match(/<loc>(.*?)<\/loc>/g) || [];
  const urls = locMatches.map(m => m.replace(/<\/?loc>/g, ''));
  const productUrls = urls.filter(u => u.includes('/shop/') && u !== 'https://steroids-uk.com/shop/' && !u.includes('/shop/contact/'));

  console.log(`   Found ${productUrls.length} total product URLs.`);

  const scrapedProducts: any[] = [];
  const brandStats: Record<string, number> = {};

  console.log('\n2. Extracting product metadata for target brands...');
  const batchSize = 10;
  for (let i = 0; i < productUrls.length; i += batchSize) {
    const batch = productUrls.slice(i, i + batchSize);
    await Promise.all(batch.map(async (fullUrl) => {
      const pagePath = fullUrl.replace('https://steroids-uk.com', '');
      const res = await fetchPage(pagePath);
      if (!res.body) return;

      let productName = '';
      let description = '';
      let sku = '';
      let imageUrl = '';
      let brandName = '';
      let pricePence = 0;
      let breadcrumbs: string[] = [];

      const jsonLdMatch = res.body.match(/<script type="application\/ld\+json">(.*?)<\/script>/gs);
      if (jsonLdMatch) {
        for (const block of jsonLdMatch) {
          const content = block.replace(/<\/?script.*?>/g, '');
          try {
            const parsed = JSON.parse(content);
            if (parsed['@type'] === 'Product') {
              productName = parsed.name || '';
              description = parsed.description || '';
              sku = parsed.sku || '';
              imageUrl = parsed.image || '';
              brandName = parsed.brand?.name || '';
              if (parsed.offers?.price) {
                pricePence = Math.round(parseFloat(parsed.offers.price) * 100);
              }
            } else if (parsed['@type'] === 'BreadcrumbList' && parsed.itemListElement) {
              breadcrumbs = parsed.itemListElement.map((item: any) => item.name || '');
            }
          } catch (e) {}
        }
      }

      const matchedBrandObj = TARGET_BRANDS.find(tb => 
        tb.keys.some(k => 
          brandName.toLowerCase().includes(k) || 
          productName.toLowerCase().includes(k) || 
          pagePath.toLowerCase().includes(k)
        )
      );

      if (!matchedBrandObj) return;

      const slug = pagePath.replace('/shop/', '').replace(/\//g, '') || `product-${Date.now()}`;
      const finalSku = sku || `${matchedBrandObj.slug.toUpperCase()}-${slug.slice(0, 15).toUpperCase()}`;
      const catSlug = detectCategorySlug(productName, description, breadcrumbs);

      let finalImgUrl = imageUrl;
      if (finalImgUrl && !finalImgUrl.startsWith('http')) {
        finalImgUrl = `https://steroids-uk.com${finalImgUrl}`;
      }
      if (!finalImgUrl) {
        finalImgUrl = `https://steroids-uk.com/og-default.jpg`;
      }

      const cleanShortDesc = description.replace(/<[^>]*>/g, '').slice(0, 200) || `${productName} by ${matchedBrandObj.name}`;
      const cleanFullDesc = description || `<p>${productName} by ${matchedBrandObj.name}. Lab-tested product.</p>`;

      brandStats[matchedBrandObj.name] = (brandStats[matchedBrandObj.name] || 0) + 1;

      scrapedProducts.push({
        name: productName,
        slug,
        sku: finalSku,
        brandName: matchedBrandObj.name,
        brandSlug: matchedBrandObj.slug,
        categorySlug: catSlug,
        shortDescription: cleanShortDesc,
        description: cleanFullDesc,
        pricePence: pricePence || 2999,
        imageUrl: finalImgUrl,
      });
    }));
    process.stdout.write(`   Processed ${Math.min(i + batchSize, productUrls.length)} / ${productUrls.length}...\r`);
  }

  console.log(`\n\n3. Extraction Summary:`);
  console.log(`   Total Target Products Scraped: ${scrapedProducts.length}`);
  console.log(JSON.stringify(brandStats, null, 2));

  console.log('\n3b. Downloading product images locally...');
  for (let i = 0; i < scrapedProducts.length; i++) {
    const item = scrapedProducts[i];
    item.imageUrl = await downloadProductImage(item.imageUrl, item.slug);
    process.stdout.write(`   Downloaded ${i + 1} / ${scrapedProducts.length}...\r`);
  }
  console.log(`\n   Saved images to public/media/products/`);

  // Save to prisma/seed-catalog.json
  const catalogPayload = {
    brands: TARGET_BRANDS,
    categories: DEFAULT_CATEGORIES,
    products: scrapedProducts,
  };

  const seedJsonPath = path.join(projectRoot, 'prisma', 'seed-catalog.json');
  fs.writeFileSync(seedJsonPath, JSON.stringify(catalogPayload, null, 2));
  console.log(`\n4. Saved JSON dataset to: ${seedJsonPath}`);

  // Attempt database sync if PostgreSQL is online
  console.log('\n5. Attempting Database Seed via Prisma...');
  try {
    const brandIdMap: Record<string, string> = {};
    for (const b of TARGET_BRANDS) {
      const logoUrl = await downloadBrandLogo(
        `https://steroids-uk.com/logos/brands/${b.slug}.webp`,
        b.slug
      );
      const dbBrand = await prisma.brand.upsert({
        where: { slug: b.slug },
        update: { name: b.name, logoUrl },
        create: {
          name: b.name,
          slug: b.slug,
          description: `${b.name} lab-tested anabolic products`,
          logoUrl,
          isFeatured: true,
        }
      });
      brandIdMap[b.name] = dbBrand.id;
    }

    const categoryIdMap: Record<string, string> = {};
    for (const c of DEFAULT_CATEGORIES) {
      const dbCat = await prisma.category.upsert({
        where: { slug: c.slug },
        update: { name: c.name },
        create: {
          name: c.name,
          slug: c.slug,
          description: c.description,
          imageUrl: `/assets/categories/${c.slug}.jpg`,
        }
      });
      categoryIdMap[c.slug] = dbCat.id;
    }

    let inserted = 0;
    for (const item of scrapedProducts) {
      const bId = brandIdMap[item.brandName];
      const cId = categoryIdMap[item.categorySlug] || categoryIdMap['injectable-steroids'];

      const p = await prisma.product.upsert({
        where: { slug: item.slug },
        update: {
          name: item.name,
          sku: item.sku,
          description: item.description,
          shortDescription: item.shortDescription,
          basePricePence: item.pricePence,
          brandId: bId,
          categoryId: cId,
          isPublished: true,
        },
        create: {
          name: item.name,
          slug: item.slug,
          sku: item.sku,
          description: item.description,
          shortDescription: item.shortDescription,
          basePricePence: item.pricePence,
          brandId: bId,
          categoryId: cId,
          isPublished: true,
          isFeatured: inserted % 6 === 0,
        }
      });

      await prisma.productImage.deleteMany({ where: { productId: p.id } });
      await prisma.productImage.create({
        data: {
          productId: p.id,
          url: item.imageUrl,
          altText: `${p.name} cover`,
          isPrimary: true,
          displayOrder: 0,
        }
      });

      await prisma.productInventory.upsert({
        where: { productId: p.id },
        update: { quantity: 100, stockStatus: StockStatus.IN_STOCK },
        create: {
          productId: p.id,
          quantity: 100,
          stockStatus: StockStatus.IN_STOCK,
          availableQuantity: 100,
        }
      });

      inserted++;
    }

    console.log(`   SUCCESS! Seeded ${inserted} products into PostgreSQL.`);
  } catch (err: any) {
    console.log(`   [NOTICE] Database offline or unreachable: ${err.message}`);
    console.log(`   All ${scrapedProducts.length} target products are saved in prisma/seed-catalog.json for instant seeding when DB is started.`);
  }

  console.log('\n==========================================');
  console.log('  CATALOG UPDATE COMPLETED');
  console.log('==========================================');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
