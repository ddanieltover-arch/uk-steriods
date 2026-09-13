import React from 'react';
import { SeoHead } from '../seo/SeoHead';
import { AnswerCapsule } from '../seo/AnswerCapsule';
import { SITE_NAME } from '../../lib/seo/site';
import { ResourceKicker, ResourcePageShell } from './ResourcePageShell';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
} from '../../lib/seo/structured-data';
import {
  GOV_UK_CONTROLLED_DRUGS_URL,
  GeoGuide,
} from '../../lib/seo/geo-guides';

interface GeoGuidePageProps {
  guide: GeoGuide;
  onNavigate: (path: string) => void;
}

function isExternal(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

export const GeoGuidePage: React.FC<GeoGuidePageProps> = ({ guide, onNavigate }) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const jsonLd: Record<string, unknown>[] = [
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: guide.title, path: guide.path },
    ]),
    articleJsonLd({
      title: guide.title,
      description: guide.description,
      path: guide.path,
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
    }),
    faqPageJsonLd(guide.faqs),
  ];
  if (guide.howTo) {
    jsonLd.push(howToJsonLd(guide.howTo));
  }

  return (
    <>
      <SeoHead
        title={`${guide.title} | ${SITE_NAME}`}
        description={guide.description}
        canonical={`${origin}${guide.path}`}
        ogType="article"
        jsonLd={jsonLd}
      />
      <ResourcePageShell
        kicker="Guides · GEO"
        title={guide.title}
        intro={guide.intro}
        currentPath={guide.path}
        onNavigate={onNavigate}
      >
        <AnswerCapsule className="mb-2">{guide.answerCapsule}</AnswerCapsule>

        <p className="text-sm text-amber-900 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 leading-relaxed">
          <strong className="font-black">Important:</strong> Educational catalogue literacy only. Not medical advice,
          dosing guidance, diagnosis, or legal counsel. UK controlled-drug rules change — verify with{' '}
          <a
            href={GOV_UK_CONTROLLED_DRUGS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-black underline text-amber-950"
          >
            official GOV.UK sources
          </a>
          .
        </p>

        <p className="text-xs text-slate-500">
          Last updated: {guide.dateModified}
        </p>

        {guide.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <ResourceKicker>Guide</ResourceKicker>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
              {section.heading}
            </h2>
            <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed max-w-3xl">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            {section.bullets?.length ? (
              <ul className="mt-4 list-disc pl-5 space-y-2 text-[15px] text-slate-600 max-w-3xl">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.table ? (
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-900">
                    <tr>
                      {section.table.headers.map((h) => (
                        <th key={h} className="px-4 py-3 font-black">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row.join('|')} className="border-t border-slate-100 text-slate-600">
                        {row.map((cell) => (
                          <td key={cell} className="px-4 py-3 align-top">
                            {cell.startsWith('/') ? (
                              <button
                                type="button"
                                onClick={() => onNavigate(cell)}
                                className="font-bold text-[#157a62] hover:underline cursor-pointer"
                              >
                                {cell}
                              </button>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>
        ))}

        {guide.howTo ? (
          <section id="how-to-browse" className="scroll-mt-28">
            <ResourceKicker>Shopping steps</ResourceKicker>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
              {guide.howTo.name}
            </h2>
            <p className="text-sm text-slate-600 mb-4 max-w-3xl">{guide.howTo.description}</p>
            <ol className="space-y-3 list-decimal pl-5 text-[15px] text-slate-600 max-w-3xl">
              {guide.howTo.steps.map((step) => (
                <li key={step.name}>
                  <strong className="text-slate-900">{step.name}.</strong> {step.text}
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section id="faq" className="scroll-mt-28">
          <ResourceKicker>FAQ</ResourceKicker>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-5">
            FAQs about this topic
          </h2>
          <div className="space-y-3">
            {guide.faqs.map((item) => (
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

        <section className="rounded-3xl bg-[#003d30] text-white p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-black">Continue in the catalogue</h2>
          <div className="flex flex-wrap gap-2">
            {guide.primaryCtas.map((cta) => (
              <button
                key={cta.href}
                type="button"
                onClick={() => onNavigate(cta.href)}
                className="rounded-full bg-white text-[#003d30] px-4 py-2 text-xs font-black cursor-pointer hover:bg-emerald-50"
              >
                {cta.label}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-black text-slate-900">Related pages</h2>
          <div className="flex flex-wrap gap-2">
            {guide.relatedLinks.map((link) =>
              isExternal(link.href) ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black text-slate-800 hover:border-[#157a62] hover:text-[#157a62]"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => onNavigate(link.href)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black text-slate-800 hover:border-[#157a62] hover:text-[#157a62] cursor-pointer"
                >
                  {link.label}
                </button>
              )
            )}
          </div>
        </section>
      </ResourcePageShell>
    </>
  );
};
