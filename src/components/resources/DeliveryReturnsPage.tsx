import React from 'react';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME } from '../../lib/seo/site';
import { ResourceKicker, ResourcePageShell } from './ResourcePageShell';
import { SUPPORT_EMAIL } from '../../data/resources';

interface DeliveryReturnsPageProps {
  onNavigate: (path: string) => void;
}

const SHIPPING = [
  {
    q: 'Where do you ship?',
    a: 'We ship from the UK to the United Kingdom, the rest of Europe, and worldwide.',
  },
  {
    q: 'How much is shipping?',
    a: 'United Kingdom: Royal Mail Tracked 48 is £10.00 (free on UK orders of £300 or more), Royal Mail Special Delivery 24 is £15.00, and Discrete Delivery is £20.00. Europe: £25.00 tracked. Rest of world: £35.00 tracked.',
  },
  {
    q: 'Is the packaging discreet?',
    a: 'Absolutely. All orders are shipped in plain, unmarked packaging with no external labels, brand names, or references to the contents. The sender shows as a neutral business name.',
  },
  {
    q: 'How long does delivery take?',
    a: 'UK Tracked 48 typically arrives in 2–3 working days. UK Special Delivery 24 is 1–2 working days. Discrete Delivery is typically 2–4 working days. Europe is typically 4–8 working days. Rest of world is typically 7–14 working days. Times are estimates, not guarantees.',
  },
  {
    q: 'Will I get a tracking number?',
    a: 'Yes. We send tracking details via email the moment your order is dispatched.',
  },
  {
    q: "What if my order doesn't arrive?",
    a: "If your package is lost in transit or undeliverable, we'll reship it at no extra cost or refund you in full.",
  },
];

const RETURNS = [
  {
    q: 'What if I receive the wrong item?',
    a: `If we made a mistake, we'll immediately send the correct replacement at no cost to you. Just email ${SUPPORT_EMAIL} with your order number.`,
  },
  {
    q: 'Can I return products?',
    a: 'For safety, sterility and quality reasons, we cannot accept returns once products leave our facility. All sales of opened items are final. Unopened products may be returned within 14 days of delivery if the original sealed packaging and tamper seal are intact. Contact us before returning. Return shipping is the customer’s responsibility.',
  },
  {
    q: 'What if something arrives damaged?',
    a: 'Contact us within 48 hours with photos of the damage and we will arrange a free reshipment. Royal Mail is responsible for transit damage but we cover the cost for you.',
  },
];

export const DeliveryReturnsPage: React.FC<DeliveryReturnsPageProps> = ({ onNavigate }) => {
  return (
    <>
      <SeoHead
        title={`Delivery & Returns | ${SITE_NAME}`}
        description="UK, Europe and worldwide tracked delivery from our UK warehouse, discreet packaging, and returns policy."
        canonical={`${window.location.origin}/delivery-and-returns`}
      />
      <ResourcePageShell
        kicker="Help"
        title="Delivery & Returns"
        intro="Tracked dispatch from the UK. UK from £10, Europe £25, rest of world £35."
        currentPath="/delivery-and-returns"
        onNavigate={onNavigate}
      >
        <section>
          <ResourceKicker>Shipping & Delivery</ResourceKicker>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-5">How orders leave the warehouse</h2>
          <div className="space-y-3">
            {SHIPPING.map((item) => (
              <details key={item.q} className="group rounded-2xl bg-white border border-slate-100 shadow-sm px-5 py-4">
                <summary className="cursor-pointer font-black text-slate-900 text-[15px] list-none flex items-center justify-between gap-3">
                  {item.q}
                  <span className="text-[#157a62] text-lg leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <ResourceKicker>Returns & Exchanges</ResourceKicker>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-5">If something goes wrong</h2>
          <div className="space-y-3">
            {RETURNS.map((item) => (
              <details key={item.q} className="group rounded-2xl bg-white border border-slate-100 shadow-sm px-5 py-4">
                <summary className="cursor-pointer font-black text-slate-900 text-[15px] list-none flex items-center justify-between gap-3">
                  {item.q}
                  <span className="text-[#157a62] text-lg leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="text-sm text-slate-500">
          Free UK Tracked 48 delivery applies automatically on UK orders of £300 or more. Europe and international shipping are not eligible.
        </p>
      </ResourcePageShell>
    </>
  );
};
