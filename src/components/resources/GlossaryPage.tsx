import React from 'react';
import { SeoHead } from '../seo/SeoHead';
import { AnswerCapsule } from '../seo/AnswerCapsule';
import { SITE_NAME } from '../../lib/seo/site';
import { ResourceKicker, ResourcePageShell } from './ResourcePageShell';
import { breadcrumbJsonLd, definedTermSetJsonLd } from '../../lib/seo/structured-data';
import {
  GLOSSARY_DESCRIPTION,
  GLOSSARY_PATH,
  GLOSSARY_TERMS,
  GLOSSARY_TITLE,
} from '../../lib/seo/glossary';
import { ANSWER_CAPSULES } from '../../lib/seo/answer-capsules';

interface GlossaryPageProps {
  onNavigate: (path: string) => void;
}

export const GlossaryPage: React.FC<GlossaryPageProps> = ({ onNavigate }) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <>
      <SeoHead
        title={`${GLOSSARY_TITLE} | ${SITE_NAME}`}
        description={GLOSSARY_DESCRIPTION}
        canonical={`${origin}${GLOSSARY_PATH}`}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Glossary', path: GLOSSARY_PATH },
          ]),
          definedTermSetJsonLd({
            name: GLOSSARY_TITLE,
            description: GLOSSARY_DESCRIPTION,
            path: GLOSSARY_PATH,
            terms: GLOSSARY_TERMS,
          }),
        ]}
      />
      <ResourcePageShell
        kicker="Knowledge · GEO"
        title={GLOSSARY_TITLE}
        intro="Short definitions for terms you will see across the Steroids UK catalogue and knowledge hub. Educational only — not medical or legal advice."
        currentPath={GLOSSARY_PATH}
        onNavigate={onNavigate}
      >
        <AnswerCapsule className="mb-2">{ANSWER_CAPSULES[GLOSSARY_PATH]}</AnswerCapsule>

        <p className="text-sm text-amber-900 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 leading-relaxed">
          <strong className="font-black">Important:</strong> Definitions are for shopping and research literacy only.
          They are not dosing protocols, diagnoses, or legal counsel.
        </p>

        <section aria-labelledby="glossary-terms">
          <ResourceKicker>Definitions</ResourceKicker>
          <h2 id="glossary-terms" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-5">
            Key catalogue terms
          </h2>
          <dl className="space-y-4">
            {GLOSSARY_TERMS.map((item) => (
              <div
                key={item.slug}
                id={item.slug}
                className="rounded-2xl bg-white border border-slate-100 shadow-sm px-5 py-4 scroll-mt-28"
              >
                <dt className="font-black text-slate-900 text-[15px]">{item.term}</dt>
                <dd className="text-sm text-slate-600 mt-2 leading-relaxed">{item.definition}</dd>
                {item.relatedHref && item.relatedLabel ? (
                  <button
                    type="button"
                    onClick={() => onNavigate(item.relatedHref!)}
                    className="mt-3 text-xs font-black text-[#157a62] hover:underline cursor-pointer"
                  >
                    {item.relatedLabel} →
                  </button>
                ) : null}
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-black text-slate-900">Related pages</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/faq', label: 'FAQ hub' },
              { href: '/oral-vs-injectable', label: 'Oral vs injectable' },
              { href: '/sarms-vs-steroids', label: 'SARMs vs steroids' },
              { href: '/what-is-pct', label: 'What is PCT?' },
              { href: '/', label: 'Buy steroids UK' },
              { href: '/shop', label: 'UK steroid shop' },
              { href: '/shop?q=testosterone', label: 'Testosterone cypionate' },
              { href: '/category/sarms', label: 'UK SARMs' },
              { href: '/product/bpc-157-pharmaqo-labs-5mg', label: 'BPC 157 UK' },
              { href: '/category/fat-loss', label: 'Buy Clenbuterol' },
              { href: '/category/oral', label: 'Buy Anavar UK' },
              { href: '/category/pct', label: 'Buy Clomid UK' },
              { href: '/blog', label: 'Knowledge hub' },
              { href: '/category/pct', label: 'PCT category' },
            ].map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => onNavigate(link.href)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black text-slate-800 hover:border-[#157a62] hover:text-[#157a62] cursor-pointer"
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
