import React from 'react';
import { cn } from '../../lib/utils';
import { formatGbp } from '../../types';

interface PriceDisplayProps {
  pricePence: number;
  compareAtPricePence?: number;
  size?: 'sm' | 'default' | 'lg' | 'xl';
  showSavingsBadge?: boolean;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  pricePence,
  compareAtPricePence,
  size = 'default',
  showSavingsBadge = false,
  className,
}) => {
  const isOnSale = compareAtPricePence && compareAtPricePence > pricePence;
  const savingsPercent = isOnSale
    ? Math.round(((compareAtPricePence - pricePence) / compareAtPricePence) * 100)
    : 0;

  const sizeClass = {
    sm: 'text-xs font-bold',
    default: 'text-sm font-extrabold',
    lg: 'text-base md:text-lg font-black',
    xl: 'text-xl md:text-2xl font-black',
  }[size];

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      {/* Current Price */}
      <span className={cn('text-slate-900 tracking-tight', sizeClass)}>
        {formatGbp(pricePence)}
      </span>

      {/* Compare At Price */}
      {isOnSale && (
        <span className="text-slate-400 line-through text-xs font-semibold">
          {formatGbp(compareAtPricePence)}
        </span>
      )}

      {/* Savings Percentage Badge */}
      {isOnSale && showSavingsBadge && (
        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
          Save {savingsPercent}%
        </span>
      )}
    </div>
  );
};
