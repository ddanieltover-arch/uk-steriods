import { scoreSearchRelevance, normalizeSearchQuery, escapeIlike } from '../src/lib/search/ranking';
import { SeoService } from '../src/lib/services/seo.service';
import {
  canonicalPathFor,
  shouldNoIndexPath,
  sanitizeMetaText,
  shopQueryShouldNoIndex,
  normalizeSiteOrigin,
} from '../src/lib/seo/site';
import {
  productJsonLd,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  definedTermSetJsonLd,
} from '../src/lib/seo/structured-data';
import { injectCrawlableBody } from '../src/lib/seo/crawlable-content';
import { ANSWER_CAPSULES } from '../src/lib/seo/answer-capsules';
import { enrichCategoryDescription } from '../src/lib/seo/category-copy';
import {
  enrichProductSeoTitle,
  enrichProductShortDescription,
  productSeoFor,
} from '../src/lib/seo/product-copy';
import { shopQuerySurface } from '../src/lib/seo/shop-query-copy';
import { DEFAULT_DESCRIPTION, SITE_TAGLINE } from '../src/lib/seo/site';
import { RELATED_SEARCHES } from '../src/data/homepage';
import { GLOSSARY_TERMS } from '../src/lib/seo/glossary';
import { GEO_GUIDES, getGeoGuide } from '../src/lib/seo/geo-guides';
import { SUPPORT_EMAIL } from '../src/data/resources';
import { articleJsonLd } from '../src/lib/seo/structured-data';

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
  assert(robots.includes('Allow: /faq'), 'robots allows FAQ');
  assert(robots.includes('Allow: /glossary'), 'robots allows glossary');
  assert(robots.includes('Disallow: /brands'), 'robots disallows legacy /brands');
  assert(robots.includes('Disallow: /shop?*page='), 'robots disallows paginated shop');
  assert(robots.includes('User-agent: GPTBot'), 'robots allows GPTBot');
  assert(robots.includes('User-agent: ClaudeBot'), 'robots allows ClaudeBot');
  assert(robots.includes('User-agent: PerplexityBot'), 'robots allows PerplexityBot');

  const llms = SeoService.getLlmsTxt();
  assert(llms.includes('# Steroids UK'), 'llms.txt has brand header');
  assert(llms.includes('/sitemap.xml'), 'llms.txt references sitemap');
  assert(llms.includes('/glossary'), 'llms.txt lists glossary');
  assert(llms.includes(SUPPORT_EMAIL), 'llms.txt uses canonical support email');

  assert(shouldNoIndexPath('/admin'), 'admin is noindex');
  assert(shouldNoIndexPath('/account/orders'), 'account orders are noindex');
  assert(shouldNoIndexPath('/cart'), 'cart is noindex');
  assert(shouldNoIndexPath('/checkout/success/abc'), 'checkout success is noindex');
  assert(!shouldNoIndexPath('/product/example'), 'product is indexable');
  assert(!shouldNoIndexPath('/shop'), 'shop is indexable');

  assert(canonicalPathFor('/shop', 'sort=price_asc&brand=x') === '/shop', 'filter URLs canonicalize to /shop');
  assert(canonicalPathFor('/product/example-product', 'ref=ad') === '/product/example-product', 'product canonical ignores query');
  assert(canonicalPathFor('/shop', 'q=protein').includes('q=protein'), 'search term remains shareable');

  assert(shopQueryShouldNoIndex({ search: 'test' }), 'search is noindex');
  assert(shopQueryShouldNoIndex({ page: 2 }), 'pagination is noindex');
  assert(shopQueryShouldNoIndex({ sort: 'price_asc' }), 'non-default sort is noindex');
  assert(shopQueryShouldNoIndex({ minPrice: 50 }), 'price filter is noindex');
  assert(!shopQueryShouldNoIndex({ sort: 'featured', page: 1 }), 'clean shop remains indexable');

  assert(
    normalizeSiteOrigin('https://uk-steroids.co.uk') === 'https://www.uk-steroids.co.uk',
    'apex origin normalizes to www'
  );

  assert(
    enrichCategoryDescription('pct', 'PCT', 'PCT').includes('Post-cycle'),
    'thin category descriptions are enriched'
  );
  assert(
    enrichProductShortDescription('testosterone-cypionate-proper-labs', 'A'.repeat(200))
      .toLowerCase()
      .includes('testosterone cypionate'),
    'PDP keyword copy wins over long DB descriptions'
  );
  assert(
    enrichCategoryDescription('pct', 'PCT', 'A long custom DB description that would previously hide keywords').includes(
      'Clomid'
    ),
    'category keyword copy is always visible when curated'
  );
  assert(!!shopQuerySurface('anavar')?.description.toLowerCase().includes('anavar for sale'), 'shop query anavar surface exists');
  assert(
    enrichProductSeoTitle('testosterone-cypionate-proper-labs', 'Test Cyp', null)
      .toLowerCase()
      .includes('testosterone cypionate'),
    'product SEO title enrichment uses competitor keyword'
  );
  assert(
    (productSeoFor('shopkamagra-jelly')?.relatedLinks.length || 0) >= 2,
    'priority PDPs expose related keyword links'
  );
  assert(RELATED_SEARCHES.length <= 6, 'homepage related searches stay few');
  assert(RELATED_SEARCHES.some((l) => /testosterone/i.test(l.label)), 'related searches include testosterone');
  assert(RELATED_SEARCHES.some((l) => /sarms/i.test(l.label)), 'related searches include UK SARMs');
  assert(RELATED_SEARCHES.some((l) => /dianabol/i.test(l.label)), 'related searches include Dianabol gap term');
  assert(
    (productSeoFor('dianabol25-proper-labs')?.seoTitle || '').toLowerCase().includes('dianabol for sale'),
    'Dianabol PDP targets dianabol for sale gap'
  );
  assert(
    (productSeoFor('primobolan-proper-labs')?.relatedLinks.length || 0) >= 2,
    'Primobolan PDP exposes related keyword links'
  );
  assert(
    enrichCategoryDescription('injectable', 'Injectable', 'Injectable').toLowerCase().includes('sustanon'),
    'injectable category copy includes Sustanon gap term'
  );
  assert(/buy steroids uk/i.test(DEFAULT_DESCRIPTION), 'default meta targets buy steroids uk');
  assert(/uk steroid shop/i.test(SITE_TAGLINE), 'site tagline includes uk steroid shop');
  assert(
    GLOSSARY_TERMS.some((t) => t.slug === 'testosterone-base'),
    'glossary covers testosterone base entity'
  );
  assert(GLOSSARY_TERMS.some((t) => t.slug === 'bpc-157'), 'glossary covers BPC-157 from desktop batch');
  assert(
    enrichCategoryDescription('sarms', 'SARMs', 'SARMs').toLowerCase().includes('uk sarms'),
    'SARMs category copy includes uk sarms keyword'
  );
  assert(
    enrichCategoryDescription('peptides', 'Peptides', 'Peptides').toLowerCase().includes('bpc 157'),
    'peptides category copy includes bpc 157 uk'
  );
  assert(
    (productSeoFor('bpc-157-pharmaqo-labs-5mg')?.relatedLinks.length || 0) >= 2,
    'BPC 157 PDP exposes related keyword links'
  );
  assert(ANSWER_CAPSULES['/']?.toLowerCase().includes('buy steroids uk'), 'homepage capsule uses buy steroids uk');

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
  assert(ANSWER_CAPSULES['/glossary'].length >= 40, 'glossary answer capsule has substance');
  assert(ANSWER_CAPSULES['/oral-vs-injectable'].length >= 40, 'oral vs injectable capsule has substance');
  assert(ANSWER_CAPSULES['/sarms-vs-steroids'].length >= 40, 'SARMs vs steroids capsule has substance');
  assert(ANSWER_CAPSULES['/what-is-pct'].length >= 40, 'PCT pillar capsule has substance');

  const faqSeo = SeoService.resourceSeo('/faq');
  assert(!!faqSeo, 'FAQ hub resource SEO exists');
  assert(faqSeo!.canonical.endsWith('/faq'), 'FAQ hub canonical path');
  assert(faqSeo!.jsonLd.some((b) => b['@type'] === 'FAQPage'), 'FAQ hub includes FAQPage JSON-LD');

  const glossarySeo = SeoService.resourceSeo('/glossary');
  assert(!!glossarySeo, 'glossary resource SEO exists');
  assert(glossarySeo!.canonical.endsWith('/glossary'), 'glossary canonical path');
  assert(
    glossarySeo!.jsonLd.some((b) => b['@type'] === 'DefinedTermSet'),
    'glossary includes DefinedTermSet JSON-LD'
  );

  for (const path of Object.keys(GEO_GUIDES)) {
    const guide = getGeoGuide(path)!;
    const seo = SeoService.resourceSeo(path);
    assert(!!seo, `${path} resource SEO exists`);
    assert(seo!.jsonLd.some((b) => b['@type'] === 'Article'), `${path} has Article JSON-LD`);
    assert(seo!.jsonLd.some((b) => b['@type'] === 'FAQPage'), `${path} has FAQPage JSON-LD`);
    assert(guide.sections.length >= 4, `${path} has substantial sections`);
    assert(guide.faqs.length >= 3, `${path} has FAQ set`);
    const wordEstimate = guide.sections.reduce(
      (n, s) => n + s.paragraphs.join(' ').split(/\s+/).length,
      0
    );
    assert(wordEstimate >= 400, `${path} body copy is substantial (${wordEstimate} words)`);
  }

  const pctSeo = SeoService.resourceSeo('/what-is-pct');
  assert(pctSeo!.jsonLd.some((b) => b['@type'] === 'HowTo'), 'PCT guide includes shopping HowTo');

  const article = articleJsonLd({
    title: 'Test',
    description: 'Desc',
    path: '/oral-vs-injectable',
    datePublished: '2026-09-13',
  });
  assert(article['@type'] === 'Article', 'article JSON-LD type');

  const terms = definedTermSetJsonLd({
    name: 'Glossary',
    description: 'Test',
    path: '/glossary',
    terms: GLOSSARY_TERMS.slice(0, 2),
  });
  assert((terms.hasDefinedTerm as unknown[]).length === 2, 'DefinedTermSet lists terms');

  const withBody = injectCrawlableBody(
    '<html><body><div id="root"></div></body></html>',
    '<main id="ssr-fallback"><h1>Test</h1></main>'
  );
  assert(withBody.includes('<h1>Test</h1>'), 'crawlable body injects into root');
  assert(withBody.includes('id="ssr-fallback"'), 'crawlable body preserves fallback marker');
}

try {
  runSearchTests();
  runSeoTests();
  console.log('\nAll Phase 11 search/SEO unit tests passed.');
} catch (err) {
  console.error(err);
  process.exit(1);
}
