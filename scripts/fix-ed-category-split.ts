/**
 * Disambiguate ED Meds / Viagra / Kamagra assignments by product name,
 * then regenerate initialData + sync DB category FKs.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const seedJsonPath = path.join(projectRoot, 'prisma', 'seed-catalog.json');
const prisma = new PrismaClient();

function edFamilySlug(name: string, slug: string, current: string): string | null {
  const text = `${name} ${slug}`.toLowerCase();
  const inFamily = ['ed-meds', 'viagra', 'kamagra'].includes(current) ||
    /kamagra|lovegra|viagra|sildenafil|tadalafil|cialis|dapoxetine|levitra|verdanafil|vidalista|tadafire|xxx tabs|power proper|power-proper/.test(text);

  if (!inFamily) return null;

  if (/kamagra|lovegra/.test(text)) return 'kamagra';
  if (/\bviagra\b|\bsildenafil\b/.test(text) && !/kamagra|lovegra|tadalafil|cialis|dapoxetine/.test(text)) return 'viagra';
  return 'ed-meds';
}

async function main() {
  const catalog = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
  let changed = 0;
  for (const p of catalog.products) {
    const next = edFamilySlug(p.name, p.slug, p.categorySlug);
    if (next && next !== p.categorySlug) {
      p.categorySlug = next;
      changed++;
    }
  }

  const counts: Record<string, number> = {};
  for (const p of catalog.products) counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
  console.log(`ED-family reassigned: ${changed}`);
  for (const slug of ['ed-meds', 'viagra', 'kamagra']) console.log(`  ${slug}: ${counts[slug] || 0}`);

  fs.writeFileSync(seedJsonPath, JSON.stringify(catalog, null, 2));

  await prisma.$connect();
  const cats = await prisma.category.findMany();
  const bySlug = Object.fromEntries(cats.map((c) => [c.slug, c.id]));
  let upd = 0;
  for (const p of catalog.products) {
    const cid = bySlug[p.categorySlug];
    if (!cid) continue;
    upd += (await prisma.product.updateMany({ where: { slug: p.slug }, data: { categoryId: cid } })).count;
  }
  console.log(`DB updated: ${upd}`);
  await prisma.$disconnect();

  execSync('npx tsx scripts/update-initial-data.ts', { cwd: projectRoot, stdio: 'inherit' });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
