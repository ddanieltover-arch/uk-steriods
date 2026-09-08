/** Fix common UTF-8 mojibake (e.g. â€“ → –) and strip HTML for storefront copy. */

const MOJIBAKE_MAP: Array<[RegExp, string]> = [
  [/â€“/g, '–'],
  [/â€”/g, '—'],
  [/â€˜/g, '‘'],
  [/â€™/g, '’'],
  [/â€œ/g, '“'],
  [/â€/g, '”'],
  [/â€¦/g, '…'],
  [/â€³/g, '″'],
  [/â€²/g, '′'],
  [/Â£/g, '£'],
  [/Â°/g, '°'],
  [/Â\s/g, ' '],
  [/Â/g, ''],
];

export function fixMojibake(value: string): string {
  let out = value;
  for (const [pattern, replacement] of MOJIBAKE_MAP) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

export function stripHtmlToText(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

/** Normalize product/category copy for safe plain-text display. */
export function normalizeProductText(value: string | null | undefined): string {
  if (!value) return '';
  return stripHtmlToText(fixMojibake(value));
}
