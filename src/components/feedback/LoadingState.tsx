import React from 'react';
import { cn } from '../../lib/utils';

interface LoadingStateProps {
  label?: string;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = 'Loading catalog...',
  size = 'default',
  className,
}) => {
  const spinnerSize = {
    sm: 'h-4 w-4 border-2',
    default: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-3',
  }[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 space-y-3 text-slate-500',
        className
      )}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-teal-600 border-t-transparent',
          spinnerSize
        )}
      />
      {label && <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</p>}
    </div>
  );
};
