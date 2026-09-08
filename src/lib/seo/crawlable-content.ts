import { db } from '../db';
import { BlogService } from '../services/blog.service';
import { CatalogueApiService } from '../services/catalogue-api.service';
import { SUPPORT_EMAIL } from '../../data/resources';
import { answerCapsuleFor } from './answer-capsules';
import { RESOURCE_PAGE_SEO } from './resources';
import { DEFAULT_DESCRIPTION, SITE_NAME, sanitizeMetaText } from './site';

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
<h1>Buy from the ${escapeHtml(SITE_NAME)} catalogue</h1>
<p>${escapeHtml(DEFAULT_DESCRIPTION)}</p>
${navLinks(PRIMARY_NAV)}
</main>`;
  }

  if (path === '/shop') {
    return `<main id="ssr-fallback">
${answerSection('/shop')}
<h1>Shop lab-tested catalogue</h1>
<p>${escapeHtml(DEFAULT_DESCRIPTION)}</p>
${navLinks([{ href: '/', label: 'Home' }, ...PRIMARY_NAV])}
</main>`;
  }

  if (path === '/blog') {
    return `<main id="ssr-fallback">
${answerSection('/blog')}
<h1>Knowledge Hub</h1>
<p>Guides and research notes on compounds, PCT, and stacking — for educational context only.</p>
${navLinks([{ href: '/', label: 'Home' }, { href: '/shop', label: 'Shop' }])}
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
${navLinks([{ href: '/blog', label: 'All articles' }, { href: '/shop', label: 'Shop' }])}
</main>`;
  }

  if (path.startsWith('/product/')) {
    const slug = path.replace('/product/', '').split('/')[0];
    const product = await CatalogueApiService.getPublishedBySlug(slug);
    if (!product) return '';
    return `<main id="ssr-fallback">
<article>
<h1>${escapeHtml(product.name)}</h1>
<p>${escapeHtml(sanitizeMetaText(product.shortDescription || product.description, 300))}</p>
<p>Brand: ${escapeHtml(product.brandName)} · Category: ${escapeHtml(product.categoryName)} · SKU: ${escapeHtml(product.sku)}</p>
<p>Price: £${product.priceGbp.toFixed(2)} GBP</p>
</article>
${navLinks([
  { href: `/category/${product.categorySlug}`, label: product.categoryName },
  { href: '/shop', label: 'Shop' },
])}
</main>`;
  }

  if (path.startsWith('/category/')) {
    const slug = path.replace('/category/', '').split('/')[0];
    const category = await db.category.findUnique({
      where: { slug },
      select: { name: true, description: true },
    });
    if (!category) return '';
    return `<main id="ssr-fallback">
<h1>${escapeHtml(category.name)}</h1>
<p>${escapeHtml(sanitizeMetaText(category.description || `Browse ${category.name} in the ${SITE_NAME} catalogue.`, 300))}</p>
${navLinks([{ href: '/shop', label: 'Shop' }, { href: '/', label: 'Home' }])}
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
${navLinks([{ href: '/shop', label: 'Shop' }, { href: '/', label: 'Home' }, ...links])}
</main>`;
  }

  if (path.startsWith('/brand/')) {
    const slug = path.replace('/brand/', '').split('/')[0];
    const brand = await db.brand.findUnique({
      where: { slug },
      select: { name: true, description: true },
    });
    if (!brand) return '';
    return `<main id="ssr-fallback">
<h1>${escapeHtml(brand.name)}</h1>
<p>${escapeHtml(sanitizeMetaText(brand.description || `Shop ${brand.name} at ${SITE_NAME}.`, 300))}</p>
${navLinks([{ href: '/shop', label: 'Shop' }, { href: '/', label: 'Home' }])}
</main>`;
  }

  const resource = RESOURCE_PAGE_SEO[path];
  if (resource) {
    return `<main id="ssr-fallback">
${answerSection(path)}
<h1>${escapeHtml(resource.title)}</h1>
<p>${escapeHtml(resource.description)}</p>
${navLinks([{ href: '/', label: 'Home' }, { href: '/shop', label: 'Shop' }])}
</main>`;
  }

  return '';
}

export function injectCrawlableBody(html: string, bodyContent: string): string {
  if (!bodyContent.trim()) return html;
  const wrapped = `<div id="root">${bodyContent}</div>`;
  if (html.includes('<div id="root"></div>')) {
    return html.replace('<div id="root"></div>', wrapped);
  }
  if (html.includes('<!-- SSR_CONTENT -->')) {
    return html.replace('<!-- SSR_CONTENT -->', bodyContent);
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
- Injectable and oral compounds
- UK and worldwide tracked delivery
- Cryptocurrency checkout

## Contact
- Support: ${SUPPORT_EMAIL}

## Crawl Policy
- Sitemap: /sitemap.xml
- Robots: /robots.txt
`;
}
