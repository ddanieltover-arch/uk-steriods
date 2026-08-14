import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = 'default',
  disabled = false,
  className,
}) => {
  const handleDecrement = () => {
    if (quantity > min && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    default: 'h-10 px-3 text-xs',
    lg: 'h-12 px-4 text-sm',
  }[size];

  const buttonSizeClasses = {
    sm: 'w-6 h-6',
    default: 'w-8 h-8',
    lg: 'w-9 h-9',
  }[size];

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl border border-slate-200 bg-white font-bold text-slate-900 shadow-2xs',
        sizeClasses,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min || disabled}
        className={cn(
          'flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer',
          buttonSizeClasses
        )}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="w-8 text-center font-extrabold select-none">{quantity}</span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max || disabled}
        className={cn(
          'flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer',
          buttonSizeClasses
        )}
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
