import React from 'react';
import { Home, Menu, Search, Headphones, ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MobileBottomNavProps {
  currentPath: string;
  cartCount: number;
  onGoHome: () => void;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenChat: () => void;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPath,
  cartCount,
  onGoHome,
  onOpenMenu,
  onOpenSearch,
  onOpenChat,
  onOpenCart,
}) => {
  const isHome = currentPath === '/' || currentPath === '';
  const itemClass = 'flex flex-col items-center justify-end gap-0.5 min-w-[3.25rem] text-[10px] font-semibold';

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white rounded-t-2xl shadow-[0_-8px_24px_rgba(15,23,42,0.18)] pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile"
    >
      <div className="grid grid-cols-5 items-end px-2 pt-2 pb-2">
        <button
          type="button"
          onClick={onGoHome}
          className={cn(itemClass, 'cursor-pointer', isHome ? 'text-[#003d30]' : 'text-slate-500')}
        >
          <Home className="h-5 w-5" strokeWidth={1.75} />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={onOpenMenu}
          className={cn(itemClass, 'cursor-pointer text-slate-500')}
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
          <span>Menu</span>
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          className={cn(itemClass, 'cursor-pointer text-slate-500 relative')}
        >
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full bg-[#003d30] text-white shadow-lg flex items-center justify-center">
            <Search className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <span className="mt-8">Search</span>
        </button>

        <button
          type="button"
          onClick={onOpenChat}
          className={cn(itemClass, 'cursor-pointer text-slate-500')}
        >
          <span className="relative">
            <Headphones className="h-5 w-5" strokeWidth={1.75} />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </span>
          <span>Chat</span>
        </button>

        <button
          type="button"
          onClick={onOpenCart}
          className={cn(itemClass, 'cursor-pointer text-slate-500')}
        >
          <span className="relative">
            <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[1rem] h-4 px-1 rounded-full bg-[#003d30] text-white text-[9px] font-black flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </span>
          <span>Cart</span>
        </button>
      </div>
    </nav>
  );
};
