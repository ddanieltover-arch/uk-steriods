/**
 * Display ratings for catalogue cards.
 * Prefers real review averages; otherwise a deterministic pseudo-random
 * rating so cards don't all show "Unrated". A small share stay unrated.
 */
export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type DisplayRating = { avg: number; count: number } | null;

export function getDisplayRating(
  productKey: string,
  realAvg?: number,
  realCount?: number
): DisplayRating {
  if (realAvg !== undefined && realAvg > 0 && (realCount === undefined || realCount > 0)) {
    return {
      avg: Math.round(realAvg * 10) / 10,
      count: realCount && realCount > 0 ? realCount : 1,
    };
  }

  const hash = hashString(productKey || 'product');
  // Keep ~15% of products visually unrated
  if (hash % 100 < 15) return null;

  const avg = Math.round((4.3 + (hash % 8) * 0.1) * 10) / 10; // 4.3–5.0
  const count = 5 + (hash % 42); // 5–46
  return { avg, count };
}
