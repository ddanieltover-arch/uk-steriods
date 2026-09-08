/**
 * Backfill empty product names in seed-catalog.json (and optionally the DB)
 * from slug + brand. Also repairs hollow short/full descriptions left by a
 * failed scrape (" by Pharmaqo Labs").
 *
 * Usage:
 *   npx tsx scripts/backfill-product-names.ts
 *   npx tsx scripts/backfill-product-names.ts --db
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const seedPath = path.join(projectRoot, 'prisma', 'seed-catalog.json');

const ACRONYMS = new Set([
  'mk',
  'lgd',
  'gw',
  'sr',
  'yk',
  'igf',
  'bpc',
  'tb',
  'mt',
  'hcg',
  'hgh',
  'eq',
  'npp',
  'dhb',
  'aq',
  'pct',
  'trt',
  'mgf',
]);

export function deriveProductName(slug: string, brandSlug: string, brandName: string): string {
  const brandCompact = brandSlug.replace(/-/g, '');
  const brandFirst = brandSlug.split('-')[0] || '';
  let s = slug;

  const stripEnd = (key: string) => {
    if (key && s.endsWith(`-${key}`)) s = s.slice(0, -(key.length + 1));
  };
  const stripStart = (key: string) => {
    if (key && s.startsWith(`${key}-`)) s = s.slice(key.length + 1);
  };

  for (const key of [brandSlug, brandCompact, brandFirst]) {
    stripEnd(key);
    stripStart(key);
  }

  if (s.endsWith('-small')) s = s.slice(0, -6);

  const title = s
    .split('-')
    .filter(Boolean)
    .map((w) => {
      if (ACRONYMS.has(w.toLowerCase())) return w.toUpperCase();
      if (/^[a-z]+\d/i.test(w) || /^\d/.test(w)) return w.toUpperCase();
      if (w.length <= 2) return w.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  const base = title || slug;
  return brandName ? `${base} – ${brandName}` : base;
}

function isHollowShort(value: string | undefined, brandName: string): boolean {
  if (!value || !value.trim()) return true;
  const trimmed = value.trim();
  return /^by\s+/i.test(trimmed) || trimmed === `by ${brandName}`;
}

function isHollowDescription(value: string | undefined, brandName: string): boolean {
  if (!value || !value.trim()) return true;
  return (
    /<p>\s*by\s+/i.test(value) ||
    value.trim() === ` by ${brandName}` ||
    value.trim() === `by ${brandName}`
  );
}

async function main() {
  const updateDb = process.argv.includes('--db');
  const catalog = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

  let fixedNames = 0;
  let fixedShort = 0;
  let fixedDesc = 0;

  for (const p of catalog.products) {
    if (!p.name || !String(p.name).trim()) {
      p.name = deriveProductName(p.slug, p.brandSlug, p.brandName);
      fixedNames++;
    }

    if (isHollowShort(p.shortDescription, p.brandName)) {
      p.shortDescription = `Buy ${p.name} in the UK. Lab-tested product with tracked delivery.`;
      fixedShort++;
    }

    if (isHollowDescription(p.description, p.brandName)) {
      p.description = `<p>${p.name}. Lab-tested product.</p>`;
      fixedDesc++;
    }
  }

  fs.writeFileSync(seedPath, JSON.stringify(catalog, null, 2) + '\n');
  console.log(`Updated seed-catalog.json: names=${fixedNames}, shortDesc=${fixedShort}, desc=${fixedDesc}`);

  if (updateDb) {
    const prisma = new PrismaClient();
    let dbUpdated = 0;
    try {
      for (const p of catalog.products) {
        const result = await prisma.product.updateMany({
          where: { slug: p.slug },
          data: {
            name: p.name,
            shortDescription: p.shortDescription,
            description: p.description,
          },
        });
        dbUpdated += result.count;
      }
      console.log(`Updated ${dbUpdated} database product rows.`);
    } finally {
      await prisma.$disconnect();
    }
  } else {
    console.log('Skipped DB update (pass --db to sync Prisma products).');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
