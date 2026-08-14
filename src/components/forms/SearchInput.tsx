import React, { useEffect, useId, useRef, useState } from 'react';
import { Search, X, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

interface SuggestionProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
}

interface SuggestionEntity {
  id: string;
  name: string;
  slug: string;
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearchSubmit?: (query: string) => void;
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'brand';
  autoFocus?: boolean;
}

const RECENT_KEY = 'ukp_recent_searches';

function readRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string').slice(0, 5) : [];
  } catch {
    return [];
  }
}

function writeRecent(term: string) {
  const next = [term, ...readRecent().filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 5);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearchSubmit,
  placeholder = 'Search products...',
  className,
  variant = 'default',
  autoFocus = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [products, setProducts] = useState<SuggestionProduct[]>([]);
  const [brands, setBrands] = useState<SuggestionEntity[]>([]);
  const [categories, setCategories] = useState<SuggestionEntity[]>([]);
  const [status, setStatus] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const debouncedQuery = useDebouncedValue(value.trim(), 220);

  useEffect(() => {
    setRecent(readRecent());
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setProducts([]);
      setBrands([]);
      setCategories([]);
      setStatus('');
      return;
    }

    const controller = new AbortController();
    fetch(`/api/v1/catalogue/suggestions?q=${encodeURIComponent(debouncedQuery)}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setProducts(data.products || []);
        setBrands(data.brands || []);
        setCategories(data.categories || []);
        const total = (data.products?.length || 0) + (data.brands?.length || 0) + (data.categories?.length || 0);
        setStatus(total === 0 ? `No suggestions for ${debouncedQuery}` : `${total} suggestions`);
      })
      .catch(() => {
        /* network errors fall back to empty suggestions */
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  const flatItems: { type: 'product' | 'brand' | 'category' | 'query'; label: string; href?: string; query?: string }[] = [];
  if (value.trim()) {
    flatItems.push({ type: 'query', label: `Search “${value.trim()}”`, query: value.trim() });
  }
  products.forEach((p) => flatItems.push({ type: 'product', label: p.name, href: `/product/${p.slug}` }));
  brands.forEach((b) => flatItems.push({ type: 'brand', label: b.name, href: `/brand/${b.slug}` }));
  categories.forEach((c) => flatItems.push({ type: 'category', label: c.name, href: `/category/${c.slug}` }));

  const submit = (query: string) => {
    const term = query.trim();
    if (term.length >= 2) writeRecent(term);
    onChange(term);
    onSearchSubmit?.(term);
    setIsOpen(false);
  };

  const activate = (item: (typeof flatItems)[number]) => {
    if (item.href) {
      window.history.pushState({}, '', item.href);
      window.dispatchEvent(new Event('popstate'));
      setIsOpen(false);
      return;
    }
    if (item.query) submit(item.query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && flatItems[activeIndex]) {
        activate(flatItems[activeIndex]);
      } else {
        submit(value);
      }
    }
  };

  const isBrand = variant === 'brand';

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="relative flex items-center">
        <label htmlFor={listId + '-input'} className="sr-only">
          Search products
        </label>
        <Search
          className={cn(
            'absolute left-3 w-3.5 h-3.5 pointer-events-none',
            isBrand ? 'text-[#aedac2]' : 'text-slate-400'
          )}
        />
        <input
          id={listId + '-input'}
          type="search"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          autoFocus={autoFocus}
          className={cn(
            'w-full rounded-full py-1.5 pl-9 text-xs font-medium focus:outline-none transition-all',
            isBrand
              ? 'pr-[4.75rem] glass-box text-[#aedac2] placeholder:text-[#aedac2]/85 focus:ring-2 focus:ring-white/20'
              : 'pr-10 border border-slate-200 bg-slate-100/80 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#157a62] shadow-2xs'
          )}
        />

        {isBrand ? (
          <button
            type="button"
            onClick={() => submit(value)}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white text-[#003d30] text-[10px] font-black px-3 py-1 cursor-pointer hover:bg-white/90"
          >
            Search
          </button>
        ) : value ? (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setIsOpen(false);
            }}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {status}
      </div>

      {isOpen && (
        <div
          id={listId}
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mt-1.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl animate-fade-in space-y-2 max-h-80 overflow-y-auto"
        >
          {value.trim().length < 2 ? (
            <div>
              <div className="flex items-center gap-1.5 px-2 pb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <Clock className="w-3 h-3" />
                <span>Recent searches</span>
              </div>
              {recent.length === 0 ? (
                <p className="px-2.5 py-2 text-xs text-slate-500">Type at least 2 characters to search.</p>
              ) : (
                recent.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => submit(item)}
                    className="w-full rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 text-left cursor-pointer"
                  >
                    {item}
                  </button>
                ))
              )}
            </div>
          ) : flatItems.length === 0 ? (
            <p className="px-2.5 py-2 text-xs text-slate-500">No matching products, brands, or categories.</p>
          ) : (
            flatItems.map((item, index) => (
              <button
                id={`${listId}-opt-${index}`}
                key={`${item.type}-${item.label}-${index}`}
                type="button"
                role="option"
                aria-selected={activeIndex === index}
                onClick={() => activate(item)}
                className={cn(
                  'w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-bold text-left cursor-pointer',
                  activeIndex === index ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                )}
              >
                <span>{item.label}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">{item.type}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
