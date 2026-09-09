export const RESOURCE_LINKS = [
  { href: '/about-us', label: 'About Us' },
  { href: '/faq', label: 'FAQ' },
  { href: '/cycle-builder', label: 'Cycle Builder' },
  { href: '/delivery-and-returns', label: 'Delivery & Returns' },
  { href: '/payment-methods', label: 'Payment Methods' },
  { href: '/crypto-payment-guides', label: 'Crypto Payment Guides' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
] as const;

export function isResourcePath(pathname: string): boolean {
  const path = pathname.split('?')[0];
  return RESOURCE_LINKS.some((link) => link.href === path);
}

export const SUPPORT_EMAIL = 'support@steroids-uk.com';

/** E.164 digits only (no +) for wa.me links */
export const WHATSAPP_NUMBER = '447352953985';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
