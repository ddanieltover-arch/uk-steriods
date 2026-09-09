/** Shared FAQ hub content — client page, SSR crawlable HTML, and FAQPage JSON-LD. */

export const FAQ_HUB_PATH = '/faq';

export const FAQ_HUB_TITLE = 'FAQ: Buying Steroids in the UK';

export const FAQ_HUB_DESCRIPTION =
  'Answers on UK catalogue buying, legality context, lab testing, delivery, payment, and PCT. Educational only — not medical advice.';

export type FaqItem = { question: string; answer: string };

export const FAQ_HUB_SECTIONS: { heading: string; items: FaqItem[] }[] = [
  {
    heading: 'Legality & buying context',
    items: [
      {
        question: 'Is it legal to buy steroids in the UK?',
        answer:
          'In the UK, anabolic steroids are Class C controlled drugs. Possession for personal use is not typically prosecuted the same way as supply offences, but importing, producing, or supplying without a licence can break the law. Steroids UK is a private catalogue for adult research and education contexts only. We are not a pharmacy, do not prescribe medicines, and do not give medical or legal advice. Check current UK law and seek qualified advice before making any decision.',
      },
      {
        question: 'Who can order from Steroids UK?',
        answer:
          'Orders are restricted to adults aged 18 or over. By placing an order you confirm you meet that age requirement and accept our terms. We do not sell to minors.',
      },
      {
        question: 'Are products sold as medicines or for human consumption?',
        answer:
          'No. Catalogue items are offered for research and educational context only. Nothing on this site is medical advice, a prescription, or a treatment claim. Do not use any product without independent professional guidance.',
      },
    ],
  },
  {
    heading: 'Catalogue, quality & testing',
    items: [
      {
        question: 'What does lab-tested mean at Steroids UK?',
        answer:
          'We list lab-tested batches where verification details are available on product pages. Testing is about batch identity and quality signals for the catalogue — it is not a clinical endorsement or a guarantee of outcomes. Always read the product page for batch notes before checkout.',
      },
      {
        question: 'Which product types do you stock?',
        answer:
          'The catalogue typically covers injectables, orals, SARMs, PCT support, peptides, HGH-related listings, fat-loss compounds, ED meds, and accessories. Browse by category or use shop search to find a specific compound or brand.',
      },
      {
        question: 'How do I choose a beginner-friendly product?',
        answer:
          'Start with educational reading (guides and PCT context), then browse categories such as orals, injectables, or beginner stacks if listed. Product pages show GBP pricing, stock, and batch notes. We do not design personal cycles or medical protocols — use the Cycle Builder for catalogue recommendations only.',
      },
    ],
  },
  {
    heading: 'Delivery & packaging',
    items: [
      {
        question: 'Do you ship from the UK with discreet packaging?',
        answer:
          'Yes. Orders dispatch from a UK warehouse in plain packaging with no external brand references to contents. UK, Europe, and worldwide tracked options are available. See Delivery & Returns for current rates and times.',
      },
      {
        question: 'How fast is UK delivery?',
        answer:
          'UK Tracked 48 is typically 2–3 working days. Special Delivery 24 is typically 1–2 working days. Discrete Delivery is typically 2–4 working days. Times are estimates, not guarantees. Tracking is emailed when the order ships.',
      },
      {
        question: 'What if a tracked parcel does not arrive?',
        answer:
          'If a tracked package is lost or undeliverable, we reship at no extra cost or refund in full under our delivery policy. Contact support with your order number.',
      },
    ],
  },
  {
    heading: 'Payment',
    items: [
      {
        question: 'How can I pay?',
        answer:
          'Checkout supports UK bank transfer and cryptocurrency. Card payments are not accepted. Contact admin after ordering for payment instructions. Crypto checkout includes an automatic merchandise discount where shown at checkout.',
      },
      {
        question: 'Is crypto payment private?',
        answer:
          'We process crypto via a deposit address and confirm on-chain. We do not sell customer payment data. Full steps are in Crypto Payment Guides and Payment Methods.',
      },
    ],
  },
  {
    heading: 'PCT, SARMs & comparisons',
    items: [
      {
        question: 'What is PCT and do you stock it?',
        answer:
          'PCT means post-cycle therapy support products discussed in educational catalogue context. Browse the PCT category for listed compounds. PCT pages are not medical protocols — speak to a qualified professional for personal health decisions.',
      },
      {
        question: 'What is the difference between SARMs and anabolic steroids?',
        answer:
          'Anabolic steroids are androgenic compounds historically used in clinical and athletic contexts; SARMs are a separate research compound class with different selectivity profiles. Both appear in our educational catalogue under their own categories. Neither listing is medical advice.',
      },
      {
        question: 'Oral vs injectable — which should I browse first?',
        answer:
          'Orals and injectables are separate catalogue categories with different product forms and handling notes on each PDP. Choice depends on your research goal and experience. Use category pages and product specs — we do not recommend personal dosing.',
      },
    ],
  },
];

export function flatFaqHubItems(): FaqItem[] {
  return FAQ_HUB_SECTIONS.flatMap((section) => section.items);
}
