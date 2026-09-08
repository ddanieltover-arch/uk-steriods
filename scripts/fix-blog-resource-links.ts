/**
 * Fix incorrect resource links injected into imported blog posts.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const REPLACEMENTS: Array<[string, string]> = [
  ['/resources/delivery-returns', '/delivery-and-returns'],
  ['/resources/crypto-payment-guides', '/crypto-payment-guides'],
  ['/resources/payment-methods', '/payment-methods'],
  ['/resources/about-us', '/about-us'],
  ['/resources/cycle-builder', '/cycle-builder'],
  ['/resources/privacy-policy', '/privacy-policy'],
  ['/resources/terms', '/terms'],
];

async function main() {
  const posts = await prisma.blogPost.findMany({
    where: { deletedAt: null },
    select: { id: true, slug: true, bodyMarkdown: true, excerpt: true },
  });

  let updated = 0;
  for (const post of posts) {
    let body = post.bodyMarkdown;
    let excerpt = post.excerpt;
    let changed = false;

    for (const [from, to] of REPLACEMENTS) {
      if (body.includes(from)) {
        body = body.split(from).join(to);
        changed = true;
      }
      if (excerpt.includes(from)) {
        excerpt = excerpt.split(from).join(to);
        changed = true;
      }
    }

    if (!changed) continue;

    await prisma.blogPost.update({
      where: { id: post.id },
      data: { bodyMarkdown: body, excerpt },
    });
    updated += 1;
  }

  console.log(`Updated ${updated} of ${posts.length} posts.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
