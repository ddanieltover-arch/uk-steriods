import { useEffect } from 'react';

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

/** Loads GA4 gtag when VITE_GA4_MEASUREMENT_ID is set. No-op without the env var. */
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
    // Match the official snippet: push the Arguments object, not a rest array.
    window.gtag = function gtag(..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      anonymize_ip: true,
      // SPA navigations are tracked from App.tsx via trackPageView.
      send_page_view: false,
    });
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
