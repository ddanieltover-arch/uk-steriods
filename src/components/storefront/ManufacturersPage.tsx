import React from 'react';
import { Brand } from '../../types';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME, sanitizeMetaText } from '../../lib/seo/site';
import { sortManufacturers } from '../../data/manufacturers';
import { ChevronRight } from 'lucide-react';
import { AppLink } from '../navigation/AppLink';

interface ManufacturersPageProps {
  brands: Brand[];
  onSelectBrand: (slug: string) => void;
  onNavigate: (path: string) => void;
}

export const ManufacturersPage: React.FC<ManufacturersPageProps> = ({
  brands,
  onSelectBrand,
  onNavigate,
}) => {
  const manufacturers = sortManufacturers(brands);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const description = sanitizeMetaText(
    `Browse trusted pharmaceutical manufacturers at ${SITE_NAME}: Pharmaqo Labs, Proper Labs, Syncom Labs, Beligas, and more.`,
    160
  );

  return (
    <div className="bg-slate-50 min-h-[70vh]">
      <SeoHead
        title={`Manufacturers | ${SITE_NAME}`}
        description={description}
        canonical={`${origin}/manufacturers`}
      />

      <Section padding="md">
        <Container>
          <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-6" aria-label="Breadcrumb">
            <AppLink href="/shop" navigate={onNavigate} className="hover:text-teal-700 cursor-pointer">
              Shop
            </AppLink>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-800">Manufacturers</span>
          </nav>

          <div className="mb-8 space-y-2">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-700">Trusted labs</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Manufacturers</h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Shop by pharmaceutical manufacturer. Every brand below is listed in our UK catalogue with lab-tested
              products, GBP pricing, and tracked delivery.
            </p>
          </div>

          {manufacturers.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm font-bold text-slate-500">
              No manufacturers available yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {manufacturers.map((brand) => (
                <AppLink
                  key={brand.id}
                  href={`/brand/${brand.slug}`}
                  navigate={() => onSelectBrand(brand.slug)}
                  className="group bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md hover:border-teal-600 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[100px] text-center"
                >
                  {brand.logoUrl ? (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="h-12 w-auto max-w-full object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.style.display = 'none';
                        const fallback = el.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <span
                    className={`text-sm font-semibold text-slate-600 leading-tight ${
                      brand.logoUrl ? 'hidden' : ''
                    }`}
                  >
                    {brand.name}
                  </span>
                </AppLink>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};
