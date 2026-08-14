import React from 'react';
import { cn } from '../../lib/utils';
import { StockStatus } from '@prisma/client';

interface StockIndicatorProps {
  status: StockStatus;
  availableQuantity?: number;
  showCount?: boolean;
  className?: string;
}

export const StockIndicator: React.FC<StockIndicatorProps> = ({
  status,
  availableQuantity,
  showCount = true,
  className,
}) => {
  if (status === StockStatus.OUT_OF_STOCK || (availableQuantity !== undefined && availableQuantity <= 0)) {
    return (
      <div className={cn('inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500', className)}>
        <span className="h-2 w-2 rounded-full bg-slate-400" />
        <span>Out of Stock</span>
      </div>
    );
  }

  if (status === StockStatus.LOW_STOCK || (availableQuantity !== undefined && availableQuantity <= 5)) {
    return (
      <div className={cn('inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700', className)}>
        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
        <span>
          Low Stock {showCount && availableQuantity !== undefined && `(${availableQuantity} left)`}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700', className)}>
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      <span>In Stock</span>
    </div>
  );
};
