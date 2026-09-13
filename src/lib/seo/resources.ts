/** Static resource-page SEO definitions shared by client SeoHead and server SSR injection. */
export const RESOURCE_PAGE_SEO: Record<
  string,
  { title: string; description: string; changefreq: 'monthly' | 'weekly'; priority: string }
> = {
  '/about-us': {
    title: 'About Us — UK Steroids Shop Reviews',
    description:
      'UK steroids shop review context: real people, real bodybuilding, lab tested steroids UK catalogue from a UK warehouse. Steroids UK reviews start with honest stock and responsive support.',
    changefreq: 'monthly',
    priority: '0.6',
  },
  '/faq': {
    title: 'FAQ: Is It Legal to Buy Steroids UK?',
    description:
      'Is it legal to buy steroids UK? Also: legal to buy HCG online, lab testing, delivery, payment and PCT. Educational only — not medical or legal advice.',
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
    title: 'What Are SARMs vs Anabolic Steroids',
    description:
      'What are SARMs compared with anabolic steroids in the Steroids UK catalogue. Research literacy only — not medicines.',
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/what-is-pct': {
    title: 'Best PCT Cycle to Keep Gains — What Is PCT?',
    description:
      'Best PCT cycle to keep gains in educational catalogue context — SERMs, Clomid tablets and how to browse PCT. Not a dosing protocol.',
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/cycle-builder': {
    title: 'Steroids UK Cycle Guide — Cycle Builder',
    description:
      'Steroids UK cycle guide: build a catalogue recommendation in 5 questions — compounds, support and PCT including NPP test cycle ideas. Educational only.',
    changefreq: 'monthly',
    priority: '0.7',
  },
  '/delivery-and-returns': {
    title: 'Steroids UK Next Day Delivery & Returns',
    description:
      'Anabolic steroids UK delivery and steroids UK next day delivery options — UK, Europe and worldwide tracked shipping, discreet packaging, returns policy.',
    changefreq: 'monthly',
    priority: '0.6',
  },
  '/payment-methods': {
    title: 'Steroids UK Cryptocurrency Payment',
    description:
      'Steroids UK cryptocurrency payment and UK bank transfer. Encrypted and discreet checkout.',
    changefreq: 'monthly',
    priority: '0.6',
  },
  '/crypto-payment-guides': {
    title: 'How to Pay Crypto Steroids UK',
    description:
      'How to pay crypto steroids UK — step-by-step guides for crypto checkout and bank transfer.',
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
