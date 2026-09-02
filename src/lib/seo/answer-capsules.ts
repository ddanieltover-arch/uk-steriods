/** GEO answer capsules — 40–60 word direct answers per primary page intent. */
export const ANSWER_CAPSULES: Record<string, string> = {
  '/':
    'Steroids UK is a UK-based catalogue of lab-tested anabolic compounds, SARMs, PCT, and stacks with tracked next-day dispatch from a UK warehouse, plain packaging, GBP pricing, and batch verification on product pages.',
  '/shop':
    'Browse the Steroids UK shop for lab-tested orals, injectables, SARMs, PCT, and stacks. Every listing shows GBP pricing, stock status, and batch verification details before checkout with UK and worldwide tracked delivery.',
  '/blog':
    'The Steroids UK knowledge hub publishes educational guides on compounds, cycles, PCT, and safe research practices. Articles are written for catalogue context only and are not medical advice.',
  '/about-us':
    'Steroids UK is run by lifters from a UK warehouse, offering a lab-tested catalogue with tracked delivery, plain packaging, and direct support — built for bodybuilders who want honest stock and responsive service.',
  '/cycle-builder':
    'The Steroids UK cycle builder recommends catalogue compounds, support, and PCT based on five questions about your goal and experience. Output is educational only and not a medical or coaching protocol.',
  '/delivery-and-returns':
    'Steroids UK dispatches from a UK warehouse with tracked next-day UK delivery, European and worldwide shipping, discreet plain packaging, and a reship policy if tracked delivery fails.',
  '/payment-methods':
    'Steroids UK accepts UK bank transfer and cryptocurrency at checkout. Payment instructions are sent after order confirmation; all transactions are encrypted and processed discreetly.',
  '/crypto-payment-guides':
    'Steroids UK crypto payment guides explain how to pay with Bitcoin and other supported cryptocurrencies at checkout, including wallet setup, network fees, and order confirmation steps.',
};

export function answerCapsuleFor(pathname: string): string | null {
  const path = pathname.split('?')[0] || '/';
  return ANSWER_CAPSULES[path] ?? null;
}
