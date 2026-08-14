import { PrismaClient } from '@prisma/client';
import { seedBlog } from './seed-blog';

const prisma = new PrismaClient();

async function main() {
  await seedBlog(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
