import { Brand } from '../types';

/** Display order matching steroids-uk.com/product-category/manufacturers/ */
export const MANUFACTURER_SLUG_ORDER = [
  'ajanta-pharma',
  'beligas-pharmaceuticals',
  'deus-medical',
  'imuscle-sarms',
  'other',
  'pharma-grade-manufacturers',
  'pharmaqo-labs',
  'proper-labs',
  'syncom-labs',
  'ultima-pharmaceuticals',
  'viogen-pharmaceuticals',
] as const;

export function sortManufacturers(brands: Brand[]): Brand[] {
  const bySlug = new Map(brands.map((b) => [b.slug, b]));
  const ordered: Brand[] = [];

  for (const slug of MANUFACTURER_SLUG_ORDER) {
    const brand = bySlug.get(slug);
    if (brand) ordered.push(brand);
  }

  // Include any remaining brands with products that aren't in the reference list
  for (const brand of brands) {
    if (MANUFACTURER_SLUG_ORDER.includes(brand.slug as (typeof MANUFACTURER_SLUG_ORDER)[number])) continue;
    if ((brand.productCount ?? 0) > 0) ordered.push(brand);
  }

  return ordered;
}
