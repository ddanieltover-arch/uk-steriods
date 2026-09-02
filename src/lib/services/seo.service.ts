import { db } from '../db';
import { RESOURCE_PAGE_PATHS, RESOURCE_PAGE_SEO } from '../seo/resources';
import { getLlmsTxt } from '../seo/crawlable-content';
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  absoluteUrl,
  getSiteOrigin,
  sanitizeMetaText,
} from '../seo/site';
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
  productJsonLd,
  websiteJsonLd,
} from '../seo/structured-data';

export interface PageSeo {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogImage?: string;
  ogType: string;
  jsonLd: Record<string, unknown>[];
}

export class SeoService {
  static getRobotsTxt(): string {
    const origin = getSiteOrigin();
    return [
      'User-agent: *',
      'Allow: /',
      'Allow: /shop',
      'Allow: /category/',
      'Allow: /brand/',
      'Allow: /product/',
      'Allow: /blog',
      'Allow: /blog/',
      'Allow: /about-us',
      'Allow: /cycle-builder',
      'Allow: /delivery-and-returns',
      'Allow: /payment-methods',
      'Allow: /crypto-payment-guides',
      'Disallow: /admin',
      'Disallow: /admin/',
      'Disallow: /account',
      'Disallow: /account/',
      'Disallow: /login',
      'Disallow: /register',
      'Disallow: /cart',
      'Disallow: /checkout',
      'Disallow: /checkout/',
      'Disallow: /track-order',
      'Disallow: /orders/',
      'Disallow: /reset-password',
      'Disallow: /wishlist',
      'Disallow: /design-system',
      'Disallow: /header-test',
      'Disallow: /product-card-test',
      'Disallow: /cart-test',
      'Disallow: /api/',
      '',
      'User-agent: GPTBot',
      'Allow: /',
      '',
      'User-agent: ClaudeBot',
      'Allow: /',
      '',
      'User-agent: PerplexityBot',
      'Allow: /',
      '',
      'User-agent: Google-Extended',
      'Allow: /',
      '',
      `Sitemap: ${origin}/sitemap.xml`,
      '',
    ].join('\n');
  }

