export const SITE_NAME = 'Steroids UK';
export const SITE_TAGLINE = 'UK catalogue · lab-tested batches · next-day tracked delivery';
export const SITE_LOGO_PATH = '/logo.png';
export const SITE_FAVICON_PATH = '/favicon.png';
export const SITE_OG_IMAGE_PATH = '/og-image.png';
export const DEFAULT_DESCRIPTION =
  'Steroids UK: lab-tested catalogue with UK dispatch, next-day tracked delivery in plain packaging, and a reship if tracked delivery fails. Prices in GBP.';

export function getSiteOrigin(): string {
  const raw =
    process.env.SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3001';
  return raw.replace(/\/$/, '');
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
