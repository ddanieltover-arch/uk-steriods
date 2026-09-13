/** Static resource-page SEO definitions shared by client SeoHead and server SSR injection. */
export const RESOURCE_PAGE_SEO: Record<
  string,
  { title: string; description: string; changefreq: 'monthly' | 'weekly'; priority: string }
> = {
  '/about-us': {
    title: 'About Us',
    description:
      'Real people, real bodybuilding, shipped from a UK warehouse. Lab-tested catalogue run by lifters who answer your messages.',
    changefreq: 'monthly',
    priority: '0.6',
  },
  '/faq': {
    title: 'FAQ: Buying Steroids in the UK',
    description:
      'Answers on UK catalogue buying, legality context, lab testing, delivery, payment, and PCT. Educational only — not medical advice.',
    changefreq: 'weekly',
    priority: '0.8',
  },
  '/glossary': {
    title: 'Steroids & PCT Glossary',
    description:
      'Plain-language definitions of steroids, SARMs, PCT, esters, stacks and UK shipping terms. Educational catalogue context only.',
    changefreq: 'monthly',
    priority: '0.7',
  },
  '/oral-vs-injectable': {
    title: 'Oral vs Injectable Steroids',
    description:
      'How oral tablets and injectable esters differ in the Steroids UK catalogue. Educational only — not medical advice.',
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/sarms-vs-steroids': {
    title: 'SARMs vs Anabolic Steroids',
    description:
      'SARMs and anabolic steroids as separate Steroids UK catalogue categories. Research literacy only — not medicines.',
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/what-is-pct': {
    title: 'What Is PCT? Post-Cycle Therapy',
    description:
      'What PCT means for catalogue buyers, SERMs in the PCT category, and how to browse support products. Educational only.',
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/cycle-builder': {
    title: 'Cycle Builder',
    description:
      'Build a catalogue recommendation in 5 questions — compounds, support and PCT. Educational only.',
    changefreq: 'monthly',
    priority: '0.7',
  },
  '/delivery-and-returns': {
    title: 'Delivery & Returns',
    description:
      'UK, Europe and worldwide tracked delivery from our UK warehouse, discreet packaging, and returns policy.',
    changefreq: 'monthly',
    priority: '0.6',
  },
  '/payment-methods': {
    title: 'Payment Methods',
    description: 'Pay with UK bank transfer or cryptocurrency. Encrypted and discreet.',
    changefreq: 'monthly',
    priority: '0.6',
  },
  '/crypto-payment-guides': {
    title: 'Crypto Payment Guides',
    description: 'Step-by-step guides for UK bank transfer and crypto checkout.',
    changefreq: 'monthly',
    priority: '0.5',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description:
      'How Steroids UK collects, uses and protects your personal data. No sold data, no third-party ad tracking.',
    changefreq: 'monthly',
    priority: '0.4',
  },
  '/terms': {
    title: 'Terms & Conditions',
    description:
      'Terms governing use of Steroids UK. Research-use catalogue, UK dispatch, bank transfer and crypto payment.',
    changefreq: 'monthly',
    priority: '0.4',
  },
};

export const RESOURCE_PAGE_PATHS = Object.keys(RESOURCE_PAGE_SEO);
