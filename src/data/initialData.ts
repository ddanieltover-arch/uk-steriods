import { Category, Brand, Product, Order, Review } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    "id": "cat-injectable-steroids",
    "name": "Injectable Steroids",
    "slug": "injectable-steroids",
    "description": "Lab-tested injectable anabolic compounds",
    "imageUrl": "https://steroids-uk.com/og-default.jpg",
    "productCount": 126,
    "featured": true
  },
  {
    "id": "cat-oral-steroids",
    "name": "Oral Steroids",
    "slug": "oral-steroids",
    "description": "Oral steroid tablets and capsules",
    "imageUrl": "https://steroids-uk.com/og-default.jpg",
    "productCount": 10,
    "featured": true
  },
  {
    "id": "cat-fat-loss",
    "name": "Fat Loss",
    "slug": "fat-loss",
    "description": "Fat burning and cutting supplements",
    "imageUrl": "https://steroids-uk.com/og-default.jpg",
    "productCount": 2,
    "featured": true
  },
  {
    "id": "cat-sarms",
    "name": "SARMs",
    "slug": "sarms",
    "description": "Selective Androgen Receptor Modulators",
    "imageUrl": "https://steroids-uk.com/og-default.jpg",
    "productCount": 0,
    "featured": true
  },
  {
    "id": "cat-pct-health",
    "name": "PCT & Health",
    "slug": "pct-health",
    "description": "Post Cycle Therapy and organ protection",
    "imageUrl": "https://steroids-uk.com/og-default.jpg",
    "productCount": 2,
    "featured": true
  },
  {
    "id": "cat-stacks-bundles",
    "name": "Stacks & Bundles",
    "slug": "stacks-bundles",
    "description": "Pre-made stacks and combinations",
    "imageUrl": "https://steroids-uk.com/og-default.jpg",
    "productCount": 0,
    "featured": true
  }
];

