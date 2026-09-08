import { PrismaClient, Role, StockStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

function cleanText(value: string | null | undefined): string {
  if (!value) return '';
  return value
    .replace(/â€“/g, '–')
    .replace(/â€”/g, '—')
    .replace(/â€³/g, '″')
    .replace(/Â£/g, '£')
    .replace(/Â/g, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

async function main() {
  console.log('🌱 Starting database seed with updated Steroids UK catalog data...');

  // 1. Clean existing records (FK-safe order)
  await prisma.blogPostProduct.deleteMany();
  await prisma.blogPostCategory.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.blogCategory.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.authSession.deleteMany();
  await prisma.checkoutIdempotency.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.discount.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.variantInventory.deleteMany();
  await prisma.productInventory.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing database tables.');

  // 2. Create Admin Users
  const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || 'AdminPassword123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const userPasswordHash = await bcrypt.hash('CustomerPass123!', 10);

  await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || 'sales@uk-steroids.co.uk',
      passwordHash,
      firstName: 'Sales',
      lastName: 'Team',
      role: Role.SUPER_ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      email: 'customer@uk-steroids.co.uk',
      passwordHash: userPasswordHash,
      firstName: 'James',
      lastName: 'Walker',
      role: Role.CUSTOMER,
      addresses: {
        create: {
          recipient: 'James Walker',
          line1: '14 High Street',
          city: 'London',
          county: 'Greater London',
          postcode: 'SW1A 1AA',
          country: 'UK',
          isDefault: true,
        },
      },
    },
  });

  console.log('👤 Created default Admin and Customer accounts.');

  // 3. Load catalog JSON dataset
  const seedJsonPath = path.join(__dirname, 'seed-catalog.json');
  if (!fs.existsSync(seedJsonPath)) {
    throw new Error(`seed-catalog.json not found at ${seedJsonPath}. Run 'npx tsx scripts/import-catalog.ts' first.`);
  }

  const catalogData = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
  console.log(`📦 Loaded ${catalogData.products.length} products from seed-catalog.json.`);

  // 4. Seed Brands
  const brandIdMap: Record<string, string> = {};
  for (const b of catalogData.brands) {
    const brand = await prisma.brand.create({
      data: {
        name: b.name,
        slug: b.slug,
        description: `${b.name} lab-tested anabolic products`,
        logoUrl: b.logoUrl || `/media/brands/${b.slug}.webp`,
        isFeatured: true,
      },
    });
    brandIdMap[b.name] = brand.id;
  }
  console.log(`🏷️ Seeded ${Object.keys(brandIdMap).length} target brands.`);

  // 5. Seed Categories
  const categoryIdMap: Record<string, string> = {};
  for (const c of catalogData.categories) {
    const category = await prisma.category.create({
      data: {
        name: c.name,
        slug: c.slug,
        description: c.description,
        imageUrl: `/assets/categories/${c.slug}.jpg`,
      },
    });
    categoryIdMap[c.slug] = category.id;
  }
  console.log(`📁 Seeded ${Object.keys(categoryIdMap).length} categories.`);

  // 6. Seed Products, Images & Inventory
  let count = 0;
  for (const pData of catalogData.products) {
    const bId = brandIdMap[pData.brandName];
    const cId = categoryIdMap[pData.categorySlug] || categoryIdMap['injectable'];

    const product = await prisma.product.create({
      data: {
        name: cleanText(pData.name),
        slug: pData.slug,
        sku: pData.sku,
        description: cleanText(pData.description),
        shortDescription: cleanText(pData.shortDescription),
        basePricePence: pData.pricePence,
        brandId: bId,
        categoryId: cId,
        isPublished: true,
        isFeatured: count % 6 === 0,
        images: {
          create: {
            url: pData.imageUrl,
            altText: `${pData.name} cover`,
            isPrimary: true,
            displayOrder: 0,
          },
        },
        inventory: {
          create: {
            quantity: 100,
            availableQuantity: 100,
            stockStatus: StockStatus.IN_STOCK,
          },
        },
      },
    });
    count++;
  }

  const { seedBlog } = await import('./seed-blog');
  await seedBlog(prisma);

  console.log(`✅ Database seeding completed successfully with ${count} target products!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
