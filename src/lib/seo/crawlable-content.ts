import { db } from '../db';
import { BlogService } from '../services/blog.service';
import { CatalogueApiService } from '../services/catalogue-api.service';
import { SUPPORT_EMAIL } from '../../data/resources';
import { answerCapsuleFor } from './answer-capsules';
import { RESOURCE_PAGE_SEO } from './resources';
import { FAQ_HUB_PATH, flatFaqHubItems } from './faq-hub';
import { GLOSSARY_PATH, GLOSSARY_TERMS } from './glossary';
import { getGeoGuide } from './geo-guides';
import { enrichCategoryDescription, categoryAnswerCapsule } from './category-copy';
import { DEFAULT_DESCRIPTION, SITE_NAME, sanitizeMetaText } from './site';
import { RELATED_SEARCHES } from '../../data/homepage';
import {
  enrichProductDescription,
  enrichProductShortDescription,
  productSeoFor,
} from './product-copy';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function answerSection(pathname: string, custom?: string): string {
  const text = custom || answerCapsuleFor(pathname);
  if (!text) return '';
  return `<section id="answer" aria-label="Quick Answer"><p><strong>Quick Answer:</strong> ${escapeHtml(text)}</p></section>`;
}

function navLinks(links: { href: string; label: string }[]): string {
  if (!links.length) return '';
  const items = links.map((l) => `<li><a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a></li>`).join('');
  return `<nav aria-label="Site"><ul>${items}</ul></nav>`;
}

const PRIMARY_NAV = [
  { href: '/shop', label: 'Shop catalogue' },
  { href: '/blog', label: 'Knowledge hub' },
  { href: '/about-us', label: 'About us' },
  { href: '/delivery-and-returns', label: 'Delivery & returns' },
  { href: '/payment-methods', label: 'Payment methods' },
];

