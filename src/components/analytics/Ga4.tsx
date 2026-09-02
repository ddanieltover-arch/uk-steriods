import { useEffect } from 'react';

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

/** Loads GA4 gtag when VITE_GA4_MEASUREMENT_ID is set. No-op in development without the env var. */
export function Ga4() {
  useEffect(() => {
    if (!MEASUREMENT_ID || typeof window === 'undefined') return;

    const src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = src;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID, { anonymize_ip: true });
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
