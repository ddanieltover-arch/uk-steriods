/**
 * Competitor-keyword product SEO enrichment (mobile-uk-20260912 batch).
 * Applied at runtime when DB seo fields are empty or descriptions are thin.
 * Educational catalogue framing only — not medical advice.
 */

export type ProductSeoLink = { href: string; label: string };

export type ProductSeoCopy = {
  seoTitle: string;
  seoDescription: string;
  shortDescription: string;
  description: string;
  relatedLinks: ProductSeoLink[];
};

export const PRODUCT_SEO_COPY: Record<string, ProductSeoCopy> = {
  'testosterone-cypionate-proper-labs': {
    seoTitle: 'Testosterone Cypionate 200 – Buy in the UK | Steroids UK',
    seoDescription:
      'Buy testosterone cypionate in the UK from Steroids UK. Lab-tested Proper Labs injectable with GBP pricing and tracked UK dispatch.',
    shortDescription:
      'Buy testosterone cypionate in the UK — lab-tested Proper Labs injectable for catalogue browsing with GBP pricing and tracked delivery.',
    description:
      'Testosterone cypionate is a long-acting injectable ester listed in our UK steroid shop. This Proper Labs 200mg listing shows batch context, GBP price and stock. Browse related buy testosterone options or return to the homepage to buy steroids UK across the full catalogue. Educational catalogue use only — not medical advice.',
    relatedLinks: [
      { href: '/shop?q=testosterone', label: 'Buy testosterone' },
      { href: '/category/injectable', label: 'Injectable steroids UK' },
      { href: '/', label: 'Buy steroids UK' },
      { href: '/product/testosterone-propionate-proper-labs', label: 'Testosterone propionate' },
    ],
  },
  'testosterone-propionate-proper-labs': {
    seoTitle: 'Testosterone Propionate – UK Catalogue | Steroids UK',
    seoDescription:
      'Testosterone propionate from Proper Labs at Steroids UK. Short-ester injectable with GBP pricing and UK tracked shipping.',
    shortDescription:
      'Testosterone propionate — short-ester injectable listed for testosterone UK buy searches with lab-tested batch notes.',
    description:
      'Testosterone propionate is a short-acting ester in our injectable range. Compare with testosterone cypionate or browse buy testosterone listings across brands. Link back to the UK steroid shop homepage for steroids for sale UK. Educational only.',
    relatedLinks: [
      { href: '/shop?q=testosterone', label: 'Testosterone UK buy' },
      { href: '/product/testosterone-cypionate-proper-labs', label: 'Testosterone cypionate' },
      { href: '/category/injectable', label: 'Injectable category' },
      { href: '/', label: 'UK steroid shop' },
    ],
  },
  'tri-test-400-spharmaqo-labs': {
    seoTitle: 'Test 400 Tri-Ester – Pharmaqo Labs | Steroids UK',
    seoDescription:
      'Test 400 (Tri-Ester Testosterone Mix) by Pharmaqo Labs. Lab-tested injectable with GBP pricing and UK dispatch.',
    shortDescription:
      'Test 400 Tri-Ester by Pharmaqo Labs — testosterone mix listed for UK catalogue buyers seeking Test 400.',
    description:
      'Test 400 from Pharmaqo Labs blends testosterone esters in one vial for catalogue browsing. Explore more Pharmaqo Labs products or buy testosterone across the injectable category. Educational catalogue context only.',
    relatedLinks: [
      { href: '/brand/pharmaqo-labs', label: 'Pharmaqo Labs' },
      { href: '/shop?q=testosterone', label: 'Testosterone for sale' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'anavar10-proper-labs': {
    seoTitle: 'Anavar 10mg – Anavar UK | Steroids UK',
    seoDescription:
      'Anavar UK — Anavar 10mg Proper Labs tablets. Anavar for sale with lab-tested batches and discreet UK shipping.',
    shortDescription:
      'Anavar UK oral oxandrolone 10mg — Anavar for sale from Proper Labs with GBP pricing and tracked delivery.',
    description:
      'Purchase Anavar or place an Anavar order from this oral listing. Compare Anavar buy options across brands and browse the oral category for Anavar UK tablets. Educational catalogue only — not medical advice.',
    relatedLinks: [
      { href: '/shop?q=anavar', label: 'Anavar for sale' },
      { href: '/category/oral', label: 'Anavar UK / orals' },
      { href: '/', label: 'Steroids for sale UK' },
    ],
  },
  'anavar-10-pharmaqo-labs': {
    seoTitle: 'Purchase Anavar 10 – Pharmaqo | Steroids UK',
    seoDescription:
      'Purchase Anavar 10mg from Pharmaqo Labs at Steroids UK. Anavar buy listing with lab-tested framing and UK dispatch.',
    shortDescription:
      'Purchase Anavar 10mg Pharmaqo — Anavar buy option with batch verification and GBP pricing.',
    description:
      'Anavar buy listing from Pharmaqo Labs. Compare Anavar order options, browse Pharmaqo brand pages, or return home to buy steroids UK. Educational catalogue use only.',
    relatedLinks: [
      { href: '/shop?q=anavar', label: 'Anavar buy' },
      { href: '/brand/pharmaqo-labs', label: 'Pharmaqo' },
      { href: '/category/oral', label: 'Oral steroids UK' },
    ],
  },
  'clenbuterol-proper-labs': {
    seoTitle: 'Clenbuterol Tablet – Clen Pills UK | Steroids UK',
    seoDescription:
      'Clenbuterol tablet and clen pills from Proper Labs. Fat-loss catalogue item with GBP pricing and UK shipping.',
    shortDescription:
      'Clenbuterol tablet (clen pills / clen tablets) — Proper Labs fat-loss catalogue listing with UK tracked dispatch.',
    description:
      'Clenbuterol tablet listings support clen pills and clen tablets searches. Browse the fat-loss category or the UK steroid shop homepage for related cutting compounds. Educational only.',
    relatedLinks: [
      { href: '/category/fat-loss', label: 'Clen tablets / fat loss' },
      { href: '/', label: 'Buy steroids UK' },
      { href: '/product/clenbuterol-pharmaqo-labs', label: 'Clen pills Pharmaqo' },
    ],
  },
  'clenbuterol-pharmaqo-labs': {
    seoTitle: 'Clen Pills – Pharmaqo Clenbuterol | Steroids UK',
    seoDescription:
      'Clen pills from Pharmaqo Labs at Steroids UK. Clenbuterol tablet catalogue option with GBP pricing.',
    shortDescription:
      'Clen pills / Clenbuterol tablet from Pharmaqo Labs with lab-tested batch notes and UK delivery.',
    description:
      'Clen pills listing under fat-loss. Compare Clenbuterol tablet options and return to buy steroids UK on the homepage. Educational catalogue framing only.',
    relatedLinks: [
      { href: '/category/fat-loss', label: 'Clenbuterol tablet' },
      { href: '/brand/pharmaqo-labs', label: 'Pharmaqo Labs' },
      { href: '/', label: 'UK steroid shop' },
    ],
  },
  'shopkamagra-jelly': {
    seoTitle: 'Kamagra Jelly 100mg UK | Steroids UK',
    seoDescription:
      'Kamagra oral jelly 100mg UK — Kamagra jelly where to buy at Steroids UK with discreet tracked dispatch.',
    shortDescription:
      'Kamagra jelly 100mg (Kamagra oral jelly UK) — adult catalogue listing with GBP pricing.',
    description:
      'Kamagra oral jelly where to buy: this Kamagra 100mg jelly listing sits in our Kamagra UK category. Browse related Kamagra products or the homepage to buy steroids UK and support items. Adults only — not medical advice.',
    relatedLinks: [
      { href: '/category/kamagra', label: 'Kamagra UK' },
      { href: '/', label: 'Steroid shop UK' },
      { href: '/category/ed-meds', label: 'ED meds' },
    ],
  },
  'trenbolone-acetate-proper-labs': {
    seoTitle: 'Trenbolone Acetate Price 10ml | Steroids UK',
    seoDescription:
      'Trenbolone acetate price 10ml — Proper Labs injectable at Steroids UK with GBP pricing and UK dispatch.',
    shortDescription:
      'Trenbolone acetate price 10ml listing — lab-tested Proper Labs injectable for UK catalogue buyers.',
    description:
      'Trenbolone acetate price 10ml searches map to this Proper Labs injectable. Browse more trenbolone options or injectable steroids UK. Educational only.',
    relatedLinks: [
      { href: '/shop?q=trenbolone', label: 'Trenbolone acetate' },
      { href: '/category/injectable', label: 'Injectable steroids UK' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'deca-300-nandrolone-decanoate-syncom-labs': {
    seoTitle: 'Deca Durabolin for Sale – Deca Steroid Price | Steroids UK',
    seoDescription:
      'Deca Durabolin for sale / Deca steroid price at Steroids UK. Nandrolone decanoate Syncom with GBP pricing and UK dispatch.',
    shortDescription:
      'Deca Durabolin for sale — nandrolone decanoate 300 with Deca steroid price listed in GBP.',
    description:
      'Deca Durabolin for sale and Deca steroid price searches map to this nandrolone listing. Compare NPP cycle options or Equipoise for sale. Educational only.',
    relatedLinks: [
      { href: '/shop?q=deca', label: 'Deca Durabolin for sale' },
      { href: '/product/npp-100-nandrolone-phenylpropionate-syncom-labs', label: 'NPP cycle' },
      { href: '/category/injectable', label: 'Injectables' },
    ],
  },
  'boldenone-proper-labs': {
    seoTitle: 'Equipoise for Sale – Boldenone Undecylenate | Steroids UK',
    seoDescription:
      'Equipoise for sale / buy boldenone online at Steroids UK. Boldenone undecylenate Proper Labs with GBP pricing.',
    shortDescription:
      'Equipoise for sale — boldenone undecylenate / buy boldenone online catalogue listing.',
    description:
      'Equipoise online and boldenone for sale searches map here. Compare Deca Durabolin for sale. Educational only.',
    relatedLinks: [
      { href: '/shop?q=boldenone', label: 'Equipoise for sale' },
      { href: '/shop?q=deca', label: 'Deca Durabolin for sale' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'mk677-ibutamoren-liquid-25mg-30ml-syncom-labs': {
    seoTitle: 'MK677 UK – Ibutamoren Liquid | Steroids UK',
    seoDescription:
      'MK677 UK / MK 677 UK (Ibutamoren) liquid from Syncom Labs. Buy MK677 in the UK SARMs catalogue with GBP pricing.',
    shortDescription:
      'MK677 UK Ibutamoren liquid — research SARM listing with batch context and tracked UK shipping.',
    description:
      'MK677 UK / MK677 for sale sits in our UK SARMs category. Browse RAD 140 UK or the homepage UK steroid shop. Educational only.',
    relatedLinks: [
      { href: '/category/sarms', label: 'UK SARMs / MK677 UK' },
      { href: '/product/rad-140-testolone-liquid-25mg-30ml-syncom-labs', label: 'RAD 140 UK' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'qomatropin-12mg-36iu-cartridge-pharmaqo-labs': {
    seoTitle: 'HGH UK / HGH Injections – Qomatropin | Steroids UK',
    seoDescription:
      'Buy HGH UK — Qomatropin HGH injections by Pharmaqo Labs at Steroids UK with GBP pricing and UK dispatch.',
    shortDescription:
      'HGH UK injections catalogue listing — Qomatropin 12mg/36IU Pharmaqo with tracked UK delivery.',
    description:
      'Buy HGH UK / HGH injections under the HGH category. Explore Pharmaqo Labs options or return to buy steroids UK. Educational catalogue framing only.',
    relatedLinks: [
      { href: '/category/hgh', label: 'HGH UK' },
      { href: '/brand/pharmaqo-labs', label: 'Pharmaqo Labs' },
      { href: '/', label: 'UK steroid shop' },
    ],
  },
  'bpc-157-pharmaqo-labs-5mg': {
    seoTitle: 'BPC 157 UK – Pharmaqo 5mg | Steroids UK',
    seoDescription:
      'BPC 157 UK research peptide from Pharmaqo Labs. Lab-tested vial with GBP pricing and tracked UK dispatch.',
    shortDescription:
      'BPC 157 UK — Pharmaqo Labs 5mg research peptide with batch context and UK tracked delivery.',
    description:
      'BPC 157 UK sits in our peptides catalogue. Browse IGF 1 LR3, MT 2 or return home to buy steroids UK. Educational research framing only — not medical advice.',
    relatedLinks: [
      { href: '/category/peptides', label: 'Peptides / BPC 157 UK' },
      { href: '/product/igf1-lr3-pharmaqo', label: 'IGF 1 LR3' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'igf1-lr3-pharmaqo': {
    seoTitle: 'IGF 1 LR3 – Pharmaqo | Steroids UK',
    seoDescription:
      'IGF 1 LR3 research peptide at Steroids UK. Pharmaqo listing with GBP pricing and UK dispatch.',
    shortDescription:
      'IGF 1 LR3 (IGF LR3) Pharmaqo research peptide for UK catalogue buyers.',
    description:
      'IGF 1 LR3 peptide listing. Compare BPC 157 UK and other peptides, or shop the UK steroid shop homepage. Educational only.',
    relatedLinks: [
      { href: '/category/peptides', label: 'Peptides' },
      { href: '/product/bpc-157-pharmaqo-labs-5mg', label: 'BPC 157 UK' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'mt-2-melanotan-10mg-pharmaqo-labs': {
    seoTitle: 'MT 2 Melanotan – Pharmaqo | Steroids UK',
    seoDescription:
      'MT 2 (Melanotan) 10mg Pharmaqo Labs research peptide at Steroids UK with UK tracked shipping.',
    shortDescription:
      'MT 2 Melanotan 10mg Pharmaqo — research peptide listing with GBP pricing.',
    description:
      'MT 2 peptide catalogue item. Browse peptides including BPC 157 UK or return to buy steroids UK. Educational only.',
    relatedLinks: [
      { href: '/category/peptides', label: 'Peptides' },
      { href: '/product/bpc-157-pharmaqo-labs-5mg', label: 'BPC 157 UK' },
      { href: '/', label: 'UK steroid shop' },
    ],
  },
  'clomid-pharmaqo-labs': {
    seoTitle: 'Buy Clomid UK – Clomid Tablets | Steroids UK',
    seoDescription:
      'Buy Clomid UK / Clomid tablets from Pharmaqo Labs. PCT catalogue listing with GBP pricing and UK dispatch.',
    shortDescription:
      'Buy Clomid UK — Clomid tablets Pharmaqo for PCT catalogue browsing with lab-tested framing.',
    description:
      'Clomid tablets for buy Clomid / buy Clomid online UK searches. Browse PCT, HCG peptide options or enclomiphene UK context pages. Educational only — not medical advice.',
    relatedLinks: [
      { href: '/category/pct', label: 'Buy Clomid UK / PCT' },
      { href: '/product/hcg-pharmaqolabs', label: 'Buy HCG' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'hcg-pharmaqolabs': {
    seoTitle: 'Buy HCG UK – Pharmaqo | Steroids UK',
    seoDescription:
      'Buy HCG UK / HCG peptide from Pharmaqo Labs at Steroids UK with GBP pricing and tracked dispatch.',
    shortDescription:
      'Buy HCG UK — HCG peptide Pharmaqo listing for PCT-related catalogue browsing.',
    description:
      'HCG peptide listing for buy HCG / order HCG searches. Pair with Clomid tablets in the PCT category. Educational only.',
    relatedLinks: [
      { href: '/category/pct', label: 'PCT / Buy HCG' },
      { href: '/product/clomid-pharmaqo-labs', label: 'Clomid tablets' },
      { href: '/', label: 'Steroid shop UK' },
    ],
  },
  'dianabol25-proper-labs': {
    seoTitle: 'Dianabol for Sale – Buy Dbol UK | Steroids UK',
    seoDescription:
      'Dianabol for sale / buy Dbol / buy Dianabol online at Steroids UK. Proper Labs oral tablets with lab-tested batches and discreet UK shipping.',
    shortDescription:
      'Dianabol for sale UK — buy Dbol / Dianabol purchase listing from Proper Labs with GBP pricing.',
    description:
      'Buy Dianabol online from this Dianabol for sale listing. Compare Anavar where to buy options or browse orals. Educational catalogue only — not before-and-after medical claims.',
    relatedLinks: [
      { href: '/shop?q=dianabol', label: 'Buy Dianabol' },
      { href: '/shop?q=anavar', label: 'Anavar where to buy' },
      { href: '/category/oral', label: 'Oral steroids UK' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'primobolan-proper-labs': {
    seoTitle: 'Primobolan for Sale – Buy Primobolan | Steroids UK',
    seoDescription:
      'Primobolan for sale / buy Primobolan at Steroids UK. Lab-tested methenolone listing with GBP pricing and UK dispatch.',
    shortDescription:
      'Primobolan for sale — buy Primobolan Proper Labs catalogue listing with tracked UK delivery.',
    description:
      'Buy Primobolan from this Primobolan for sale listing. Browse injectables or return to buy steroids UK. Educational only.',
    relatedLinks: [
      { href: '/shop?q=primobolan', label: 'Buy Primobolan' },
      { href: '/category/injectable', label: 'Injectable steroids UK' },
      { href: '/', label: 'UK steroid shop' },
    ],
  },
  'sustanon-250-proper-labs': {
    seoTitle: 'Buy Sustanon Online – Sustanon 250 | Steroids UK',
    seoDescription:
      'Buy Sustanon online — Sustanon 250 Proper Labs at Steroids UK with GBP pricing and UK tracked shipping.',
    shortDescription:
      'Buy Sustanon online — Sustanon 250 Proper Labs injectable with lab-tested batch notes.',
    description:
      'Buy Sustanon online from this Sustanon 250 listing. Compare testosterone esters or Tri Test options. Educational only.',
    relatedLinks: [
      { href: '/shop?q=sustanon', label: 'Buy Sustanon online' },
      { href: '/shop?q=testosterone', label: 'Buy testosterone' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'anavar50-proper-labs': {
    seoTitle: 'Buy Anavar 50 – Anavar Where to Buy | Steroids UK',
    seoDescription:
      'Buy Anavar 50 / Anavar where to buy at Steroids UK. Proper Labs oxandrolone with GBP pricing and discreet UK shipping.',
    shortDescription:
      'Buy Anavar 50 — Anavar steroid for sale / order Anavar listing with lab-tested framing.',
    description:
      'Buy Anavar 50 and Anavar to buy searches map here. Compare buy Anavar 10 or oxandrolone online options. Educational only.',
    relatedLinks: [
      { href: '/shop?q=anavar', label: 'Anavar where to buy' },
      { href: '/product/anavar10-proper-labs', label: 'Buy Anavar 10' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'anadrol50-proper-labs': {
    seoTitle: 'Buy Anadrol 50 – Proper Labs | Steroids UK',
    seoDescription:
      'Buy Anadrol at Steroids UK — Proper Labs oxymetholone oral with GBP pricing and UK dispatch.',
    shortDescription:
      'Buy Anadrol 50 Proper Labs — oral oxymetholone catalogue listing with tracked UK delivery.',
    description:
      'Buy Anadrol listing for Anadrol vs Anavar comparison research. Browse orals or cycle builder. Educational only — not medical advice.',
    relatedLinks: [
      { href: '/shop?q=anadrol', label: 'Buy Anadrol' },
      { href: '/shop?q=anavar', label: 'Anavar for sale' },
      { href: '/category/oral', label: 'Oral category' },
    ],
  },
  'turinabol-proper-labs': {
    seoTitle: 'Turinabol for Sale – Proper Labs | Steroids UK',
    seoDescription:
      'Turinabol for sale at Steroids UK. Proper Labs oral Tbol with lab-tested batches and UK shipping.',
    shortDescription:
      'Turinabol for sale — Proper Labs oral catalogue listing with GBP pricing.',
    description:
      'Turinabol for sale oral listing. Compare Dianabol for sale or Anavar where to buy. Educational only.',
    relatedLinks: [
      { href: '/shop?q=turinabol', label: 'Turinabol for sale' },
      { href: '/shop?q=dianabol', label: 'Dianabol for sale' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'masteron-propionate-proper-labs': {
    seoTitle: 'Masteron Propionate – Mastereon | Steroids UK',
    seoDescription:
      'Masteron (Mastereon) propionate Proper Labs injectable at Steroids UK with GBP pricing and UK dispatch.',
    shortDescription:
      'Masteron propionate (Mastereon searches) — Proper Labs injectable with lab-tested batch notes.',
    description:
      'Mastereon / Masteron propionate listing. Browse injectables or Primobolan for sale. Educational only.',
    relatedLinks: [
      { href: '/shop?q=masteron', label: 'Masteron' },
      { href: '/shop?q=primobolan', label: 'Primobolan for sale' },
      { href: '/', label: 'UK steroid shop' },
    ],
  },
  'npp-100-nandrolone-phenylpropionate-syncom-labs': {
    seoTitle: 'NPP Cycle – Nandrolone Phenylpropionate | Steroids UK',
    seoDescription:
      'NPP for NPP cycle / NPP test cycle research browsing at Steroids UK. Syncom Labs injectable with GBP pricing.',
    shortDescription:
      'NPP 100 — nandrolone phenylpropionate for NPP cycle catalogue browsing with UK dispatch.',
    description:
      'NPP cycle and test NPP cycle searches map to this listing. Use cycle builder for catalogue ideas — educational only, not a protocol.',
    relatedLinks: [
      { href: '/cycle-builder', label: 'NPP cycle planner' },
      { href: '/shop?q=testosterone', label: 'Buy testosterone' },
      { href: '/shop?q=deca', label: 'Deca Durabolin for sale' },
    ],
  },
  'dhb-100-dihydroboldenone-syncom-labs': {
    seoTitle: 'Dihydroboldenone Cypionate / DHB | Steroids UK',
    seoDescription:
      'Dihydroboldenone (DHB) Syncom Labs at Steroids UK — catalogue injectable with GBP pricing and UK dispatch.',
    shortDescription:
      'Dihydroboldenone cypionate / DHB research injectable listing with lab-tested framing.',
    description:
      'Dihydroboldenone cypionate searches map to DHB catalogue items. Compare boldenone / Equipoise for sale. Educational only.',
    relatedLinks: [
      { href: '/shop?q=dhb', label: 'DHB' },
      { href: '/shop?q=boldenone', label: 'Equipoise for sale' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'clenbuterol-spiropent-40mcg-100tabs-syncom-labs': {
    seoTitle: 'Clenbuterol 40 mcg 100 Tablets Price | Steroids UK',
    seoDescription:
      'Clenbuterol 40 mcg 100 tablets price — Syncom Spiropent-style listing. Buy Clenbuterol online with UK dispatch.',
    shortDescription:
      'Clenbuterol 40 mcg 100 tablets — buy Clenbuterol online / Clenbuterol buy catalogue listing.',
    description:
      'Clenbuterol 40 mcg 100 tablets price searches map here. Browse fat-loss for more Clenbuterol for sale options. Educational only.',
    relatedLinks: [
      { href: '/category/fat-loss', label: 'Buy Clenbuterol' },
      { href: '/product/clenbuterol-proper-labs', label: 'Clenbuterol tablet' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'lovegra-kamagra': {
    seoTitle: 'Lovegra Kamagra – UK Catalogue | Steroids UK',
    seoDescription:
      'Lovegra (Kamagra range) at Steroids UK — adult catalogue listing with GBP pricing and discreet dispatch.',
    shortDescription:
      'Lovegra Kamagra adult catalogue item with GBP pricing and UK tracked delivery.',
    description:
      'Lovegra sits in the Kamagra UK category alongside Kamagra jelly. Adults only — not medical advice.',
    relatedLinks: [
      { href: '/category/kamagra', label: 'Kamagra UK' },
      { href: '/product/shopkamagra-jelly', label: 'Kamagra jelly' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'caber-cabergoline-pharmaqo-labs-10tab-1mg': {
    seoTitle: 'Buy Cabergoline UK – Cabaser | Steroids UK',
    seoDescription:
      'Buy Cabergoline UK (Cabaser-class) Pharmaqo Labs tablets at Steroids UK with GBP pricing.',
    shortDescription:
      'Buy Cabergoline UK — Pharmaqo Caber tablets for PCT-related catalogue browsing.',
    description:
      'Cabergoline / Cabaser listing in PCT support. Educational catalogue only — not medical advice.',
    relatedLinks: [
      { href: '/category/pct', label: 'PCT' },
      { href: '/product/clomid-pharmaqo-labs', label: 'Buy Clomid UK' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'needles-syringes': {
    seoTitle: 'Peptide Needles & Syringes UK | Steroids UK',
    seoDescription:
      'Peptide needles, buy syringes and needles for testosterone at Steroids UK accessories with UK dispatch.',
    shortDescription:
      'Peptide needles / syringes accessories for catalogue customers with tracked UK shipping.',
    description:
      'Needles for peptides and needles for testosterone map to this accessories listing. Browse accessories or HGH syringe options. Educational shopping context only.',
    relatedLinks: [
      { href: '/category/accessories', label: 'Peptide needles' },
      { href: '/shop?q=testosterone', label: 'Buy testosterone' },
      { href: '/', label: 'UK steroid shop' },
    ],
  },
  'rad-140-testolone-liquid-25mg-30ml-syncom-labs': {
    seoTitle: 'RAD 140 UK – Testolone Liquid | Steroids UK',
    seoDescription:
      'RAD 140 UK (Testolone) liquid from Syncom Labs. UK SARMs catalogue with GBP pricing and UK dispatch.',
    shortDescription:
      'RAD 140 UK Testolone liquid — research SARM listing with batch context and tracked UK shipping.',
    description:
      'RAD 140 UK sits with UK SARMs / SARMs UK and MK677 UK listings. Educational research catalogue only.',
    relatedLinks: [
      { href: '/category/sarms', label: 'UK SARMs' },
      { href: '/product/mk677-ibutamoren-liquid-25mg-30ml-syncom-labs', label: 'MK677 UK' },
      { href: '/', label: 'Buy steroids UK' },
    ],
  },
  'testosterone-enanthate-proper-labs': {
    seoTitle: 'Test 300 / Testosterone Enanthate | Steroids UK',
    seoDescription:
      'Test 300-class testosterone enanthate Proper Labs — buy testosterone UK with lab-tested batch notes.',
    shortDescription:
      'Testosterone enanthate (Test 300 searches) — Proper Labs injectable with GBP pricing and UK dispatch.',
    description:
      'Test 300 / testosterone enanthate listing. Compare testosterone cypionate or Test 400 Pharmaqo options. Educational only.',
    relatedLinks: [
      { href: '/shop?q=testosterone', label: 'Buy testosterone' },
      { href: '/product/testosterone-cypionate-proper-labs', label: 'Testosterone cypionate' },
      { href: '/product/tri-test-400-spharmaqo-labs', label: 'Test 400' },
    ],
  },
};

export function productSeoFor(slug: string): ProductSeoCopy | null {
  return PRODUCT_SEO_COPY[slug] ?? null;
}

export function enrichProductSeoTitle(slug: string, name: string, existing?: string | null): string {
  if (existing?.trim()) return existing;
  return productSeoFor(slug)?.seoTitle || `${name} | Steroids UK`;
}

export function enrichProductSeoDescription(
  slug: string,
  fallback: string,
  existing?: string | null
): string {
  if (existing?.trim()) return existing;
  return productSeoFor(slug)?.seoDescription || fallback;
}

export function enrichProductShortDescription(
  slug: string,
  existing: string | null | undefined
): string {
  const trimmed = (existing || '').trim();
  const enriched = productSeoFor(slug);
  if (!enriched) return trimmed;
  if (!trimmed || trimmed.length < 60) return enriched.shortDescription;
  return trimmed;
}

export function enrichProductDescription(slug: string, existing: string | null | undefined): string {
  const trimmed = (existing || '').trim();
  const enriched = productSeoFor(slug);
  if (!enriched) return trimmed;
  if (!trimmed || trimmed.length < 80 || trimmed === enrichProductShortDescription(slug, trimmed)) {
    return enriched.description;
  }
  return trimmed;
}