  static async getSitemapXml(): Promise<string> {
    const origin = getSiteOrigin();
    const now = new Date().toISOString();

    const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [
      { loc: `${origin}/`, lastmod: now, changefreq: 'daily', priority: '1.0' },
      { loc: `${origin}/shop`, lastmod: now, changefreq: 'daily', priority: '0.9' },
      { loc: `${origin}/blog`, lastmod: now, changefreq: 'daily', priority: '0.8' },
    ];

    const [categories, brands, products, posts] = await Promise.all([
      db.category.findMany({ select: { slug: true, updatedAt: true } }),
      db.brand.findMany({ select: { slug: true, updatedAt: true } }),
      db.product.findMany({
        where: { isPublished: true, deletedAt: null },
        select: { slug: true, updatedAt: true },
      }),
      db.blogPost.findMany({
        where: { status: 'PUBLISHED', deletedAt: null, publishedAt: { not: null } },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    for (const c of categories) {
      urls.push({
        loc: `${origin}/category/${c.slug}`,
        lastmod: c.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: '0.7',
      });
    }
    for (const b of brands) {
      urls.push({
        loc: `${origin}/brand/${b.slug}`,
        lastmod: b.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: '0.6',
      });
    }
    for (const p of products) {
      urls.push({
        loc: `${origin}/product/${p.slug}`,
        lastmod: p.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: '0.8',
      });
    }
    for (const post of posts) {
      urls.push({
        loc: `${origin}/blog/${post.slug}`,
        lastmod: post.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: '0.7',
      });
    }

    for (const path of RESOURCE_PAGE_PATHS) {
      const meta = RESOURCE_PAGE_SEO[path];
      urls.push({
        loc: `${origin}${path}`,
        lastmod: now,
        changefreq: meta.changefreq,
        priority: meta.priority,
      });
    }

    const body = urls
      .map(
        (u) =>
          `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  }

  static getLlmsTxt(): string {
    return getLlmsTxt();
  }

  static organizationJsonLd() {
    return organizationJsonLd();
  }

  static websiteJsonLd() {
    return websiteJsonLd();
  }

  static breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return breadcrumbJsonLd(items);
  }

  static productJsonLd(input: Parameters<typeof productJsonLd>[0]) {
    return productJsonLd(input);
  }

  static homepageSeo(): PageSeo {
    return {
      title: `${SITE_NAME} | ${SITE_TAGLINE}`,
      description: DEFAULT_DESCRIPTION,
      canonical: absoluteUrl('/'),
      robots: 'index,follow',
      ogImage: absoluteUrl('/og-image.png'),
      ogType: 'website',
      jsonLd: [this.organizationJsonLd(), this.websiteJsonLd()],
    };
  }

  static blogIndexSeo(): PageSeo {
    return {
      title: `Knowledge Hub | ${SITE_NAME}`,
      description: 'Guides and research notes on compounds, PCT, and stacking — for educational context only.',
      canonical: absoluteUrl('/blog'),
      robots: 'index,follow',
      ogImage: absoluteUrl('/og-image.png'),
      ogType: 'website',
      jsonLd: [
        this.breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]),
      ],
    };
  }

  static blogArticleSeo(post: {
    title: string;
    excerpt: string;
    slug: string;
    authorName: string;
    publishedAt?: Date | string | null;
    coverImageUrl?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    faq?: { question: string; answer: string }[];
  }): PageSeo {
    const jsonLd: Record<string, unknown>[] = [
      blogPostingJsonLd({
        title: post.title,
        description: post.seoDescription || post.excerpt,
        slug: post.slug,
        authorName: post.authorName,
        publishedAt: post.publishedAt,
        coverImageUrl: post.coverImageUrl,
      }),
      this.breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ];
    if (post.faq && post.faq.length) {
      jsonLd.push(faqPageJsonLd(post.faq));
    }
    return {
      title: post.seoTitle || `${post.title} | ${SITE_NAME}`,
      description: sanitizeMetaText(post.seoDescription || post.excerpt, 160),
      canonical: absoluteUrl(`/blog/${post.slug}`),
      robots: 'index,follow',
      ogImage: post.coverImageUrl || absoluteUrl('/og-image.png'),
      ogType: 'article',
      jsonLd,
    };
  }

  static shopSeo(searchTerm?: string): PageSeo {
    if (searchTerm) {
      return {
        title: `Search: ${searchTerm} | ${SITE_NAME}`,
        description: `Search results for “${searchTerm}” in the ${SITE_NAME} catalogue.`,
        canonical: absoluteUrl(`/shop?q=${encodeURIComponent(searchTerm)}`),
        robots: 'noindex,follow',
        ogImage: absoluteUrl('/og-image.png'),
        ogType: 'website',
        jsonLd: [],
      };
    }
    return {
      title: `Shop lab-tested catalogue | ${SITE_NAME}`,
      description: DEFAULT_DESCRIPTION,
      canonical: absoluteUrl('/shop'),
      robots: 'index,follow',
      ogImage: absoluteUrl('/og-image.png'),
      ogType: 'website',
      jsonLd: [
        this.breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
        ]),
      ],
    };
  }

  static resourceSeo(pathname: string): PageSeo | null {
    const meta = RESOURCE_PAGE_SEO[pathname];
    if (!meta) return null;
    return {
      title: `${meta.title} | ${SITE_NAME}`,
      description: sanitizeMetaText(meta.description, 160),
      canonical: absoluteUrl(pathname),
      robots: 'index,follow',
      ogImage: absoluteUrl('/og-image.png'),
      ogType: 'website',
      jsonLd: [
        this.breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: meta.title, path: pathname },
        ]),
      ],
    };
  }

  static async categorySeo(slug: string): Promise<PageSeo | null> {
    const category = await db.category.findUnique({
      where: { slug },
      select: { name: true, slug: true, description: true },
    });
    if (!category) return null;
    const path = `/category/${category.slug}`;
    return {
      title: `${category.name} | ${SITE_NAME}`,
      description: sanitizeMetaText(
        category.description || `Browse ${category.name} in the ${SITE_NAME} lab-tested catalogue. Prices in GBP.`,
        160
      ),
      canonical: absoluteUrl(path),
      robots: 'index,follow',
      ogImage: absoluteUrl('/og-image.png'),
      ogType: 'website',
      jsonLd: [
        this.breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
          { name: category.name, path },
        ]),
      ],
    };
  }

  static async brandSeo(slug: string): Promise<PageSeo | null> {
    const brand = await db.brand.findUnique({
      where: { slug },
      select: { name: true, slug: true, description: true },
    });
    if (!brand) return null;
    const path = `/brand/${brand.slug}`;
    return {
      title: `${brand.name} | ${SITE_NAME}`,
      description: sanitizeMetaText(
        brand.description || `Shop ${brand.name} products at ${SITE_NAME}. Lab-tested batches, UK dispatch.`,
        160
      ),
      canonical: absoluteUrl(path),
      robots: 'index,follow',
      ogImage: absoluteUrl('/og-image.png'),
      ogType: 'website',
      jsonLd: [
        this.breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
          { name: brand.name, path },
        ]),
      ],
    };
  }

  static injectIntoHtml(html: string, seo: PageSeo): string {
    let next = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);

    const tags = [
      `<meta name="description" content="${escapeHtml(seo.description)}" />`,
      `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
      `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
      `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
      `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
      `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
      `<meta property="og:type" content="${escapeHtml(seo.ogType)}" />`,
      `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    ];

    const ogImage = seo.ogImage || absoluteUrl('/og-image.png');
    tags.push(`<meta property="og:image" content="${escapeHtml(ogImage)}" />`);
    tags.push(`<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`);
    tags.push(`<link rel="icon" href="${escapeHtml(absoluteUrl('/favicon.ico'))}" sizes="any" />`);
    tags.push(`<link rel="icon" type="image/png" href="${escapeHtml(absoluteUrl('/favicon.png'))}" />`);
    tags.push(`<link rel="apple-touch-icon" href="${escapeHtml(absoluteUrl('/apple-touch-icon.png'))}" />`);

    for (const block of seo.jsonLd) {
      tags.push(`<script type="application/ld+json">${JSON.stringify(block)}</script>`);
    }

    if (next.includes('</head>')) {
      next = next.replace('</head>', `${tags.join('\n    ')}\n  </head>`);
    }
    return next;
  }
}

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
