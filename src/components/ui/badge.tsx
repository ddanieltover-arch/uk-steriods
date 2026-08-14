import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-teal-100 text-teal-800 border border-teal-200',
        secondary: 'bg-slate-100 text-slate-800 border border-slate-200',
        outline: 'text-slate-700 border border-slate-300',
        destructive: 'bg-red-100 text-red-800 border border-red-200',
        warning: 'bg-amber-100 text-amber-800 border border-amber-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string;
}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