export async function buildCrawlableHtml(pathname: string): Promise<string> {
  const path = pathname.split('?')[0] || '/';

  if (path === '/' || path === '') {
    return `<main id="ssr-fallback">
${answerSection('/')}
<h1>Buy steroids UK from ${escapeHtml(SITE_NAME)}</h1>
<p>${escapeHtml(DEFAULT_DESCRIPTION)}</p>
${navLinks(PRIMARY_NAV)}
<section aria-label="Related searches">
<h2>Related searches</h2>
${navLinks(RELATED_SEARCHES.map((l) => ({ href: l.href, label: l.label })))}
</section>
</main>`;
  }

  if (path === '/shop') {
    return `<main id="ssr-fallback">
${answerSection('/shop')}
<h1>Steroids UK buy — shop lab-tested catalogue</h1>
<p>${escapeHtml(DEFAULT_DESCRIPTION)}</p>
${navLinks([{ href: '/', label: 'Buy steroids UK' }, ...PRIMARY_NAV])}
</main>`;
  }

  if (path === '/blog') {
    return `<main id="ssr-fallback">
${answerSection('/blog')}
<h1>Knowledge Hub</h1>
<p>Guides and research notes on compounds, PCT, and stacking — for educational context only.</p>
${navLinks([
  { href: '/', label: 'Buy steroids UK' },
  { href: '/shop', label: 'Steroids UK buy' },
  { href: '/shop?q=testosterone', label: 'Buy testosterone' },
  { href: '/category/sarms', label: 'UK SARMs' },
  { href: '/category/oral', label: 'Buy Anavar UK' },
  { href: '/category/pct', label: 'Buy Clomid UK' },
])}
</main>`;
  }

  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '').split('/')[0];
    const post = await BlogService.getPublishedBySlug(slug);
    if (!post) return '';
    return `<main id="ssr-fallback">
<article>
<h1>${escapeHtml(post.title)}</h1>
<p>${escapeHtml(sanitizeMetaText(post.excerpt, 300))}</p>
<p>By ${escapeHtml(post.authorName)}</p>
</article>
${navLinks([
  { href: '/blog', label: 'All articles' },
  { href: '/', label: 'Buy steroids UK' },
  { href: '/shop', label: 'Steroids UK buy' },
  { href: '/category/sarms', label: 'UK SARMs' },
])}
</main>`;
  }

  if (path.startsWith('/product/')) {
    const slug = path.replace('/product/', '').split('/')[0];
    const product = await CatalogueApiService.getPublishedBySlug(slug);
    if (!product) return '';
    const shortDesc = enrichProductShortDescription(slug, product.shortDescription);
    const longDesc = enrichProductDescription(slug, product.description);
    const related = productSeoFor(slug)?.relatedLinks ?? [];
    return `<main id="ssr-fallback">
<article>
<h1>${escapeHtml(product.name)}</h1>
<p>${escapeHtml(sanitizeMetaText(shortDesc || longDesc, 300))}</p>
<p>Brand: ${escapeHtml(product.brandName)} · Category: ${escapeHtml(product.categoryName)} · SKU: ${escapeHtml(product.sku)}</p>
<p>Price: £${product.priceGbp.toFixed(2)} GBP</p>
</article>
${navLinks([
  { href: `/category/${product.categorySlug}`, label: product.categoryName },
  { href: '/shop', label: 'Steroids UK buy' },
  { href: '/', label: 'Buy steroids UK' },
  ...related,
])}
</main>`;
  }

  if (path.startsWith('/category/')) {
    const slug = path.replace('/category/', '').split('/')[0];
    const category = await db.category.findUnique({
      where: { slug },
      select: { name: true, description: true, slug: true },
    });
    if (!category) return '';
    const description = enrichCategoryDescription(category.slug, category.name, category.description);
    const capsule = categoryAnswerCapsule(category.slug);
    return `<main id="ssr-fallback">
${capsule ? answerSection(path, capsule) : ''}
<h1>${escapeHtml(category.name)}</h1>
<p>${escapeHtml(sanitizeMetaText(description, 300))}</p>
${navLinks([
  { href: '/', label: 'Buy steroids UK' },
  { href: '/shop', label: 'Steroids UK buy' },
  { href: '/glossary', label: 'Glossary' },
])}
</main>`;
  }

  if (path === '/manufacturers' || path === '/brands') {
    const brands = await db.brand.findMany({
      select: { name: true, slug: true },
      orderBy: { name: 'asc' },
      take: 40,
    });
    const links = brands.map((b) => ({ href: `/brand/${b.slug}`, label: b.name }));
    return `<main id="ssr-fallback">
<h1>Manufacturers</h1>
<p>${escapeHtml(`Trusted pharmaceutical manufacturers available at ${SITE_NAME}.`)}</p>
${navLinks([{ href: '/', label: 'Buy steroids UK' }, { href: '/shop', label: 'Shop' }, ...links])}
</main>`;
  }

  if (path.startsWith('/brand/')) {
    const slug = path.replace('/brand/', '').split('/')[0];
    const brand = await db.brand.findUnique({
      where: { slug },
      select: { name: true, description: true },
    });
    if (!brand) return '';
    const brandDesc =
      slug === 'pharmaqo-labs'
        ? brand.description ||
          'Pharmaqo Labs (Pharmaqo) — lab-tested anabolic and HGH catalogue lines including Test 400 with GBP pricing and UK dispatch.'
        : brand.description || `Shop ${brand.name} at ${SITE_NAME}.`;
    const brandLinks =
      slug === 'pharmaqo-labs'
        ? [
            { href: '/', label: 'UK steroid shop' },
            { href: '/product/tri-test-400-spharmaqo-labs', label: 'Test 400' },
            { href: '/shop', label: 'Steroids UK buy' },
          ]
        : [
            { href: '/', label: 'Buy steroids UK' },
            { href: '/shop', label: 'Shop' },
          ];
    return `<main id="ssr-fallback">
<h1>${escapeHtml(brand.name)}</h1>
<p>${escapeHtml(sanitizeMetaText(brandDesc, 300))}</p>
${navLinks(brandLinks)}
</main>`;
  }

  const guide = getGeoGuide(path);
  if (guide) {
    const sections = guide.sections
      .map(
        (section) =>
          `<section id="${escapeHtml(section.id)}"><h2>${escapeHtml(section.heading)}</h2>${section.paragraphs
            .map((p) => `<p>${escapeHtml(p)}</p>`)
            .join('')}</section>`
      )
      .join('\n');
    const faqs = guide.faqs
      .map(
        (item) =>
          `<section><h2>${escapeHtml(item.question)}</h2><p>${escapeHtml(item.answer)}</p></section>`
      )
      .join('\n');
    return `<main id="ssr-fallback">
${answerSection(path, guide.answerCapsule)}
<article>
<h1>${escapeHtml(guide.title)}</h1>
<p>${escapeHtml(guide.description)}</p>
<p>Last updated: ${escapeHtml(guide.dateModified)}</p>
${sections}
${faqs}
</article>
${navLinks([
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/glossary', label: 'Glossary' },
  ...guide.primaryCtas,
])}
</main>`;
  }

  const resource = RESOURCE_PAGE_SEO[path];
  if (resource) {
    let faqBlock = '';
    if (path === FAQ_HUB_PATH) {
      faqBlock = flatFaqHubItems()
        .map(
          (item) =>
            `<section><h2>${escapeHtml(item.question)}</h2><p>${escapeHtml(item.answer)}</p></section>`
        )
        .join('\n');
    }
    let glossaryBlock = '';
    if (path === GLOSSARY_PATH) {
      glossaryBlock = GLOSSARY_TERMS.map(
        (item) =>
          `<section id="${escapeHtml(item.slug)}"><h2>${escapeHtml(item.term)}</h2><p>${escapeHtml(item.definition)}</p></section>`
      ).join('\n');
    }
    return `<main id="ssr-fallback">
${answerSection(path)}
<h1>${escapeHtml(resource.title)}</h1>
<p>${escapeHtml(resource.description)}</p>
${faqBlock}
${glossaryBlock}
${navLinks([{ href: '/', label: 'Buy steroids UK' }, { href: '/shop', label: 'Steroids for sale UK' }, { href: '/blog', label: 'Blog' }, { href: '/glossary', label: 'Glossary' }])}
</main>`;
  }

  return '';
}

