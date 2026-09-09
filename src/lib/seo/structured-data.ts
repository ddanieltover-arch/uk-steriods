import { SUPPORT_EMAIL } from '../../data/resources';
import { absoluteUrl, getSiteOrigin, sanitizeMetaText, SITE_NAME } from './site';

export function organizationJsonLd() {
  const origin = typeof window !== 'undefined' ? window.location.origin : getSiteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: origin,
    logo: absoluteUrl('/logo.png'),
    image: absoluteUrl('/og-image.png'),
    contactPoint: {
      '@type': 'ContactPoint',
      email: SUPPORT_EMAIL,
      contactType: 'customer support',
      availableLanguage: 'English',
    },
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

export function blogPostingJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  authorName: string;
  publishedAt?: string | Date | null;
  coverImageUrl?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: sanitizeMetaText(input.description, 300),
    author: { '@type': 'Person', name: input.authorName },
    datePublished: input.publishedAt ? new Date(input.publishedAt).toISOString() : undefined,
    image: input.coverImageUrl || absoluteUrl('/og-image.png'),
    url: absoluteUrl(`/blog/${input.slug}`),
    publisher: { '@type': 'Organization', name: SITE_NAME, logo: absoluteUrl('/logo.png') },
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Collection + ItemList for category/brand catalogue pages. */
export function collectionPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  items: { name: string; slug: string }[];
}) {
  const url = absoluteUrl(input.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: sanitizeMetaText(input.description, 300),
    url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: input.items.length,
      itemListElement: input.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absoluteUrl(`/product/${item.slug}`),
      })),
    },
  };
}
