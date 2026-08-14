import { useEffect } from 'react';
import { SITE_NAME, SITE_OG_IMAGE_PATH } from '../../lib/seo/site';

export interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>[];
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

export function SeoHead({
  title,
  description,
  canonical,
  robots = 'index,follow',
  ogImage,
  ogType = 'website',
  jsonLd = [],
}: SeoHeadProps) {
  const resolvedOg = ogImage || `${window.location.origin}${SITE_OG_IMAGE_PATH}`;
  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: ogType });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });

    const url = canonical || `${window.location.origin}${window.location.pathname}`;
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });

    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;

    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: resolvedOg });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: resolvedOg });

    const setLink = (rel: string, href: string, extra?: Record<string, string>) => {
      let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
      if (extra) Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
    };
    setLink('icon', `${window.location.origin}/favicon.ico`, { sizes: 'any' });
    setLink('apple-touch-icon', `${window.location.origin}/apple-touch-icon.png`);

    const existing = document.head.querySelectorAll('script[data-seo-jsonld="true"]');
    existing.forEach((n) => n.remove());
    jsonLd.forEach((block) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = 'true';
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
    });
  }, [title, description, canonical, robots, resolvedOg, ogType, jsonLd]);

  return null;
}
