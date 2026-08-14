import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '../../lib/utils';

interface WishlistButtonProps {
  isWishlisted: boolean;
  onToggle: () => void;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  isWishlisted,
  onToggle,
  size = 'default',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    default: 'w-9 h-9 p-2',
    lg: 'w-11 h-11 p-2.5',
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    default: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        'rounded-full bg-white/90 backdrop-blur-xs border border-slate-200/80 text-slate-600 shadow-sm transition-all hover:bg-white hover:text-red-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer flex items-center justify-center',
        isWishlisted && 'text-red-500 bg-white border-red-200',
        sizeClasses,
        className
      )}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
    >
      <Heart className={cn(iconSizes, isWishlisted && 'fill-current')} />
    </button>
  );
};
