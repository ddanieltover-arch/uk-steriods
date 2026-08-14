import { absoluteUrl, getSiteOrigin, sanitizeMetaText, SITE_NAME } from './site';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: typeof window !== 'undefined' ? window.location.origin : getSiteOrigin(),
  };
}

export function websiteJsonLd() {
  const origin = typeof window !== 'undefined' ? window.location.origin : getSiteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: origin,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${origin}/shop?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(input: {
  name: string;
  description: string;
  images: string[];
  sku: string;
  brandName: string;
  priceGbp: number;
  availability: boolean;
  slug: string;
  ratingAvg?: number;
  reviewCount?: number;
}) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: sanitizeMetaText(input.description, 300),
    sku: input.sku,
    image: input.images.filter(Boolean),
    brand: { '@type': 'Brand', name: input.brandName },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/product/${input.slug}`),
      priceCurrency: 'GBP',
      price: input.priceGbp.toFixed(2),
      availability: input.availability
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  if (input.reviewCount && input.reviewCount > 0 && input.ratingAvg) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: input.ratingAvg,
      reviewCount: input.reviewCount,
    };
  }

  return data;
}
