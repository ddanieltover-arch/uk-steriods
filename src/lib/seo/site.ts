export const SITE_NAME = 'UK Performance';
export const SITE_TAGLINE = 'Sports nutrition and performance formulations';
export const DEFAULT_DESCRIPTION =
  'Browse UK Performance sports nutrition: endurance blends, protein isolates, electrolytes, and daily vitamins. Prices in GBP.';

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
  const collapsed = value.replace(/\s+/g, ' ').trim();
  if (collapsed.length <= max) return collapsed;
  return `${collapsed.slice(0, max - 1).trimEnd()}…`;
}

export const NOINDEX_PATH_PREFIXES = [
  '/admin',
  '/account',
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
  if (pathname === '/') return '/';
  return pathname.split('?')[0];
}
