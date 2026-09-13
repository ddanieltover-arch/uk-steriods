import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Category, Brand } from '../../types';
import { cn } from '../../lib/utils';
import { RESOURCE_LINKS } from '../../data/resources';
import { sortManufacturers } from '../../data/manufacturers';
import { AppLink } from './AppLink';

interface NavigationMenuProps {
  categories: Category[];
  brands: Brand[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  onSelectBrand?: (brandSlug: string) => void;
  className?: string;
  tone?: 'light' | 'dark';
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  categories,
  brands,
  selectedCategorySlug,
  onSelectCategory,
  onSelectBrand,
  className,
  tone = 'light',
}) => {
  const [openDropdown, setOpenDropdown] = useState<'categories' | 'brands' | 'resources' | null>(null);
  const close = () => setOpenDropdown(null);
  const resourceActive =
    typeof window !== 'undefined' && RESOURCE_LINKS.some((l) => window.location.pathname === l.href);
  const isDark = tone === 'dark';

  const linkNav = (path: string) => {
    if (path === '/shop') onSelectCategory('');
    else if (path.startsWith('/category/')) onSelectCategory(path.replace('/category/', '').split('?')[0]);
    else if (path.startsWith('/brand/')) {
      const slug = path.replace('/brand/', '').split('?')[0];
      if (onSelectBrand) onSelectBrand(slug);
    } else {
      // blog / manufacturers / resources — parent handlers use pushState via onSelect* only for cat/brand
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
    close();
  };

  return (
    <nav
      className={cn(
        'flex items-center justify-center gap-6 text-xs font-extrabold uppercase tracking-wider',
        isDark ? 'text-[#aedac2]' : 'text-slate-700',
        className
      )}
    >
      <AppLink
        href="/shop"
        navigate={() => {
          onSelectCategory('');
          close();
        }}
        className={cn(
          'py-1.5 transition-colors cursor-pointer',
          isDark ? 'hover:text-white' : 'hover:text-[#157a62]',
          selectedCategorySlug === '' && (isDark ? 'text-white border-b-2 border-[#aedac2]' : 'text-[#157a62] border-b-2 border-[#157a62]')
        )}
      >
        All Catalog
      </AppLink>

      <AppLink
        href="/blog"
        navigate={(path) => linkNav(path)}
        className={cn(
          'py-1.5 transition-colors cursor-pointer',
          isDark ? 'hover:text-white' : 'hover:text-[#157a62]',
          typeof window !== 'undefined' && window.location.pathname.startsWith('/blog') && (isDark ? 'text-white border-b-2 border-[#aedac2]' : 'text-[#157a62] border-b-2 border-[#157a62]')
        )}
      >
        Blog
      </AppLink>

      <div
        className="relative"
        onMouseEnter={() => setOpenDropdown('categories')}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          type="button"
          className={cn(
            'flex items-center gap-1 py-1.5 transition-colors cursor-pointer',
            isDark ? 'hover:text-white' : 'hover:text-[#157a62]',
            selectedCategorySlug !== '' && (isDark ? 'text-white' : 'text-[#157a62] font-black')
          )}
        >
          <span>Categories</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {openDropdown === 'categories' && (
          <div className="absolute top-full left-0 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl animate-fade-in space-y-1">
            {categories.map((cat) => (
              <AppLink
                key={cat.id}
                href={`/category/${cat.slug}`}
                navigate={() => {
                  onSelectCategory(cat.slug);
                  close();
                }}
                className={cn(
                  'w-full text-left rounded-xl px-3 py-2 text-xs font-bold transition-colors hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer flex items-center justify-between',
                  selectedCategorySlug === cat.slug ? 'bg-emerald-50 text-emerald-800' : 'text-slate-800'
                )}
              >
                <span>{cat.name}</span>
                {cat.productCount !== undefined && (
                  <span className="text-[10px] text-slate-400 font-semibold">{cat.productCount}</span>
                )}
              </AppLink>
            ))}
          </div>
        )}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setOpenDropdown('brands')}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <AppLink
          href="/manufacturers"
          navigate={(path) => linkNav(path)}
          className={cn(
            'flex items-center gap-1 py-1.5 transition-colors cursor-pointer',
            isDark ? 'hover:text-white' : 'hover:text-[#157a62]',
            typeof window !== 'undefined' &&
              (window.location.pathname === '/manufacturers' || window.location.pathname.startsWith('/brand/')) &&
              (isDark ? 'text-white' : 'text-[#157a62] font-black')
          )}
        >
          <span>Manufacturers</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </AppLink>

        {openDropdown === 'brands' && (
          <div className="absolute top-full left-0 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl animate-fade-in space-y-1">
            <AppLink
              href="/manufacturers"
              navigate={(path) => linkNav(path)}
              className="w-full text-left rounded-xl px-3 py-2 text-xs font-black text-teal-700 hover:bg-teal-50 transition-colors cursor-pointer block"
            >
              All Manufacturers
            </AppLink>
            <div className="px-3 py-1 text-[10px] font-black uppercase text-slate-400 tracking-wider">
              Trusted Labs
            </div>
            {sortManufacturers(brands).map((brand) => (
              <AppLink
                key={brand.id}
                href={`/brand/${brand.slug}`}
                navigate={() => {
                  if (onSelectBrand) onSelectBrand(brand.slug);
                  else linkNav(`/brand/${brand.slug}`);
                  close();
                }}
                className="w-full text-left rounded-xl px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{brand.name}</span>
                {brand.isFeatured && (
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                    Featured
                  </span>
                )}
              </AppLink>
            ))}
          </div>
        )}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setOpenDropdown('resources')}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          type="button"
          className={cn(
            'flex items-center gap-1 py-1.5 transition-colors cursor-pointer',
            isDark ? 'hover:text-white' : 'hover:text-[#157a62]',
            resourceActive && (isDark ? 'text-white' : 'text-[#157a62] font-black')
          )}
        >
          <span>Resources</span>
          <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', openDropdown === 'resources' && 'rotate-180')} />
        </button>

        {openDropdown === 'resources' && (
          <div className="absolute top-full left-0 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl animate-fade-in space-y-1">
            {RESOURCE_LINKS.map((link) => {
              const active = typeof window !== 'undefined' && window.location.pathname === link.href;
              return (
                <AppLink
                  key={link.href}
                  href={link.href}
                  navigate={(path) => linkNav(path)}
                  className={cn(
                    'w-full text-left rounded-xl px-3 py-2 text-xs font-bold transition-colors cursor-pointer border-l-2 block',
                    active
                      ? 'bg-emerald-50 text-emerald-800 border-l-[#157a62]'
                      : 'text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 border-l-transparent hover:border-l-[#157a62]'
                  )}
                >
                  {link.label}
                </AppLink>
              );
            })}
          </div>
        )}
      </div>

      <div
        className={cn(
          'flex items-center gap-1.5 font-extrabold normal-case px-2.5 py-1 rounded-full text-[11px]',
          isDark ? 'text-[#003d30] bg-[#aedac2]' : 'text-emerald-800 bg-emerald-50'
        )}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Lab-tested batches</span>
      </div>
    </nav>
  );
};
