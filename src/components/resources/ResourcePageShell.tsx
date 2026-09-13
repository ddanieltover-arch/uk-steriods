import React from 'react';
import { Container } from '../layout/Container';
import { RESOURCE_LINKS } from '../../data/resources';
import { cn } from '../../lib/utils';
import { AppLink } from '../navigation/AppLink';

interface ResourcePageShellProps {
  kicker: string;
  title: string;
  intro?: string;
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const ResourcePageShell: React.FC<ResourcePageShellProps> = ({
  kicker,
  title,
  intro,
  currentPath,
  onNavigate,
  children,
}) => {
  return (
    <div className="bg-[#f4f6f5] min-h-[70vh]">
      <Container className="py-10 lg:py-14">
        <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
          <aside className="lg:sticky lg:top-28">
            <nav
              aria-label="Resource pages"
              className="rounded-2xl bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] border border-slate-100/80 p-2"
            >
              {RESOURCE_LINKS.map((link) => {
                const active = currentPath === link.href;
                return (
                  <AppLink
                    key={link.href}
                    href={link.href}
                    navigate={onNavigate}
                    className={cn(
                      'w-full text-left rounded-xl px-4 py-2.5 text-[13px] font-bold cursor-pointer transition-colors border-l-[3px] block',
                      active
                        ? 'bg-[#e8f6ef] text-[#0f5c48] border-l-[#157a62]'
                        : 'text-slate-800 border-l-transparent hover:bg-[#e8f6ef] hover:text-[#0f5c48] hover:border-l-[#157a62]'
                    )}
                  >
                    {link.label}
                  </AppLink>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#157a62]">{kicker}</p>
            <h1 className="text-[1.85rem] sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight mt-2 leading-[1.15]">
              {title}
            </h1>
            {intro && (
              <p className="text-[15px] text-slate-600 mt-4 max-w-2xl leading-relaxed">{intro}</p>
            )}
            <div className="mt-10 space-y-14">{children}</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export function ResourceKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#157a62] mb-1.5">{children}</p>
  );
}