export const INITIAL_BRANDS: Brand[] = [
  {
    "id": "brand-pharmaqo-labs",
    "name": "Pharmaqo Labs",
    "slug": "pharmaqo-labs",
    "description": "Pharmaqo Labs lab-tested anabolic products",
    "logoUrl": "https://steroids-uk.com/logos/brands/pharmaqo-labs.webp",
    "productCount": 92,
    "isFeatured": true
  },
  {
    "id": "brand-proper-labs",
    "name": "Proper Labs",
    "slug": "proper-labs",
    "description": "Proper Labs lab-tested anabolic products",
    "logoUrl": "https://steroids-uk.com/logos/brands/proper-labs.webp",
    "productCount": 48,
    "isFeatured": true
  },
  {
    "id": "brand-viogen-labs",
    "name": "Viogen Labs",
    "slug": "viogen-labs",
    "description": "Viogen Labs lab-tested anabolic products",
    "logoUrl": "https://steroids-uk.com/logos/brands/viogen-labs.webp",
    "productCount": 0,
    "isFeatured": true
  },
  {
    "id": "brand-intex-pharma",
    "name": "Intex Pharma",
    "slug": "intex-pharma",
    "description": "Intex Pharma lab-tested anabolic products",
    "logoUrl": "https://steroids-uk.com/logos/brands/intex-pharma.webp",
    "productCount": 0,
    "isFeatured": true
  },
  {
    "id": "brand-hilma-biocare",
    "name": "Hilma Biocare",
    "slug": "hilma-biocare",
    "description": "Hilma Biocare lab-tested anabolic products",
    "logoUrl": "https://steroids-uk.com/logos/brands/hilma-biocare.webp",
    "productCount": 0,
    "isFeatured": true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "prod-testosterone-cypionate-proper-labs",
    "name": "Testosterone Cypionate 200 – Proper Labs",
    "slug": "testosterone-cypionate-proper-labs",
    "sku": "745-2-1-2",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral-steroids",
    "categoryName": "Oral Steroids",
    "categorySlug": "oral-steroids",
    "priceGbp": 41.5,
    "salePriceGbp": 35.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "Buy Testosterone Cypionate 200 in the UK: injectable testosterone base for bulking, cutting and steady recovery.",
    "description": "Buy Testosterone Cypionate 200 in the UK: injectable testosterone base for bulking, cutting and steady recovery.",
    "images": [
      "https://steroids-uk.com/media/products/5052613a-418e-4967-9179-5e4989b4051e/PROPER-CYP-200-scaled-1.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.484Z",
    "updatedAt": "2026-08-14T03:56:31.486Z"
  },
  {
    "id": "prod-test-enan-pharmaqo",
    "name": "Testosterone-E 300 – Pharmaqo Labs",
    "slug": "test-enan-pharmaqo",
    "sku": "968-2",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 42.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": "Buy Testoviron-E 300 - Pharmaqo Labs in UK. Legit Testosterone Enanthate cheap from the biggest steroids shop in UK. laboratory tested with check-codes",
    "description": "Buy Testoviron-E 300 - Pharmaqo Labs in UK. Legit Testosterone Enanthate cheap from the biggest steroids shop in UK. laboratory tested with check-codes",
    "images": [
      "https://steroids-uk.com/media/products/d41788df-33c7-4302-8b9b-105a28ef7a10/testosterone-e-300-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.486Z",
    "updatedAt": "2026-08-14T03:56:31.486Z"
  },
  {
    "id": "prod-anavar10-proper-labs",
    "name": "Anavar10 – Proper Labs [100tabs/10mg]",
    "slug": "anavar10-proper-labs",
    "sku": "49-1-1-1-1-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral-steroids",
    "categoryName": "Oral Steroids",
    "categorySlug": "oral-steroids",
    "priceGbp": 41.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "ProAnavar 10 Oxandrolone - Proper Labs. Next Day Delivery anabolic steroids shop online UK. Laboratory tested with check-codes. Pay by card and paypal",
    "description": "ProAnavar 10 Oxandrolone - Proper Labs. Next Day Delivery anabolic steroids shop online UK. Laboratory tested with check-codes. Pay by card and paypal",
    "images": [
      "https://steroids-uk.com/media/products/6acc85dc-a1d1-40f8-8a3d-6e7d8722b316/Pro-Anavar-10_front-1.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.486Z",
    "updatedAt": "2026-08-14T03:56:31.486Z"
  },
  {
    "id": "prod-boldenone-proper-labs",
    "name": "Boldenone Undecylenate 300 – Proper Labs",
    "slug": "boldenone-proper-labs",
    "sku": "739-1-2",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 36.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "Proper Bold 300 - Proper Labs. Next Day Delivery anabolic steroids shop UK. Laboratory tested with check-codes. Boldenone Undecylenate",
    "description": "Proper Bold 300 - Proper Labs. Next Day Delivery anabolic steroids shop UK. Laboratory tested with check-codes. Boldenone Undecylenate",
    "images": [
      "https://steroids-uk.com/media/products/ef10b67e-3aeb-4781-84a2-3584eaf5b9f7/PROPER-BOLD-300-scaled-1.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.486Z",
    "updatedAt": "2026-08-14T03:56:31.486Z"
  },
  {
    "id": "prod-dianabol-pharmaqo-labs",
    "name": "Dianabol – Pharmaqo Labs [100tabs/10mg]",
    "slug": "dianabol-pharmaqo-labs",
    "sku": "49-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral-steroids",
    "categoryName": "Oral Steroids",
    "categorySlug": "oral-steroids",
    "priceGbp": 33.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": "Buy Dianabol - Pharmaqo Labs in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes. Trusted steroids shop in UK.",
    "description": "Buy Dianabol - Pharmaqo Labs in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes. Trusted steroids shop in UK.",
    "images": [
      "https://steroids-uk.com/media/products/50d94be7-e211-4e4a-b8df-6c85304f3f6d/Dianabol-2-768x768-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.486Z",
    "updatedAt": "2026-08-14T03:56:31.486Z"
  },
  {
    "id": "prod-testoprop-pharmaqolabs",
    "name": "Testosterone-P 100 – Pharmaqo Labs",
    "slug": "testoprop-pharmaqolabs",
    "sku": "745-2",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 33.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": "TestoProp 100 - Pharmaqo Labs in the biggest steroids shop in UK. Legit Testosterone propionate laboratory tested with check-codes.",
    "description": "TestoProp 100 - Pharmaqo Labs in the biggest steroids shop in UK. Legit Testosterone propionate laboratory tested with check-codes.",
    "images": [
      "https://steroids-uk.com/media/products/3cbedd96-b61c-487c-a58c-630d3e92d3f0/testosterone-p-100-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-clenbuterol-proper-labs",
    "name": "Clenbuterol – Proper Labs [100Tabs/40mcg]",
    "slug": "clenbuterol-proper-labs",
    "sku": "11-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 30.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": "Buy Clenbuterol 40mcg (100 tabs) by Proper Labs in the UK: bestselling weight loss tablet for fat burning and cutting. Genuine, lab-tested, UK warehouse.",
    "description": "Buy Clenbuterol 40mcg (100 tabs) by Proper Labs in the UK: bestselling weight loss tablet for fat burning and cutting. Genuine, lab-tested, UK warehouse.",
    "images": [
      "https://steroids-uk.com/media/products/471c8705-a107-44f3-893a-bd6d6d592512/ProperClen-Front.webp"
    ],
    "tags": [
      "Proper Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-nandrolone-decanate-proper-labs",
    "name": "Nandrolone Decanoate 300 – Proper Labs",
    "slug": "nandrolone-decanate-proper-labs",
    "sku": "971-1-2-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": "Proper Deca 300 - Proper Labs. Next Day Delivery anabolic steroids shop UK. Laboratory tested with check-codes. Nandrolone Decanoate.",
    "description": "Proper Deca 300 - Proper Labs. Next Day Delivery anabolic steroids shop UK. Laboratory tested with check-codes. Nandrolone Decanoate.",
    "images": [
      "https://steroids-uk.com/media/products/48835081-a50c-476c-9ddb-35760b4ecc0b/PROPER-DECA-300-scaled-1.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-tri-tren-pharmaqo-labs",
    "name": "Tri-Tren – Pharmaqo Labs",
    "slug": "tri-tren-pharmaqo-labs",
    "sku": "43",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 60.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": "Buy Tri-Tren - Pharmaqo Labs in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes. Trusted steroids shop in UK.",
    "description": "Buy Tri-Tren - Pharmaqo Labs in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes. Trusted steroids shop in UK.",
    "images": [
      "https://steroids-uk.com/media/products/7ca070db-ccca-4ad4-8b7c-e5888184e7da/multi-ester-tren-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-testosterone-enanthate-proper-labs",
    "name": "Testosterone Enanthate 300 – Proper Labs",
    "slug": "testosterone-enanthate-proper-labs",
    "sku": "968-2-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": "Buy Enan300, the top-rated UK testosterone enanthate injection, at the best price available online with next-day delivery.",
    "description": "Buy Enan300, the top-rated UK testosterone enanthate injection, at the best price available online with next-day delivery.",
    "images": [
      "https://steroids-uk.com/media/products/661cc727-5af6-4803-983d-e15a530d5adf/PROPER-ENAN-300-scaled-1.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-testo-mix3-proper-labs",
    "name": "Testosterone Mix3 400 – Proper Labs",
    "slug": "testo-mix3-proper-labs",
    "sku": "754-2-3",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 41.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": "Buy 3 Testosterones Mix 400mg - Proper Labs shop United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes",
    "description": "Buy 3 Testosterones Mix 400mg - Proper Labs shop United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes",
    "images": [
      "https://steroids-uk.com/media/products/e3f7b50f-6a30-42cc-b7bb-46d0ad66e7d6/PROPER-TESTMIX3-400-scaled-1.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-anadrol50-proper-labs",
    "name": "Anadrol – Proper Labs [60tabs/50mg]",
    "slug": "anadrol50-proper-labs",
    "sku": "49-1-1-1-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral-steroids",
    "categoryName": "Oral Steroids",
    "categorySlug": "oral-steroids",
    "priceGbp": 43.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": "ProAnadrol 50 / Oxymetholone - Proper Labs. Next Day Delivery anabolic steroids shop online UK. Laboratory tested with check-codes. Pay by card and paypal",
    "description": "ProAnadrol 50 / Oxymetholone - Proper Labs. Next Day Delivery anabolic steroids shop online UK. Laboratory tested with check-codes. Pay by card and paypal",
    "images": [
      "https://steroids-uk.com/media/products/827c8850-66e8-4773-a4e7-05c32e362e4c/Pro-Anadrol-50_front.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-trenbolone-enanthate-proper-labs",
    "name": "Trenbolone Enanthate 200 – Proper Labs",
    "slug": "trenbolone-enanthate-proper-labs",
    "sku": "747-2-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": "Tren for sale at a trusted UK shop. Next-DayUK delivery, discreet packaging & secure checkout. Shop premium quality trenbolone today.",
    "description": "Tren for sale at a trusted UK shop. Next-DayUK delivery, discreet packaging & secure checkout. Shop premium quality trenbolone today.",
    "images": [
      "https://steroids-uk.com/media/products/13ab96da-a405-4700-a281-da5aa3794f33/PROPER-TREN-E-200-scaled-1.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-sustanon-250-pharmaqo-labs",
    "name": "Sustanon 250 – Pharmaqo Labs",
    "slug": "sustanon-250-pharmaqo-labs",
    "sku": "742-2",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": "Buy Sustanon 250 - Pharmaqo Labs in United Kingdom. Legit sustanon laboratory tested with check-codes. The biggest steroids shop uk.",
    "description": "Buy Sustanon 250 - Pharmaqo Labs in United Kingdom. Legit sustanon laboratory tested with check-codes. The biggest steroids shop uk.",
    "images": [
      "https://steroids-uk.com/media/products/64147e4e-d8c8-4f87-9666-8dd8261806f8/sustanon-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-supersus-400-pharmaqo-labs",
    "name": "Supersus 400 – Pharmaqo Labs",
    "slug": "supersus-400-pharmaqo-labs",
    "sku": "754-2-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": "Buy Supersus 400 - Pharmaqo Labs Testosterone Mix 400mg in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes",
    "description": "Buy Supersus 400 - Pharmaqo Labs Testosterone Mix 400mg in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes",
    "images": [
      "https://steroids-uk.com/media/products/bed27f52-3a6f-4516-8836-32c488faa2fd/multi-ester-test-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-tri-test-400-spharmaqo-labs",
    "name": "Tri-Ester Test 400 – Pharmaqo Labs",
    "slug": "tri-test-400-spharmaqo-labs",
    "sku": "754-2",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "Buy Tri Test 400 by Pharmaqo Labs (Testosterone Mix 400mg) in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested with check-codes",
    "description": "Buy Tri Test 400 by Pharmaqo Labs (Testosterone Mix 400mg) in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested with check-codes",
    "images": [
      "https://steroids-uk.com/media/products/d16bc6ed-de6d-4400-b4b3-5db3c1b3fb8d/tri-test-test-400-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-dianabol-proper-labs",
    "name": "Dianabol – Proper Labs [100tabs/10mg]",
    "slug": "dianabol-proper-labs",
    "sku": "49-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral-steroids",
    "categoryName": "Oral Steroids",
    "categorySlug": "oral-steroids",
    "priceGbp": 29.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": "Achieve rapid muscle growth and strength with Dianabol 10mg by Proper Labs. Premium Methandienone for enhanced performance and effective results.",
    "description": "Achieve rapid muscle growth and strength with Dianabol 10mg by Proper Labs. Premium Methandienone for enhanced performance and effective results.",
    "images": [
      "https://steroids-uk.com/media/products/1a691ce2-ad21-4531-881c-f889d05367a0/pro-dianabol-10-front.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-boldenone-pharmaqolabs",
    "name": "Boldenone 300 – Pharmaqo Labs",
    "slug": "boldenone-pharmaqolabs",
    "sku": "739-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 42.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": "Boldenone 300 - Pharmaqo Labs in United Kingdom. Only legit steroids laboratory tested with check-codes. Order next day delivery.",
    "description": "Boldenone 300 - Pharmaqo Labs in United Kingdom. Only legit steroids laboratory tested with check-codes. Order next day delivery.",
    "images": [
      "https://steroids-uk.com/media/products/ca6e60d7-1e84-401a-93dc-206eab6efe13/boldenone-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-superbolin-pharmaqo-labs",
    "name": "Superbolan 400 – Pharmaqo Labs",
    "slug": "superbolin-pharmaqo-labs",
    "sku": "55-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 60.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": "Superbolan 400 Mg/ Ml - Injection API: Trenbolone Enanthate 100 Mg/ml Drostanolone Enanthate 100 Mg/ml Testosterone Enanthate 200 Mg/ml",
    "description": "Superbolan 400 Mg/ Ml - Injection API: Trenbolone Enanthate 100 Mg/ml Drostanolone Enanthate 100 Mg/ml Testosterone Enanthate 200 Mg/ml",
    "images": [
      "https://steroids-uk.com/media/products/baf53f4a-e56e-4dcf-b7cd-7ac2fa7f8355/test-mast-tren-formula-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-power-proper-labs",
    "name": "Proper Power Erection – Proper Labs [20Tabs/20mg]",
    "slug": "power-proper-labs",
    "sku": "11-1-1-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral-steroids",
    "categoryName": "Oral Steroids",
    "categorySlug": "oral-steroids",
    "priceGbp": 16.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": "Buy Proper Power Erection - Proper Labs in UK shop NEXT DAY DELIVERY. Pay with paypal or card. Laboratory tested anabolic steroids with verification codes.",
    "description": "Buy Proper Power Erection - Proper Labs in UK shop NEXT DAY DELIVERY. Pay with paypal or card. Laboratory tested anabolic steroids with verification codes.",
    "images": [
      "https://steroids-uk.com/media/products/b51fbaac-9dc9-4fa6-97cd-93cb01287c14/ProperPowerbig-Front.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-armidex-proper-labs",
    "name": "Arimidex – Proper Labs [50tab/1mg]",
    "slug": "armidex-proper-labs",
    "sku": "14-2-2",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-pct-health",
    "categoryName": "PCT & Health",
    "categorySlug": "pct-health",
    "priceGbp": 40.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": "Buy Arimidex - Proper Labs anastrazole in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested pharmaceuticals with check-codes. Trusted steroids shop in UK",
    "description": "Buy Arimidex - Proper Labs anastrazole in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested pharmaceuticals with check-codes. Trusted steroids shop in UK",
    "images": [
      "https://steroids-uk.com/media/products/f547eb3e-ba01-4095-9b03-b1ae9b21fe35/ProperArimidex-Front.webp"
    ],
    "tags": [
      "Proper Labs",
      "PCT & Health"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-winstrol-proper-labs",
    "name": "Winstrol – Proper Labs [100tabs/10mg]",
    "slug": "winstrol-proper-labs",
    "sku": "49-1-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral-steroids",
    "categoryName": "Oral Steroids",
    "categorySlug": "oral-steroids",
    "priceGbp": 30.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": "Buy ProWinstrol 10 - Proper Labs. Next Day Delivery anabolic steroids shop online UK. Laboratory tested with check-codes. Stanazolol Pay by card and paypal",
    "description": "Buy ProWinstrol 10 - Proper Labs. Next Day Delivery anabolic steroids shop online UK. Laboratory tested with check-codes. Stanazolol Pay by card and paypal",
    "images": [
      "https://steroids-uk.com/media/products/6b95f647-989a-43e4-bba6-65f87effaffc/Pro-Winstrol-10_front.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-clomid-pharmaqo-labs",
    "name": "Clomid – Pharmaqo Labs [50tab/50mg]",
    "slug": "clomid-pharmaqo-labs",
    "sku": "16-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-pct-health",
    "categoryName": "PCT & Health",
    "categorySlug": "pct-health",
    "priceGbp": 41.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": "clomid - Pharmaqo Labs in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested pharmaceuticals with check-codes. Trusted steroids shop in UK",
    "description": "clomid - Pharmaqo Labs in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested pharmaceuticals with check-codes. Trusted steroids shop in UK",
    "images": [
      "https://steroids-uk.com/media/products/67efee5b-9930-4be3-975f-7b0f81dd145a/07642880-2587-41dd-bafa-66bea25b7574.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "PCT & Health"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-nandrophenyl-npp-pharmaqolabs",
    "name": "NPP – Pharmaqo Labs",
    "slug": "nandrophenyl-npp-pharmaqolabs",
    "sku": "971-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": "Buy NPP - Pharmaqo Labs in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes. Trusted steroids shop in UK.",
    "description": "Buy NPP - Pharmaqo Labs in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes. Trusted steroids shop in UK.",
    "images": [
      "https://steroids-uk.com/media/products/dbf09c89-4a49-4324-a094-064b4a883155/nandrolone-e-p-100-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-testex-c-200-pharmaqolabs",
    "name": "Testosterone-C 200 – Pharmaqo Labs",
    "slug": "testex-c-200-pharmaqolabs",
    "sku": "745-2-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": "Testex-C 200 - Pharmaqo Labs in the biggest steroids shop in UK. Legit Testosterone Cyopionate laboratory tested with check-codes.",
    "description": "Testex-C 200 - Pharmaqo Labs in the biggest steroids shop in UK. Legit Testosterone Cyopionate laboratory tested with check-codes.",
    "images": [
      "https://steroids-uk.com/media/products/93d3d0d2-338a-4002-a06c-5367fcbc8b1d/testosterone-e-c200-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-t3-proper-labs",
    "name": "T3 – Proper Labs [100tab/25mcg]",
    "slug": "t3-proper-labs",
    "sku": "99-2-1-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 33.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": "T3 25mg Proper Labs in UK shop NEXT DAY DELIVERY. Pay with paypal or card. Laboratory tested anabolic steroids with verification codes.",
    "description": "T3 25mg Proper Labs in UK shop NEXT DAY DELIVERY. Pay with paypal or card. Laboratory tested anabolic steroids with verification codes.",
    "images": [
      "https://steroids-uk.com/media/products/9f4a826f-3b09-49e3-828b-960e7a1d89e6/ProperT3-Front.webp"
    ],
    "tags": [
      "Proper Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-anadrol-pharmaqo-labs",
    "name": "Anadrol 50 – Pharmaqo Labs [60tabs/50mg]",
    "slug": "anadrol-pharmaqo-labs",
    "sku": "9191-005",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral-steroids",
    "categoryName": "Oral Steroids",
    "categorySlug": "oral-steroids",
    "priceGbp": 47.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": "Buy Anadrol 50 - Pharmaqo Labs in United Kingdom for Next Day Delivery. Laboratory-tested steroids with check-codes. Trusted steroids shop in UK.",
    "description": "Buy Anadrol 50 - Pharmaqo Labs in United Kingdom for Next Day Delivery. Laboratory-tested steroids with check-codes. Trusted steroids shop in UK.",
    "images": [
      "https://steroids-uk.com/media/products/f97299ae-96e5-4cff-a8c4-35884d4924b0/18ee9dea-8ce4-41c2-8998-79754e3b2e11.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-nandrophenyl-npp-proper-labs",
    "name": "NPP 100 – Proper Labs",
    "slug": "nandrophenyl-npp-proper-labs",
    "sku": "971-1-3",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 32.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": "Buy Proper NPP 100 - Proper Labs in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes. Trusted steroids shop in UK.",
    "description": "Buy Proper NPP 100 - Proper Labs in United Kingdom for NEXT DAY DELIVERY. Laboratory-tested steroids with check-codes. Trusted steroids shop in UK.",
    "images": [
      "https://steroids-uk.com/media/products/37a9d742-c607-42d7-8425-b2334f8a255c/PROPER-NPP-100-scaled-1.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-tamoxifen-pharmaqo-labs",
    "name": "",
    "slug": "tamoxifen-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-TAMOXIFEN-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-anavar50-proper-labs",
    "name": "",
    "slug": "anavar50-proper-labs",
    "sku": "PROPER-LABS-ANAVAR50-PROPER",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-nandrodec-pharmaqolabs",
    "name": "",
    "slug": "nandrodec-pharmaqolabs",
    "sku": "PHARMAQO-LABS-NANDRODEC-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-masteron-p-pharmaqo-labs",
    "name": "",
    "slug": "masteron-p-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-MASTERON-P-PHAR",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-masteron-enan-pharmaqo-labs",
    "name": "",
    "slug": "masteron-enan-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-MASTERON-ENAN-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-clenbuterol-pharmaqo-labs",
    "name": "",
    "slug": "clenbuterol-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-CLENBUTEROL-PHA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-trenbolone-acetate-proper-labs",
    "name": "",
    "slug": "trenbolone-acetate-proper-labs",
    "sku": "PROPER-LABS-TRENBOLONE-ACET",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proviron-proper-labs",
    "name": "",
    "slug": "proviron-proper-labs",
    "sku": "PROPER-LABS-PROVIRON-PROPER",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proviron-pharmaqo-labs",
    "name": "",
    "slug": "proviron-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-PROVIRON-PHARMA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-androbolan400-pharmaqo-labs",
    "name": "",
    "slug": "androbolan400-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-ANDROBOLAN400-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-armidex-pharmaqo-labs",
    "name": "",
    "slug": "armidex-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-ARMIDEX-PHARMAQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-t3-pharmaqo",
    "name": "",
    "slug": "t3-pharmaqo",
    "sku": "PHARMAQO-LABS-T3-PHARMAQO",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-igf1-des-pharmaqo",
    "name": "",
    "slug": "igf1-des-pharmaqo",
    "sku": "PHARMAQO-LABS-IGF1-DES-PHARMA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqolabs-lgd4033",
    "name": "",
    "slug": "pharmaqolabs-lgd4033",
    "sku": "PHARMAQO-LABS-PHARMAQOLABS-LG",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-anavar-10-pharmaqo-labs",
    "name": "",
    "slug": "anavar-10-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-ANAVAR-10-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-igf1-lr3-pharmaqo",
    "name": "",
    "slug": "igf1-lr3-pharmaqo",
    "sku": "PHARMAQO-LABS-IGF1-LR3-PHARMA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-trenbolone-enan-pharmaqo",
    "name": "",
    "slug": "trenbolone-enan-pharmaqo",
    "sku": "PHARMAQO-LABS-TRENBOLONE-ENAN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-winstrol50-pharmaqo-labs",
    "name": "",
    "slug": "winstrol50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-WINSTROL50-PHAR",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-power-proper-labs-small",
    "name": "",
    "slug": "power-proper-labs-small",
    "sku": "PROPER-LABS-POWER-PROPER-LA",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-trenabolone-a-pharmaqo-labs",
    "name": "",
    "slug": "trenabolone-a-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-TRENABOLONE-A-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-oxydrol50-pharmaqo-labs",
    "name": "",
    "slug": "oxydrol50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-OXYDROL50-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-superdrol25-pharmaqo-labs",
    "name": "",
    "slug": "superdrol25-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-SUPERDROL25-PHA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqo-labs-rad",
    "name": "",
    "slug": "pharmaqo-labs-rad",
    "sku": "PHARMAQO-LABS-PHARMAQO-LABS-R",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-trenbolone-hex-100mg-pharmaqo",
    "name": "",
    "slug": "trenbolone-hex-100mg-pharmaqo",
    "sku": "PHARMAQO-LABS-TRENBOLONE-HEX-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-dianabol25-proper-labs",
    "name": "",
    "slug": "dianabol25-proper-labs",
    "sku": "PROPER-LABS-DIANABOL25-PROP",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-ment-50-pharmaqo-labs",
    "name": "",
    "slug": "ment-50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-MENT-50-PHARMAQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-methyltrienolone-1mg-pharmaqo-labs",
    "name": "",
    "slug": "methyltrienolone-1mg-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-METHYLTRIENOLON",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-winstrol50-proper-labs",
    "name": "",
    "slug": "winstrol50-proper-labs",
    "sku": "PROPER-LABS-WINSTROL50-PROP",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-hcg-pharmaqolabs",
    "name": "",
    "slug": "hcg-pharmaqolabs",
    "sku": "PHARMAQO-LABS-HCG-PHARMAQOLAB",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-dhb-1-testosterone-cypionate-test-cyp-dhb-pharmaqo-labs",
    "name": "",
    "slug": "dhb-1-testosterone-cypionate-test-cyp-dhb-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-DHB-1-TESTOSTER",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-bpc-157-pharmaqo-labs-5mg",
    "name": "",
    "slug": "bpc-157-pharmaqo-labs-5mg",
    "sku": "PHARMAQO-LABS-BPC-157-PHARMAQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqo-labs-mk677",
    "name": "",
    "slug": "pharmaqo-labs-mk677",
    "sku": "PHARMAQO-LABS-PHARMAQO-LABS-M",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-fermavar-2-5mg-100-tabs-pharmaqo-labs",
    "name": "",
    "slug": "fermavar-2-5mg-100-tabs-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-FERMAVAR-2-5MG-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-sustanon-250-amps-pharmaqo-labs",
    "name": "",
    "slug": "sustanon-250-amps-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-SUSTANON-250-AM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-caber-cabergoline-pharmaqo-labs-10tab-1mg",
    "name": "",
    "slug": "caber-cabergoline-pharmaqo-labs-10tab-1mg",
    "sku": "PHARMAQO-LABS-CABER-CABERGOLI",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-nandrolone-d-300mg-pharmaqo-labs-amps",
    "name": "",
    "slug": "nandrolone-d-300mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-NANDROLONE-D-30",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-trt-formula-pharmaqo-labs-200-5mg",
    "name": "",
    "slug": "trt-formula-pharmaqo-labs-200-5mg",
    "sku": "PHARMAQO-LABS-TRT-FORMULA-PHA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-trenbolone-aq-50-pharmaqo-labs",
    "name": "",
    "slug": "trenbolone-aq-50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-TRENBOLONE-AQ-5",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-super-lean-tab-pharmaqo-labs-60tabs-100mg",
    "name": "",
    "slug": "super-lean-tab-pharmaqo-labs-60tabs-100mg",
    "sku": "PHARMAQO-LABS-SUPER-LEAN-TAB-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-tadalafil-pharmaqo-labs-50tab-20mg",
    "name": "",
    "slug": "tadalafil-pharmaqo-labs-50tab-20mg",
    "sku": "PHARMAQO-LABS-TADALAFIL-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-fermawin-2-5mg-100-tabs-pharmaqo-labs",
    "name": "",
    "slug": "fermawin-2-5mg-100-tabs-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-FERMAWIN-2-5MG-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-drostanolone-e-200mg-pharmaqo-labs-amps",
    "name": "",
    "slug": "drostanolone-e-200mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-DROSTANOLONE-E-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-primobolan-pharmaqo-labs",
    "name": "",
    "slug": "primobolan-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-PRIMOBOLAN-PHAR",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-winstrol-pharmaqo-labs",
    "name": "",
    "slug": "winstrol-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-WINSTROL-PHARMA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-yk11-pharmaqo",
    "name": "",
    "slug": "yk11-pharmaqo",
    "sku": "PHARMAQO-LABS-YK11-PHARMAQO",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-superdrol-10mg-100-tabs-pharmaqo-labs",
    "name": "",
    "slug": "superdrol-10mg-100-tabs-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-SUPERDROL-10MG-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-primobolan-methenolone-e-100mg-pharmaqo-labs-amps",
    "name": "",
    "slug": "primobolan-methenolone-e-100mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-PRIMOBOLAN-METH",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-eq-test-500mg-pharmaqo-labs",
    "name": "",
    "slug": "eq-test-500mg-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-EQ-TEST-500MG-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-anavar-50-pharmaqo-labs",
    "name": "",
    "slug": "anavar-50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-ANAVAR-50-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-fastrip-pharmaqo-labs",
    "name": "",
    "slug": "fastrip-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-FASTRIP-PHARMAQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-dapoxetine-60mg-pharmaqo-labs-60mg-x-50-pills",
    "name": "",
    "slug": "dapoxetine-60mg-pharmaqo-labs-60mg-x-50-pills",
    "sku": "PHARMAQO-LABS-DAPOXETINE-60MG",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-trenbolone-hexy-pharmaqo",
    "name": "",
    "slug": "trenbolone-hexy-pharmaqo",
    "sku": "PHARMAQO-LABS-TRENBOLONE-HEXY",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-halotestin-pharmaqo-labs",
    "name": "",
    "slug": "halotestin-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-HALOTESTIN-PHAR",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-testosterone-propionate-proper-labs",
    "name": "",
    "slug": "testosterone-propionate-proper-labs",
    "sku": "PROPER-LABS-TESTOSTERONE-PR",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqo-sr-9009",
    "name": "",
    "slug": "pharmaqo-sr-9009",
    "sku": "PHARMAQO-LABS-PHARMAQO-SR-900",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-salbutamol-proper-labs",
    "name": "",
    "slug": "salbutamol-proper-labs",
    "sku": "PROPER-LABS-SALBUTAMOL-PROP",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-mgf-pharmaqo",
    "name": "",
    "slug": "mgf-pharmaqo",
    "sku": "PHARMAQO-LABS-MGF-PHARMAQO",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-testosterone-p-100mg-pharmaqo",
    "name": "",
    "slug": "testosterone-p-100mg-pharmaqo",
    "sku": "PHARMAQO-LABS-TESTOSTERONE-P-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqo-cutting-stack-injectable",
    "name": "",
    "slug": "pharmaqo-cutting-stack-injectable",
    "sku": "PHARMAQO-LABS-PHARMAQO-CUTTIN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqo-bulking-stack-injectable",
    "name": "",
    "slug": "pharmaqo-bulking-stack-injectable",
    "sku": "PHARMAQO-LABS-PHARMAQO-BULKIN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqo-beginners-stack-first-bulking-cycle",
    "name": "",
    "slug": "pharmaqo-beginners-stack-first-bulking-cycle",
    "sku": "PHARMAQO-LABS-PHARMAQO-BEGINN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-fermaprovi-5mg-100-tabs-pharmaqo-labs",
    "name": "",
    "slug": "fermaprovi-5mg-100-tabs-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-FERMAPROVI-5MG-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqo-beginners-cutting-stack",
    "name": "",
    "slug": "pharmaqo-beginners-cutting-stack",
    "sku": "PHARMAQO-LABS-PHARMAQO-BEGINN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqo-labs-pct-stack-advanced",
    "name": "",
    "slug": "pharmaqo-labs-pct-stack-advanced",
    "sku": "PHARMAQO-LABS-PHARMAQO-LABS-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqo-pct-stack",
    "name": "",
    "slug": "pharmaqo-pct-stack",
    "sku": "PHARMAQO-LABS-PHARMAQO-PCT-ST",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqo-labs-ultimate-precontest-stack",
    "name": "",
    "slug": "pharmaqo-labs-ultimate-precontest-stack",
    "sku": "PHARMAQO-LABS-PHARMAQO-LABS-U",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-cutting-oral-stack-tablets-only",
    "name": "",
    "slug": "proper-labs-cutting-oral-stack-tablets-only",
    "sku": "PROPER-LABS-PROPER-LABS-CUT",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-bulking-stack-classic",
    "name": "",
    "slug": "proper-labs-bulking-stack-classic",
    "sku": "PROPER-LABS-PROPER-LABS-BUL",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-cutting-stack",
    "name": "",
    "slug": "proper-labs-cutting-stack",
    "sku": "PROPER-LABS-PROPER-LABS-CUT",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqo-sarms-bulking-stack",
    "name": "",
    "slug": "pharmaqo-sarms-bulking-stack",
    "sku": "PHARMAQO-LABS-PHARMAQO-SARMS-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-fat-burning-stack-extreme",
    "name": "",
    "slug": "proper-labs-fat-burning-stack-extreme",
    "sku": "PROPER-LABS-PROPER-LABS-FAT",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-cutting-stack-ultimate",
    "name": "",
    "slug": "proper-labs-cutting-stack-ultimate",
    "sku": "PROPER-LABS-PROPER-LABS-CUT",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-beginner-stack-first-bulking-cycle",
    "name": "",
    "slug": "proper-labs-beginner-stack-first-bulking-cycle",
    "sku": "PROPER-LABS-PROPER-LABS-BEG",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-beginner-stack-first-injection-cycle",
    "name": "",
    "slug": "proper-labs-beginner-stack-first-injection-cycle",
    "sku": "PROPER-LABS-PROPER-LABS-BEG",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-bulking-oral-stack",
    "name": "",
    "slug": "proper-labs-bulking-oral-stack",
    "sku": "PROPER-LABS-PROPER-LABS-BUL",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-fat-burn-stack",
    "name": "",
    "slug": "proper-labs-fat-burn-stack",
    "sku": "PROPER-LABS-PROPER-LABS-FAT",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-beginner-stack",
    "name": "",
    "slug": "proper-labs-beginner-stack",
    "sku": "PROPER-LABS-PROPER-LABS-BEG",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-properlabs-sust-bold",
    "name": "",
    "slug": "properlabs-sust-bold",
    "sku": "PROPER-LABS-PROPERLABS-SUST",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-pct-stack-oral-only",
    "name": "",
    "slug": "proper-labs-pct-stack-oral-only",
    "sku": "PROPER-LABS-PROPER-LABS-PCT",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-proper-labs-advanced-pct-stack",
    "name": "",
    "slug": "proper-labs-advanced-pct-stack",
    "sku": "PROPER-LABS-PROPER-LABS-ADV",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-eq-tren-400mg-pharmaqo-labs",
    "name": "",
    "slug": "eq-tren-400mg-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-EQ-TREN-400MG-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-xxx-tabs-pharmaqo-labs-60-tabs-x-99mg",
    "name": "",
    "slug": "xxx-tabs-pharmaqo-labs-60-tabs-x-99mg",
    "sku": "PHARMAQO-LABS-XXX-TABS-PHARMA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pct-pharmaqo-labs",
    "name": "",
    "slug": "pct-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-PCT-PHARMAQO-LA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pct-tablets-proper-labs-60tabs-102-5mg",
    "name": "",
    "slug": "pct-tablets-proper-labs-60tabs-102-5mg",
    "sku": "PROPER-LABS-PCT-TABLETS-PRO",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-primobol-5mg-100-tabs-pharmaqo-labs",
    "name": "",
    "slug": "primobol-5mg-100-tabs-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-PRIMOBOL-5MG-10",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-trenbolone-a-100mg-pharmaqo-2",
    "name": "",
    "slug": "trenbolone-a-100mg-pharmaqo-2",
    "sku": "PHARMAQO-LABS-TRENBOLONE-A-10",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-testosterone-e-300mg-pharmaqo-labs-amps",
    "name": "",
    "slug": "testosterone-e-300mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-TESTOSTERONE-E-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-trenbolone-e-200mg-pharmaqo",
    "name": "",
    "slug": "trenbolone-e-200mg-pharmaqo",
    "sku": "PHARMAQO-LABS-TRENBOLONE-E-20",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-tamoxifen-proper-labs",
    "name": "",
    "slug": "tamoxifen-proper-labs",
    "sku": "PROPER-LABS-TAMOXIFEN-PROPE",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-testosterone-enanthate-300mg-pharmaqo-labs-amps",
    "name": "",
    "slug": "testosterone-enanthate-300mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-TESTOSTERONE-EN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-primobolan-proper-labs",
    "name": "",
    "slug": "primobolan-proper-labs",
    "sku": "PROPER-LABS-PRIMOBOLAN-PROP",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-ett-500-pharmaqo-labs",
    "name": "",
    "slug": "ett-500-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-ETT-500-PHARMAQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-testo-mix5-proper-labs",
    "name": "",
    "slug": "testo-mix5-proper-labs",
    "sku": "PROPER-LABS-TESTO-MIX5-PROP",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-testosterone-c-200mg-pharmaqo-labs-amps",
    "name": "",
    "slug": "testosterone-c-200mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-TESTOSTERONE-C-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-sustanon-250-proper-labs",
    "name": "",
    "slug": "sustanon-250-proper-labs",
    "sku": "PROPER-LABS-SUSTANON-250-PR",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-primobolan175-pharmaqo-labs",
    "name": "Primobolan Depot 175 – Pharmaqo Labs",
    "slug": "primobolan175-pharmaqo-labs",
    "sku": "1013-12",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral-steroids",
    "categoryName": "Oral Steroids",
    "categorySlug": "oral-steroids",
    "priceGbp": 87.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "Buy Primobolan Depot 175 in the UK: genuine Pharmaqo Labs methenolone injectable for clean cutting gains. Discreet next-day tracked delivery, lab-tested.",
    "description": "Buy Primobolan Depot 175 in the UK: genuine Pharmaqo Labs methenolone injectable for clean cutting gains. Discreet next-day tracked delivery, lab-tested.",
    "images": [
      "https://steroids-uk.com/media/products/5f45dd40-e08d-4a17-afa0-14407c70bfa6/b-primobolan-depot-175-3-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-drostanolone-e-100mg-pharmaqo",
    "name": "",
    "slug": "drostanolone-e-100mg-pharmaqo",
    "sku": "PHARMAQO-LABS-DROSTANOLONE-E-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-dianabolan-50-pharmaqo-labs",
    "name": "Dianabolan 50 – Pharmaqo Labs",
    "slug": "dianabolan-50-pharmaqo-labs",
    "sku": "55-1-1-2-2",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral-steroids",
    "categoryName": "Oral Steroids",
    "categorySlug": "oral-steroids",
    "priceGbp": 42.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": "Buy Dianabolan 50 - Pharmaqo Labs in UK shop NEXT DAY DELIVERY. Pay with paypal or card. Laboratory tested anabolic steroids with verification codes.",
    "description": "Buy Dianabolan 50 - Pharmaqo Labs in UK shop NEXT DAY DELIVERY. Pay with paypal or card. Laboratory tested anabolic steroids with verification codes.",
    "images": [
      "https://steroids-uk.com/media/products/d38a0f1c-dcac-4de9-9f65-a2a0772f5792/dianabolan-50-1.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-testosterone-aq-50-pharmaqo-labs",
    "name": "",
    "slug": "testosterone-aq-50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-TESTOSTERONE-AQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-winstrol-inject100-pharmaqo-labs",
    "name": "",
    "slug": "winstrol-inject100-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-WINSTROL-INJECT",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-clomid-proper-labs",
    "name": "",
    "slug": "clomid-proper-labs",
    "sku": "PROPER-LABS-CLOMID-PROPER-L",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-ostarine-mk2866-pharmaqolabs",
    "name": "",
    "slug": "ostarine-mk2866-pharmaqolabs",
    "sku": "PHARMAQO-LABS-OSTARINE-MK2866",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-pharmaqolabs-gw501516",
    "name": "",
    "slug": "pharmaqolabs-gw501516",
    "sku": "PHARMAQO-LABS-PHARMAQOLABS-GW",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-caber-proper-labs1",
    "name": "",
    "slug": "caber-proper-labs1",
    "sku": "PROPER-LABS-CABER-PROPER-LA",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-power-proper20-labs",
    "name": "",
    "slug": "power-proper20-labs",
    "sku": "PROPER-LABS-POWER-PROPER20-",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-qomatropin-12mg-36iu-cartridge-pharmaqo-labs",
    "name": "",
    "slug": "qomatropin-12mg-36iu-cartridge-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-QOMATROPIN-12MG",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-power-proper20-labs-small",
    "name": "",
    "slug": "power-proper20-labs-small",
    "sku": "PROPER-LABS-POWER-PROPER20-",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-mt-2-melanotan-10mg-pharmaqo-labs",
    "name": "",
    "slug": "mt-2-melanotan-10mg-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-MT-2-MELANOTAN-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-masteron-propionate-proper-labs",
    "name": "",
    "slug": "masteron-propionate-proper-labs",
    "sku": "PROPER-LABS-MASTERON-PROPIO",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-masteron-enanthate-proper-labs",
    "name": "",
    "slug": "masteron-enanthate-proper-labs",
    "sku": "PROPER-LABS-MASTERON-ENANTH",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-tb-500-pharmaqo-labs-10mg",
    "name": "",
    "slug": "tb-500-pharmaqo-labs-10mg",
    "sku": "PHARMAQO-LABS-TB-500-PHARMAQO",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": " by Pharmaqo Labs",
    "description": "<p> by Pharmaqo Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  },
  {
    "id": "prod-turinabol-proper-labs",
    "name": "",
    "slug": "turinabol-proper-labs",
    "sku": "PROPER-LABS-TURINABOL-PROPE",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable-steroids",
    "categoryName": "Injectable Steroids",
    "categorySlug": "injectable-steroids",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": " by Proper Labs",
    "description": "<p> by Proper Labs. Lab-tested product.</p>",
    "images": [
      "https://steroids-uk.com/og-default.jpg"
    ],
    "tags": [
      "Proper Labs",
      "Injectable Steroids"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-08-14T03:56:31.487Z",
    "updatedAt": "2026-08-14T03:56:31.487Z"
  }
];

export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-testosterone-cypionate-proper-labs',
    userName: 'Marcus T.',
    verifiedPurchase: true,
    rating: 5,
    title: 'Verified purity and swift delivery',
    comment: 'Authentic gear with batch verification code. Next day Royal Mail tracked delivery.',
    date: new Date().toISOString(),
  }
];
