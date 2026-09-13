import React from 'react';
import { spaNavigate, shouldIgnoreSpaClick } from '../../lib/spa-navigate';
import { cn } from '../../lib/utils';

export interface AppLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  /** Prefer this over spaNavigate when the parent already owns routing (e.g. App navigateTo). */
  navigate?: (href: string) => void;
}

/**
 * Real `<a href>` so the browser shows the destination URL in the status bar on hover,
 * while still soft-navigating on plain left-clicks.
 */
export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, navigate, onClick, className, target, children, ...rest }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        className={cn(className)}
        {...rest}
        onClick={(event) => {
          onClick?.(event);
          if (shouldIgnoreSpaClick(event)) return;
          if (target === '_blank' || rest.download != null) return;
          event.preventDefault();
          if (navigate) navigate(href);
          else spaNavigate(href);
        }}
      >
        {children}
      </a>
    );
  }
);

AppLink.displayName = 'AppLink';
