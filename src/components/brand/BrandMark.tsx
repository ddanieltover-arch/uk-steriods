import React, { useState } from 'react';
import { SITE_NAME } from '../../lib/seo/site';
import { cn } from '../../lib/utils';
import { AppLink } from '../navigation/AppLink';

interface BrandMarkProps {
  size?: 'sm' | 'md';
  href?: string;
  navigate?: (path: string) => void;
  onClick?: () => void;
  inverted?: boolean;
  className?: string;
  plate?: 'gradient' | 'black';
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  size = 'md',
  href = '/',
  navigate,
  onClick,
  className,
  plate = 'gradient',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const height = size === 'sm' ? 'h-5' : 'h-6';

  return (
    <AppLink
      href={href}
      navigate={navigate}
      onClick={() => onClick?.()}
      className={cn(
        'flex items-center justify-center cursor-pointer shrink-0 rounded-2xl px-2.5 py-1',
        plate === 'black' ? 'bg-black' : 'brand-logo-bg',
        className
      )}
      aria-label={`${SITE_NAME} home`}
    >
      {!imgFailed ? (
        <img
          src="/logo.png"
          alt={SITE_NAME}
          className={cn(height, 'w-auto max-w-[110px] sm:max-w-[128px] object-contain')}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className="px-1 text-sm font-black uppercase tracking-tight text-white">
          Steroids UK
        </span>
      )}
    </AppLink>
  );
};
