export const RESOURCE_LINKS = [
  { href: '/about-us', label: 'About Us' },
  { href: '/cycle-builder', label: 'Cycle Builder' },
  { href: '/delivery-and-returns', label: 'Delivery & Returns' },
  { href: '/payment-methods', label: 'Payment Methods' },
  { href: '/crypto-payment-guides', label: 'Crypto Payment Guides' },
] as const;

export function isResourcePath(pathname: string): boolean {
  const path = pathname.split('?')[0];
  return RESOURCE_LINKS.some((link) => link.href === path);
}

export const SUPPORT_EMAIL = 'support@steroids-uk.com';
