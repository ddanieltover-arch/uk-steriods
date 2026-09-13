export type GlossaryTerm = {
  term: string;
  slug: string;
  definition: string;
  relatedHref?: string;
  relatedLabel?: string;
};

export const GLOSSARY_PATH = '/glossary';

export const GLOSSARY_TITLE = 'Steroids & PCT Glossary (UK Catalogue)';

export const GLOSSARY_DESCRIPTION =
  'Plain-language definitions of steroids, SARMs, PCT, esters, stacks and shipping terms used across the Steroids UK catalogue. Educational only.';

/** Educational definitions for GEO entity coverage — not medical advice. */
export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Anabolic steroid',
    slug: 'anabolic-steroid',
    definition:
      'A synthetic compound related to testosterone, researched for muscle protein synthesis and recovery. On Steroids UK these appear as oral or injectable catalogue products with GBP pricing. Educational context only — not medical advice.',
    relatedHref: '/',
    relatedLabel: 'Buy steroids UK',
  },
  {
    term: 'Injectable',
    slug: 'injectable',
    definition:
      'A compound formulated for intramuscular or subcutaneous administration, typically an oil or water-based ester. Browse the injectable category for testosterone esters, nandrolone, trenbolone and stacks.',
    relatedHref: '/category/injectable',
    relatedLabel: 'Injectable steroids UK',
  },
  {
    term: 'Oral',
    slug: 'oral',
    definition:
      'A tablet or capsule anabolic product taken by mouth. Common catalogue examples include Anavar UK, Dianabol and Winstrol. Always check strength and brand on the product page.',
    relatedHref: '/category/oral',
    relatedLabel: 'Anavar UK / orals',
  },
  {
    term: 'Testosterone base',
    slug: 'testosterone-base',
    definition:
      'Testosterone without a long ester chain — often discussed as testosterone base vs test suspension and versus esterified forms such as testosterone cypionate or propionate. Catalogue buyers compare ester choice for release timing in research literature only.',
    relatedHref: '/shop?q=testosterone',
    relatedLabel: 'Buy testosterone',
  },
  {
    term: 'Testosterone cypionate',
    slug: 'testosterone-cypionate',
    definition:
      'A long-acting testosterone ester commonly listed as an injectable catalogue item. Steroids UK shows brand, strength, GBP price and batch notes on each testosterone cypionate product page.',
    relatedHref: '/product/testosterone-cypionate-proper-labs',
    relatedLabel: 'Testosterone cypionate',
  },
  {
    term: 'Clenbuterol tablet',
    slug: 'clenbuterol-tablet',
    definition:
      'Oral Clenbuterol (clen pills / clen tablets) listed under fat-loss support compounds. Educational catalogue framing only — not a weight-loss medicine claim.',
    relatedHref: '/category/fat-loss',
    relatedLabel: 'Clenbuterol tablet',
  },
  {
    term: 'SARMs',
    slug: 'sarms',
    definition:
      'Selective Androgen Receptor Modulators — research compounds that bind androgen receptors with tissue selectivity claims in literature. UK SARMs / SARMs UK catalogue includes MK677 UK (Ibutamoren) and RAD 140 UK. Sold here as research catalogue items, not medicines.',
    relatedHref: '/category/sarms',
    relatedLabel: 'UK SARMs',
  },
  {
    term: 'BPC-157',
    slug: 'bpc-157',
    definition:
      'A research peptide often searched as BPC 157 UK. Steroids UK lists brand, vial size, GBP price and batch notes on each peptide product page. Educational catalogue only — not medical advice.',
    relatedHref: '/product/bpc-157-pharmaqo-labs-5mg',
    relatedLabel: 'BPC 157 UK',
  },
  {
    term: 'Clomid (Clomiphene)',
    slug: 'clomid',
    definition:
      'A SERM discussed in PCT contexts and searched as buy Clomid UK or Clomid tablets. Catalogue listings show strength and brand; this is not a Boots pharmacy substitute or medical advice.',
    relatedHref: '/category/pct',
    relatedLabel: 'Buy Clomid UK',
  },
  {
    term: 'HCG',
    slug: 'hcg',
    definition:
      'Human chorionic gonadotropin listed as an HCG peptide / buy HCG UK catalogue item in PCT-related browsing. Educational only — not medical advice.',
    relatedHref: '/product/hcg-pharmaqolabs',
    relatedLabel: 'Buy HCG UK',
  },
  {
    term: 'PCT (Post-Cycle Therapy)',
    slug: 'pct',
    definition:
      'A post-cycle support protocol researched after anabolic use, often involving SERMs. Steroids UK lists PCT products for catalogue browsing; this is not medical guidance.',
    relatedHref: '/category/pct',
    relatedLabel: 'PCT category',
  },
  {
    term: 'Peptide',
    slug: 'peptide',
    definition:
      'A short chain of amino acids studied for signalling and recovery pathways. Catalogue examples include BPC-157 and TB-500 vials with brand and size listed on each page.',
    relatedHref: '/category/peptides',
    relatedLabel: 'Peptides category',
  },
  {
    term: 'Ester',
    slug: 'ester',
    definition:
      'A chemical attachment on a steroid molecule that slows release after injection (e.g. enanthate, cypionate, propionate). Ester choice affects injection frequency in research protocols.',
  },
  {
    term: 'Stack',
    slug: 'stack',
    definition:
      'A combination of two or more compounds used together in a research cycle. Steroids UK lists pre-built stacks and individual products that buyers often combine.',
    relatedHref: '/cycle-builder',
    relatedLabel: 'Cycle builder',
  },
  {
    term: 'Half-life',
    slug: 'half-life',
    definition:
      'The time for blood concentration of a compound to fall by roughly half. Longer esters generally mean less frequent injections in research literature — not dosing advice.',
  },
  {
    term: 'Lab-tested batch',
    slug: 'lab-tested-batch',
    definition:
      'A production lot verified against stated identity or purity claims. Steroids UK product pages surface batch verification details where available so buyers can review before purchase.',
  },
  {
    term: 'UK dispatch',
    slug: 'uk-dispatch',
    definition:
      'Orders leave a UK warehouse with tracked options for UK next-day and international shipping, typically in plain packaging. See Delivery & Returns for current timelines.',
    relatedHref: '/delivery-and-returns',
    relatedLabel: 'Delivery & returns',
  },
  {
    term: 'Discreet packaging',
    slug: 'discreet-packaging',
    definition:
      'Plain outer packaging without product branding on the outside, used to protect privacy during tracked delivery from the UK warehouse.',
    relatedHref: '/delivery-and-returns',
    relatedLabel: 'Delivery policy',
  },
];
