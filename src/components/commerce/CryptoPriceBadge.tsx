import React from 'react';
import { Bitcoin } from 'lucide-react';
import { formatGbp } from '../../types';
import { cn } from '../../lib/utils';

interface CryptoPriceBadgeProps {
  pricePence: number;
  className?: string;
}

export const CRYPTO_DISCOUNT = 0.05;

export function cryptoPricePence(pricePence: number): number {
  return Math.round(pricePence * (1 - CRYPTO_DISCOUNT));
}

export const CryptoPriceBadge: React.FC<CryptoPriceBadgeProps> = ({ pricePence, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-[#e8f6f1] px-2.5 py-0.5 text-[11px] font-semibold text-[#003d30]',
        className
      )}
    >
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#f7931a] text-white shrink-0">
        <Bitcoin className="h-2.5 w-2.5" aria-hidden />
      </span>
      <span>
        <span className="font-bold">{formatGbp(cryptoPricePence(pricePence))}</span>
        {' '}
        with Crypto −5%
      </span>
    </span>
  );
};
