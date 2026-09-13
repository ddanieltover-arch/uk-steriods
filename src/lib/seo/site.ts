export const SITE_NAME = 'Steroids UK';
export const SITE_TAGLINE = 'Buy steroids UK · lab-tested UK steroid shop';
export const SITE_LOGO_PATH = '/logo.png';
export const SITE_FAVICON_PATH = '/favicon.png';
export const SITE_OG_IMAGE_PATH = '/og-image.png';
export const DEFAULT_DESCRIPTION =
  'Buy steroids UK / steroid UK from Steroids UK — a trusted UK steroid shop for buying steroids online with lab-tested batches, GBP pricing, tracked UK dispatch in plain packaging, and a reship if tracked delivery fails.';

/** Live host prefers www; apex 301s to www — keep sitemap/canonicals aligned. */
export const CANONICAL_SITE_ORIGIN = 'https://www.uk-steroids.co.uk';

function withHttps(hostOrUrl: string): string {
  return hostOrUrl.startsWith('http') ? hostOrUrl : `https://${hostOrUrl}`;
}

/** Prefer www over apex so GSC and JSON-LD do not split equity. */
export function normalizeSiteOrigin(origin: string): string {
  const trimmed = origin.replace(/\/$/, '');
  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    if (url.hostname === 'uk-steroids.co.uk') {
      url.hostname = 'www.uk-steroids.co.uk';
      return url.origin;
    }
  } catch {
    /* keep original */
  }
  return trimmed;
}

/**
 * Canonical public origin for sitemap, meta, JSON-LD, and email links.
 * Never prefer ephemeral Vercel deployment URLs over an explicit SITE_URL /
 * production domain — those hosts SSO-redirect and break GSC sitemap indexing.
 */
export function getSiteOrigin(): string {
  const explicit =
    process.env.SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalizeSiteOrigin(explicit);

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionHost) {
    const host = withHttps(productionHost).replace(/\/$/, '');
    if (host.includes('uk-steroids.co.uk')) return normalizeSiteOrigin(host);
    return host;
  }

  // Last resort (local / preview without custom domain).
  if (process.env.VERCEL_URL) return withHttps(process.env.VERCEL_URL).replace(/\/$/, '');

  return 'http://localhost:3001';
}

export function absoluteUrl(pathname: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : getSiteOrigin();
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${origin}${path}`;
}

export function sanitizeMetaText(value: string | null | undefined, max = 160): string {
  if (!value) return '';
  // Lazy import avoided — keep SEO helpers free of HTML tags / mojibake in meta.
  const cleaned = value
    .replace(/â€“/g, '–')
    .replace(/â€”/g, '—')
    .replace(/â€™/g, '’')
    .replace(/â€œ|â€/g, '"')
    .replace(/Â£/g, '£')
    .replace(/Â/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

export const NOINDEX_PATH_PREFIXES = [
  '/admin',
  '/account',
  '/login',
  '/register',
  '/cart',
  '/checkout',
  '/track-order',
  '/orders',
  '/wishlist',
  '/reset-password',
  '/design-system',
  '/header-test',
  '/product-card-test',
  '/cart-test',
];

export function shouldNoIndexPath(pathname: string): boolean {
  return NOINDEX_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function canonicalPathFor(pathname: string, search: string): string {
  if (pathname.startsWith('/product/')) {
    return pathname.split('?')[0];
  }
  if (pathname.startsWith('/category/')) {
    return pathname.split('?')[0];
  }
  if (pathname.startsWith('/brand/')) {
    return pathname.split('?')[0];
  }
  if (pathname === '/shop') {
    const params = new URLSearchParams(search);
    const q = params.get('q') || params.get('search');
    if (q) return `/shop?q=${encodeURIComponent(q)}`;
    return '/shop';
  }
  if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    return pathname.split('?')[0];
  }
  return pathname.split('?')[0];
}

/**
 * Faceted / paginated / sorted /shop URLs should not be indexed.
 * Canonical still points at /shop (or /shop?q=); robots is noindex,follow.
 */
export function shopQueryShouldNoIndex(input: {
  search?: string | null;
  page?: number | null;
  sort?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  availability?: string | null;
  brandIds?: string[] | null;
  tags?: string[] | null;
  category?: string | null;
  brand?: string | null;
}): boolean {
  if (input.search && String(input.search).trim()) return true;
  if (input.page != null && Number(input.page) > 1) return true;
  if (input.sort && input.sort !== 'featured') return true;
  if (input.minPrice != null && Number(input.minPrice) > 0) return true;
  if (input.maxPrice != null && Number(input.maxPrice) < 1000) return true;
  if (input.availability && input.availability !== 'all') return true;
  if (input.brandIds && input.brandIds.length > 0) return true;
  if (input.tags && input.tags.length > 0) return true;
  // Category/brand belong on /category|/brand — residual /shop?category= is a duplicate.
  if (input.category && String(input.category).trim()) return true;
  if (input.brand && String(input.brand).trim()) return true;
  return false;
}

/** Express/Vercel query bag → facet noindex decision for /shop. */
export function shopRequestQueryShouldNoIndex(query: Record<string, unknown>): boolean {
  const asString = (v: unknown) => (typeof v === 'string' ? v : Array.isArray(v) ? String(v[0] ?? '') : '');
  const asNumber = (v: unknown) => {
    const n = Number(asString(v) || v);
    return Number.isFinite(n) ? n : undefined;
  };
  const brandIdsRaw = query.brandIds ?? query['brandIds[]'];
  const brandIds = Array.isArray(brandIdsRaw)
    ? brandIdsRaw.map(String)
    : asString(brandIdsRaw)
      ? asString(brandIdsRaw).split(',').filter(Boolean)
      : [];
  const tagsRaw = query.tags ?? query['tags[]'];
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw.map(String)
    : asString(tagsRaw)
      ? asString(tagsRaw).split(',').filter(Boolean)
      : [];

  return shopQueryShouldNoIndex({
    search: asString(query.q) || asString(query.search),
    page: asNumber(query.page),
    sort: asString(query.sort) || undefined,
    minPrice: asNumber(query.minPrice),
    maxPrice: asNumber(query.maxPrice),
    availability: asString(query.availability) || undefined,
    brandIds,
    tags,
    category: asString(query.category) || undefined,
    brand: asString(query.brand) || undefined,
  });
}
