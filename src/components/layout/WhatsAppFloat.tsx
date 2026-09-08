import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { WHATSAPP_URL } from '../../data/resources';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.133-1.6-.787-1.848-.875-.248-.088-.429-.133-.61.133-.181.266-.697.875-.854 1.054-.157.178-.314.2-.582.067-.267-.133-1.13-.416-2.152-1.327-.796-.71-1.333-1.588-1.49-1.855-.156-.267-.017-.411.117-.543.12-.119.267-.31.4-.465.134-.155.178-.266.267-.444.089-.178.044-.333-.022-.466-.067-.133-.61-1.511-.836-2.07-.22-.546-.444-.472-.61-.481l-.52-.01c-.178 0-.466.067-.71.333-.244.266-.932.91-.932 2.22 0 1.31.955 2.576 1.088 2.754.133.178 1.881 2.873 4.562 4.028.638.275 1.136.44 1.524.563.64.203 1.223.174 1.684.106.513-.077 1.6-.653 1.825-1.284.225-.631.225-1.172.157-1.284-.067-.112-.245-.178-.512-.311zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const floatBtn =
  'flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

export const WhatsAppFloat: React.FC = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-40 flex flex-col-reverse items-center gap-3">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`${floatBtn} bg-[#25D366] text-white shadow-emerald-900/20 focus-visible:ring-[#25D366]`}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`${floatBtn} bg-[#003d30] text-white shadow-slate-900/20 focus-visible:ring-[#003d30]`}
        >
          <ChevronUp className="h-7 w-7" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};
