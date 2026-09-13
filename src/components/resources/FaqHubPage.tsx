import React from 'react';
import { SeoHead } from '../seo/SeoHead';
import { AnswerCapsule } from '../seo/AnswerCapsule';
import { SITE_NAME } from '../../lib/seo/site';
import { ResourceKicker, ResourcePageShell } from './ResourcePageShell';
import { breadcrumbJsonLd, faqPageJsonLd } from '../../lib/seo/structured-data';
import {
  FAQ_HUB_DESCRIPTION,
  FAQ_HUB_PATH,
  FAQ_HUB_SECTIONS,
  FAQ_HUB_TITLE,
  flatFaqHubItems,
} from '../../lib/seo/faq-hub';
import { ANSWER_CAPSULES } from '../../lib/seo/answer-capsules';

interface FaqHubPageProps {
  onNavigate: (path: string) => void;
}

export const FaqHubPage: React.FC<FaqHubPageProps> = ({ onNavigate }) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const faqs = flatFaqHubItems();

  return (
    <>
      <SeoHead
        title={`${FAQ_HUB_TITLE} | ${SITE_NAME}`}
        description={FAQ_HUB_DESCRIPTION}
        canonical={`${origin}${FAQ_HUB_PATH}`}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: FAQ_HUB_PATH },
          ]),
          faqPageJsonLd(faqs),
        ]}
      />
      <ResourcePageShell
        kicker="Help · GEO"
        title={FAQ_HUB_TITLE}
        intro="Straight answers for UK buyers researching the catalogue — legality context, lab testing, delivery, payment, and PCT. Educational only; not medical or legal advice."
        currentPath={FAQ_HUB_PATH}
        onNavigate={onNavigate}
      >
        <AnswerCapsule className="mb-2">{ANSWER_CAPSULES[FAQ_HUB_PATH]}</AnswerCapsule>

        <p className="text-sm text-amber-900 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 leading-relaxed">
          <strong className="font-black">Important:</strong> This page is for education and shopping help only. It is not
          medical advice, a diagnosis, or legal counsel. UK controlled-drug rules change — verify with official sources
          before you act.
        </p>

        {FAQ_HUB_SECTIONS.map((section) => (
          <section key={section.heading}>
            <ResourceKicker>FAQ</ResourceKicker>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-5">{section.heading}</h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl bg-white border border-slate-100 shadow-sm px-5 py-4"
                >
                  <summary className="cursor-pointer font-black text-slate-900 text-[15px] list-none flex items-center justify-between gap-3">
                    {item.question}
                    <span className="text-[#157a62] text-lg leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-black text-slate-900">Continue shopping or reading</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/', label: 'Buy steroids UK' },
              { href: '/shop', label: 'Steroids for sale UK' },
              { href: '/shop?q=testosterone', label: 'Buy testosterone' },
              { href: '/category/sarms', label: 'UK SARMs' },
              { href: '/product/bpc-157-pharmaqo-labs-5mg', label: 'BPC 157 UK' },
              { href: '/category/pct', label: 'Buy Clomid UK' },
              { href: '/glossary', label: 'Glossary' },
              { href: '/oral-vs-injectable', label: 'Oral vs injectable' },
              { href: '/sarms-vs-steroids', label: 'SARMs vs steroids' },
              { href: '/what-is-pct', label: 'What is PCT?' },
              { href: '/delivery-and-returns', label: 'Delivery & Returns' },
              { href: '/payment-methods', label: 'Payment Methods' },
              { href: '/blog', label: 'Blog' },
              { href: '/cycle-builder', label: 'Cycle Builder' },
            ].map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => onNavigate(link.href)}
                className="rounded-full border border-slate-200 bg-slate-50 hover:bg-[#e8f6ef] hover:border-[#157a62]/40 px-4 py-2 text-xs font-bold text-slate-800 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </section>
      </ResourcePageShell>
    </>
  );
};
