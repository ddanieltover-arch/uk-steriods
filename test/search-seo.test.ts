import { scoreSearchRelevance, normalizeSearchQuery, escapeIlike } from '../src/lib/search/ranking';
import { SeoService } from '../src/lib/services/seo.service';
import { canonicalPathFor, shouldNoIndexPath, sanitizeMetaText } from '../src/lib/seo/site';
import { productJsonLd, breadcrumbJsonLd } from '../src/lib/seo/structured-data';

function assert(condition: boolean, description: string) {
  if (!condition) {
    throw new Error(`FAIL: ${description}`);
  }
  console.log(`  ✅ ${description}`);
}

function runSearchTests() {
  console.log('Search ranking tests');
  const product = {
    sku: 'NS-PEAK-01',
    name: 'Northstar Peak Endurance',
    brandName: 'Northstar',
    categoryName: 'Endurance',
    tags: ['electrolytes', 'endurance'],
    shortDescription: 'Daily endurance blend',
    description: 'A protein-free electrolyte complex for long sessions.',
  };

  assert(scoreSearchRelevance('NS-PEAK-01', product) === 1000, 'exact SKU ranks 1000');
  assert(scoreSearchRelevance('Northstar Peak Endurance', product) >= 900, 'exact name ranks 900+');
  assert(scoreSearchRelevance('northstar peak', product) >= 700, 'token match ranks 700+');
  assert(scoreSearchRelevance('Northstar', product) >= 600, 'brand match ranks 600+');
  assert(scoreSearchRelevance('Endurance', product) >= 500, 'category match ranks 500+');
  assert(scoreSearchRelevance('electrolytes', product) >= 400, 'tag match ranks 400+');
  assert(scoreSearchRelevance('protein-free', product) >= 300, 'description match ranks 300+');
  assert(scoreSearchRelevance('xyzzy-unpublished', product) === 0, 'unrelated query scores 0');
  assert(scoreSearchRelevance('NS-PEAK-01', product) > scoreSearchRelevance('electrolytes', product), 'SKU beats tags');
  assert(normalizeSearchQuery('  whey   isolate  ').length < 20, 'query is normalized');
  assert(escapeIlike('100% whey_iso').includes('\\%'), 'ILIKE special characters are escaped');
  assert(scoreSearchRelevance('NORTHSTAR PEAK ENDURANCE', product) >= 900, 'mixed case exact name still matches');
}

function runSeoTests() {
  console.log('SEO tests');
  const robots = SeoService.getRobotsTxt();
  assert(robots.includes('Disallow: /admin'), 'robots disallows admin');
  assert(robots.includes('Disallow: /account'), 'robots disallows account');
  assert(robots.includes('Disallow: /cart'), 'robots disallows cart');
  assert(robots.includes('Disallow: /checkout'), 'robots disallows checkout');
  assert(robots.includes('Disallow: /track-order'), 'robots disallows tracking');
  assert(robots.includes('Allow: /product/'), 'robots allows products');
  assert(robots.includes('Allow: /blog'), 'robots allows blog');
  assert(robots.includes('Sitemap:'), 'robots includes sitemap');

  assert(shouldNoIndexPath('/admin'), 'admin is noindex');
  assert(shouldNoIndexPath('/account/orders'), 'account orders are noindex');
  assert(shouldNoIndexPath('/cart'), 'cart is noindex');
  assert(shouldNoIndexPath('/checkout/success/abc'), 'checkout success is noindex');
  assert(!shouldNoIndexPath('/product/example'), 'product is indexable');
  assert(!shouldNoIndexPath('/shop'), 'shop is indexable');

  assert(canonicalPathFor('/shop', 'sort=price_asc&brand=x') === '/shop', 'filter URLs canonicalize to /shop');
  assert(canonicalPathFor('/product/example-product', 'ref=ad') === '/product/example-product', 'product canonical ignores query');
  assert(canonicalPathFor('/shop', 'q=protein').includes('q=protein'), 'search term remains shareable');

  const json = productJsonLd({
    name: 'Demo Isolate',
    description: 'A demo protein isolate.',
    images: ['https://example.com/a.jpg'],
    sku: 'DEMO-1',
    brandName: 'Northstar',
    priceGbp: 29.99,
    availability: true,
    slug: 'demo-isolate',
  });
  assert(json['@type'] === 'Product', 'product JSON-LD type');
  assert(!(json as any).aggregateRating, 'does not invent ratings');
  assert(!JSON.stringify(json).includes('password'), 'no credentials in JSON-LD');

  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Demo Isolate', path: '/product/demo-isolate' },
  ]);
  assert((crumbs.itemListElement as any[]).length === 3, 'breadcrumb has 3 items');

  const html = SeoService.injectIntoHtml(
    '<html><head><title>Old</title></head><body></body></html>',
    SeoService.homepageSeo()
  );
  assert(html.includes('<title>'), 'homepage injects title');
  assert(html.includes('meta name="description"'), 'homepage injects description');
  assert(html.includes('rel="canonical"'), 'homepage injects canonical');

  const truncated = sanitizeMetaText('a'.repeat(400), 160);
  assert(truncated.length <= 160, 'meta description is truncated');
}

try {
  runSearchTests();
  runSeoTests();
  console.log('\nAll Phase 11 search/SEO unit tests passed.');
} catch (err) {
  console.error(err);
  process.exit(1);
}
