/**
 * Visible intro + related links for shop search hubs (/shop?q=...).
 * Keeps competitor keyword phrases on-page even when search URLs are noindex.
 */

export type ShopQuerySurface = {
  title: string;
  description: string;
  relatedLinks: { href: string; label: string }[];
};

const DEFAULT_RELATED = [
  { href: '/', label: 'Buy steroids UK' },
  { href: '/shop', label: 'Steroids UK buy' },
];

export const SHOP_QUERY_SEO: Record<string, ShopQuerySurface> = {
  anavar: {
    title: 'Anavar where to buy',
    description:
      'Anavar for sale, Anavar for sale UK, buy Anavar UK, order Anavar, Anavar buy UK and buy oxandrolone online — browse Anavar 10 and Anavar 50 listings with GBP pricing and UK tracked dispatch. Educational catalogue only.',
    relatedLinks: [
      { href: '/category/oral', label: 'Anavar UK / orals' },
      { href: '/product/anavar10-proper-labs', label: 'Buy Anavar 10' },
      { href: '/product/anavar50-proper-labs', label: 'Buy Anavar 50' },
      { href: '/', label: 'UK steroids shop' },
    ],
  },
  testosterone: {
    title: 'Buy testosterone',
    description:
      'Best site to buy testosterone online UK searches map here — testosterone for sale, testosterone UK buy, Test 250, Test 500 and ETT 500 style esters with lab-tested batch notes. Educational catalogue only.',
    relatedLinks: [
      { href: '/product/testosterone-cypionate-proper-labs', label: 'Testosterone cypionate' },
      { href: '/product/testosterone-enanthate-proper-labs', label: 'Test 300' },
      { href: '/product/tri-test-400-spharmaqo-labs', label: 'Test 400 / Tri Test' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  dianabol: {
    title: 'Dianabol for sale',
    description:
      'Dianabol for sale, buy Dbol, buy Dianabol online, Dianabol buy, Dbol before and after, Dianabol before after and before and after Dianabol — oral methandienone listings with GBP pricing. Before-and-after style queries are educational catalogue browsing only, not outcome claims.',
    relatedLinks: [
      { href: '/product/dianabol25-proper-labs', label: 'Buy Dianabol' },
      { href: '/shop?q=anavar', label: 'Anavar where to buy' },
      { href: '/blog', label: 'Anavar vs Dianabol / Anavar before after' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  primobolan: {
    title: 'Primobolan for sale',
    description:
      'Primobolan for sale and buy Primobolan — methenolone catalogue listings with GBP pricing and UK dispatch. Educational only.',
    relatedLinks: [
      { href: '/product/primobolan-proper-labs', label: 'Buy Primobolan' },
      { href: '/category/injectable', label: 'Injectables' },
      { href: '/', label: 'UK steroid shop' },
    ],
  },
  sustanon: {
    title: 'Buy Sustanon online',
    description:
      'Buy Sustanon online — Sustanon 250 and related testosterone mix listings with lab-tested framing and UK tracked shipping.',
    relatedLinks: [
      { href: '/product/sustanon-250-proper-labs', label: 'Buy Sustanon online' },
      { href: '/shop?q=testosterone', label: 'Buy testosterone' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  deca: {
    title: 'Deca Durabolin for sale',
    description:
      'Deca Durabolin for sale and Deca steroid price — nandrolone decanoate listings with GBP pricing. Educational catalogue only.',
    relatedLinks: [
      { href: '/product/deca-300-nandrolone-decanoate-syncom-labs', label: 'Deca Durabolin for sale' },
      { href: '/shop?q=npp', label: 'NPP cycle' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  boldenone: {
    title: 'Equipoise for sale',
    description:
      'Equipoise for sale, Equipoise online and buy boldenone online — boldenone undecylenate listings with UK dispatch.',
    relatedLinks: [
      { href: '/product/boldenone-proper-labs', label: 'Equipoise for sale' },
      { href: '/shop?q=deca', label: 'Deca Durabolin for sale' },
      { href: '/', label: 'Steroid shop UK' },
    ],
  },
  trenbolone: {
    title: 'Trenbolone UK',
    description:
      'Trenbolone UK and trenbolone acetate price searches — Ace and Enanthate catalogue listings with GBP pricing. Educational only.',
    relatedLinks: [
      { href: '/product/trenbolone-acetate-proper-labs', label: 'Trenbolone acetate price 10ml' },
      { href: '/category/injectable', label: 'Injectable steroids UK' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  hcg: {
    title: 'Buy HCG UK',
    description:
      'Buy HCG, purchase HCG, HCG buy and HCG peptide listings for PCT-related catalogue browsing. Educational only — not medical advice.',
    relatedLinks: [
      { href: '/product/hcg-pharmaqolabs', label: 'Buy HCG UK' },
      { href: '/category/pct', label: 'Buy Clomid UK' },
      { href: '/faq', label: 'Legal to buy HCG online?' },
    ],
  },
  'liv 52': {
    title: 'Liv 52',
    description:
      'Liv 52 and Liv 52 tablets — liver-support catalogue search. Check stock and GBP pricing on matching listings.',
    relatedLinks: [
      { href: '/category/pct', label: 'PCT support' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  liv52: {
    title: 'Liv 52 tablets',
    description:
      'Liv52 / Liv 52 tablets catalogue search with UK dispatch context. Educational shopping only.',
    relatedLinks: [
      { href: '/shop?q=liv+52', label: 'Liv 52' },
      { href: '/category/pct', label: 'PCT' },
    ],
  },
  mk677: {
    title: 'MK677 UK',
    description:
      'MK677 UK, MK677 for sale, MK677 buy and MK667 typo searches — Ibutamoren listings in the UK SARMs catalogue.',
    relatedLinks: [
      { href: '/category/sarms', label: 'UK SARMs' },
      { href: '/product/mk677-ibutamoren-liquid-25mg-30ml-syncom-labs', label: 'Buy MK677' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  clomid: {
    title: 'Buy Clomid UK',
    description:
      'Buy Clomid UK, Clomid tablets, purchase Clomid online and Clomifene tablets — PCT catalogue listings. Not a Boots pharmacy substitute.',
    relatedLinks: [
      { href: '/category/pct', label: 'PCT / first PCT' },
      { href: '/product/clomid-pharmaqo-labs', label: 'Clomid tablets' },
      { href: '/what-is-pct', label: 'Best PCT cycle to keep gains' },
    ],
  },
  anadrol: {
    title: 'Buy Anadrol',
    description:
      'Buy Anadrol and Anadrol vs Anavar comparison browsing — oxymetholone oral listings with GBP pricing. Educational only.',
    relatedLinks: [
      { href: '/product/anadrol50-proper-labs', label: 'Buy Anadrol' },
      { href: '/shop?q=anavar', label: 'Anavar for sale' },
      { href: '/blog', label: 'Anadrol vs Anavar' },
    ],
  },
  turinabol: {
    title: 'Turinabol for sale',
    description:
      'Turinabol for sale — oral Tbol catalogue listings with lab-tested framing and UK shipping.',
    relatedLinks: [
      { href: '/product/turinabol-proper-labs', label: 'Turinabol for sale' },
      { href: '/shop?q=dianabol', label: 'Dianabol for sale' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  masteron: {
    title: 'Masteron / Mastereon',
    description:
      'Masteron (Mastereon) propionate and enanthate catalogue listings with GBP pricing and UK dispatch.',
    relatedLinks: [
      { href: '/product/masteron-propionate-proper-labs', label: 'Masteron' },
      { href: '/shop?q=primobolan', label: 'Primobolan for sale' },
      { href: '/', label: 'UK steroid shop' },
    ],
  },
  npp: {
    title: 'NPP cycle',
    description:
      'NPP cycle, NPP test cycle and NPP and test cycle — nandrolone phenylpropionate listings. Use cycle builder for catalogue ideas only.',
    relatedLinks: [
      { href: '/product/npp-100-nandrolone-phenylpropionate-syncom-labs', label: 'NPP cycle' },
      { href: '/cycle-builder', label: 'Steroids UK cycle guide' },
      { href: '/shop?q=testosterone', label: 'Buy testosterone' },
    ],
  },
  dhb: {
    title: 'Dihydroboldenone cypionate',
    description:
      'Dihydroboldenone cypionate / DHB catalogue search with lab-tested framing. Educational only.',
    relatedLinks: [
      { href: '/product/dhb-100-dihydroboldenone-syncom-labs', label: 'DHB' },
      { href: '/shop?q=boldenone', label: 'Equipoise for sale' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  yohimbine: {
    title: 'Yohimbine UK',
    description:
      'Yohimbine UK fat-loss support catalogue search. Educational shopping context only.',
    relatedLinks: [
      { href: '/category/fat-loss', label: 'Buy Clenbuterol' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
};

export function shopQuerySurface(search: string | null | undefined): ShopQuerySurface | null {
  const key = (search || '').trim().toLowerCase().replace(/\+/g, ' ');
  if (!key) return null;
  if (SHOP_QUERY_SEO[key]) return SHOP_QUERY_SEO[key];
  // Try first token for multi-word queries like "liv 52"
  const compact = key.replace(/\s+/g, ' ');
  if (SHOP_QUERY_SEO[compact]) return SHOP_QUERY_SEO[compact];
  return null;
}

export function shopQueryFallback(search: string): ShopQuerySurface {
  return {
    title: `Search: ${search}`,
    description: `Browse “${search}” in the Steroids UK lab-tested catalogue. UK steroids shop with GBP pricing and tracked dispatch.`,
    relatedLinks: DEFAULT_RELATED,
  };
}
