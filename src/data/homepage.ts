export const PROMO_TICKER_ITEMS: { icon: 'truck' | 'bitcoin' | 'flask'; text: string }[] = [
  { icon: 'truck', text: 'UK from £10 · Europe £25 · Rest of world £35' },
  { icon: 'truck', text: 'Free UK Tracked 48 on orders £300+' },
  { icon: 'bitcoin', text: 'Pay by UK bank transfer or crypto · discreet plain packaging' },
  { icon: 'bitcoin', text: 'Pay by crypto and save 5% automatically' },
  { icon: 'flask', text: 'Lab-tested batches · reship if tracked delivery fails' },
];

export type HeroBadgeIcon = 'sparkle' | 'star' | 'check' | 'shield';
export type HeroCtaStyle = 'lime' | 'white';
export type HeroLayout = 'product' | 'quiz' | 'trust';
export type HeroFeatureIcon = 'shield' | 'flask' | 'microscope' | 'star' | 'truck' | 'lock' | 'users' | 'check';

export interface HeroFeature {
  icon: HeroFeatureIcon;
  label: string;
  sub?: string;
}

export interface HeroCampaignCard {
  id: string;
  layout: HeroLayout;
  badge: string;
  badgeIcon: HeroBadgeIcon;
  kicker?: string;
  titleWhite: string;
  titleAccent?: string;
  subtitle?: string;
  guarantee?: string;
  cta: string;
  ctaStyle: HeroCtaStyle;
  ctaIcon?: 'cart' | 'file';
  href: string;
  images: string[];
  features?: HeroFeature[];
  watermark?: string;
  fullBleed?: string;
}

export const HERO_CARDS: HeroCampaignCard[] = [
  {
    id: 'proper-labs',
    layout: 'product',
    badge: 'Premium Lab',
    badgeIcon: 'sparkle',
    kicker: 'Premium Class Lab in our offer',
    titleWhite: 'Proper',
    titleAccent: 'Labs',
    guarantee: '100% Satisfaction Guaranteed',
    cta: 'Buy Proper Labs Products',
    ctaStyle: 'lime',
    href: '/brand/proper-labs',
    fullBleed: '/hero/slide-1-proper.png',
    images: [],
    features: [
      { icon: 'shield', label: 'Tested Premium Quality' },
      { icon: 'flask', label: 'Purity Lab Tested' },
    ],
  },
  {
    id: 'sexual-performance',
    layout: 'product',
    badge: 'Premium Quality',
    badgeIcon: 'star',
    kicker: 'Enhance your',
    titleWhite: 'Sexual',
    titleAccent: 'Performance',
    subtitle: 'See all our viagra products',
    cta: 'Buy Viagra',
    ctaStyle: 'lime',
    href: '/shop?q=power',
    fullBleed: '/hero/slide-1-sexual.png',
    images: [],
  },
  {
    id: 'stacks',
    layout: 'product',
    badge: 'Exclusive',
    badgeIcon: 'star',
    titleWhite: 'Pre-made',
    titleAccent: 'Stacks',
    subtitle: 'The more you buy, the less you pay!',
    cta: 'Buy Pre-Made Stacks',
    ctaStyle: 'lime',
    href: '/category/stacks-bundles',
    fullBleed: '/hero/slide-2-stacks.png',
    images: [],
  },
  {
    id: 'stack-finder',
    layout: 'quiz',
    badge: 'First cycle?',
    badgeIcon: 'check',
    titleWhite: 'Not sure what to run?',
    titleAccent: 'Build your stack in 5 questions.',
    subtitle:
      'Main compounds, cycle support, PCT and accessories — tailored to your experience, goal and cycle length.',
    cta: 'Find your perfect cycle',
    ctaStyle: 'white',
    ctaIcon: 'file',
    href: '/cycle-builder',
    fullBleed: '/hero/slide-2-cycle.png',
    images: [],
    features: [
      { icon: 'check', label: 'Personalised' },
      { icon: 'check', label: 'Under a minute' },
      { icon: 'check', label: 'No sign-up' },
      { icon: 'check', label: 'From first-timer to advanced' },
    ],
  },
  {
    id: 'pharmaqo',
    layout: 'product',
    badge: 'Pharmaqo',
    badgeIcon: 'shield',
    kicker: 'Premium Quality',
    titleWhite: 'Testosterone',
    titleAccent: 'Cypionate',
    subtitle: 'DHB (Test Cyp – DHB) – Pharmaqo Labs',
    cta: 'Shop Now',
    ctaStyle: 'lime',
    ctaIcon: 'cart',
    href: '/product/dhb-1-testosterone-cypionate-test-cyp-dhb-pharmaqo-labs',
    fullBleed: '/hero/slide-3-pharmaqo.png',
    images: [],
    watermark: 'PHARMAQO',
    features: [
      { icon: 'shield', label: 'Premium Quality', sub: 'Lab Verified' },
      { icon: 'microscope', label: 'Potent Formula', sub: 'High Purity' },
      { icon: 'shield', label: 'Trusted Source', sub: 'Pharmaqo Labs' },
    ],
  },
  {
    id: 'uk-trusted',
    layout: 'trust',
    badge: 'Trusted by thousands',
    badgeIcon: 'shield',
    titleWhite: 'THE MOST',
    titleAccent: 'TRUSTED SHOP',
    subtitle: 'Check why',
    cta: 'Shop the catalogue',
    ctaStyle: 'lime',
    href: '/shop',
    fullBleed: '/hero/slide-3-trusted.png',
    images: [],
    features: [
      { icon: 'shield', label: 'Verified reviews' },
      { icon: 'star', label: '5.0 average rating' },
      { icon: 'truck', label: 'Fast & discreet delivery' },
      { icon: 'lock', label: 'Secure payments' },
      { icon: 'users', label: 'Real UK customers' },
    ],
  },
];

