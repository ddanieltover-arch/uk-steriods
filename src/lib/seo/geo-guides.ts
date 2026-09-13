/**
 * GEO comparison / pillar guides — educational catalogue literacy only.
 * Not medical advice, dosing protocols, or legal counsel.
 */

export type GeoFaq = { question: string; answer: string };

export type GeoSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: { headers: [string, string, string]; rows: [string, string, string][] };
};

export type GeoGuide = {
  path: string;
  title: string;
  description: string;
  intro: string;
  answerCapsule: string;
  datePublished: string;
  dateModified: string;
  sections: GeoSection[];
  faqs: GeoFaq[];
  howTo?: { name: string; description: string; steps: { name: string; text: string }[] };
  relatedLinks: { href: string; label: string }[];
  primaryCtas: { href: string; label: string }[];
};

export const GEO_GUIDE_PATHS = [
  '/oral-vs-injectable',
  '/sarms-vs-steroids',
  '/what-is-pct',
] as const;

export type GeoGuidePath = (typeof GEO_GUIDE_PATHS)[number];

export const ORAL_VS_INJECTABLE: GeoGuide = {
  path: '/oral-vs-injectable',
  title: 'Oral vs Injectable Steroids — Catalogue Differences (UK)',
  description:
    'How oral tablets and injectable esters differ in the Steroids UK catalogue: format, esters, browsing tips. Educational only — not medical advice.',
  intro:
    'A plain-language comparison of oral and injectable catalogue formats so you can browse the right category with clearer expectations. Educational shopping context only — not medical or legal advice.',
  answerCapsule:
    'Oral products are tablets or capsules taken by mouth; injectables are typically ester oils or water-based preparations for intramuscular or subcutaneous use. Ester choice mainly affects release timing discussed in research literature. Steroids UK lists both with GBP pricing, brand, and batch context — educational catalogue use only.',
  datePublished: '2026-09-13',
  dateModified: '2026-09-13',
  sections: [
    {
      id: 'difference',
      heading: 'What is the difference between oral and injectable compounds?',
      paragraphs: [
        'In catalogue terms, the main split is delivery format. Orals are finished as tablets or capsules with a stated milligram strength per unit. Injectables are finished as vials or ampoules, usually an oil solution of an esterified compound, sometimes a water-based or suspension format depending on the product.',
        'That format difference drives how listings are written on Steroids UK. Oral pages emphasise tablet count and mg strength. Injectable pages emphasise concentration (for example mg/ml), vial size, and the ester name when it is part of the product title. Neither page type is a prescription, protocol, or coaching plan.',
        'Buyers often start by deciding which format they want to research, then filter by brand and compound. If you are still learning vocabulary, the glossary definitions for oral, injectable, and ester are useful before you compare individual SKUs.',
      ],
      table: {
        headers: ['Topic', 'Oral catalogue items', 'Injectable catalogue items'],
        rows: [
          ['Typical form', 'Tablets or capsules', 'Vials / ampoules (often oil)'],
          ['Label focus', 'mg per tab + pack size', 'mg/ml, volume, ester name'],
          ['Category hub', '/category/oral', '/category/injectable'],
          ['Common examples', 'Anavar, Dianabol, Winstrol tabs', 'Testosterone esters, nandrolone, trenbolone'],
        ],
      },
    },
    {
      id: 'esters',
      heading: 'How do esters change release timing?',
      paragraphs: [
        'An ester is a chemical attachment on a steroid molecule. In research and bodybuilding literature, longer esters are generally associated with slower release after injection, and shorter esters with faster clearance — which is why injection frequency discussions often mention enanthate, cypionate, propionate, and similar names.',
        'On product pages, the ester is part of how the item is identified (for example testosterone enanthate versus propionate). It is a labelling and comparison clue, not a dose calculator. Steroids UK does not turn ester names into medical schedules.',
        'Oral products usually do not use the same ester framing. Instead, listings focus on the parent compound name and tablet strength. If a stack mixes oral and injectable lines, treat each SKU’s label independently when you compare catalogue options.',
      ],
      bullets: [
        'Longer esters (e.g. enanthate, cypionate) → often discussed as less frequent injections in literature',
        'Shorter esters (e.g. propionate, acetate) → often discussed as faster clearance',
        'Always read the exact product title, brand, and strength on the Steroids UK listing',
      ],
    },
    {
      id: 'browse',
      heading: 'Which catalogue categories should I browse first?',
      paragraphs: [
        'Start with the format hubs: Oral for tablets and capsules, Injectable for vials and ester oils. From there, open brand pages if you already trust a manufacturer, or use shop search for a compound name such as testosterone, Anavar, or Dianabol.',
        'Many customers also cross-check PCT and support categories when planning a research cycle timeline — again as catalogue browsing, not as a medical plan. The cycle builder can suggest educational product groupings from five questions about goals and experience.',
        'Delivery and payment pages explain UK dispatch, plain packaging, bank transfer, and crypto checkout once you are ready to order. Keep legality questions against official UK sources; Steroids UK content is shopping and literacy support, not counsel.',
      ],
    },
    {
      id: 'quality',
      heading: 'What should you check on every listing?',
      paragraphs: [
        'Regardless of oral or injectable format, useful listing signals include brand name, SKU, stated strength, pack or vial size, stock status, GBP price, and any batch verification notes shown on the product page.',
        'Compare like with like: an oral 10 mg × 50 pack is not the same shopping unit as a 250 mg/ml × 10 ml vial. Use category filters and product titles carefully so you do not mix formats when reading prices.',
        'If two listings look similar, open both pages and compare brand, ester or strength wording, and image set. Prefer clear titles over vague “test blend” style names when you need precision.',
      ],
    },
    {
      id: 'legality',
      heading: 'UK legality context (not legal advice)',
      paragraphs: [
        'Anabolic steroids and related compounds sit under UK controlled-drug frameworks that change over time. Possession, supply, and importation rules are not the same as “it ships from the UK, so it must be fine.” Always verify current law with official sources before you act.',
        'For authoritative UK lists and guidance, start with the government’s controlled drugs materials on GOV.UK. Steroids UK pages do not replace legal advice or a solicitor’s opinion.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Are oral steroids weaker than injectables?',
      answer:
        'Not as a catalogue rule. Strength depends on the compound, dose form, and listing specs. Compare SKUs by label — do not assume oral equals weak or injectable equals strong.',
    },
    {
      question: 'Do I need PCT because I browsed injectables?',
      answer:
        'No. PCT is a separate research topic and catalogue category. Browsing injectables does not create a medical requirement. See the What is PCT guide for literacy context only.',
    },
    {
      question: 'Can I mix oral and injectable products in one order?',
      answer:
        'Yes as a shopping basket. Each product still has its own label, brand, and stock status. Mixing formats in a cart is not a recommended cycle — only a checkout convenience.',
    },
    {
      question: 'Where do I find esters explained in one place?',
      answer:
        'See the glossary ester definition, then open injectable product titles that include enanthate, cypionate, propionate, or similar names.',
    },
  ],
  relatedLinks: [
    { href: '/category/oral', label: 'Oral category' },
    { href: '/category/injectable', label: 'Injectable category' },
    { href: '/glossary', label: 'Glossary' },
    { href: '/faq', label: 'FAQ hub' },
    { href: '/sarms-vs-steroids', label: 'SARMs vs steroids' },
    { href: '/what-is-pct', label: 'What is PCT?' },
  ],
  primaryCtas: [
    { href: '/category/oral', label: 'Browse orals' },
    { href: '/category/injectable', label: 'Browse injectables' },
  ],
};

export const SARMS_VS_STEROIDS: GeoGuide = {
  path: '/sarms-vs-steroids',
  title: 'SARMs vs Anabolic Steroids — Research Catalogue Context',
  description:
    'How SARMs and anabolic steroids differ as Steroids UK catalogue categories: definitions, listing cues, and browsing tips. Educational only.',
  intro:
    'SARMs and anabolic steroids are often compared in forums. This page explains how they appear as separate research-oriented catalogue groups on Steroids UK — not as medicines or coaching advice.',
  answerCapsule:
    'SARMs are selective androgen receptor modulators studied as research compounds; anabolic steroids are testosterone-related synthetics sold here as oral or injectable catalogue items. Steroids UK lists both with brand, strength, GBP price, and batch context — they are not medicines and this page is not medical advice.',
  datePublished: '2026-09-13',
  dateModified: '2026-09-13',
  sections: [
    {
      id: 'definitions',
      heading: 'What are SARMs vs anabolic steroids in catalogue language?',
      paragraphs: [
        'Anabolic steroids on Steroids UK are synthetic compounds related to testosterone, offered as oral tablets/capsules or injectable preparations. Listings emphasise compound name, ester where relevant, strength, brand, and pack format.',
        'SARMs (selective androgen receptor modulators) are a different chemical class discussed in research literature for tissue-selective androgen receptor activity. On this shop they live primarily under the SARMs category as research catalogue items, not as licensed medicines.',
        'The practical shopping difference is category and labelling. Do not assume a SARM listing is “a milder steroid” or that a steroid listing is automatically “stronger.” Compare the exact SKU text.',
        'Both groups can appear in the same customer journey: someone may research SARMs first, then open oral or injectable hubs, or the reverse. Keep the vocabulary straight so search filters and category chips send you to the right shelf.',
      ],
      table: {
        headers: ['Topic', 'SARMs category', 'Anabolic steroids (oral/injectable)'],
        rows: [
          ['Typical framing', 'Research compounds / SARMs', 'Oral or injectable anabolics'],
          ['Common names', 'LGD-4033, RAD-140, Ostarine', 'Testosterone, Anavar, Dianabol, trenbolone'],
          ['Hub', '/category/sarms', '/category/oral and /category/injectable'],
          ['Medical status', 'Not medicines on this site', 'Not medicines on this site'],
        ],
      },
    },
    {
      id: 'why-compare',
      heading: 'Why do buyers compare SARMs and steroids?',
      paragraphs: [
        'Forum threads often frame SARMs as alternatives to traditional anabolics. That conversation mixes marketing language, anecdotes, and chemistry. Steroids UK keeps the comparison at catalogue literacy: two browseable groups with different naming conventions.',
        'If your goal is simply to find a product family, use category hubs first. If your goal is to understand terms, use the glossary entries for SARMs and anabolic steroid, then return to listings.',
        'Neither category page is a safety ranking. Research literature, bloodwork discussions, and legal status are outside what a product card can responsibly decide for you.',
        'Comparison searches such as “SARMs vs steroids” are informational. This page answers them with definitions and browsing cues, then points you to live stock pages rather than inventing outcomes or dosages.',
      ],
    },
    {
      id: 'listing-cues',
      heading: 'How do product pages differ?',
      paragraphs: [
        'SARM listings usually lead with the research code or common name (for example LGD-4033 or RAD-140), bottle or blister format, and mg strength. Steroid listings more often include ester names on injectables or classic trade-style names on orals.',
        'Batch verification notes, brand reputation, and stock status matter in both groups. Prefer clear SKUs over vague “SARM stack” titles when you need precise comparison.',
        'Stacks that mix SARMs and steroids may appear as named bundles. Open the bundle description and linked products so you know which compounds are included before checkout.',
        'Price comparison only works within a format. A SARM bottle and a testosterone vial are different shopping units — read strength and pack size before judging GBP price.',
      ],
    },
    {
      id: 'research-codes',
      heading: 'How to read SARM research codes on labels?',
      paragraphs: [
        'Many SARM titles use alphanumeric research codes. Those codes are identification aids for catalogue search, not proof of pharmaceutical licensing. Match the code on the bottle image and the title string before you add to cart.',
        'Some products also show a popular nickname beside the code. Treat nicknames as secondary; the code and mg strength are the primary match keys when comparing two brands.',
        'If a listing uses only a marketing stack name without disclosing contents, open the description or choose a more explicit SKU. Clear labelling helps both customers and search engines understand the entity on the page.',
      ],
    },
    {
      id: 'pct-and-support',
      heading: 'Where do PCT and support fit?',
      paragraphs: [
        'PCT (post-cycle therapy) is its own educational topic and catalogue category. Some customers research PCT after either SARM or steroid discussions online. That does not mean every browse requires PCT products.',
        'Use the What is PCT guide for definitions, then the PCT category for SKUs. Keep medical decisions with qualified professionals — shop pages only show what is in stock.',
        'Support accessories and delivery pages are shared across categories. Packaging and tracking policies do not change because an item sits under SARMs versus injectables.',
      ],
    },
    {
      id: 'legality',
      heading: 'UK legality context (not legal advice)',
      paragraphs: [
        'Legal classification for anabolic steroids, SARMs, and related substances can differ and can change. Importation and supply rules are especially sensitive. Check current UK controlled-drug guidance on GOV.UK rather than relying on forum summaries.',
        'Steroids UK ships from a UK warehouse with tracked options, but shipping logistics are not a legal clearance certificate.',
        'When in doubt, pause the purchase decision until you have read primary legal sources or spoken with a qualified adviser. Educational catalogue pages cannot clear legal risk.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Are SARMs steroids?',
      answer:
        'No. SARMs are a different compound class. They may be discussed alongside steroids in forums, but catalogue pages treat them as a separate category.',
    },
    {
      question: 'Which is better for beginners?',
      answer:
        'Steroids UK does not rank medical suitability. Beginners should research legality, health screening, and trusted education first — then browse categories for product literacy only.',
    },
    {
      question: 'Do SARMs need PCT?',
      answer:
        'That is a medical/research question, not a shop rule. PCT products are available as a category; whether you need them is not decided by this website.',
    },
    {
      question: 'Can I buy both SARMs and steroids together?',
      answer:
        'Yes as separate catalogue items in one order if stock allows. Combining compounds is not a recommended protocol from Steroids UK.',
    },
  ],
  relatedLinks: [
    { href: '/category/sarms', label: 'SARMs category' },
    { href: '/category/oral', label: 'Oral steroids' },
    { href: '/category/injectable', label: 'Injectable steroids' },
    { href: '/glossary#sarms', label: 'Glossary: SARMs' },
    { href: '/oral-vs-injectable', label: 'Oral vs injectable' },
    { href: '/what-is-pct', label: 'What is PCT?' },
    { href: '/faq', label: 'FAQ hub' },
  ],
  primaryCtas: [
    { href: '/category/sarms', label: 'Browse SARMs' },
    { href: '/shop', label: 'Shop full catalogue' },
  ],
};

export const WHAT_IS_PCT: GeoGuide = {
  path: '/what-is-pct',
  title: 'What Is PCT? Post-Cycle Therapy Explained for Catalogue Buyers',
  description:
    'What PCT means in bodybuilding catalogue language, how SERMs appear on Steroids UK, and how to browse the PCT category. Educational only — not medical advice.',
  intro:
    'PCT (post-cycle therapy) is one of the most searched terms around anabolic research. This pillar explains the vocabulary and how the PCT category works on Steroids UK — without turning the page into a dosing protocol.',
  answerCapsule:
    'PCT (post-cycle therapy) refers to support compounds researched after anabolic use, often SERMs discussed in recovery contexts. Steroids UK’s PCT category is for catalogue browsing with GBP pricing and brand details — it is educational shopping context only and is not medical advice.',
  datePublished: '2026-09-13',
  dateModified: '2026-09-13',
  sections: [
    {
      id: 'definition',
      heading: 'What does PCT mean?',
      paragraphs: [
        'PCT stands for post-cycle therapy. In bodybuilding and research communities, it usually means a period and set of compounds discussed after a “cycle” of anabolic steroids or related agents, with the stated aim of supporting recovery of the body’s own hormone signalling.',
        'On Steroids UK, PCT is also a product category: SERMs and related support SKUs with clear brands, strengths, and prices. The category name describes what customers search for; it does not certify a medical protocol.',
        'If you only need a one-line definition, use the glossary PCT entry, then return here for browsing structure and FAQs.',
        'Search queries such as “what is PCT” or “post cycle therapy UK” are informational. This pillar answers them with vocabulary, category navigation, and compliance-safe framing — not personalised therapy plans.',
      ],
    },
    {
      id: 'serms',
      heading: 'What are SERMs in PCT discussions?',
      paragraphs: [
        'SERM means selective estrogen receptor modulator. Compounds such as clomiphene (often called Clomid in listings) and tamoxifen appear frequently in PCT conversations and in our PCT catalogue.',
        'Listing names can use brand-style labels or chemical names. Always open the product page for strength, tablet count, and brand rather than relying on forum shorthand alone.',
        'SERMs are not interchangeable with aromatase inhibitors or with injectable anabolics. Keep categories separate when you compare baskets.',
        'When two PCT listings look similar, compare brand, mg per tablet, and pack count before judging price. Catalogue literacy beats forum nicknames.',
      ],
    },
    {
      id: 'when-people-look',
      heading: 'When do customers look at PCT products?',
      paragraphs: [
        'People typically browse PCT when planning education around a research cycle timeline, when reading blog guides, or when the cycle builder suggests support categories. None of those flows is a clinical prescription.',
        'Some customers buy PCT items in the same order as orals or injectables for convenience. That is checkout behaviour, not evidence that PCT is required for every purchase.',
        'If you have health concerns, speak to a qualified clinician. Shop content cannot interpret bloodwork or diagnose suppression.',
        'Others browse PCT purely to understand what the category contains before deciding whether it is relevant to them. That research-only visit is a valid use of the page.',
      ],
    },
    {
      id: 'browse-pct',
      heading: 'How to browse the PCT category on Steroids UK',
      paragraphs: [
        'Open the PCT category hub, filter by brand if you already have a preference, and compare strength and pack size on each product page. Use search if you know a specific name such as Clomid.',
        'Cross-link to delivery and payment pages when you are ready to order. Tracked UK dispatch and plain packaging apply to PCT SKUs the same way as other catalogue items.',
        'The steps below are shopping steps only — they are not a therapy schedule.',
        'If stock changes, rely on the live category page rather than screenshots from forums. Sitemap and category hubs update from the catalogue database.',
      ],
    },
    {
      id: 'related-topics',
      heading: 'How PCT connects to other guides',
      paragraphs: [
        'Oral vs injectable explains format differences for anabolic catalogue items that people often discuss before PCT. SARMs vs steroids clarifies another comparison that frequently appears in the same forums.',
        'The cycle builder remains an educational recommender based on five questions. Treat outputs as catalogue suggestions to review, not as medical orders.',
        'FAQ hub answers cover delivery, payment, and buying context that apply after you have finished reading this pillar.',
        'Glossary fragments such as /glossary#pct keep short definitions available for AI and human skimmers who need a capsule answer first.',
      ],
    },
    {
      id: 'myths',
      heading: 'Common PCT myths to avoid on shop pages',
      paragraphs: [
        'Myth: “If it is in the PCT category, it is safe for everyone.” Reality: category placement is retail organisation, not a safety certificate.',
        'Myth: “Buying PCT means you should start a cycle.” Reality: browsing or purchasing support compounds does not instruct you to use anabolics.',
        'Myth: “Forum dose charts belong on the product page.” Reality: Steroids UK product pages show commercial specs — strength, brand, price, stock — not personalised medical dosing.',
        'Treat third-party charts as external claims you must verify elsewhere. Our guides stay inside catalogue literacy on purpose.',
      ],
    },
    {
      id: 'legality',
      heading: 'UK legality and responsible framing',
      paragraphs: [
        'Many PCT-related and anabolic substances are controlled or otherwise regulated in the UK. Read current GOV.UK controlled drugs guidance before making decisions about possession or importation.',
        'Steroids UK provides educational catalogue pages and customer service about stock and shipping. We do not provide legal representation or clinical care.',
        'Laws and scheduling lists change. Re-check primary sources periodically rather than relying on a single blog post or chat message.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Is PCT mandatory after every cycle?',
      answer:
        'This site cannot answer that medically. PCT is a researched topic and a product category. Whether any individual needs specific compounds requires professional advice.',
    },
    {
      question: 'What products are in the PCT category?',
      answer:
        'Primarily SERM-style and related support listings such as clomiphene/Clomid-style tablets, depending on current stock. Check /category/pct for live SKUs.',
    },
    {
      question: 'Does buying PCT mean I should run a cycle?',
      answer:
        'No. PCT products can be browsed independently. Purchasing support compounds is not an instruction to use anabolics.',
    },
    {
      question: 'Where can I learn terms like SERM and half-life?',
      answer:
        'Use the Steroids UK glossary for short definitions, then return to category pages for product specifics.',
    },
  ],
  howTo: {
    name: 'How to browse PCT products on Steroids UK',
    description:
      'Shopping steps to find PCT catalogue items. Not a medical or dosing protocol.',
    steps: [
      {
        name: 'Open the PCT category',
        text: 'Go to /category/pct to see live post-cycle support listings with GBP prices.',
      },
      {
        name: 'Compare brand and strength',
        text: 'Open individual product pages and note brand, mg strength, pack size, and stock status.',
      },
      {
        name: 'Optional: use search or cycle builder',
        text: 'Search a known name or use the educational cycle builder for catalogue suggestions — not medical orders.',
      },
      {
        name: 'Checkout when ready',
        text: 'Add items to cart and pay via UK bank transfer or crypto. Review delivery and returns policy before purchase.',
      },
    ],
  },
  relatedLinks: [
    { href: '/category/pct', label: 'PCT category' },
    { href: '/glossary#pct', label: 'Glossary: PCT' },
    { href: '/cycle-builder', label: 'Cycle builder' },
    { href: '/faq', label: 'FAQ hub' },
    { href: '/oral-vs-injectable', label: 'Oral vs injectable' },
    { href: '/sarms-vs-steroids', label: 'SARMs vs steroids' },
  ],
  primaryCtas: [
    { href: '/category/pct', label: 'Browse PCT' },
    { href: '/cycle-builder', label: 'Open cycle builder' },
  ],
};

export const GEO_GUIDES: Record<GeoGuidePath, GeoGuide> = {
  '/oral-vs-injectable': ORAL_VS_INJECTABLE,
  '/sarms-vs-steroids': SARMS_VS_STEROIDS,
  '/what-is-pct': WHAT_IS_PCT,
};

export function isGeoGuidePath(pathname: string): pathname is GeoGuidePath {
  return (GEO_GUIDE_PATHS as readonly string[]).includes(pathname);
}

export function getGeoGuide(pathname: string): GeoGuide | null {
  if (!isGeoGuidePath(pathname)) return null;
  return GEO_GUIDES[pathname];
}

export const GOV_UK_CONTROLLED_DRUGS_URL =
  'https://www.gov.uk/government/publications/controlled-drugs-list--2';
