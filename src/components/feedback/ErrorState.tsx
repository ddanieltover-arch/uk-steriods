import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an unexpected error while processing your request. Please try again.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center space-y-3 max-w-lg mx-auto',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
        <AlertTriangle className="h-6 w-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-extrabold text-red-900">{title}</h3>
        <p className="text-xs text-red-700 leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <Button onClick={onRetry} variant="destructive" size="sm" className="mt-1">
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
          <span>Try Again</span>
        </Button>
      )}
    </div>
  );
};
