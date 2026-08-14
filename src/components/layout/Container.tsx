import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'large' | 'full';
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'default',
  className,
  children,
  ...props
}) => {
  const maxWidthClass = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    large: 'max-w-[1440px]',
    full: 'max-w-full',
  }[size];

  return (
    <div
      className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8', maxWidthClass, className)}
      {...props}
    >
      {children}
    </div>
  );
};
