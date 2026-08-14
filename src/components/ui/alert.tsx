import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const alertVariants = cva(
  'relative w-full rounded-2xl border p-4 text-xs font-medium text-slate-800 space-y-1',
  {
    variants: {
      variant: {
        default: 'bg-slate-50 border-slate-200 text-slate-900',
        info: 'bg-teal-50 border-teal-200 text-teal-900',
        warning: 'bg-amber-50 border-amber-200 text-amber-900',
        destructive: 'bg-red-50 border-red-200 text-red-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('font-black uppercase tracking-wider text-[11px]', className)} {...props} />
  )
);
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-xs leading-relaxed opacity-90', className)} {...props} />
  )
);
AlertDescription.displayName = 'AlertDescription';
