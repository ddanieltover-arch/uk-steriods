import { Product } from '../../types';

export interface PerformanceScores {
  strength: number;
  keepGains: number;
  popularity: number;
  weightGain: number;
  fatWaterLoss: number;
}

export interface PdpFaqItem {
  question: string;
  answer: string;
}

export function displayProductTitle(product: Product): string {
  const brandSuffix = new RegExp(`\\s*[–—-]\\s*${escapeRegExp(product.brandName)}\\s*$`, 'i');
  return product.name.replace(brandSuffix, '').trim() || product.name;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function inferUsageLabel(product: Product): string {
  const hay = `${product.categorySlug} ${product.categoryName} ${product.name}`.toLowerCase();
  if (hay.includes('inject')) return 'Injectable';
  if (hay.includes('oral') || hay.includes('tab')) return 'Oral';
  if (hay.includes('sarm')) return 'SARM';
  if (hay.includes('peptide')) return 'Peptide';
  return product.categoryName || 'Catalogue';
}

export function inferGoalLabel(product: Product): string {
  const hay = `${product.categorySlug} ${product.tags?.join(' ')} ${product.name}`.toLowerCase();
  if (hay.includes('fat') || hay.includes('clen') || hay.includes('t3')) return 'Cutting';
  if (hay.includes('pct') || hay.includes('clomid') || hay.includes('tamox') || hay.includes('nolvadex')) {
    return 'PCT';
  }
  if (hay.includes('sarm')) return 'Recomp';
  return 'Bulking';
}

export function inferSizeChips(product: Product): string[] {
  const source = [product.variants?.[0]?.name, product.variants?.[0]?.volume, product.variants?.[0]?.dosage, product.name, product.shortDescription]
    .filter(Boolean)
    .join(' ');
  const chips: string[] = [];
  const volume = source.match(/(\d+(?:\.\d+)?)\s*ml\b/i);
  const tabs = source.match(/(\d+)\s*(?:tab|tabs|tablets)\b/i);
  const dose = source.match(/(\d+(?:\.\d+)?)\s*mg(?:\s*\/\s*ml)?/i);
  if (volume) chips.push(`${volume[1]} ml`);
  if (tabs) chips.push(`${tabs[1]} tabs`);
  if (dose) {
    chips.push(source.toLowerCase().includes('mg/ml') || product.categorySlug.includes('inject') ? `${dose[1]} mg/ml` : `${dose[1]} mg`);
  }
  return [...new Set(chips)].slice(0, 3);
}

export function performanceScoresFor(product: Product): PerformanceScores {
  const cat = product.categorySlug;
  if (cat.includes('fat')) {
    return { strength: 2, keepGains: 3, popularity: 4, weightGain: 1, fatWaterLoss: 5 };
  }
  if (cat.includes('sarm')) {
    return { strength: 4, keepGains: 4, popularity: 4, weightGain: 3, fatWaterLoss: 3 };
  }
  if (cat.includes('pct')) {
    return { strength: 1, keepGains: 4, popularity: 5, weightGain: 1, fatWaterLoss: 2 };
  }
  if (cat.includes('oral')) {
    return { strength: 4, keepGains: 3, popularity: 5, weightGain: 4, fatWaterLoss: 2 };
  }
  return { strength: 5, keepGains: 4, popularity: 5, weightGain: 5, fatWaterLoss: 1 };
}

export function dosingCopyFor(product: Product): string {
  const usage = inferUsageLabel(product);
  if (usage === 'Injectable') {
    return `${displayProductTitle(product)} is typically discussed as a long-acting injectable catalogue item. Common storefront notes describe intramuscular use, a consistent weekly schedule, and a 10–12 week window. This is catalogue information only — not medical advice.`;
  }
  if (usage === 'Oral') {
    return `${displayProductTitle(product)} is listed as an oral formulation. Catalogue notes usually describe a daily schedule with a defined cycle length and on-cycle support products. This is catalogue information only — not medical advice.`;
  }
  return `${displayProductTitle(product)} should be reviewed against the manufacturer label and your own research protocol. Cycle length and support products vary by compound class. This is catalogue information only — not medical advice.`;
}

export function faqsFor(product: Product): PdpFaqItem[] {
  const title = displayProductTitle(product);
  return [
    {
      question: `What is ${title} by ${product.brandName}?`,
      answer:
        product.shortDescription ||
        `${title} is a ${product.brandName} catalogue item in ${product.categoryName}. ${product.description}`.slice(0, 420),
    },
    {
      question: `How is ${title} typically listed?`,
      answer: dosingCopyFor(product),
    },
    {
      question: 'Is this a verified lab product and how fast is UK delivery?',
      answer: `Listings from ${product.brandName} are shown with our verified-quality badge where HPLC notes are available. UK orders typically dispatch on Royal Mail Tracked 24. Packaging is plain with a neutral sender name.`,
    },
    {
      question: 'What should I plan around this product?',
      answer:
        'Support products (aromatase control, liver support, and PCT) are suggested from the same catalogue. Bloodwork and independent research are recommended. Nothing on this page is medical advice.',
    },
  ];
}

function scoreCompanion(product: Product, needles: RegExp[]): number {
  const hay = `${product.slug} ${product.name}`.toLowerCase();
  return needles.reduce((score, re) => (re.test(hay) ? score + 1 : score), 0);
}

export function findCompanions(product: Product, catalogue: Product[]) {
  const published = catalogue.filter((p) => p.id !== product.id && p.isPublished !== false);
  const pick = (needles: RegExp[]) =>
    published
      .map((p) => ({ p, score: scoreCompanion(p, needles) }))
      .filter((row) => row.score > 0)
      .sort((a, b) => b.score - a.score)[0]?.p;

  const mustTake =
    pick([/armidex|arimidex|anastrozole|ai-/i]) ||
    published.find((p) => p.categorySlug.includes('pct'));
  const oftenAdded =
    pick([/nandrolone|deca|nandro|cardarine|boldenone/i]) ||
    published.find((p) => p.categorySlug === product.categorySlug);
  const pct =
    pick([/tamoxifen|nolvadex|clomid|clomiphene/i]) ||
    published.find((p) => p.categorySlug.includes('pct'));

  return { mustTake, oftenAdded, pct };
}

export function stackCandidates(product: Product, catalogue: Product[]): Product[] {
  const related = catalogue.filter(
    (p) =>
      p.id !== product.id &&
      p.isPublished !== false &&
      (p.categorySlug === product.categorySlug || p.brandId === product.brandId)
  );
  const accessory = catalogue.find((p) =>
    /needle|syringe/i.test(`${p.slug} ${p.name}`)
  );
  const picks = [related[0], accessory || related[1]].filter((p): p is Product => Boolean(p));
  const unique: Product[] = [];
  picks.forEach((p) => {
    if (!unique.some((u) => u.id === p.id)) unique.push(p);
  });
  return unique.slice(0, 2);
}
