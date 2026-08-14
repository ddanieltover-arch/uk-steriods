import React from 'react';
import { Package, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 md:p-16 text-center shadow-2xs space-y-4',
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        {icon || <Package className="h-7 w-7 stroke-1" />}
      </div>

      <div className="space-y-1 max-w-md">
        <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="default" size="sm" className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
