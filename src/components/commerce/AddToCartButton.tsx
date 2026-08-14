import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Button, ButtonProps } from '../ui/button';
import { cn } from '../../lib/utils';

interface AddToCartButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick: () => void;
  isLoading?: boolean;
  isAdded?: boolean;
  isOutOfStock?: boolean;
  label?: string;
  className?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  isLoading = false,
  isAdded = false,
  isOutOfStock = false,
  label = 'Add to Cart',
  variant = 'default',
  size = 'default',
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      variant={isAdded ? 'secondary' : variant}
      size={size}
      disabled={disabled || isLoading || isOutOfStock}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn('w-full font-bold transition-all cursor-pointer', className)}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Adding...</span>
        </span>
      ) : isAdded ? (
        <span className="flex items-center gap-2 text-emerald-400">
          <Check className="w-4 h-4" />
          <span>Added to Cart</span>
        </span>
      ) : isOutOfStock ? (
        <span>Out of Stock</span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          <span>{label}</span>
        </span>
      )}
    </Button>
  );
};
