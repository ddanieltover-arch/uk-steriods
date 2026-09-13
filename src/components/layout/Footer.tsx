import React from 'react';
import { Container } from './Container';
import { BrandMark } from '../brand/BrandMark';
import { AppLink } from '../navigation/AppLink';
import { SITE_NAME } from '../../lib/seo/site';

const shopLinks = [
  { href: '/', label: 'Buy steroids UK' },
  { href: '/shop', label: 'Steroids UK buy — catalogue' },
  { href: '/manufacturers', label: 'Manufacturers' },
  { href: '/brand/pharmaqo-labs', label: 'Pharmaqo Labs' },
];

const helpLinks = [
  { href: '/track-order', label: 'Track order' },
  { href: '/about-us', label: 'About Us' },
  { href: '/faq', label: 'FAQ' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/oral-vs-injectable', label: 'Oral vs Injectable' },
  { href: '/sarms-vs-steroids', label: 'SARMs vs Steroids' },
  { href: '/what-is-pct', label: 'What is PCT?' },
  { href: '/cycle-builder', label: 'Cycle Builder' },
  { href: '/blog', label: 'Blog' },
  { href: '/delivery-and-returns', label: 'Delivery & Returns' },
  { href: '/payment-methods', label: 'Payment Methods' },
  { href: '/crypto-payment-guides', label: 'Crypto Payment Guides' },
];

const categoryLinks = [
  { href: '/category/injectable', label: 'Injectable steroids UK' },
  { href: '/category/oral', label: 'Oral / Buy Anavar UK' },
  { href: '/category/sarms', label: 'UK SARMs / MK677 UK' },
  { href: '/category/pct', label: 'PCT / Buy Clomid UK' },
  { href: '/category/peptides', label: 'Peptides / BPC 157 UK' },
  { href: '/category/hgh', label: 'HGH UK / injections' },
  { href: '/category/ed-meds', label: 'ED Meds' },
  { href: '/category/viagra', label: 'Viagra' },
  { href: '/category/kamagra', label: 'Kamagra UK' },
  { href: '/category/fat-loss', label: 'Buy Clenbuterol' },
  { href: '/category/accessories', label: 'Peptide needles' },
];

const compoundLinks = [
  { href: '/shop?q=testosterone', label: 'Buy testosterone' },
  { href: '/shop?q=dianabol', label: 'Dianabol for sale' },
  { href: '/shop?q=anavar', label: 'Anavar where to buy' },
  { href: '/shop?q=primobolan', label: 'Primobolan for sale' },
  { href: '/shop?q=sustanon', label: 'Buy Sustanon online' },
  { href: '/shop?q=deca', label: 'Deca Durabolin for sale' },
  { href: '/shop?q=boldenone', label: 'Equipoise for sale' },
  { href: '/category/sarms', label: 'UK SARMs / MK677 UK' },
  { href: '/product/bpc-157-pharmaqo-labs-5mg', label: 'BPC 157 UK' },
  { href: '/category/pct', label: 'Buy Clomid UK' },
  { href: '/category/fat-loss', label: 'Buy Clenbuterol' },
  { href: '/category/accessories', label: 'Peptide needles' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 mt-12">
      <div className="bg-[#003d30] text-slate-300 py-8 border-b border-emerald-900">
        <Container>
          <p className="text-[11px] leading-relaxed text-slate-400 max-w-4xl">
            Products listed on {SITE_NAME} are intended for research purposes only. They are not
            intended to treat, prevent, or cure any disease. Adults only. Speak to a qualified
            clinician before using any research compound.
          </p>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-xs">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <BrandMark size="sm" href="/" />
            <p className="text-slate-500 text-[11px] leading-relaxed">
              UK dispatch, tracked delivery. UK from £10, Europe £25, rest of world £35.
            </p>
          </div>

          <FooterCol title="Shop" links={shopLinks} />
          <FooterCol title="Help" links={helpLinks} />
          <FooterCol title="Shop by category" links={categoryLinks} />
          <FooterCol title="Popular compounds" links={compoundLinks} />
        </div>
      </Container>

      <div className="border-t border-slate-200 bg-slate-50 py-5 text-[11px] text-slate-500">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 font-bold text-[10px]">
            <AppLink href="/privacy-policy" className="hover:text-[#157a62] transition-colors">
              Privacy
            </AppLink>
            <AppLink href="/terms" className="hover:text-[#157a62] transition-colors">
              Terms
            </AppLink>
            {['Bank transfer', 'Crypto'].map((m) => (
              <span key={m} className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-800">
                {m}
              </span>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
};

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h5 className="font-black text-slate-900 text-[11px] uppercase tracking-wider mb-4">{title}</h5>
      <ul className="space-y-2.5 text-[11px] font-semibold text-slate-600">
        {links.map((l) => (
          <li key={l.label}>
            <AppLink href={l.href} className="hover:text-[#157a62] transition-colors">
              {l.label}
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