export function injectCrawlableBody(html: string, bodyContent: string): string {
  if (!bodyContent.trim()) return html;

  // Keep #root empty for React, and park crawlable HTML in a visually hidden sibling.
  // Users no longer flash unstyled SSR text; crawlers still see the markup in the HTML response.
  const crawlBlock = `<style id="ssr-crawl-style">#ssr-crawl{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}</style><div id="ssr-crawl">${bodyContent}</div>`;
  const withRoot = `<div id="root"></div>${crawlBlock}`;

  if (html.includes('<div id="root"></div>')) {
    return html.replace('<div id="root"></div>', withRoot);
  }
  if (html.includes('<!-- SSR_CONTENT -->')) {
    return html.replace('<!-- SSR_CONTENT -->', crawlBlock);
  }
  return html;
}

export function getLlmsTxt(): string {
  return `# ${SITE_NAME}
> UK catalogue of lab-tested compounds with tracked dispatch, plain packaging, and GBP pricing.

${SITE_NAME} is a UK-based e-commerce catalogue for bodybuilders and fitness researchers. We sell orals, injectables, SARMs, PCT, and stacks with batch verification on product pages and next-day tracked UK delivery.

## Key Pages
- /: Homepage — catalogue overview and top sellers
- /shop: Full product catalogue with filters and search
- /blog: Knowledge hub — compounds, cycles, PCT guides (educational)
- /about-us: Company background and trust signals
- /faq: FAQ hub — UK buying context, delivery, payment, PCT (educational)
- /glossary: Plain-language definitions of catalogue and PCT terms (educational)
- /oral-vs-injectable: Oral tablets vs injectable esters — catalogue comparison
- /sarms-vs-steroids: SARMs vs anabolic steroids — research catalogue context
- /what-is-pct: Post-cycle therapy literacy for PCT category buyers
- /cycle-builder: Educational compound recommendation tool
- /delivery-and-returns: Shipping, packaging, and returns policy
- /payment-methods: Bank transfer and crypto checkout
- /crypto-payment-guides: Step-by-step crypto payment instructions
- /privacy-policy: Privacy policy and data handling
- /terms: Terms and conditions of sale

## Primary Topics
- Lab-tested anabolic steroids UK
- SARMs and research compounds
- Post-cycle therapy (PCT)
- Oral vs injectable formats
- Injectable and oral compounds
- UK and worldwide tracked delivery
- Cryptocurrency checkout
- Catalogue glossary and entity definitions

## Contact
- Support: ${SUPPORT_EMAIL}

## Crawl Policy
- Sitemap: /sitemap.xml
- Robots: /robots.txt
`;
}
