/**
 * Unique category copy used when DB description is thin (equals name or too short).
 * Educational catalogue framing only — not medical advice.
 * Keyword clusters: mobile + desktop competitor batches 2026-09-12.
 */
export const CATEGORY_SEO_COPY: Record<
  string,
  { description: string; answerCapsule: string }
> = {
  injectable: {
    description:
      'Injectable steroids UK at Steroids UK — buy testosterone, buy Sustanon online, Deca Durabolin for sale, Equipoise for sale, Primobolan for sale and trenbolone with GBP pricing and UK tracked dispatch.',
    answerCapsule:
      'Injectable compounds include testosterone esters, Sustanon, Deca Durabolin, Equipoise (boldenone), Primobolan and stacks. Listings show GBP price, stock and batch details with UK tracked delivery.',
  },
  oral: {
    description:
      'Buy Anavar UK, Anavar UK buy, buying Anavar, Dianabol for sale, Primobolan orals and Turinabol for sale at Steroids UK — Anavar where to buy, buy Dbol and buy oxandrolone online with lab-tested batches and discreet UK shipping.',
    answerCapsule:
      'Oral catalogue covers Anavar where to buy, Anavar purchase options, Dianabol for sale / buy Dbol, Anadrol and Turinabol listings with strength, brand, GBP price and stock before checkout.',
  },
  sarms: {
    description:
      'UK SARMs, SARMs UK and buy SARMs UK catalogue at Steroids UK — MK677 UK, MK677 buy, MK667, RAD 140 UK, LGD-4033 and Ostarine with batch verification and GBP pricing.',
    answerCapsule:
      'UK SARMs at Steroids UK include MK677 UK (Ibutamoren / MK677 for sale), RAD 140 UK and related research compounds. Pages show brand, dose format, GBP price and lab-test context for catalogue browsing.',
  },
  pct: {
    description:
      'Post-cycle therapy (PCT) UK / PCT UK support at Steroids UK — buy Clomid UK, Clomid tablets, Clomid tablet price, Clomifene tablets, first PCT, enclomiphene UK, buy Letrozole online, Nolvadex bodybuilding, HCG peptide and Liv 52 with UK dispatch. Clomid UK Boots comparisons are common searches — we are not a Boots pharmacy. Educational only, not medical advice.',
    answerCapsule:
      'PCT products cover Clomid tablets, buy Clomid UK / purchase Clomid online, first PCT browsing, HCG and related support. Educational catalogue only — not a Boots pharmacy substitute or medical advice.',
  },
  peptides: {
    description:
      'Research peptides at Steroids UK — BPC 157 UK, IGF 1 LR3, MT 2 and delta sleep peptide with lab-tested framing, GBP prices and tracked UK delivery.',
    answerCapsule:
      'Peptides include BPC 157 UK, IGF 1 LR3, MT 2 and delta sleep peptide research vials. Listings show brand, size, GBP price and stock with discreet tracked shipping from the UK.',
  },
  hgh: {
    description:
      'HGH UK, buy HGH UK, HGH buy UK and HGH injections catalogue at Steroids UK with brand, IU/mg details, GBP pricing and UK warehouse dispatch.',
    answerCapsule:
      'HGH UK injections show brand, cartridge or vial format, strength, GBP price and stock for research-use catalogue browsing including buy HGH UK searches.',
  },
  'fat-loss': {
    description:
      'Buy Clenbuterol, Clenbuterol for sale, Clenbuterol buy and Yohimbine UK at Steroids UK — Clenbuterol tablet, clen pills and related fat-loss support with lab-tested framing and UK shipping.',
    answerCapsule:
      'Fat-loss items cover buy Clenbuterol / Clenbuterol tablet / Clenbuterol buy searches and Yohimbine UK. Listings include brand, dose, GBP price and stock — educational only.',
  },
  accessories: {
    description:
      'Peptide needles, buy syringes and needles for testosterone at Steroids UK — injection accessories shipped from the UK.',
    answerCapsule:
      'Accessories include peptide needles, syringes and related supplies. Each listing shows pack size, GBP price and stock with tracked UK delivery.',
  },
  'ed-meds': {
    description:
      'ED support medications in the Steroids UK catalogue — tadalafil and related options with clear dosing labels and UK tracked delivery.',
    answerCapsule:
      'ED Meds at Steroids UK list tadalafil and related support products with dose, brand, GBP price and stock. Educational catalogue only — not a medical prescription service.',
  },
  viagra: {
    description:
      'Sildenafil (Viagra) catalogue options at Steroids UK with strength, brand and GBP pricing from a UK warehouse.',
    answerCapsule:
      'Viagra / sildenafil listings at Steroids UK show strength, brand, GBP price and availability with discreet UK and worldwide tracked shipping.',
  },
  kamagra: {
    description:
      'Kamagra UK and Kamagra Kamagra catalogue searches — Kamagra jelly, Kamagra 100mg oral jelly and tablet options at Steroids UK with GBP prices and discreet dispatch.',
    answerCapsule:
      'Kamagra UK / Kamagra Kamagra products include Kamagra jelly and tablet formats. Pages list brand, strength, GBP price and stock for adult catalogue purchases.',
  },
};

