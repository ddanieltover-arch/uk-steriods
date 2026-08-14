import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'sale' | 'bestseller' | 'new' | 'lowStock' | 'outOfStock' | 'custom';

interface ProductBadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

export const ProductBadge: React.FC<ProductBadgeProps> = ({
  variant,
  label,
  className,
}) => {
  const styles: Record<BadgeVariant, { bg: string; text: string; defaultLabel: string }> = {
    sale: { bg: 'bg-emerald-600', text: 'text-white', defaultLabel: 'Sale' },
    bestseller: { bg: 'bg-teal-900', text: 'text-white', defaultLabel: 'Bestseller' },
    new: { bg: 'bg-indigo-600', text: 'text-white', defaultLabel: 'New' },
    lowStock: { bg: 'bg-amber-100 border border-amber-200', text: 'text-amber-800', defaultLabel: 'Low Stock' },
    outOfStock: { bg: 'bg-slate-200', text: 'text-slate-600', defaultLabel: 'Out of Stock' },
    custom: { bg: 'bg-slate-900', text: 'text-white', defaultLabel: label || 'Featured' },
  };

  const current = styles[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-xs',
        current.bg,
        current.text,
        className
      )}
    >
      {label || current.defaultLabel}
    </span>
  );
};
