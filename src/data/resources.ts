export const RESOURCE_LINKS = [
  { href: '/about-us', label: 'About Us' },
  { href: '/faq', label: 'FAQ' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/oral-vs-injectable', label: 'Oral vs Injectable' },
  { href: '/sarms-vs-steroids', label: 'SARMs vs Steroids' },
  { href: '/what-is-pct', label: 'What is PCT?' },
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

export const SUPPORT_EMAIL = 'sales@uk-steroids.co.uk';

/** E.164 digits only (no +) for wa.me links */
export const WHATSAPP_NUMBER = '447352953985';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
