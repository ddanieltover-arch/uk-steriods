import React from 'react';
import { Bitcoin, FlaskConical, Truck } from 'lucide-react';
import { PROMO_TICKER_ITEMS } from '../../data/homepage';
import { cn } from '../../lib/utils';

const ICONS = {
  truck: Truck,
  bitcoin: Bitcoin,
  flask: FlaskConical,
} as const;

interface PromoTickerProps {
  variant?: 'top' | 'mobile';
}

export const PromoTicker: React.FC<PromoTickerProps> = ({ variant = 'top' }) => {
  const loop = [...PROMO_TICKER_ITEMS, ...PROMO_TICKER_ITEMS, ...PROMO_TICKER_ITEMS];
  const isMobile = variant === 'mobile';

  return (
    <div
      className={cn(
        'overflow-hidden border-b text-[11px] font-semibold',
        isMobile
          ? 'lg:hidden bg-[#d8efe3] text-[#003d30] border-[#b7dcc8]'
          : 'hidden lg:block bg-white text-slate-700 border-slate-200'
      )}
    >
      <div className="promo-ticker flex whitespace-nowrap py-1 gap-10">
        {loop.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <span key={`${item.text}-${i}`} className="inline-flex items-center gap-10 shrink-0">
              <span className="inline-flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex h-5 w-5 items-center justify-center rounded-full shrink-0',
                    isMobile ? 'bg-[#003d30] text-[#d8efe3]' : 'bg-transparent text-teal-700'
                  )}
                >
                  <Icon className="h-3 w-3" aria-hidden />
                </span>
                <span>{item.text}</span>
              </span>
              <span className={cn(isMobile ? 'text-[#003d30]/35' : 'text-slate-300')} aria-hidden>
                ·
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
