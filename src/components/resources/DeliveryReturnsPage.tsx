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
    q: 'Do you ship worldwide?',
    a: 'No, we ship exclusively within the United Kingdom. We operate UK-domestic only from our UK warehouses, so your package never passes through customs and never gets stuck at the border.',
  },
  {
    q: 'Is the packaging discreet?',
    a: 'Absolutely. All orders are shipped in plain, unmarked packaging with no external labels, brand names, or references to the contents. The sender shows as a neutral business name.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most UK orders arrive within 1–2 working days via Royal Mail Tracked 24, our single tracked and signed-for service. Orders paid before 12:00 (noon) on a working day are dispatched the same day. Delivery times are estimates, not guarantees.',
  },
  {
    q: 'Will I get a tracking number?',
    a: 'Yes. We send tracking details via email the moment your order is dispatched. You can follow the parcel from our UK warehouse to your doorstep on the Royal Mail website.',
  },
  {
    q: "What if my order doesn't arrive?",
    a: "We guarantee delivery. If your package is lost in transit or undeliverable, we'll reship it at no extra cost or refund you in full. Lost parcels are our problem, not yours.",
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
        description="UK-only Royal Mail Tracked 24 delivery, discreet packaging, reship guarantee, and returns policy."
        canonical={`${window.location.origin}/delivery-and-returns`}
      />
      <ResourcePageShell
        kicker="Help"
        title="Delivery & Returns"
        intro="UK warehouse dispatch only. Plain packaging, tracked delivery, and a reship if the parcel does not arrive."
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
          Free next-day UK delivery on qualifying orders uses code <span className="font-black text-slate-800">DELIVERY5</span>{' '}
          where advertised. See checkout for the current threshold.
        </p>
      </ResourcePageShell>
    </>
  );
};
