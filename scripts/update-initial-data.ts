import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const seedJsonPath = path.join(projectRoot, 'prisma', 'seed-catalog.json');
const targetTsPath = path.join(projectRoot, 'src', 'data', 'initialData.ts');

if (!fs.existsSync(seedJsonPath)) {
  console.error(`Missing seed-catalog.json at ${seedJsonPath}`);
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));

// Format Brands
const initialBrands = catalog.brands.map((b: any) => ({
  id: `brand-${b.slug}`,
  name: b.name,
  slug: b.slug,
  description: `${b.name} lab-tested anabolic products`,
  logoUrl: b.logoUrl || `/media/brands/${b.slug}.webp`,
  productCount: catalog.products.filter((p: any) => p.brandSlug === b.slug).length,
  isFeatured: true,
}));

// Format Categories
const categoryNames: Record<string, string> = {
  injectable: 'Injectable',
  oral: 'Oral',
  sarms: 'SARMs',
  pct: 'PCT',
  peptides: 'Peptides',
  hgh: 'HGH',
  'ed-meds': 'ED Meds',
  viagra: 'Viagra',
  kamagra: 'Kamagra',
  'fat-loss': 'Fat Loss',
  accessories: 'Accessories',
  // legacy slugs (pre-reference sync)
  'injectable-steroids': 'Injectable',
  'oral-steroids': 'Oral',
  'pct-health': 'PCT',
  'stacks-bundles': 'Injectable',
};

const initialCategories = catalog.categories.map((c: any) => ({
  id: `cat-${c.slug}`,
  name: c.name,
  slug: c.slug,
  description: c.description,
  imageUrl: `/media/products/default.webp`,
  productCount: catalog.products.filter((p: any) => p.categorySlug === c.slug).length,
  featured: true,
}));

// Format Products
const initialProducts = catalog.products.map((p: any, index: number) => {
  const brandObj = initialBrands.find((b: any) => b.slug === p.brandSlug) || initialBrands[0];
  const catName = categoryNames[p.categorySlug] || 'Injectable Steroids';
  const catObj = initialCategories.find((c: any) => c.slug === p.categorySlug) || initialCategories[0];

  return {
    id: `prod-${p.slug}`,
    name: p.name,
    slug: p.slug,
    sku: p.sku,
    brandId: brandObj.id,
    brandName: p.brandName,
    categoryId: catObj.id,
    categoryName: catName,
    categorySlug: p.categorySlug,
    priceGbp: (p.pricePence || 2999) / 100,
    stockQuantity: 100,
    isPublished: true,
    isFeatured: index < 12,
    isBestseller: index % 5 === 0,
    ratingAvg: 4.8,
    reviewCount: 15 + (index % 30),
    shortDescription: p.shortDescription,
    description: p.description,
    images: [p.imageUrl],
    tags: [p.brandName, catName],
    purityScore: '99.4% HPLC Tested',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
});

const tsContent = `import { Category, Brand, Product, Order, Review } from '../types';

export const INITIAL_CATEGORIES: Category[] = ${JSON.stringify(initialCategories, null, 2)};

export const INITIAL_BRANDS: Brand[] = ${JSON.stringify(initialBrands, null, 2)};

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(initialProducts, null, 2)};

export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: '${initialProducts[0]?.id || 'prod-1'}',
    userName: 'Marcus T.',
    verifiedPurchase: true,
    rating: 5,
    title: 'Verified purity and swift delivery',
    comment: 'Authentic gear with batch verification code. Next day Royal Mail tracked delivery.',
    date: new Date().toISOString(),
  }
];
`;

fs.writeFileSync(targetTsPath, tsContent);
console.log(`Successfully updated ${targetTsPath} with ${initialProducts.length} products and ${initialBrands.length} brands!`);