export const HERO_SLIDE_PAIRS: [HeroCampaignCard, HeroCampaignCard][] = [
  [HERO_CARDS[0], HERO_CARDS[1]],
  [HERO_CARDS[2], HERO_CARDS[3]],
  [HERO_CARDS[4], HERO_CARDS[5]],
];

export interface GalleryItem {
  id: string;
  name: string;
  quote: string;
  productLabel: string;
  accent: string;
}

export const CUSTOMER_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    name: 'James R.',
    quote: 'Arrived next day in plain packaging. Stock matched what I ordered.',
    productLabel: 'Testosterone Enanthate',
    accent: '#1E3A5F',
  },
  {
    id: 'g2',
    name: 'Callum P.',
    quote: 'Clear tracking and the lab notes were easy to check.',
    productLabel: 'Oral range',
    accent: '#0B1220',
  },
  {
    id: 'g3',
    name: 'Nate S.',
    quote: 'Reordered twice. Dispatch is consistently same-day before cut-off.',
    productLabel: 'PCT support',
    accent: '#78350F',
  },
  {
    id: 'g4',
    name: 'Owen K.',
    quote: 'Straightforward checkout and honest stock levels.',
    productLabel: 'Injectable range',
    accent: '#14532D',
  },
];

export const COMPOUND_LINKS: { label: string; hint: string; href: string }[] = [
  { label: 'Testosterone', hint: 'Cypionate, Enanthate, Propionate', href: '/shop?q=testosterone' },
  { label: 'Dianabol', hint: 'Oral tablets', href: '/shop?q=dianabol' },
  { label: 'Anavar', hint: 'Oxandrolone', href: '/shop?q=anavar' },
  { label: 'Trenbolone', hint: 'Ace & Enanthate', href: '/shop?q=trenbolone' },
  { label: 'Winstrol', hint: 'Stanozolol', href: '/shop?q=winstrol' },
  { label: 'Sustanon', hint: 'Sustanon 250', href: '/shop?q=sustanon' },
  { label: 'Deca', hint: 'Nandrolone', href: '/shop?q=deca' },
  { label: 'Masteron', hint: 'Drostanolone', href: '/shop?q=masteron' },
  { label: 'SARMs', hint: 'Research compounds', href: '/category/sarms' },
  { label: 'PCT', hint: 'Post-cycle support', href: '/category/pct-health' },
  { label: 'Fat loss', hint: 'Cutting compounds', href: '/category/fat-loss' },
  { label: 'Stacks', hint: 'Pre-made bundles', href: '/category/stacks-bundles' },
];

export const GUIDE_CARDS: { title: string; excerpt: string; href: string }[] = [
  {
    title: 'First cycle planning',
    excerpt: 'Start with a single compound, bloodwork, and a PCT plan before you order.',
    href: '/cycle-builder',
  },
  {
    title: 'Bulking vs cutting catalogue',
    excerpt: 'Use injectables and orals by goal — mass, lean retention, or support compounds.',
    href: '/shop',
  },
  {
    title: 'UK delivery & packaging',
    excerpt: 'Tracked 24 from a UK warehouse in unbranded outer packaging.',
    href: '/delivery-and-returns',
  },
];

export const GOAL_SLUGS = [
  'injectable',
  'oral',
  'sarms',
  'pct',
  'peptides',
  'hgh',
  'ed-meds',
  'fat-loss',
  'accessories',
] as const;
