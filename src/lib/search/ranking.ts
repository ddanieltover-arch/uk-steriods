/**
 * Deterministic catalogue search ranking.
 *
 * Priority (highest wins; a product keeps its maximum matching score):
 * 1. Exact SKU                1000
 * 2. Exact product name        900
 * 3. SKU contains query        850
 * 4. Product name prefix       800
 * 5. All query tokens in name  700
 * 6. Product name contains     650
 * 7. Brand name match          600
 * 8. Category name match       500
 * 9. Tag match                 400
 * 10. Description match        300
 *
 * Ties are broken by featured flag, then name A–Z (applied by the caller).
 */

export const SEARCH_QUERY_MIN_LENGTH = 2;
export const SEARCH_QUERY_MAX_LENGTH = 80;

export interface SearchableProductFields {
  sku: string;
  name: string;
  brandName: string;
  categoryName: string;
  tags: string[];
  shortDescription?: string | null;
  description?: string | null;
}

export function normalizeSearchQuery(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ').slice(0, SEARCH_QUERY_MAX_LENGTH);
}

export function escapeIlike(value: string): string {
  return value.replace(/[\\%_]/g, '\\$&');
}

export function scoreSearchRelevance(query: string, product: SearchableProductFields): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const sku = (product.sku || '').toLowerCase();
  const name = (product.name || '').toLowerCase();
  const brand = (product.brandName || '').toLowerCase();
  const category = (product.categoryName || '').toLowerCase();
  const shortDesc = (product.shortDescription || '').toLowerCase();
  const desc = (product.description || '').toLowerCase();
  const tags = (product.tags || []).map((t) => t.toLowerCase());
  const tokens = q.split(/\s+/).filter(Boolean);

  let score = 0;

  if (sku === q) score = Math.max(score, 1000);
  if (name === q) score = Math.max(score, 900);
  if (sku.includes(q)) score = Math.max(score, 850);
  if (name.startsWith(q)) score = Math.max(score, 800);
  if (tokens.length > 0 && tokens.every((t) => name.includes(t))) score = Math.max(score, 700);
  if (name.includes(q)) score = Math.max(score, 650);
  if (brand === q || brand.includes(q)) score = Math.max(score, 600);
  if (category === q || category.includes(q)) score = Math.max(score, 500);
  if (tags.some((t) => t === q || t.includes(q))) score = Math.max(score, 400);
  if (shortDesc.includes(q) || desc.includes(q)) score = Math.max(score, 300);

  return score;
}
