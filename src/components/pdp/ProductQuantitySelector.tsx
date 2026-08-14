import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface ProductQuantitySelectorProps {
  quantity: number;
  maxStock: number;
  onChange: (qty: number) => void;
  disabled?: boolean;
}

export const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  quantity,
  maxStock,
  onChange,
  disabled = false,
}) => {
  const isMin = quantity <= 1;
  const isMax = quantity >= maxStock || maxStock <= 0;

  const handleDecrease = () => {
    if (!isMin && !disabled) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (!isMax && !disabled) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) {
      onChange(1);
    } else if (maxStock > 0 && val > maxStock) {
      onChange(maxStock);
    } else {
      onChange(val);
    }
  };

  return (
    <div className="space-y-1.5">
      <label htmlFor="pdp-quantity-input" className="text-xs font-black uppercase tracking-wider text-slate-700 block">
        Quantity
      </label>

      <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={isMin || disabled}
          className="p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>

        <input
          id="pdp-quantity-input"
          type="number"
          min={1}
          max={maxStock}
          value={quantity}
          onChange={handleInputChange}
          disabled={disabled || maxStock <= 0}
          className="w-12 text-center font-extrabold text-sm text-slate-900 focus:outline-none bg-transparent"
        />

        <button
          type="button"
          onClick={handleIncrease}
          disabled={isMax || disabled}
          className="p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
