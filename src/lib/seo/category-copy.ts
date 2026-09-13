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
      'Buy Anavar UK, Dianabol for sale, Primobolan orals and Turinabol for sale at Steroids UK — Anavar where to buy, buy Dbol and oxandrolone with lab-tested batches and discreet UK shipping.',
    answerCapsule:
      'Oral catalogue covers Anavar where to buy, Dianabol for sale / buy Dbol, Anadrol and Turinabol listings with strength, brand, GBP price and stock before checkout.',
  },
  sarms: {
    description:
      'UK SARMs and SARMs UK catalogue at Steroids UK — MK677 UK, RAD 140 UK, LGD-4033 and Ostarine with batch verification and GBP pricing.',
    answerCapsule:
      'UK SARMs at Steroids UK include MK677 UK (Ibutamoren), RAD 140 UK and related research compounds. Pages show brand, dose format, GBP price and lab-test context for catalogue browsing.',
  },
  pct: {
    description:
      'Post-cycle therapy (PCT) UK support at Steroids UK — buy Clomid UK, enclomiphene UK context, HCG peptide listings and Liv 52 style support with UK dispatch. Educational only, not medical advice.',
    answerCapsule:
      'PCT products cover Clomid tablets, buy Clomid UK searches, HCG and related support compounds. Content is educational catalogue context only and is not medical advice.',
  },
  peptides: {
    description:
      'Research peptides at Steroids UK — BPC 157 UK, IGF 1 LR3, MT 2 and related vials with lab-tested framing, GBP prices and tracked UK delivery.',
    answerCapsule:
      'Peptides include BPC 157 UK, IGF 1 LR3 and MT 2 research vials. Listings show brand, size, GBP price and stock with discreet tracked shipping from the UK.',
  },
  hgh: {
    description:
      'HGH UK and HGH injections catalogue at Steroids UK — buy HGH UK listings with brand, IU/mg details, GBP pricing and UK warehouse dispatch.',
    answerCapsule:
      'HGH UK injections show brand, cartridge or vial format, strength, GBP price and stock for research-use catalogue browsing.',
  },
  'fat-loss': {
    description:
      'Buy Clenbuterol and Clenbuterol for sale at Steroids UK — Clenbuterol tablet, clen pills and related fat-loss support with lab-tested framing and UK shipping.',
    answerCapsule:
      'Fat-loss items cover buy Clenbuterol / Clenbuterol tablet searches and related cutting compounds. Listings include brand, dose, GBP price and stock — educational only.',
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
      'Kamagra UK — Kamagra jelly, Kamagra 100mg oral jelly and tablet options at Steroids UK with GBP prices and discreet dispatch.',
    answerCapsule:
      'Kamagra UK products include Kamagra jelly and tablet formats. Pages list brand, strength, GBP price and stock for adult catalogue purchases.',
  },
};

export function enrichCategoryDescription(
  slug: string,
  name: string,
  description: string | null | undefined
): string {
  const trimmed = (description || '').trim();
  const thin = !trimmed || trimmed.toLowerCase() === name.toLowerCase() || trimmed.length < 40;
  if (!thin) return trimmed;
  return CATEGORY_SEO_COPY[slug]?.description || `Browse ${name} in the Steroids UK lab-tested catalogue. Prices in GBP.`;
}

export function categoryAnswerCapsule(slug: string): string | null {
  return CATEGORY_SEO_COPY[slug]?.answerCapsule ?? null;
}
