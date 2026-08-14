import React, { useEffect, useState } from 'react';
import { User, Search, SlidersHorizontal } from 'lucide-react';
import { BrandMark } from '../brand/BrandMark';

interface MobileHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  onOpenAccount: () => void;
  onOpenFilters: () => void;
  onSelectCategory: (slug: string) => void;
  onGoHome?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onOpenAccount,
  onOpenFilters,
  onSelectCategory,
  onGoHome,
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className="lg:hidden relative overflow-hidden rounded-b-[1.75rem] shadow-[0_12px_28px_rgba(0,20,16,0.45)]">
      <div
        className="relative px-4 pt-3 pb-4"
        style={{ background: 'linear-gradient(180deg, #0a4a3a 0%, #157a62 55%, #1a8f72 100%)' }}
      >
        <span
          className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[4.5rem] leading-none font-black tracking-tighter text-white/[0.07] select-none"
          aria-hidden
        >
          STEROIDS
        </span>

        <div className="relative flex items-center justify-between gap-3">
          <BrandMark
            size="sm"
            onClick={() => (onGoHome ? onGoHome() : onSelectCategory(''))}
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAccount}
              className="h-9 w-9 rounded-full glass-box text-white flex items-center justify-center cursor-pointer"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>

        <form
          className="relative mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            onSearchChange(localQuery);
            onSearchSubmit?.(localQuery);
          }}
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#aedac2] pointer-events-none" />
          <input
            type="search"
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              onSearchChange(e.target.value);
            }}
            placeholder="Search products..."
            className="w-full rounded-full glass-box text-[#aedac2] placeholder:text-[#aedac2]/80 text-xs font-medium py-2.5 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button
            type="button"
            onClick={onOpenFilters}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full glass-box text-white flex items-center justify-center cursor-pointer"
            aria-label="Filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
