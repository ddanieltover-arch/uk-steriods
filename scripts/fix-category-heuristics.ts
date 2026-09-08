/**
 * Apply name/description heuristics to correct clear mis-buckets
 * (e.g. TB-500/BPC-157 stuck in injectable/PCT).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const seedJsonPath = path.join(projectRoot, 'prisma', 'seed-catalog.json');
const prisma = new PrismaClient();

function detect(text: string): string | null {
  const lower = text.toLowerCase();
  if (/\bkamagra\b|\blovegra\b/.test(lower)) return 'kamagra';
  if (/\bviagra\b|\bsildenafil\b/.test(lower) && !/kamagra|lovegra|tadalafil|cialis|dapoxetine/.test(lower))
    return 'viagra';
  if (/\bdapoxetine\b|\btadalafil\b|\bcialis\b|\blevitra\b|\bverdanafil\b|\bvidalista\b|\btadafire\b|\bxxx tabs\b|\bpower proper\b|\bpower-proper\b|\bed med/.test(lower))
    return 'ed-meds';
  if (
    /\bhgh\b|\bgrowth hormone\b|\bqomatropin\b|\bsomatropin\b|\beltropin\b|\bevotropin\b|\bviogentropin\b|\bsyntropin\b/.test(
      lower
    ) &&
    !/syringe|injection kit|mk-?677|ibutamoren/.test(lower)
  )
    return 'hgh';
  if (/\bsarm\b|\brad-?140\b|\bmk-?677\b|\bmk677\b|\bgw-?501516\b|\bgw501516\b|\blgd|ostarine|cardarine|yk-?11|sr-?9009|andarine|\bs-?23\b|\bligandrol\b|\bibutamoren\b|\btestolone\b|\bstenabolic\b/.test(lower))
    return 'sarms';
  if (
    /\bpct\b|\bnolvadex\b|\btamoxifen\b|\bclomid\b|\bclomiphene\b|\barimidex\b|\banastrozole\b|\barmidex\b|\bcaber|\bcabergoline\b|\bproviron\b|\bliv\.?52\b|\bexemestane\b|\baromasin\b|\bletrozole\b|\bfemara\b|\braloxifene\b|\btudca\b/.test(
      lower
    )
  )
    return 'pct';
  if (/\bneedle\b|\bsyringe\b|\bbacteriostatic\b|\binjection water\b|\binjection kit\b|\bswabs\b/.test(lower))
    return 'accessories';
  if (
    /\bpeptide\b|\bbpc-?157\b|\btb-?500\b|\bigf\b|\bmgf\b|\bmelanotan\b|\bmt-?2\b|\bipamorelin\b|\bghrp\b|\bepithalon\b|\bsermorelin\b|\bhexarelin\b|\bfollistatin\b|\bpt-?141\b|\bmots-?c\b|\baod9604\b|\baicar\b/.test(
      lower
    ) &&
    !/syringe|injection kit/.test(lower)
  )
    return 'peptides';
  if (/\bclenbuterol\b|\bt3\b|\bcytomel\b|\bsalbutamol\b|\bfat burn|\bfat loss|\bfastrip\b|\bsibutramin\b|\bsynephrin\b|\bhelios\b|\bthermo/.test(lower))
    return 'fat-loss';
  return null;
}

async function main() {
  const catalog = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
  let changed = 0;
  for (const p of catalog.products) {
    const guessed = detect(`${p.name} ${p.slug} ${p.shortDescription || ''}`);
    if (!guessed) continue;
    // Don't demote products already in a more specific matching bucket incorrectly
    // Only move when heuristic is more specific than current broad injectable/oral,
    // or when peptide/hgh/sarm clearly wrong.
    const shouldMove =
      guessed !== p.categorySlug &&
      (['injectable', 'oral', 'pct'].includes(p.categorySlug) ||
        (guessed === 'peptides' && p.categorySlug !== 'peptides') ||
        (guessed === 'hgh' && p.categorySlug !== 'hgh') ||
        (guessed === 'sarms' && p.categorySlug !== 'sarms') ||
        (guessed === 'accessories' && p.categorySlug !== 'accessories') ||
        (['ed-meds', 'viagra', 'kamagra'].includes(guessed) &&
          !['ed-meds', 'viagra', 'kamagra'].includes(p.categorySlug)));

    if (shouldMove) {
      // Prefer not to override viagra/kamagra/ed-meds with each other here
      if (['ed-meds', 'viagra', 'kamagra'].includes(p.categorySlug) && ['ed-meds', 'viagra', 'kamagra'].includes(guessed)) {
        continue;
      }
      console.log(`  ${p.slug}: ${p.categorySlug} → ${guessed}`);
      p.categorySlug = guessed;
      changed++;
    }
  }

  const counts: Record<string, number> = {};
  for (const p of catalog.products) counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
  console.log(`Changed: ${changed}`);
  console.log(counts);

  fs.writeFileSync(seedJsonPath, JSON.stringify(catalog, null, 2));

  await prisma.$connect();
  const cats = await prisma.category.findMany();
  const bySlug = Object.fromEntries(cats.map((c) => [c.slug, c.id]));
  for (const [slug, productSlugs] of Object.entries(
    catalog.products.reduce((acc: Record<string, string[]>, p: any) => {
      (acc[p.categorySlug] ||= []).push(p.slug);
      return acc;
    }, {})
  )) {
    const categoryId = bySlug[slug];
    if (!categoryId) continue;
    for (let i = 0; i < productSlugs.length; i += 50) {
      await prisma.product.updateMany({
        where: { slug: { in: productSlugs.slice(i, i + 50) } },
        data: { categoryId },
      });
    }
  }
  await prisma.$disconnect();
  execSync('npx tsx scripts/update-initial-data.ts', { cwd: projectRoot, stdio: 'inherit' });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
