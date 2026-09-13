import React from 'react';
import { Category } from '../../types';
import { cn } from '../../lib/utils';
import { AppLink } from '../navigation/AppLink';

/** Reference shop chip order from steroids-uk.com/shop */
export const SHOP_CATEGORY_CHIP_ORDER = [
  'injectable',
  'oral',
  'sarms',
  'pct',
  'peptides',
  'hgh',
  'ed-meds',
  'viagra',
  'kamagra',
  'fat-loss',
  'accessories',
] as const;

interface ShopCategoryChipsProps {
  categories: Category[];
  activeSlug?: string;
  totalCount: number;
  onSelect: (slug: string) => void;
  className?: string;
}

export const ShopCategoryChips: React.FC<ShopCategoryChipsProps> = ({
  categories,
  activeSlug = '',
  totalCount,
  onSelect,
  className,
}) => {
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const ordered = SHOP_CATEGORY_CHIP_ORDER.map((slug) => bySlug.get(slug)).filter(
    (c): c is Category => Boolean(c)
  );
  const extras = categories.filter((c) => !SHOP_CATEGORY_CHIP_ORDER.includes(c.slug as any));
  const chips = [...ordered, ...extras];

  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 items-center',
        className
      )}
      role="list"
      aria-label="Shop categories"
    >
      <AppLink
        href="/shop"
        role="listitem"
        navigate={() => onSelect('')}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border bg-white px-3.5 py-1.5 text-sm transition-colors cursor-pointer',
          !activeSlug
            ? 'border-teal-700 text-teal-800 font-semibold'
            : 'border-slate-200 text-slate-700 hover:border-slate-300'
        )}
      >
        <span>All</span>
        <span className={cn('text-xs', !activeSlug ? 'text-teal-600/80' : 'text-slate-400')}>
          {totalCount}
        </span>
      </AppLink>

      {chips.map((cat) => {
        const active = activeSlug === cat.slug;
        const href = active ? '/shop' : `/category/${cat.slug}`;
        return (
          <AppLink
            key={cat.id || cat.slug}
            href={href}
            role="listitem"
            navigate={() => onSelect(active ? '' : cat.slug)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border bg-white px-3.5 py-1.5 text-sm transition-colors cursor-pointer',
              active
                ? 'border-teal-700 text-teal-800 font-semibold'
                : 'border-slate-200 text-slate-700 hover:border-slate-300'
            )}
          >
            <span>{cat.name}</span>
            <span className={cn('text-xs', active ? 'text-teal-600/80' : 'text-slate-400')}>
              {cat.productCount ?? 0}
            </span>
          </AppLink>
        );
      })}
    </div>
  );
};
