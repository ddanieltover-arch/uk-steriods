import React from 'react';
import { Container } from './Container';
import { BrandMark } from '../brand/BrandMark';
import { SITE_NAME } from '../../lib/seo/site';

const shopLinks = [
  { href: '/shop', label: 'All products' },
  { href: '/category/stacks-bundles', label: 'Stacks' },
  { href: '/shop', label: 'New products' },
];

const helpLinks = [
  { href: '/track-order', label: 'Track order' },
  { href: '/about-us', label: 'About Us' },
  { href: '/cycle-builder', label: 'Cycle Builder' },
  { href: '/blog', label: 'Blog' },
  { href: '/delivery-and-returns', label: 'Delivery & Returns' },
  { href: '/payment-methods', label: 'Payment Methods' },
  { href: '/crypto-payment-guides', label: 'Crypto Payment Guides' },
];

const categoryLinks = [
  { href: '/category/oral-steroids', label: 'Oral steroids' },
  { href: '/category/injectable-steroids', label: 'Injectable steroids' },
  { href: '/category/sarms', label: 'SARMs' },
  { href: '/category/pct-health', label: 'PCT' },
  { href: '/category/fat-loss', label: 'Fat burners' },
  { href: '/category/stacks-bundles', label: 'Stacks' },
];

const compoundLinks = [
  { href: '/shop?q=testosterone', label: 'Testosterone' },
  { href: '/shop?q=dianabol', label: 'Dianabol' },
  { href: '/shop?q=anavar', label: 'Anavar' },
  { href: '/shop?q=trenbolone', label: 'Trenbolone' },
  { href: '/shop?q=winstrol', label: 'Winstrol' },
  { href: '/category/pct-health', label: 'Nolvadex / Clomid' },
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
            <BrandMark
              size="sm"
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new Event('popstate'));
              }}
            />
            <p className="text-slate-500 text-[11px] leading-relaxed">
              UK dispatch, tracked delivery. UK from £3.99, Europe £15, rest of world £25.
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
          <div className="flex flex-wrap items-center gap-2 font-bold text-[10px]">
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
            <a href={l.href} className="hover:text-[#157a62] transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