export function enrichCategoryDescription(
  slug: string,
  name: string,
  description: string | null | undefined
): string {
  // Prefer curated keyword copy so competitor terms stay visible on category pages.
  if (CATEGORY_SEO_COPY[slug]?.description) return CATEGORY_SEO_COPY[slug].description;
  const trimmed = (description || '').trim();
  if (trimmed) return trimmed;
  return `Browse ${name} in the Steroids UK lab-tested catalogue. Prices in GBP.`;
}

export function categoryAnswerCapsule(slug: string): string | null {
  return CATEGORY_SEO_COPY[slug]?.answerCapsule ?? null;
}

/** Visible related-search chips on category pages (keyword anchors). */
export const CATEGORY_RELATED_LINKS: Record<string, { href: string; label: string }[]> = {
  injectable: [
    { href: '/', label: 'Buy steroids UK' },
    { href: '/shop?q=testosterone', label: 'Buy testosterone' },
    { href: '/shop?q=sustanon', label: 'Buy Sustanon online' },
    { href: '/shop?q=deca', label: 'Deca Durabolin for sale' },
    { href: '/shop?q=boldenone', label: 'Equipoise for sale' },
    { href: '/shop?q=primobolan', label: 'Primobolan for sale' },
    { href: '/shop?q=trenbolone', label: 'Trenbolone UK' },
  ],
  oral: [
    { href: '/', label: 'UK steroids shop' },
    { href: '/shop?q=anavar', label: 'Anavar where to buy' },
    { href: '/shop?q=anavar', label: 'Buy Anavar UK' },
    { href: '/shop?q=dianabol', label: 'Dianabol for sale' },
    { href: '/shop?q=dianabol', label: 'Buy Dbol' },
    { href: '/shop?q=anadrol', label: 'Buy Anadrol' },
    { href: '/shop?q=turinabol', label: 'Turinabol for sale' },
  ],
  sarms: [
    { href: '/', label: 'Buy steroids UK' },
    { href: '/category/sarms', label: 'UK SARMs' },
    { href: '/category/sarms', label: 'SARMs UK' },
    { href: '/category/sarms', label: 'Buy SARMs UK' },
    { href: '/product/mk677-ibutamoren-liquid-25mg-30ml-syncom-labs', label: 'MK677 UK' },
    { href: '/product/mk677-ibutamoren-liquid-25mg-30ml-syncom-labs', label: 'Buy MK677' },
    { href: '/product/rad-140-testolone-liquid-25mg-30ml-syncom-labs', label: 'RAD 140 UK' },
  ],
  pct: [
    { href: '/', label: 'Buy steroids UK' },
    { href: '/category/pct', label: 'PCT UK' },
    { href: '/category/pct', label: 'Buy Clomid UK' },
    { href: '/category/pct', label: 'Clomid tablets' },
    { href: '/category/pct', label: 'Clomid tablet price' },
    { href: '/what-is-pct', label: 'Best PCT cycle to keep gains' },
    { href: '/category/pct', label: 'Nolvadex bodybuilding' },
    { href: '/product/hcg-pharmaqolabs', label: 'Buy HCG UK' },
    { href: '/shop?q=liv+52', label: 'Liv 52' },
  ],
  peptides: [
    { href: '/', label: 'UK steroid shop' },
    { href: '/product/bpc-157-pharmaqo-labs-5mg', label: 'BPC 157 UK' },
    { href: '/product/igf1-lr3-pharmaqo', label: 'IGF 1 LR3' },
    { href: '/product/mt-2-melanotan-10mg-pharmaqo-labs', label: 'MT 2' },
    { href: '/category/peptides', label: 'Delta sleep peptide' },
  ],
  hgh: [
    { href: '/', label: 'Steroid shop UK' },
    { href: '/category/hgh', label: 'HGH UK' },
    { href: '/category/hgh', label: 'Buy HGH UK' },
    { href: '/category/hgh', label: 'HGH injections' },
    { href: '/category/hgh', label: 'HGH buy UK' },
  ],
  'fat-loss': [
    { href: '/', label: 'Buy steroids UK' },
    { href: '/category/fat-loss', label: 'Clenbuterol tablet' },
    { href: '/category/fat-loss', label: 'Buy Clenbuterol' },
    { href: '/category/fat-loss', label: 'Clenbuterol for sale' },
    { href: '/category/fat-loss', label: 'Yohimbine UK' },
  ],
  kamagra: [
    { href: '/', label: 'Buy steroids UK' },
    { href: '/category/kamagra', label: 'Kamagra UK' },
    { href: '/product/shopkamagra-jelly', label: 'Kamagra jelly' },
    { href: '/product/lovegra-kamagra', label: 'Lovegra' },
  ],
  accessories: [
    { href: '/', label: 'Buy steroids UK' },
    { href: '/category/accessories', label: 'Peptide needles' },
    { href: '/category/accessories', label: 'Buy syringes' },
    { href: '/product/needles-syringes', label: 'Needles for testosterone' },
  ],
};

export function categoryRelatedLinks(slug: string): { href: string; label: string }[] {
  return CATEGORY_RELATED_LINKS[slug] ?? [];
}
