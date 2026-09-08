/**
 * Fast bulk sync of product.categoryId from seed-catalog.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(fs.readFileSync(path.join(projectRoot, 'prisma', 'seed-catalog.json'), 'utf-8'));
const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  const categoryIdBySlug = new Map<string, string>();
  for (const cat of catalog.categories) {
    const row = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description || cat.name },
      create: { name: cat.name, slug: cat.slug, description: cat.description || cat.name },
    });
    categoryIdBySlug.set(cat.slug, row.id);
  }

  // Group product slugs by target category for fewer queries
  const byCat = new Map<string, string[]>();
  for (const p of catalog.products) {
    if (!byCat.has(p.categorySlug)) byCat.set(p.categorySlug, []);
    byCat.get(p.categorySlug)!.push(p.slug);
  }

  let total = 0;
  for (const [slug, productSlugs] of byCat) {
    const categoryId = categoryIdBySlug.get(slug);
    if (!categoryId) continue;
    // chunk to avoid huge IN lists
    for (let i = 0; i < productSlugs.length; i += 50) {
      const chunk = productSlugs.slice(i, i + 50);
      const r = await prisma.product.updateMany({
        where: { slug: { in: chunk } },
        data: { categoryId },
      });
      total += r.count;
    }
    console.log(`  ${slug}: ${productSlugs.length} products`);
  }

  console.log(`Updated ${total} product rows`);
  await prisma.$disconnect();
  execSync('npx tsx scripts/update-initial-data.ts', { cwd: projectRoot, stdio: 'inherit' });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
