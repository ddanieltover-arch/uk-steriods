import { scoreSearchRelevance, normalizeSearchQuery, escapeIlike } from '../src/lib/search/ranking';
import { SeoService } from '../src/lib/services/seo.service';
import { canonicalPathFor, shouldNoIndexPath, sanitizeMetaText } from '../src/lib/seo/site';
import { productJsonLd, breadcrumbJsonLd, collectionPageJsonLd } from '../src/lib/seo/structured-data';
import { injectCrawlableBody } from '../src/lib/seo/crawlable-content';
import { ANSWER_CAPSULES } from '../src/lib/seo/answer-capsules';

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
  assert(robots.includes('User-agent: GPTBot'), 'robots allows GPTBot');
  assert(robots.includes('User-agent: ClaudeBot'), 'robots allows ClaudeBot');
  assert(robots.includes('User-agent: PerplexityBot'), 'robots allows PerplexityBot');

  const llms = SeoService.getLlmsTxt();
  assert(llms.includes('# Steroids UK'), 'llms.txt has brand header');
  assert(llms.includes('/sitemap.xml'), 'llms.txt references sitemap');

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

  const collection = collectionPageJsonLd({
    name: 'Injectables',
    description: 'Browse injectables.',
    path: '/category/injectable',
    items: [{ name: 'Test E', slug: 'test-e' }],
  });
  assert(collection['@type'] === 'CollectionPage', 'collection JSON-LD type');
  assert((collection.mainEntity as any)['@type'] === 'ItemList', 'collection has ItemList');

  const html = SeoService.injectIntoHtml(
    '<html><head><title>Old</title></head><body></body></html>',
    SeoService.homepageSeo()
  );
  assert(html.includes('<title>'), 'homepage injects title');
  assert(html.includes('meta name="description"'), 'homepage injects description');
  assert(html.includes('rel="canonical"'), 'homepage injects canonical');
  assert(html.includes('data-seo-jsonld="ssr"'), 'SSR JSON-LD is tagged for client dedupe');

  const truncated = sanitizeMetaText('a'.repeat(400), 160);
  assert(truncated.length <= 160, 'meta description is truncated');

  assert(ANSWER_CAPSULES['/'].length >= 40, 'homepage answer capsule has substance');
  assert(ANSWER_CAPSULES['/faq'].length >= 40, 'FAQ hub answer capsule has substance');

  const faqSeo = SeoService.resourceSeo('/faq');
  assert(!!faqSeo, 'FAQ hub resource SEO exists');
  assert(faqSeo!.canonical.endsWith('/faq'), 'FAQ hub canonical path');
  assert(faqSeo!.jsonLd.some((b) => b['@type'] === 'FAQPage'), 'FAQ hub includes FAQPage JSON-LD');

  const withBody = injectCrawlableBody(
    '<html><body><div id="root"></div></body></html>',
    '<main id="ssr-fallback"><h1>Test</h1></main>'
  );
  assert(withBody.includes('<h1>Test</h1>'), 'crawlable body injects into root');
  assert(withBody.includes('id="ssr-fallback"'), 'crawlable body preserves fallback marker');
  assert(withBody.includes('id="ssr-crawl"'), 'crawlable body uses visually hidden crawl node');
  assert(withBody.includes('<div id="root"></div>'), 'React root stays empty for hydration');
}

try {
  runSearchTests();
  runSeoTests();
  console.log('\nAll Phase 11 search/SEO unit tests passed.');
} catch (err) {
  console.error(err);
  process.exit(1);
}
