/** GEO answer capsules — 40–60 word direct answers per primary page intent. */
export const ANSWER_CAPSULES: Record<string, string> = {
  '/':
    'Buy steroids UK from Steroids UK — a UK steroid shop with lab-tested anabolic compounds, SARMs, PCT and stacks, tracked dispatch from a UK warehouse, plain packaging, GBP pricing, and batch verification on product pages.',
  '/shop':
    'Steroids UK buy catalogue: shop lab-tested orals, injectables, SARMs, PCT and stacks. Every listing shows GBP pricing, stock status and batch verification before checkout with UK and worldwide tracked delivery.',
  '/blog':
    'The Steroids UK knowledge hub publishes educational guides on compounds, cycles, PCT, and safe research practices. Articles are written for catalogue context only and are not medical advice.',
  '/about-us':
    'Steroids UK is run by lifters from a UK warehouse, offering a lab-tested catalogue with tracked delivery, plain packaging, and direct support — built for bodybuilders who want honest stock and responsive service.',
  '/faq':
    'Steroids UK FAQ covers UK catalogue buying context, lab testing, discreet tracked delivery, bank transfer and crypto payment, and PCT category basics. Answers are educational only and are not medical or legal advice.',
  '/glossary':
    'The Steroids UK glossary defines anabolic steroids, SARMs, PCT, esters, stacks, lab-tested batches and UK dispatch terms in plain language for catalogue buyers. Educational only — not medical advice.',
  '/oral-vs-injectable':
    'Oral products are tablets or capsules taken by mouth; injectables are typically ester oils or water-based preparations for intramuscular or subcutaneous use. Ester choice mainly affects release timing discussed in research literature. Steroids UK lists both with GBP pricing, brand, and batch context — educational catalogue use only.',
  '/sarms-vs-steroids':
    'SARMs are selective androgen receptor modulators studied as research compounds; anabolic steroids are testosterone-related synthetics sold here as oral or injectable catalogue items. Steroids UK lists both with brand, strength, GBP price, and batch context — they are not medicines and this page is not medical advice.',
  '/what-is-pct':
    'PCT (post-cycle therapy) refers to support compounds researched after anabolic use, often SERMs discussed in recovery contexts. Steroids UK’s PCT category is for catalogue browsing with GBP pricing and brand details — it is educational shopping context only and is not medical advice.',
  '/cycle-builder':
    'The Steroids UK cycle builder recommends catalogue compounds, support, and PCT based on five questions about your goal and experience. Output is educational only and not a medical or coaching protocol.',
  '/delivery-and-returns':
    'Steroids UK dispatches from a UK warehouse with tracked next-day UK delivery, European and worldwide shipping, discreet plain packaging, and a reship policy if tracked delivery fails.',
  '/payment-methods':
    'Steroids UK accepts UK bank transfer and cryptocurrency at checkout. Payment instructions are sent after order confirmation; all transactions are encrypted and processed discreetly.',
  '/crypto-payment-guides':
    'Steroids UK crypto payment guides explain how to pay with Bitcoin and other supported cryptocurrencies at checkout, including wallet setup, network fees, and order confirmation steps.',
  '/privacy-policy':
    'Steroids UK does not sell personal data or use third-party ad tracking. We collect account, shipping and payment references only to fulfil orders, support customers, and prevent fraud, with plain packaging and restricted staff access.',
  '/terms':
    'Steroids UK terms cover research-use only products for adults 18+, GBP pricing, bank transfer and crypto payment, UK/Europe/worldwide tracked shipping, a reship guarantee for lost parcels, and limited returns on sealed items.',
};

export function answerCapsuleFor(pathname: string): string | null {
  const path = pathname.split('?')[0] || '/';
  return ANSWER_CAPSULES[path] ?? null;
}
