import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: 'none' | 'sm' | 'default' | 'lg';
  background?: 'transparent' | 'surface' | 'subtle' | 'dark';
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  padding = 'default',
  background = 'transparent',
  className,
  children,
  ...props
}) => {
  const paddingClass = {
    none: 'py-0',
    sm: 'py-6 md:py-8',
    default: 'py-10 md:py-16',
    lg: 'py-16 md:py-24',
  }[padding];

  const bgClass = {
    transparent: 'bg-transparent',
    surface: 'bg-white',
    subtle: 'bg-slate-100/70',
    dark: 'bg-slate-900 text-white',
  }[background];

  return (
    <section className={cn(paddingClass, bgClass, className)} {...props}>
      {children}
    </section>
  );
};
