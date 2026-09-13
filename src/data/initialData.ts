import { Category, Brand, Product, Order, Review } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    "id": "cat-injectable",
    "name": "Injectable",
    "slug": "injectable",
    "description": "Lab-tested injectable compounds — buy testosterone, testosterone cypionate, trenbolone, deca steroid and stacks with GBP pricing and UK tracked dispatch.",
    "imageUrl": "/media/products/testosterone-cypionate-proper-labs.webp",
    "productCount": 109,
    "featured": true
  },
  {
    "id": "cat-oral",
    "name": "Oral",
    "slug": "oral",
    "description": "Buy Anavar UK and oral steroids — Anavar for sale UK, Dianabol for sale UK, Winstrol and more with lab-tested batches and discreet UK shipping.",
    "imageUrl": "/media/products/anavar10-proper-labs.webp",
    "productCount": 51,
    "featured": true
  },
  {
    "id": "cat-sarms",
    "name": "SARMs",
    "slug": "sarms",
    "description": "UK SARMs and SARMs UK — MK677 UK, RAD 140 UK, LGD-4033 and Ostarine with batch verification and GBP pricing.",
    "imageUrl": "/media/products/pharmaqolabs-lgd4033.webp",
    "productCount": 42,
    "featured": true
  },
  {
    "id": "cat-pct",
    "name": "PCT",
    "slug": "pct",
    "description": "PCT UK — buy Clomid UK, HCG peptide listings and recovery-focused catalogue items. Educational only, not medical advice.",
    "imageUrl": "/media/products/clomid-pharmaqo-labs.webp",
    "productCount": 37,
    "featured": true
  },
  {
    "id": "cat-peptides",
    "name": "Peptides",
    "slug": "peptides",
    "description": "Research peptides — BPC 157 UK, IGF 1 LR3, MT 2 and related vials with lab-tested framing, GBP prices and tracked UK delivery.",
    "imageUrl": "/media/products/bpc-157-pharmaqo-labs-5mg.webp",
    "productCount": 22,
    "featured": true
  },
  {
    "id": "cat-hgh",
    "name": "HGH",
    "slug": "hgh",
    "description": "HGH UK and HGH injections — buy HGH UK listings with brand, IU/mg details, GBP pricing and UK warehouse dispatch.",
    "imageUrl": "/media/products/qomatropin-12mg-36iu-cartridge-pharmaqo-labs.webp",
    "productCount": 7,
    "featured": true
  },
  {
    "id": "cat-ed-meds",
    "name": "ED Meds",
    "slug": "ed-meds",
    "description": "ED support medications — tadalafil and related options with clear dosing labels and UK tracked delivery.",
    "imageUrl": "/media/products/tadalafil-pharmaqo-labs-50tab-20mg.webp",
    "productCount": 12,
    "featured": true
  },
  {
    "id": "cat-viagra",
    "name": "Viagra",
    "slug": "viagra",
    "description": "Sildenafil (Viagra) catalogue options with strength, brand and GBP pricing from a UK warehouse.",
    "imageUrl": "/media/products/viagra-sildenafil-citrate-100mg-20caps-syncom-labs.webp",
    "productCount": 1,
    "featured": true
  },
  {
    "id": "cat-kamagra",
    "name": "Kamagra",
    "slug": "kamagra",
    "description": "Kamagra UK — Kamagra jelly, Kamagra 100mg oral jelly and tablet options with GBP prices and discreet dispatch.",
    "imageUrl": "/media/products/shopkamagra-jelly.webp",
    "productCount": 7,
    "featured": true
  },
  {
    "id": "cat-fat-loss",
    "name": "Fat Loss",
    "slug": "fat-loss",
    "description": "Buy Clenbuterol / Clenbuterol for sale — Clenbuterol tablet, clen pills and related fat-loss support with lab-tested framing and UK shipping.",
    "imageUrl": "/media/products/clenbuterol-pharmaqo-labs.webp",
    "productCount": 16,
    "featured": true
  },
  {
    "id": "cat-accessories",
    "name": "Accessories",
    "slug": "accessories",
    "description": "Peptide needles, buy syringes and needles for testosterone — injection accessories shipped from the UK.",
    "imageUrl": "/media/products/needle-21gx1-0-8x25mm-pack-of-10.webp",
    "productCount": 13,
    "featured": true
  }
];

export const INITIAL_BRANDS: Brand[] = [
  {
    "id": "brand-pharmaqo-labs",
    "name": "Pharmaqo Labs",
    "slug": "pharmaqo-labs",
    "description": "Pharmaqo Labs (Pharmaqo) — lab-tested anabolic and HGH catalogue lines including Test 400, testosterone esters and SARMs support items with GBP pricing and UK dispatch.",
    "logoUrl": "/media/brands/pharmaqo-labs.webp",
    "productCount": 95,
    "isFeatured": true
  },
  {
    "id": "brand-proper-labs",
    "name": "Proper Labs",
    "slug": "proper-labs",
    "description": "Proper Labs lab-tested anabolic products",
    "logoUrl": "/media/brands/proper-labs.webp",
    "productCount": 48,
    "isFeatured": true
  },
  {
    "id": "brand-viogen-labs",
    "name": "Viogen Labs",
    "slug": "viogen-labs",
    "description": "Viogen Labs lab-tested anabolic products",
    "logoUrl": "/media/brands/viogen-labs.webp",
    "productCount": 0,
    "isFeatured": true
  },
  {
    "id": "brand-intex-pharma",
    "name": "Intex Pharma",
    "slug": "intex-pharma",
    "description": "Intex Pharma lab-tested anabolic products",
    "logoUrl": "/media/brands/intex-pharma.webp",
    "productCount": 0,
    "isFeatured": true
  },
  {
    "id": "brand-hilma-biocare",
    "name": "Hilma Biocare",
    "slug": "hilma-biocare",
    "description": "Hilma Biocare lab-tested anabolic products",
    "logoUrl": "/media/brands/hilma-biocare.webp",
    "productCount": 0,
    "isFeatured": true
  },
  {
    "id": "brand-syncom-labs",
    "name": "Syncom Labs",
    "slug": "syncom-labs",
    "description": "Syncom Labs lab-tested anabolic products",
    "logoUrl": "/media/brands/syncom-labs.webp",
    "productCount": 100,
    "isFeatured": true
  },
  {
    "id": "brand-pharma-grade-manufacturers",
    "name": "Pharma Grade Manufacturers",
    "slug": "pharma-grade-manufacturers",
    "description": "Pharma Grade Manufacturers lab-tested anabolic products",
    "logoUrl": "/media/brands/pharma-grade-manufacturers.webp",
    "productCount": 4,
    "isFeatured": true
  },
  {
    "id": "brand-other",
    "name": "Other",
    "slug": "other",
    "description": "Other lab-tested anabolic products",
    "logoUrl": "/media/brands/other.svg",
    "productCount": 16,
    "isFeatured": true
  },
  {
    "id": "brand-beligas-pharmaceuticals",
    "name": "Beligas Pharmaceuticals",
    "slug": "beligas-pharmaceuticals",
    "description": "Beligas Pharmaceuticals lab-tested anabolic products",
    "logoUrl": "/media/brands/beligas-pharmaceuticals.webp",
    "productCount": 23,
    "isFeatured": true
  },
  {
    "id": "brand-ultima-pharmaceuticals",
    "name": "Ultima Pharmaceuticals",
    "slug": "ultima-pharmaceuticals",
    "description": "Ultima Pharmaceuticals lab-tested anabolic products",
    "logoUrl": "/media/brands/ultima-pharmaceuticals.png",
    "productCount": 4,
    "isFeatured": true
  },
  {
    "id": "brand-viogen-pharmaceuticals",
    "name": "Viogen Pharmaceuticals",
    "slug": "viogen-pharmaceuticals",
    "description": "Viogen Pharmaceuticals lab-tested anabolic products",
    "logoUrl": "/media/brands/viogen-pharmaceuticals.png",
    "productCount": 7,
    "isFeatured": true
  },
  {
    "id": "brand-imuscle-sarms",
    "name": "iMuscle SARMs",
    "slug": "imuscle-sarms",
    "description": "iMuscle SARMs lab-tested anabolic products",
    "logoUrl": "/media/brands/imuscle-sarms.webp",
    "productCount": 12,
    "isFeatured": true
  },
  {
    "id": "brand-ajanta-pharma",
    "name": "Ajanta Pharma",
    "slug": "ajanta-pharma",
    "description": "Ajanta Pharma lab-tested anabolic products",
    "logoUrl": "/media/brands/ajanta-pharma.png",
    "productCount": 7,
    "isFeatured": true
  },
  {
    "id": "brand-steroids-uk",
    "name": "Steroids UK",
    "slug": "steroids-uk",
    "description": "Steroids UK lab-tested anabolic products",
    "logoUrl": "/media/brands/steroids-uk.png",
    "productCount": 1,
    "isFeatured": true
  },
  {
    "id": "brand-deus-medical",
    "name": "Deus Medical",
    "slug": "deus-medical",
    "description": "Deus Medical lab-tested anabolic products",
    "logoUrl": "/media/brands/deus-medical.webp",
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
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 35.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "Buy testosterone cypionate in the UK — lab-tested Proper Labs injectable with GBP pricing and tracked delivery.",
    "description": "Testosterone cypionate is a long-acting injectable ester in our UK steroid shop. Proper Labs 200mg listing with batch context, GBP price and stock. Educational catalogue use only — not medical advice.",
    "seoTitle": "Testosterone Cypionate 200 – Buy in the UK | Steroids UK",
    "seoDescription": "Buy testosterone cypionate in the UK from Steroids UK. Lab-tested Proper Labs injectable with GBP pricing and tracked UK dispatch.",
    "images": [
      "/media/products/testosterone-cypionate-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.619Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-test-enan-pharmaqo",
    "name": "Testosterone-E 300 – Pharmaqo Labs",
    "slug": "test-enan-pharmaqo",
    "sku": "968-2",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/test-enan-pharmaqo.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-anavar10-proper-labs",
    "name": "Anavar10 – Proper Labs [100tabs/10mg]",
    "slug": "anavar10-proper-labs",
    "sku": "49-1-1-1-1-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 41.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "Anavar UK oral oxandrolone 10mg — Anavar for sale from Proper Labs with GBP pricing and tracked delivery.",
    "description": "Purchase Anavar or place an Anavar order from this oral listing. Browse Anavar UK tablets in the oral category. Educational only.",
    "seoTitle": "Anavar 10mg – Anavar UK | Steroids UK",
    "seoDescription": "Anavar UK — Anavar 10mg Proper Labs tablets. Anavar for sale with lab-tested batches and discreet UK shipping.",
    "images": [
      "/media/products/anavar10-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-boldenone-proper-labs",
    "name": "Boldenone Undecylenate 300 – Proper Labs",
    "slug": "boldenone-proper-labs",
    "sku": "739-1-2",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 36.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": true,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "Boldenone undecylenate lab-tested injectable listed in the Steroids UK catalogue.",
    "description": "Boldenone undecylenate (EQ-class) injectable for catalogue browsing. Educational only.",
    "seoTitle": "Boldenone Undecylenate 300 | Steroids UK",
    "seoDescription": "Boldenone undecylenate Proper Labs — Equipoise-class injectable with GBP pricing and UK tracked shipping.",
    "images": [
      "/media/products/boldenone-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-dianabol-pharmaqo-labs",
    "name": "Dianabol – Pharmaqo Labs [100tabs/10mg]",
    "slug": "dianabol-pharmaqo-labs",
    "sku": "49-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
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
      "/media/products/dianabol-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-testoprop-pharmaqolabs",
    "name": "Testosterone-P 100 – Pharmaqo Labs",
    "slug": "testoprop-pharmaqolabs",
    "sku": "745-2",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/testoprop-pharmaqolabs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
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
    "shortDescription": "Clenbuterol tablet (clen pills / clen tablets) — Proper Labs fat-loss catalogue listing with UK tracked dispatch.",
    "description": "Clenbuterol tablet listings support clen pills and clen tablets searches. Browse the fat-loss category. Educational only.",
    "seoTitle": "Clenbuterol Tablet – Clen Pills UK | Steroids UK",
    "seoDescription": "Clenbuterol tablet and clen pills from Proper Labs. Fat-loss catalogue item with GBP pricing and UK shipping.",
    "images": [
      "/media/products/clenbuterol-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-nandrolone-decanate-proper-labs",
    "name": "Nandrolone Decanoate 300 – Proper Labs",
    "slug": "nandrolone-decanate-proper-labs",
    "sku": "971-1-2-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/nandrolone-decanate-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-tri-tren-pharmaqo-labs",
    "name": "Tri-Tren – Pharmaqo Labs",
    "slug": "tri-tren-pharmaqo-labs",
    "sku": "43",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/tri-tren-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-testosterone-enanthate-proper-labs",
    "name": "Testosterone Enanthate 300 – Proper Labs",
    "slug": "testosterone-enanthate-proper-labs",
    "sku": "968-2-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/testosterone-enanthate-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-testo-mix3-proper-labs",
    "name": "Testosterone Mix3 400 – Proper Labs",
    "slug": "testo-mix3-proper-labs",
    "sku": "754-2-3",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/testo-mix3-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-anadrol50-proper-labs",
    "name": "Anadrol – Proper Labs [60tabs/50mg]",
    "slug": "anadrol50-proper-labs",
    "sku": "49-1-1-1-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
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
      "/media/products/anadrol50-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-trenbolone-enanthate-proper-labs",
    "name": "Trenbolone Enanthate 200 – Proper Labs",
    "slug": "trenbolone-enanthate-proper-labs",
    "sku": "747-2-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/trenbolone-enanthate-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-sustanon-250-pharmaqo-labs",
    "name": "Sustanon 250 – Pharmaqo Labs",
    "slug": "sustanon-250-pharmaqo-labs",
    "sku": "742-2",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/sustanon-250-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-supersus-400-pharmaqo-labs",
    "name": "Supersus 400 – Pharmaqo Labs",
    "slug": "supersus-400-pharmaqo-labs",
    "sku": "754-2-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/supersus-400-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-tri-test-400-spharmaqo-labs",
    "name": "Tri-Ester Test 400 – Pharmaqo Labs",
    "slug": "tri-test-400-spharmaqo-labs",
    "sku": "754-2",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "Test 400 Tri-Ester by Pharmaqo Labs — testosterone mix for UK catalogue buyers seeking Test 400.",
    "description": "Test 400 from Pharmaqo Labs blends testosterone esters. Explore Pharmaqo Labs or buy testosterone in injectables. Educational only.",
    "seoTitle": "Test 400 Tri-Ester – Pharmaqo Labs | Steroids UK",
    "seoDescription": "Test 400 (Tri-Ester Testosterone Mix) by Pharmaqo Labs. Lab-tested injectable with GBP pricing and UK dispatch.",
    "images": [
      "/media/products/tri-test-400-spharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-dianabol-proper-labs",
    "name": "Dianabol – Proper Labs [100tabs/10mg]",
    "slug": "dianabol-proper-labs",
    "sku": "49-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
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
      "/media/products/dianabol-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-boldenone-pharmaqolabs",
    "name": "Boldenone 300 – Pharmaqo Labs",
    "slug": "boldenone-pharmaqolabs",
    "sku": "739-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/boldenone-pharmaqolabs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-superbolin-pharmaqo-labs",
    "name": "Superbolan 400 – Pharmaqo Labs",
    "slug": "superbolin-pharmaqo-labs",
    "sku": "55-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/superbolin-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-power-proper-labs",
    "name": "Proper Power Erection – Proper Labs [20Tabs/20mg]",
    "slug": "power-proper-labs",
    "sku": "11-1-1-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
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
      "/media/products/power-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-armidex-proper-labs",
    "name": "Arimidex – Proper Labs [50tab/1mg]",
    "slug": "armidex-proper-labs",
    "sku": "14-2-2",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
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
      "/media/products/armidex-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-winstrol-proper-labs",
    "name": "Winstrol – Proper Labs [100tabs/10mg]",
    "slug": "winstrol-proper-labs",
    "sku": "49-1-1-1",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
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
      "/media/products/winstrol-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-clomid-pharmaqo-labs",
    "name": "Clomid – Pharmaqo Labs [50tab/50mg]",
    "slug": "clomid-pharmaqo-labs",
    "sku": "16-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
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
      "/media/products/clomid-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-nandrophenyl-npp-pharmaqolabs",
    "name": "NPP – Pharmaqo Labs",
    "slug": "nandrophenyl-npp-pharmaqolabs",
    "sku": "971-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/nandrophenyl-npp-pharmaqolabs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-testex-c-200-pharmaqolabs",
    "name": "Testosterone-C 200 – Pharmaqo Labs",
    "slug": "testex-c-200-pharmaqolabs",
    "sku": "745-2-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/testex-c-200-pharmaqolabs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
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
      "/media/products/t3-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-anadrol-pharmaqo-labs",
    "name": "Anadrol 50 – Pharmaqo Labs [60tabs/50mg]",
    "slug": "anadrol-pharmaqo-labs",
    "sku": "9191-005",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
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
      "/media/products/anadrol-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-nandrophenyl-npp-proper-labs",
    "name": "NPP 100 – Proper Labs",
    "slug": "nandrophenyl-npp-proper-labs",
    "sku": "971-1-3",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/nandrophenyl-npp-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-tamoxifen-pharmaqo-labs",
    "name": "Tamoxifen – Pharmaqo Labs",
    "slug": "tamoxifen-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-TAMOXIFEN-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": "Buy Tamoxifen – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Tamoxifen – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/tamoxifen-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-anavar50-proper-labs",
    "name": "ANAVAR50 – Proper Labs",
    "slug": "anavar50-proper-labs",
    "sku": "PROPER-LABS-ANAVAR50-PROPER",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": "Buy ANAVAR50 – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "ANAVAR50 – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/anavar50-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-nandrodec-pharmaqolabs",
    "name": "Nandrodec – Pharmaqo Labs",
    "slug": "nandrodec-pharmaqolabs",
    "sku": "PHARMAQO-LABS-NANDRODEC-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "Buy Nandrodec – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Nandrodec – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/nandrodec-pharmaqolabs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-masteron-p-pharmaqo-labs",
    "name": "Masteron P – Pharmaqo Labs",
    "slug": "masteron-p-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-MASTERON-P-PHAR",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": "Buy Masteron P – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Masteron P – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/masteron-p-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-masteron-enan-pharmaqo-labs",
    "name": "Masteron Enan – Pharmaqo Labs",
    "slug": "masteron-enan-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-MASTERON-ENAN-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "Buy Masteron Enan – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Masteron Enan – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/masteron-enan-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-clenbuterol-pharmaqo-labs",
    "name": "Clenbuterol – Pharmaqo Labs",
    "slug": "clenbuterol-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-CLENBUTEROL-PHA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "Clen pills / Clenbuterol tablet from Pharmaqo Labs with lab-tested batch notes and UK delivery.",
    "description": "Clen pills listing under fat-loss. Compare Clenbuterol tablet options in the category. Educational only.",
    "seoTitle": "Clen Pills – Pharmaqo Clenbuterol | Steroids UK",
    "seoDescription": "Clen pills from Pharmaqo Labs at Steroids UK. Clenbuterol tablet catalogue option with GBP pricing.",
    "images": [
      "/media/products/clenbuterol-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-trenbolone-acetate-proper-labs",
    "name": "Trenbolone Acetate – Proper Labs",
    "slug": "trenbolone-acetate-proper-labs",
    "sku": "PROPER-LABS-TRENBOLONE-ACET",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": "Trenbolone acetate price 10ml listing — lab-tested Proper Labs injectable for UK catalogue buyers.",
    "description": "Trenbolone acetate price 10ml maps to this Proper Labs injectable. Browse trenbolone or injectables. Educational only.",
    "seoTitle": "Trenbolone Acetate Price 10ml | Steroids UK",
    "seoDescription": "Trenbolone acetate price 10ml — Proper Labs injectable at Steroids UK with GBP pricing and UK dispatch.",
    "images": [
      "/media/products/trenbolone-acetate-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-proviron-proper-labs",
    "name": "Proviron – Proper Labs",
    "slug": "proviron-proper-labs",
    "sku": "PROPER-LABS-PROVIRON-PROPER",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": "Buy Proviron – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Proviron – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proviron-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-proviron-pharmaqo-labs",
    "name": "Proviron – Pharmaqo Labs",
    "slug": "proviron-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-PROVIRON-PHARMA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": "Buy Proviron – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Proviron – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/proviron-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-androbolan400-pharmaqo-labs",
    "name": "ANDROBOLAN400 – Pharmaqo Labs",
    "slug": "androbolan400-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-ANDROBOLAN400-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": "Buy ANDROBOLAN400 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "ANDROBOLAN400 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/androbolan400-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-armidex-pharmaqo-labs",
    "name": "Armidex – Pharmaqo Labs",
    "slug": "armidex-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-ARMIDEX-PHARMAQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": "Buy Armidex – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Armidex – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/armidex-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-t3-pharmaqo",
    "name": "T3 – Pharmaqo Labs",
    "slug": "t3-pharmaqo",
    "sku": "PHARMAQO-LABS-T3-PHARMAQO",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": "Buy T3 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "T3 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/t3-pharmaqo.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-igf1-des-pharmaqo",
    "name": "IGF1 Des – Pharmaqo Labs",
    "slug": "igf1-des-pharmaqo",
    "sku": "PHARMAQO-LABS-IGF1-DES-PHARMA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": "Buy IGF1 Des – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "IGF1 Des – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/igf1-des-pharmaqo.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-pharmaqolabs-lgd4033",
    "name": "LGD4033 – Pharmaqo Labs",
    "slug": "pharmaqolabs-lgd4033",
    "sku": "PHARMAQO-LABS-PHARMAQOLABS-LG",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": "Buy LGD4033 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "LGD4033 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqolabs-lgd4033.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-anavar-10-pharmaqo-labs",
    "name": "Anavar 10 – Pharmaqo Labs",
    "slug": "anavar-10-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-ANAVAR-10-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": "Purchase Anavar 10mg Pharmaqo — Anavar buy option with batch verification and GBP pricing.",
    "description": "Anavar buy listing from Pharmaqo Labs. Compare Anavar order options across the oral category. Educational only.",
    "seoTitle": "Purchase Anavar 10 – Pharmaqo | Steroids UK",
    "seoDescription": "Purchase Anavar 10mg from Pharmaqo Labs at Steroids UK. Anavar buy listing with lab-tested framing and UK dispatch.",
    "images": [
      "/media/products/anavar-10-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-igf1-lr3-pharmaqo",
    "name": "IGF1 LR3 – Pharmaqo Labs",
    "slug": "igf1-lr3-pharmaqo",
    "sku": "PHARMAQO-LABS-IGF1-LR3-PHARMA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": "Buy IGF1 LR3 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "IGF1 LR3 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/igf1-lr3-pharmaqo.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-trenbolone-enan-pharmaqo",
    "name": "Trenbolone Enan – Pharmaqo Labs",
    "slug": "trenbolone-enan-pharmaqo",
    "sku": "PHARMAQO-LABS-TRENBOLONE-ENAN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": "Buy Trenbolone Enan – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Trenbolone Enan – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/trenbolone-enan-pharmaqo.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-winstrol50-pharmaqo-labs",
    "name": "WINSTROL50 – Pharmaqo Labs",
    "slug": "winstrol50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-WINSTROL50-PHAR",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "Buy WINSTROL50 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "WINSTROL50 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/winstrol50-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-power-proper-labs-small",
    "name": "Power Proper Labs – Proper Labs",
    "slug": "power-proper-labs-small",
    "sku": "PROPER-LABS-POWER-PROPER-LA",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": "Buy Power Proper Labs – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Power Proper Labs – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/power-proper-labs-small.webp"
    ],
    "tags": [
      "Proper Labs",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-trenabolone-a-pharmaqo-labs",
    "name": "Trenabolone A – Pharmaqo Labs",
    "slug": "trenabolone-a-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-TRENABOLONE-A-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": "Buy Trenabolone A – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Trenabolone A – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/trenabolone-a-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-oxydrol50-pharmaqo-labs",
    "name": "OXYDROL50 – Pharmaqo Labs",
    "slug": "oxydrol50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-OXYDROL50-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": "Buy OXYDROL50 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "OXYDROL50 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/oxydrol50-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-superdrol25-pharmaqo-labs",
    "name": "SUPERDROL25 – Pharmaqo Labs",
    "slug": "superdrol25-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-SUPERDROL25-PHA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": "Buy SUPERDROL25 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "SUPERDROL25 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/superdrol25-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-pharmaqo-labs-rad",
    "name": "Rad – Pharmaqo Labs",
    "slug": "pharmaqo-labs-rad",
    "sku": "PHARMAQO-LABS-PHARMAQO-LABS-R",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": "Buy Rad – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Rad – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqo-labs-rad.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-trenbolone-hex-100mg-pharmaqo",
    "name": "Trenbolone Hex 100MG – Pharmaqo Labs",
    "slug": "trenbolone-hex-100mg-pharmaqo",
    "sku": "PHARMAQO-LABS-TRENBOLONE-HEX-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": "Buy Trenbolone Hex 100MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Trenbolone Hex 100MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/trenbolone-hex-100mg-pharmaqo.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-dianabol25-proper-labs",
    "name": "DIANABOL25 – Proper Labs",
    "slug": "dianabol25-proper-labs",
    "sku": "PROPER-LABS-DIANABOL25-PROP",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": "Buy DIANABOL25 – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "DIANABOL25 – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/dianabol25-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-ment-50-pharmaqo-labs",
    "name": "Ment 50 – Pharmaqo Labs",
    "slug": "ment-50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-MENT-50-PHARMAQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": "Buy Ment 50 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Ment 50 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/ment-50-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-methyltrienolone-1mg-pharmaqo-labs",
    "name": "Methyltrienolone 1MG – Pharmaqo Labs",
    "slug": "methyltrienolone-1mg-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-METHYLTRIENOLON",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": "Buy Methyltrienolone 1MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Methyltrienolone 1MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/methyltrienolone-1mg-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-winstrol50-proper-labs",
    "name": "WINSTROL50 – Proper Labs",
    "slug": "winstrol50-proper-labs",
    "sku": "PROPER-LABS-WINSTROL50-PROP",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": "Buy WINSTROL50 – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "WINSTROL50 – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/winstrol50-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-hcg-pharmaqolabs",
    "name": "HCG – Pharmaqo Labs",
    "slug": "hcg-pharmaqolabs",
    "sku": "PHARMAQO-LABS-HCG-PHARMAQOLAB",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": "Buy HCG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "HCG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/hcg-pharmaqolabs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-dhb-1-testosterone-cypionate-test-cyp-dhb-pharmaqo-labs",
    "name": "DHB 1 Testosterone Cypionate Test Cyp DHB – Pharmaqo Labs",
    "slug": "dhb-1-testosterone-cypionate-test-cyp-dhb-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-DHB-1-TESTOSTER",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": "Buy DHB 1 Testosterone Cypionate Test Cyp DHB – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "DHB 1 Testosterone Cypionate Test Cyp DHB – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/dhb-1-testosterone-cypionate-test-cyp-dhb-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-bpc-157-pharmaqo-labs-5mg",
    "name": "BPC 157 Pharmaqo Labs 5MG – Pharmaqo Labs",
    "slug": "bpc-157-pharmaqo-labs-5mg",
    "sku": "PHARMAQO-LABS-BPC-157-PHARMAQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": "Buy BPC 157 Pharmaqo Labs 5MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "BPC 157 Pharmaqo Labs 5MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/bpc-157-pharmaqo-labs-5mg.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-pharmaqo-labs-mk677",
    "name": "MK677 – Pharmaqo Labs",
    "slug": "pharmaqo-labs-mk677",
    "sku": "PHARMAQO-LABS-PHARMAQO-LABS-M",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": "Buy MK677 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "MK677 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqo-labs-mk677.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.620Z",
    "updatedAt": "2026-09-08T08:02:30.620Z"
  },
  {
    "id": "prod-fermavar-2-5mg-100-tabs-pharmaqo-labs",
    "name": "Fermavar 2 5MG 100 Tabs – Pharmaqo Labs",
    "slug": "fermavar-2-5mg-100-tabs-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-FERMAVAR-2-5MG-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "Buy Fermavar 2 5MG 100 Tabs – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Fermavar 2 5MG 100 Tabs – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/fermavar-2-5mg-100-tabs-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-sustanon-250-amps-pharmaqo-labs",
    "name": "Sustanon 250 Amps – Pharmaqo Labs",
    "slug": "sustanon-250-amps-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-SUSTANON-250-AM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": "Buy Sustanon 250 Amps – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Sustanon 250 Amps – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/sustanon-250-amps-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-caber-cabergoline-pharmaqo-labs-10tab-1mg",
    "name": "Caber Cabergoline Pharmaqo Labs 10TAB 1MG – Pharmaqo Labs",
    "slug": "caber-cabergoline-pharmaqo-labs-10tab-1mg",
    "sku": "PHARMAQO-LABS-CABER-CABERGOLI",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "Buy Caber Cabergoline Pharmaqo Labs 10TAB 1MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Caber Cabergoline Pharmaqo Labs 10TAB 1MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/caber-cabergoline-pharmaqo-labs-10tab-1mg.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-nandrolone-d-300mg-pharmaqo-labs-amps",
    "name": "Nandrolone D 300MG Pharmaqo Labs Amps – Pharmaqo Labs",
    "slug": "nandrolone-d-300mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-NANDROLONE-D-30",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "Buy Nandrolone D 300MG Pharmaqo Labs Amps – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Nandrolone D 300MG Pharmaqo Labs Amps – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/nandrolone-d-300mg-pharmaqo-labs-amps.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-trt-formula-pharmaqo-labs-200-5mg",
    "name": "TRT Formula Pharmaqo Labs 200 5MG – Pharmaqo Labs",
    "slug": "trt-formula-pharmaqo-labs-200-5mg",
    "sku": "PHARMAQO-LABS-TRT-FORMULA-PHA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": "Buy TRT Formula Pharmaqo Labs 200 5MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "TRT Formula Pharmaqo Labs 200 5MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/trt-formula-pharmaqo-labs-200-5mg.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-trenbolone-aq-50-pharmaqo-labs",
    "name": "Trenbolone AQ 50 – Pharmaqo Labs",
    "slug": "trenbolone-aq-50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-TRENBOLONE-AQ-5",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": "Buy Trenbolone AQ 50 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Trenbolone AQ 50 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/trenbolone-aq-50-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-super-lean-tab-pharmaqo-labs-60tabs-100mg",
    "name": "Super Lean Tab Pharmaqo Labs 60TABS 100MG – Pharmaqo Labs",
    "slug": "super-lean-tab-pharmaqo-labs-60tabs-100mg",
    "sku": "PHARMAQO-LABS-SUPER-LEAN-TAB-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": "Buy Super Lean Tab Pharmaqo Labs 60TABS 100MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Super Lean Tab Pharmaqo Labs 60TABS 100MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/super-lean-tab-pharmaqo-labs-60tabs-100mg.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-tadalafil-pharmaqo-labs-50tab-20mg",
    "name": "Tadalafil Pharmaqo Labs 50TAB 20MG – Pharmaqo Labs",
    "slug": "tadalafil-pharmaqo-labs-50tab-20mg",
    "sku": "PHARMAQO-LABS-TADALAFIL-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": "Buy Tadalafil Pharmaqo Labs 50TAB 20MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Tadalafil Pharmaqo Labs 50TAB 20MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/tadalafil-pharmaqo-labs-50tab-20mg.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-fermawin-2-5mg-100-tabs-pharmaqo-labs",
    "name": "Fermawin 2 5MG 100 Tabs – Pharmaqo Labs",
    "slug": "fermawin-2-5mg-100-tabs-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-FERMAWIN-2-5MG-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": "Buy Fermawin 2 5MG 100 Tabs – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Fermawin 2 5MG 100 Tabs – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/fermawin-2-5mg-100-tabs-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-drostanolone-e-200mg-pharmaqo-labs-amps",
    "name": "Drostanolone E 200MG Pharmaqo Labs Amps – Pharmaqo Labs",
    "slug": "drostanolone-e-200mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-DROSTANOLONE-E-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": "Buy Drostanolone E 200MG Pharmaqo Labs Amps – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Drostanolone E 200MG Pharmaqo Labs Amps – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/drostanolone-e-200mg-pharmaqo-labs-amps.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-primobolan-pharmaqo-labs",
    "name": "Primobolan – Pharmaqo Labs",
    "slug": "primobolan-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-PRIMOBOLAN-PHAR",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": "Buy Primobolan – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Primobolan – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/primobolan-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-winstrol-pharmaqo-labs",
    "name": "Winstrol – Pharmaqo Labs",
    "slug": "winstrol-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-WINSTROL-PHARMA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": "Buy Winstrol – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Winstrol – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/winstrol-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-yk11-pharmaqo",
    "name": "YK11 – Pharmaqo Labs",
    "slug": "yk11-pharmaqo",
    "sku": "PHARMAQO-LABS-YK11-PHARMAQO",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": "Buy YK11 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "YK11 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/yk11-pharmaqo.jpg"
    ],
    "tags": [
      "Pharmaqo Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-superdrol-10mg-100-tabs-pharmaqo-labs",
    "name": "Superdrol 10MG 100 Tabs – Pharmaqo Labs",
    "slug": "superdrol-10mg-100-tabs-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-SUPERDROL-10MG-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": "Buy Superdrol 10MG 100 Tabs – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Superdrol 10MG 100 Tabs – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/superdrol-10mg-100-tabs-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-primobolan-methenolone-e-100mg-pharmaqo-labs-amps",
    "name": "Primobolan Methenolone E 100MG Pharmaqo Labs Amps – Pharmaqo Labs",
    "slug": "primobolan-methenolone-e-100mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-PRIMOBOLAN-METH",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": "Buy Primobolan Methenolone E 100MG Pharmaqo Labs Amps – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Primobolan Methenolone E 100MG Pharmaqo Labs Amps – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/primobolan-methenolone-e-100mg-pharmaqo-labs-amps.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-eq-test-500mg-pharmaqo-labs",
    "name": "EQ Test 500MG – Pharmaqo Labs",
    "slug": "eq-test-500mg-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-EQ-TEST-500MG-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "Buy EQ Test 500MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "EQ Test 500MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/eq-test-500mg-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-anavar-50-pharmaqo-labs",
    "name": "Anavar 50 – Pharmaqo Labs",
    "slug": "anavar-50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-ANAVAR-50-PHARM",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": "Buy Anavar 50 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Anavar 50 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/anavar-50-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-fastrip-pharmaqo-labs",
    "name": "Fastrip – Pharmaqo Labs",
    "slug": "fastrip-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-FASTRIP-PHARMAQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": "Buy Fastrip – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Fastrip – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/fastrip-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-dapoxetine-60mg-pharmaqo-labs-60mg-x-50-pills",
    "name": "Dapoxetine 60MG Pharmaqo Labs 60MG X 50 Pills – Pharmaqo Labs",
    "slug": "dapoxetine-60mg-pharmaqo-labs-60mg-x-50-pills",
    "sku": "PHARMAQO-LABS-DAPOXETINE-60MG",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": "Buy Dapoxetine 60MG Pharmaqo Labs 60MG X 50 Pills – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Dapoxetine 60MG Pharmaqo Labs 60MG X 50 Pills – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/dapoxetine-60mg-pharmaqo-labs-60mg-x-50-pills.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-trenbolone-hexy-pharmaqo",
    "name": "Trenbolone Hexy – Pharmaqo Labs",
    "slug": "trenbolone-hexy-pharmaqo",
    "sku": "PHARMAQO-LABS-TRENBOLONE-HEXY",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": "Buy Trenbolone Hexy – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Trenbolone Hexy – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/trenbolone-hexy-pharmaqo.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-halotestin-pharmaqo-labs",
    "name": "Halotestin – Pharmaqo Labs",
    "slug": "halotestin-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-HALOTESTIN-PHAR",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": "Buy Halotestin – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Halotestin – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/halotestin-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testosterone-propionate-proper-labs",
    "name": "Testosterone Propionate – Proper Labs",
    "slug": "testosterone-propionate-proper-labs",
    "sku": "PROPER-LABS-TESTOSTERONE-PR",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": "Testosterone propionate — short-ester injectable for testosterone UK buy searches with lab-tested batch notes.",
    "description": "Testosterone propionate short-ester injectable. Compare with testosterone cypionate or browse buy testosterone listings. Educational only.",
    "seoTitle": "Testosterone Propionate – UK Catalogue | Steroids UK",
    "seoDescription": "Testosterone propionate from Proper Labs at Steroids UK. Short-ester injectable with GBP pricing and UK tracked shipping.",
    "images": [
      "/media/products/testosterone-propionate-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pharmaqo-sr-9009",
    "name": "SR 9009 – Pharmaqo Labs",
    "slug": "pharmaqo-sr-9009",
    "sku": "PHARMAQO-LABS-PHARMAQO-SR-900",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": "Buy SR 9009 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "SR 9009 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqo-sr-9009.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-salbutamol-proper-labs",
    "name": "Salbutamol – Proper Labs",
    "slug": "salbutamol-proper-labs",
    "sku": "PROPER-LABS-SALBUTAMOL-PROP",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": "Buy Salbutamol – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Salbutamol – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/salbutamol-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-mgf-pharmaqo",
    "name": "MGF – Pharmaqo Labs",
    "slug": "mgf-pharmaqo",
    "sku": "PHARMAQO-LABS-MGF-PHARMAQO",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": "Buy MGF – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "MGF – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/mgf-pharmaqo.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testosterone-p-100mg-pharmaqo",
    "name": "Testosterone P 100MG – Pharmaqo Labs",
    "slug": "testosterone-p-100mg-pharmaqo",
    "sku": "PHARMAQO-LABS-TESTOSTERONE-P-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": "Buy Testosterone P 100MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Testosterone P 100MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/testosterone-p-100mg-pharmaqo.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pharmaqo-cutting-stack-injectable",
    "name": "Cutting Stack Injectable – Pharmaqo Labs",
    "slug": "pharmaqo-cutting-stack-injectable",
    "sku": "PHARMAQO-LABS-PHARMAQO-CUTTIN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": "Buy Cutting Stack Injectable – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Cutting Stack Injectable – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqo-cutting-stack-injectable.png"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pharmaqo-bulking-stack-injectable",
    "name": "Bulking Stack Injectable – Pharmaqo Labs",
    "slug": "pharmaqo-bulking-stack-injectable",
    "sku": "PHARMAQO-LABS-PHARMAQO-BULKIN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": "Buy Bulking Stack Injectable – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Bulking Stack Injectable – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqo-bulking-stack-injectable.png"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pharmaqo-beginners-stack-first-bulking-cycle",
    "name": "Beginners Stack First Bulking Cycle – Pharmaqo Labs",
    "slug": "pharmaqo-beginners-stack-first-bulking-cycle",
    "sku": "PHARMAQO-LABS-PHARMAQO-BEGINN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": "Buy Beginners Stack First Bulking Cycle – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Beginners Stack First Bulking Cycle – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqo-beginners-stack-first-bulking-cycle.png"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-fermaprovi-5mg-100-tabs-pharmaqo-labs",
    "name": "Fermaprovi 5MG 100 Tabs – Pharmaqo Labs",
    "slug": "fermaprovi-5mg-100-tabs-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-FERMAPROVI-5MG-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": "Buy Fermaprovi 5MG 100 Tabs – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Fermaprovi 5MG 100 Tabs – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/fermaprovi-5mg-100-tabs-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pharmaqo-beginners-cutting-stack",
    "name": "Beginners Cutting Stack – Pharmaqo Labs",
    "slug": "pharmaqo-beginners-cutting-stack",
    "sku": "PHARMAQO-LABS-PHARMAQO-B-PHARMAQO-BEGINN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "Buy Beginners Cutting Stack – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Beginners Cutting Stack – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqo-beginners-cutting-stack.png"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pharmaqo-labs-pct-stack-advanced",
    "name": "PCT Stack Advanced – Pharmaqo Labs",
    "slug": "pharmaqo-labs-pct-stack-advanced",
    "sku": "PHARMAQO-LABS-PHARMAQO-LABS-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": "Buy PCT Stack Advanced – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "PCT Stack Advanced – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqo-labs-pct-stack-advanced.png"
    ],
    "tags": [
      "Pharmaqo Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pharmaqo-pct-stack",
    "name": "PCT Stack – Pharmaqo Labs",
    "slug": "pharmaqo-pct-stack",
    "sku": "PHARMAQO-LABS-PHARMAQO-PCT-ST",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "Buy PCT Stack – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "PCT Stack – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqo-pct-stack.png"
    ],
    "tags": [
      "Pharmaqo Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pharmaqo-labs-ultimate-precontest-stack",
    "name": "Ultimate Precontest Stack – Pharmaqo Labs",
    "slug": "pharmaqo-labs-ultimate-precontest-stack",
    "sku": "PHARMAQO-LABS-PHARMAQO-LABS-U",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "Buy Ultimate Precontest Stack – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Ultimate Precontest Stack – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqo-labs-ultimate-precontest-stack.png"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-cutting-oral-stack-tablets-only",
    "name": "Cutting Oral Stack Tablets Only – Proper Labs",
    "slug": "proper-labs-cutting-oral-stack-tablets-only",
    "sku": "PROPER-LABS-PROPER-LABS-CUT",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": "Buy Cutting Oral Stack Tablets Only – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Cutting Oral Stack Tablets Only – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-cutting-oral-stack-tablets-only.png"
    ],
    "tags": [
      "Proper Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-bulking-stack-classic",
    "name": "Bulking Stack Classic – Proper Labs",
    "slug": "proper-labs-bulking-stack-classic",
    "sku": "PROPER-LABS-PROPER-LABS-BUL",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": "Buy Bulking Stack Classic – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Bulking Stack Classic – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-bulking-stack-classic.png"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-cutting-stack",
    "name": "Cutting Stack – Proper Labs",
    "slug": "proper-labs-cutting-stack",
    "sku": "PROPER-LABS-PROPER-LABS--PROPER-LABS-CUT",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": "Buy Cutting Stack – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Cutting Stack – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-cutting-stack.png"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pharmaqo-sarms-bulking-stack",
    "name": "Sarms Bulking Stack – Pharmaqo Labs",
    "slug": "pharmaqo-sarms-bulking-stack",
    "sku": "PHARMAQO-LABS-PHARMAQO-SARMS-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": "Buy Sarms Bulking Stack – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Sarms Bulking Stack – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqo-sarms-bulking-stack.png"
    ],
    "tags": [
      "Pharmaqo Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-fat-burning-stack-extreme",
    "name": "Fat Burning Stack Extreme – Proper Labs",
    "slug": "proper-labs-fat-burning-stack-extreme",
    "sku": "PROPER-LABS-PROPER-LABS-FAT",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": "Buy Fat Burning Stack Extreme – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Fat Burning Stack Extreme – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-fat-burning-stack-extreme.png"
    ],
    "tags": [
      "Proper Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-cutting-stack-ultimate",
    "name": "Cutting Stack Ultimate – Proper Labs",
    "slug": "proper-labs-cutting-stack-ultimate",
    "sku": "PROPERLABSCUTTINGSTACKULTIMATE",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": "Buy Cutting Stack Ultimate – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Cutting Stack Ultimate – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-cutting-stack-ultimate.png"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-beginner-stack-first-bulking-cycle",
    "name": "Beginner Stack First Bulking Cycle – Proper Labs",
    "slug": "proper-labs-beginner-stack-first-bulking-cycle",
    "sku": "PROPER-LABS-PROPER-LABS-BEG",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": "Buy Beginner Stack First Bulking Cycle – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Beginner Stack First Bulking Cycle – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-beginner-stack-first-bulking-cycle.png"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-beginner-stack-first-injection-cycle",
    "name": "Beginner Stack First Injection Cycle – Proper Labs",
    "slug": "proper-labs-beginner-stack-first-injection-cycle",
    "sku": "PROPER-LABS-PROPER-LABS--PROPER-LABS-BEG",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": "Buy Beginner Stack First Injection Cycle – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Beginner Stack First Injection Cycle – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-beginner-stack-first-injection-cycle.png"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-bulking-oral-stack",
    "name": "Bulking Oral Stack – Proper Labs",
    "slug": "proper-labs-bulking-oral-stack",
    "sku": "PROPER-LABS-PROPER-LABS--PROPER-LABS-BUL",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": "Buy Bulking Oral Stack – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Bulking Oral Stack – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-bulking-oral-stack.png"
    ],
    "tags": [
      "Proper Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-fat-burn-stack",
    "name": "Fat Burn Stack – Proper Labs",
    "slug": "proper-labs-fat-burn-stack",
    "sku": "PROPER-LABS-PROPER-LABS--PROPER-LABS-FAT",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": "Buy Fat Burn Stack – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Fat Burn Stack – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-fat-burn-stack.png"
    ],
    "tags": [
      "Proper Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-beginner-stack",
    "name": "Beginner Stack – Proper Labs",
    "slug": "proper-labs-beginner-stack",
    "sku": "PROPERLABSBEGINNERSTACK",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": "Buy Beginner Stack – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Beginner Stack – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-beginner-stack.png"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-properlabs-sust-bold",
    "name": "Sust Bold – Proper Labs",
    "slug": "properlabs-sust-bold",
    "sku": "PROPER-LABS-PROPERLABS-SUST",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "Buy Sust Bold – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Sust Bold – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/properlabs-sust-bold.png"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-pct-stack-oral-only",
    "name": "PCT Stack Oral Only – Proper Labs",
    "slug": "proper-labs-pct-stack-oral-only",
    "sku": "PROPER-LABS-PROPER-LABS-PCT",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": "Buy PCT Stack Oral Only – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "PCT Stack Oral Only – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-pct-stack-oral-only.png"
    ],
    "tags": [
      "Proper Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-proper-labs-advanced-pct-stack",
    "name": "Advanced PCT Stack – Proper Labs",
    "slug": "proper-labs-advanced-pct-stack",
    "sku": "PROPER-LABS-PROPER-LABS-ADV",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": "Buy Advanced PCT Stack – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Advanced PCT Stack – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/proper-labs-advanced-pct-stack.png"
    ],
    "tags": [
      "Proper Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-eq-tren-400mg-pharmaqo-labs",
    "name": "EQ Tren 400MG – Pharmaqo Labs",
    "slug": "eq-tren-400mg-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-EQ-TREN-400MG-P",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": "Buy EQ Tren 400MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "EQ Tren 400MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/eq-tren-400mg-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-xxx-tabs-pharmaqo-labs-60-tabs-x-99mg",
    "name": "Xxx Tabs Pharmaqo Labs 60 Tabs X 99MG – Pharmaqo Labs",
    "slug": "xxx-tabs-pharmaqo-labs-60-tabs-x-99mg",
    "sku": "PHARMAQO-LABS-XXX-TABS-PHARMA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": "Buy Xxx Tabs Pharmaqo Labs 60 Tabs X 99MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Xxx Tabs Pharmaqo Labs 60 Tabs X 99MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/xxx-tabs-pharmaqo-labs-60-tabs-x-99mg.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pct-pharmaqo-labs",
    "name": "PCT – Pharmaqo Labs",
    "slug": "pct-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-PCT-PHARMAQO-LA",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": "Buy PCT – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "PCT – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pct-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pct-tablets-proper-labs-60tabs-102-5mg",
    "name": "PCT Tablets Proper Labs 60TABS 102 5MG – Proper Labs",
    "slug": "pct-tablets-proper-labs-60tabs-102-5mg",
    "sku": "PROPER-LABS-PCT-TABLETS-PRO",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": "Buy PCT Tablets Proper Labs 60TABS 102 5MG – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "PCT Tablets Proper Labs 60TABS 102 5MG – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/pct-tablets-proper-labs-60tabs-102-5mg.webp"
    ],
    "tags": [
      "Proper Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-primobol-5mg-100-tabs-pharmaqo-labs",
    "name": "Primobol 5MG 100 Tabs – Pharmaqo Labs",
    "slug": "primobol-5mg-100-tabs-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-PRIMOBOL-5MG-10",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": "Buy Primobol 5MG 100 Tabs – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Primobol 5MG 100 Tabs – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/primobol-5mg-100-tabs-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-trenbolone-a-100mg-pharmaqo-2",
    "name": "Trenbolone A 100MG Pharmaqo 2 – Pharmaqo Labs",
    "slug": "trenbolone-a-100mg-pharmaqo-2",
    "sku": "PHARMAQO-LABS-TRENBOLONE-A-10",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": "Buy Trenbolone A 100MG Pharmaqo 2 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Trenbolone A 100MG Pharmaqo 2 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/trenbolone-a-100mg-pharmaqo-2.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testosterone-e-300mg-pharmaqo-labs-amps",
    "name": "Testosterone E 300MG Pharmaqo Labs Amps – Pharmaqo Labs",
    "slug": "testosterone-e-300mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-TESTOSTERONE-E-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": "Buy Testosterone E 300MG Pharmaqo Labs Amps – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Testosterone E 300MG Pharmaqo Labs Amps – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/testosterone-e-300mg-pharmaqo-labs-amps.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-trenbolone-e-200mg-pharmaqo",
    "name": "Trenbolone E 200MG – Pharmaqo Labs",
    "slug": "trenbolone-e-200mg-pharmaqo",
    "sku": "PHARMAQO-LABS-TRENBOLONE-E-20",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": "Buy Trenbolone E 200MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Trenbolone E 200MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/trenbolone-e-200mg-pharmaqo.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-tamoxifen-proper-labs",
    "name": "Tamoxifen – Proper Labs",
    "slug": "tamoxifen-proper-labs",
    "sku": "PROPER-LABS-TAMOXIFEN-PROPE",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": "Buy Tamoxifen – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Tamoxifen – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/tamoxifen-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testosterone-enanthate-300mg-pharmaqo-labs-amps",
    "name": "Testosterone Enanthate 300MG Pharmaqo Labs Amps – Pharmaqo Labs",
    "slug": "testosterone-enanthate-300mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-TESTOSTERONE-EN",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": "Buy Testosterone Enanthate 300MG Pharmaqo Labs Amps – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Testosterone Enanthate 300MG Pharmaqo Labs Amps – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/testosterone-enanthate-300mg-pharmaqo-labs-amps.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-primobolan-proper-labs",
    "name": "Primobolan – Proper Labs",
    "slug": "primobolan-proper-labs",
    "sku": "PROPER-LABS-PRIMOBOLAN-PROP",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": "Buy Primobolan – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Primobolan – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/primobolan-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-ett-500-pharmaqo-labs",
    "name": "Ett 500 – Pharmaqo Labs",
    "slug": "ett-500-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-ETT-500-PHARMAQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": "Buy Ett 500 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Ett 500 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/ett-500-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testo-mix5-proper-labs",
    "name": "Testo MIX5 – Proper Labs",
    "slug": "testo-mix5-proper-labs",
    "sku": "PROPER-LABS-TESTO-MIX5-PROP",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "Buy Testo MIX5 – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Testo MIX5 – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/testo-mix5-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testosterone-c-200mg-pharmaqo-labs-amps",
    "name": "Testosterone C 200MG Pharmaqo Labs Amps – Pharmaqo Labs",
    "slug": "testosterone-c-200mg-pharmaqo-labs-amps",
    "sku": "PHARMAQO-LABS-TESTOSTERONE-C-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": "Buy Testosterone C 200MG Pharmaqo Labs Amps – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Testosterone C 200MG Pharmaqo Labs Amps – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/testosterone-c-200mg-pharmaqo-labs-amps.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-sustanon-250-proper-labs",
    "name": "Sustanon 250 – Proper Labs",
    "slug": "sustanon-250-proper-labs",
    "sku": "PROPER-LABS-SUSTANON-250-PR",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "Buy Sustanon 250 – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Sustanon 250 – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/sustanon-250-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-primobolan175-pharmaqo-labs",
    "name": "Primobolan Depot 175 – Pharmaqo Labs",
    "slug": "primobolan175-pharmaqo-labs",
    "sku": "1013-12",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/primobolan175-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-drostanolone-e-100mg-pharmaqo",
    "name": "Drostanolone E 100MG – Pharmaqo Labs",
    "slug": "drostanolone-e-100mg-pharmaqo",
    "sku": "PHARMAQO-LABS-DROSTANOLO-DROSTANOLONE-E-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": "Buy Drostanolone E 100MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Drostanolone E 100MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/drostanolone-e-100mg-pharmaqo.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-dianabolan-50-pharmaqo-labs",
    "name": "Dianabolan 50 – Pharmaqo Labs",
    "slug": "dianabolan-50-pharmaqo-labs",
    "sku": "55-1-1-2-2",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
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
      "/media/products/dianabolan-50-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testosterone-aq-50-pharmaqo-labs",
    "name": "Testosterone AQ 50 – Pharmaqo Labs",
    "slug": "testosterone-aq-50-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-TESTOSTERONE-AQ",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": "Buy Testosterone AQ 50 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Testosterone AQ 50 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/testosterone-aq-50-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-winstrol-inject100-pharmaqo-labs",
    "name": "Winstrol INJECT100 – Pharmaqo Labs",
    "slug": "winstrol-inject100-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-WINSTROL-INJECT",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": "Buy Winstrol INJECT100 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Winstrol INJECT100 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/winstrol-inject100-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-clomid-proper-labs",
    "name": "Clomid – Proper Labs",
    "slug": "clomid-proper-labs",
    "sku": "PROPER-LABS-CLOMID-PROPER-L",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": "Buy Clomid – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Clomid – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/clomid-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-ostarine-mk2866-pharmaqolabs",
    "name": "Ostarine MK2866 – Pharmaqo Labs",
    "slug": "ostarine-mk2866-pharmaqolabs",
    "sku": "PHARMAQO-LABS-OSTARINE-MK2866",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": "Buy Ostarine MK2866 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Ostarine MK2866 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/ostarine-mk2866-pharmaqolabs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-pharmaqolabs-gw501516",
    "name": "GW501516 – Pharmaqo Labs",
    "slug": "pharmaqolabs-gw501516",
    "sku": "PHARMAQO-LABS-PHARMAQOLABS-GW",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": "Buy GW501516 – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "GW501516 – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/pharmaqolabs-gw501516.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-caber-proper-labs1",
    "name": "Caber Proper LABS1 – Proper Labs",
    "slug": "caber-proper-labs1",
    "sku": "PROPER-LABS-CABER-PROPER-LA",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": "Buy Caber Proper LABS1 – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Caber Proper LABS1 – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/caber-proper-labs1.webp"
    ],
    "tags": [
      "Proper Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-power-proper20-labs",
    "name": "Power PROPER20 Labs – Proper Labs",
    "slug": "power-proper20-labs",
    "sku": "PROPER-LABS-POWER-PROPER20-",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": "Buy Power PROPER20 Labs – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Power PROPER20 Labs – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/power-proper20-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-qomatropin-12mg-36iu-cartridge-pharmaqo-labs",
    "name": "Qomatropin 12MG 36IU Cartridge – Pharmaqo Labs",
    "slug": "qomatropin-12mg-36iu-cartridge-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-QOMATROPIN-12MG",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-hgh",
    "categoryName": "HGH",
    "categorySlug": "hgh",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": "HGH injections catalogue listing — Qomatropin 12mg/36IU Pharmaqo with tracked UK delivery.",
    "description": "HGH injections listing under the HGH category from Pharmaqo Labs. Educational only.",
    "seoTitle": "HGH Injections – Qomatropin | Steroids UK",
    "seoDescription": "HGH injections — Qomatropin cartridge by Pharmaqo Labs at Steroids UK with GBP pricing and UK dispatch.",
    "images": [
      "/media/products/qomatropin-12mg-36iu-cartridge-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "HGH"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-power-proper20-labs-small",
    "name": "Power PROPER20 Labs – Proper Labs",
    "slug": "power-proper20-labs-small",
    "sku": "PROPER-LABS-POWER-PROPER-POWER-PROPER20-",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": "Buy Power PROPER20 Labs – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Power PROPER20 Labs – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/power-proper20-labs-small.webp"
    ],
    "tags": [
      "Proper Labs",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-mt-2-melanotan-10mg-pharmaqo-labs",
    "name": "MT 2 Melanotan 10MG – Pharmaqo Labs",
    "slug": "mt-2-melanotan-10mg-pharmaqo-labs",
    "sku": "PHARMAQO-LABS-MT-2-MELANOTAN-",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "Buy MT 2 Melanotan 10MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "MT 2 Melanotan 10MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/mt-2-melanotan-10mg-pharmaqo-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-masteron-propionate-proper-labs",
    "name": "Masteron Propionate – Proper Labs",
    "slug": "masteron-propionate-proper-labs",
    "sku": "PROPER-LABS-MASTERON-PROPIO",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": "Buy Masteron Propionate – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Masteron Propionate – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/masteron-propionate-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-masteron-enanthate-proper-labs",
    "name": "Masteron Enanthate – Proper Labs",
    "slug": "masteron-enanthate-proper-labs",
    "sku": "PROPER-LABS-MASTERON-ENANTH",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": "Buy Masteron Enanthate – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Masteron Enanthate – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/masteron-enanthate-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-tb-500-pharmaqo-labs-10mg",
    "name": "TB 500 Pharmaqo Labs 10MG – Pharmaqo Labs",
    "slug": "tb-500-pharmaqo-labs-10mg",
    "sku": "PHARMAQO-LABS-TB-500-PHARMAQO",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": "Buy TB 500 Pharmaqo Labs 10MG – Pharmaqo Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "TB 500 Pharmaqo Labs 10MG – Pharmaqo Labs. Lab-tested product.",
    "images": [
      "/media/products/tb-500-pharmaqo-labs-10mg.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-turinabol-proper-labs",
    "name": "Turinabol – Proper Labs",
    "slug": "turinabol-proper-labs",
    "sku": "PROPER-LABS-TURINABOL-PROPE",
    "brandId": "brand-proper-labs",
    "brandName": "Proper Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": "Buy Turinabol – Proper Labs in the UK. Lab-tested product with tracked delivery.",
    "description": "Turinabol – Proper Labs. Lab-tested product.",
    "images": [
      "/media/products/turinabol-proper-labs.webp"
    ],
    "tags": [
      "Proper Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-deca-300-nandrolone-decanoate-syncom-labs",
    "name": "Deca 300 – Nandrolone Decanoate | Syncom Labs",
    "slug": "deca-300-nandrolone-decanoate-syncom-labs",
    "sku": "SYNCOM-DECA300",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 54.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": "Deca steroid — nandrolone decanoate 300 for UK catalogue buyers seeking Deca Durabolin-class listings.",
    "description": "Deca steroid listing for nandrolone decanoate. Compare injectables or boldenone undecylenate. Educational only.",
    "seoTitle": "Deca Steroid 300 – Nandrolone | Steroids UK",
    "seoDescription": "Deca steroid (nandrolone decanoate) Syncom Labs at Steroids UK. Lab-tested injectable with GBP pricing.",
    "images": [
      "/media/products/deca-300-nandrolone-decanoate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-hcg-eutrig-hp",
    "name": "HCG EUTRIG-HP 5000 IU",
    "slug": "hcg-eutrig-hp",
    "sku": "62-1-1",
    "brandId": "brand-pharma-grade-manufacturers",
    "brandName": "Pharma Grade Manufacturers",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": "HCG, mimics LH to restore testicular function during or after a cycle.",
    "description": "HCG, mimics LH to restore testicular function during or after a cycle.",
    "images": [
      "/media/products/hcg-eutrig-hp.webp"
    ],
    "tags": [
      "Pharma Grade Manufacturers",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-needles-syringes",
    "name": "Needles & Syringes x10",
    "slug": "needles-syringes",
    "sku": "301",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": "Sterile needles and syringes for accurate dosing and injection.",
    "description": "Sterile needles and syringes for accurate dosing and injection.",
    "images": [
      "/media/products/needles-syringes.webp"
    ],
    "tags": [
      "Other",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-npp-nandrolone-phenylpropionate-100mg-beligas-pharmaceuticals",
    "name": "NPP Nandrolone Phenylpropionate 100mg – Beligas Pharmaceuticals",
    "slug": "npp-nandrolone-phenylpropionate-100mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-NPP100",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 33.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": "Nandrolone Phenylpropionate (NPP), a fast-acting 19-nor for mass with quicker clearance than Deca.",
    "description": "Nandrolone Phenylpropionate (NPP), a fast-acting 19-nor for mass with quicker clearance than Deca.",
    "images": [
      "/media/products/npp-nandrolone-phenylpropionate-100mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-sustanon-300-testosterone-mix-syncom-labs",
    "name": "Sustanon 300 – Testosterone MIX | Syncom Labs",
    "slug": "sustanon-300-testosterone-mix-syncom-labs",
    "sku": "SYNCOM-SUSTA300",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": "Sustanon 300 contain:\nTestosterone propionate 36 mg/ml,\nTestosterone Phenylpropionate 72 mg/ml,\nTestosterone Isocaproate 72 mg/ml,\nTestosterone Decanoate 120 mg/ml",
    "description": "Sustanon 300 contain:\nTestosterone propionate 36 mg/ml,\nTestosterone Phenylpropionate 72 mg/ml,\nTestosterone Isocaproate 72 mg/ml,\nTestosterone Decanoate 120 mg/ml",
    "images": [
      "/media/products/sustanon-300-testosterone-mix-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testosterone-enanthate-ultima-enan-250mg-10ml",
    "name": "Testosterone Enanthate – Ultima-Enan 250mg/10ml",
    "slug": "testosterone-enanthate-ultima-enan-250mg-10ml",
    "sku": "ULTIMA-ENAN250",
    "brandId": "brand-ultima-pharmaceuticals",
    "brandName": "Ultima Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 38.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": "Testosterone Enanthate, a long-acting ester for steady mass and strength.",
    "description": "Testosterone Enanthate, a long-acting ester for steady mass and strength.",
    "images": [
      "/media/products/testosterone-enanthate-ultima-enan-250mg-10ml.webp"
    ],
    "tags": [
      "Ultima Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-npp-100-nandrolone-phenylpropionate-syncom-labs",
    "name": "NPP 100 – Nandrolone Phenylpropionate | Syncom Labs",
    "slug": "npp-100-nandrolone-phenylpropionate-syncom-labs",
    "sku": "SYNCOM-NPP100",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": "Nandrolone Phenylpropionate (NPP), a fast-acting 19-nor for mass with quicker clearance than Deca.",
    "description": "Nandrolone Phenylpropionate (NPP), a fast-acting 19-nor for mass with quicker clearance than Deca.",
    "images": [
      "/media/products/npp-100-nandrolone-phenylpropionate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-viogen-primobolan",
    "name": "Viogen Primobolan Enanthate 150",
    "slug": "viogen-primobolan",
    "sku": "VIOGEN-PRIMOBOLAN",
    "brandId": "brand-viogen-pharmaceuticals",
    "brandName": "Viogen Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 65.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": "Viogen Pharmaceuticals Primobolan Enanthate 150",
    "description": "Viogen Pharmaceuticals Primobolan Enanthate 150",
    "images": [
      "/media/products/viogen-primobolan.png"
    ],
    "tags": [
      "Viogen Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testosterone-propionate-100mg-beligas-pharmaceuticals",
    "name": "Testosterone Propionate 100mg – Beligas Pharmaceuticals",
    "slug": "testosterone-propionate-100mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-TESTP-100",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": "Testosterone Propionate, a fast-acting ester with quick onset and clearance.",
    "description": "Testosterone Propionate, a fast-acting ester with quick onset and clearance.",
    "images": [
      "/media/products/testosterone-propionate-100mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testo-enan-300-testosterone-enanthate-syncom-labs",
    "name": "Testo Enan 300 – Testosterone Enanthate | Syncom Labs",
    "slug": "testo-enan-300-testosterone-enanthate-syncom-labs",
    "sku": "SYNCOM-TESTE300",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 42.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": "Testosterone Enanthate, a long-acting ester for steady mass and strength.",
    "description": "Testosterone Enanthate, a long-acting ester for steady mass and strength.",
    "images": [
      "/media/products/testo-enan-300-testosterone-enanthate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-primo-ena-200-methenolone-enanthate-syncom-labs",
    "name": "Primo Ena 200 – Methenolone Enanthate | Syncom Labs",
    "slug": "primo-ena-200-methenolone-enanthate-syncom-labs",
    "sku": "SYNCOM-PRIMO200",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 109.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "Methenolone Enanthate, a long-acting injectable for lean mass and muscle retention.",
    "description": "Methenolone Enanthate, a long-acting injectable for lean mass and muscle retention.",
    "images": [
      "/media/products/primo-ena-200-methenolone-enanthate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-boldenone-undecylenate-ultima-bold-250mg",
    "name": "Boldenone Undecylenate – Ultima-Bold 250mg",
    "slug": "boldenone-undecylenate-ultima-bold-250mg",
    "sku": "ULTI-BOLD-250",
    "brandId": "brand-ultima-pharmaceuticals",
    "brandName": "Ultima Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 34.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": "Boldenone Undecylenate (Equipoise), a long-acting ester for steady lean mass.",
    "description": "Boldenone Undecylenate (Equipoise), a long-acting ester for steady lean mass.",
    "images": [
      "/media/products/boldenone-undecylenate-ultima-bold-250mg.webp"
    ],
    "tags": [
      "Ultima Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-bolden-cyp-200-boldenone-cypionate-syncom-labs",
    "name": "Bolden Cyp 200 – Boldenone Cypionate | Syncom Labs",
    "slug": "bolden-cyp-200-boldenone-cypionate-syncom-labs",
    "sku": "SYNCOM-BOLDCYP200",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 51.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "Boldenone Cypionate, a slow-acting ester of boldenone for steady lean gains.",
    "description": "Boldenone Cypionate, a slow-acting ester of boldenone for steady lean gains.",
    "images": [
      "/media/products/bolden-cyp-200-boldenone-cypionate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-drosta-prop-100-drostanolone-propionate-syncom-labs",
    "name": "Drosta Prop 100 – Drostanolone Propionate | Syncom Labs",
    "slug": "drosta-prop-100-drostanolone-propionate-syncom-labs",
    "sku": "SYNCOM-DROSTPROP100",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 47.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "Drostanolone Propionate, a fast-acting cutting ester for hardness and vascularity.",
    "description": "Drostanolone Propionate, a fast-acting cutting ester for hardness and vascularity.",
    "images": [
      "/media/products/drosta-prop-100-drostanolone-propionate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-tren-ace-100-trenbolone-acetate-syncom-labs",
    "name": "Tren Ace 100 – Trenbolone Acetate | Syncom Labs",
    "slug": "tren-ace-100-trenbolone-acetate-syncom-labs",
    "sku": "SYNCOM-TRENACE100",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": "Trenbolone Acetate, a fast-acting 19-nor for hard mass and strength.",
    "description": "Trenbolone Acetate, a fast-acting 19-nor for hard mass and strength.",
    "images": [
      "/media/products/tren-ace-100-trenbolone-acetate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-ment-tresto-ena-200-trestolone-enanthate-syncom-labs",
    "name": "MENT Tresto Ena 200 – Trestolone Enanthate | Syncom Labs",
    "slug": "ment-tresto-ena-200-trestolone-enanthate-syncom-labs",
    "sku": "SYNCOM-MENTE200",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 149.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": "Trestolone Enanthate (MENT), a long-acting 19-nor androgen for mass.",
    "description": "Trestolone Enanthate (MENT), a long-acting 19-nor androgen for mass.",
    "images": [
      "/media/products/ment-tresto-ena-200-trestolone-enanthate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-trenbolone-enanthate-200mg-beligas-pharmaceuticals",
    "name": "Trenbolone Enanthate 200mg – Beligas Pharmaceuticals",
    "slug": "trenbolone-enanthate-200mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-TRENE-200",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": "Trenbolone Enanthate, a long-acting 19-nor for lean mass and strength.",
    "description": "Trenbolone Enanthate, a long-acting 19-nor for lean mass and strength.",
    "images": [
      "/media/products/trenbolone-enanthate-200mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-masteron-propionate-100mg-beligas-pharmaceuticals",
    "name": "Masteron Propionate 100mg – Beligas Pharmaceuticals",
    "slug": "masteron-propionate-100mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-MASTP-100",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": "Drostanolone Propionate, a fast-acting ester for cutting hardness and vascularity.",
    "description": "Drostanolone Propionate, a fast-acting ester for cutting hardness and vascularity.",
    "images": [
      "/media/products/masteron-propionate-100mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-boldenone-undecylenate-bolden-u-300-syncom-labs",
    "name": "Bolden U 300 – Boldenone Undecylenate | Syncom Labs",
    "slug": "boldenone-undecylenate-bolden-u-300-syncom-labs",
    "sku": "SYNCOM-BOLD300",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 41.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": "Boldenone Undecylenate (Equipoise), a long-acting ester for slow quality gains.",
    "description": "Boldenone Undecylenate (Equipoise), a long-acting ester for slow quality gains.",
    "images": [
      "/media/products/boldenone-undecylenate-bolden-u-300-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testosterone-cypionate-200-beligas-pharmaceuticals",
    "name": "Testosterone Cypionate 200 – Beligas Pharmaceuticals",
    "slug": "testosterone-cypionate-200-beligas-pharmaceuticals",
    "sku": "BELIGAS-TESTC-200",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 37.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": "Testosterone Cypionate, a long-acting ester for steady mass and strength.",
    "description": "Testosterone Cypionate, a long-acting ester for steady mass and strength.",
    "images": [
      "/media/products/testosterone-cypionate-200-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-deca-durabolin-300mg-beligas-pharmaceuticals",
    "name": "Deca Durabolin 300mg – Beligas Pharmaceuticals",
    "slug": "deca-durabolin-300mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-DEC-300",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": "Nandrolone Decanoate, a long-acting 19-nor for steady mass and joint comfort.",
    "description": "Nandrolone Decanoate, a long-acting 19-nor for steady mass and joint comfort.",
    "images": [
      "/media/products/deca-durabolin-300mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-drosta-ena-200-drostanolone-enanthate-syncom-labs",
    "name": "Drosta Ena 200 – Drostanolone Enanthate | Syncom Labs",
    "slug": "drosta-ena-200-drostanolone-enanthate-syncom-labs",
    "sku": "SYNCOM-DROSTE200",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 74.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": "Drostanolone Enanthate, a long-acting cutting ester for hardness and vascularity.",
    "description": "Drostanolone Enanthate, a long-acting cutting ester for hardness and vascularity.",
    "images": [
      "/media/products/drosta-ena-200-drostanolone-enanthate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testo-cyp-200-testosterone-cypionate-syncom-labs",
    "name": "Testo Cyp 200 – Testosterone Cypionate | Syncom Labs",
    "slug": "testo-cyp-200-testosterone-cypionate-syncom-labs",
    "sku": "SYNCOM-TESTCYP200",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": "Testosterone Cypionate, a long-acting ester for steady mass and strength.",
    "description": "Testosterone Cypionate, a long-acting ester for steady mass and strength.",
    "images": [
      "/media/products/testo-cyp-200-testosterone-cypionate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-tri-tren-150-trenbolone-mix-syncom-labs",
    "name": "Tri Tren 150 – Trenbolone Mix | Syncom Labs",
    "slug": "tri-tren-150-trenbolone-mix-syncom-labs",
    "sku": "SYNCOM-TRITREN",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 72.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": "Syncom Tri-Trenbolone contain:\nTrenbolone Enanthate 50 Mg/ml,\nTrenbolone Acetate 50 Mg/ml,\nTrenbolone Hexyhydrobenzylcarbonate 50 Mg/ml",
    "description": "Syncom Tri-Trenbolone contain:\nTrenbolone Enanthate 50 Mg/ml,\nTrenbolone Acetate 50 Mg/ml,\nTrenbolone Hexyhydrobenzylcarbonate 50 Mg/ml",
    "images": [
      "/media/products/tri-tren-150-trenbolone-mix-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-sustanon-250-beligas-pharmaceuticals",
    "name": "Sustanon 250 – Beligas Pharmaceuticals",
    "slug": "sustanon-250-beligas-pharmaceuticals",
    "sku": "BELIGAS-SUSTE250",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 34.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": "Sustanon 250 contain:\nTestosterone propionate: 30 mg/ml,\nTestosterone phenylpropionate: 60 mg/ml,\nTestosterone isocaproate: 60 mg/ml,\nTestosterone decanoate: 100 mg/ml",
    "description": "Sustanon 250 contain:\nTestosterone propionate: 30 mg/ml,\nTestosterone phenylpropionate: 60 mg/ml,\nTestosterone isocaproate: 60 mg/ml,\nTestosterone decanoate: 100 mg/ml",
    "images": [
      "/media/products/sustanon-250-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-water-injections-5ml",
    "name": "Water for injections [Amp/5ml]",
    "slug": "water-injections-5ml",
    "sku": "301-1-1-1",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 1.5,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "Sterile water for injection ampoules for reconstituting and diluting compounds.",
    "description": "Sterile water for injection ampoules for reconstituting and diluting compounds.",
    "images": [
      "/media/products/water-injections-5ml.webp"
    ],
    "tags": [
      "Other",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-evotropin-100iu",
    "name": "Evotropin HGH 100iu – Evotech",
    "slug": "evotropin-100iu",
    "sku": "38-1-1",
    "brandId": "brand-pharma-grade-manufacturers",
    "brandName": "Pharma Grade Manufacturers",
    "categoryId": "cat-hgh",
    "categoryName": "HGH",
    "categorySlug": "hgh",
    "priceGbp": 197.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": "Somatropin (HGH), recombinant human growth hormone for recovery and body composition.",
    "description": "Somatropin (HGH), recombinant human growth hormone for recovery and body composition.",
    "images": [
      "/media/products/evotropin-100iu.webp"
    ],
    "tags": [
      "Pharma Grade Manufacturers",
      "HGH"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testosterone-propionate-150mg-beligas-pharmaceuticals",
    "name": "Testosterone Propionate 150mg – Beligas Pharmaceuticals",
    "slug": "testosterone-propionate-150mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-TESTP-150",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": "Testosterone Propionate, a fast-acting ester with quick onset and clearance.",
    "description": "Testosterone Propionate, a fast-acting ester with quick onset and clearance.",
    "images": [
      "/media/products/testosterone-propionate-150mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-equipoise-boldenone-300mg-beligas-pharmaceuticals",
    "name": "Equipoise-Boldenone 300mg – Beligas Pharmaceuticals",
    "slug": "equipoise-boldenone-300mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-EQ-300",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": "Boldenone Undecylenate (Equipoise), a long-acting ester for slow, lean mass gains.",
    "description": "Boldenone Undecylenate (Equipoise), a long-acting ester for slow, lean mass gains.",
    "images": [
      "/media/products/equipoise-boldenone-300mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testo-prop-100-testosterone-propionate-syncom-labs",
    "name": "Testo Prop 100 – Testosterone Propionate | Syncom Labs",
    "slug": "testo-prop-100-testosterone-propionate-syncom-labs",
    "sku": "SYNCOM-TESTPROP100",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": "Testosterone Propionate, a fast-acting ester with quick onset and clearance.",
    "description": "Testosterone Propionate, a fast-acting ester with quick onset and clearance.",
    "images": [
      "/media/products/testo-prop-100-testosterone-propionate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-beltropin-hgh-10x10iu-beligas-pharmaceuticals",
    "name": "Beltropin HGH (10x10iu) – Beligas Pharmaceuticals",
    "slug": "beltropin-hgh-10x10iu-beligas-pharmaceuticals",
    "sku": "BELIGAS-HGH-100iu",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-hgh",
    "categoryName": "HGH",
    "categorySlug": "hgh",
    "priceGbp": 199.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": "Somatropin (HGH), recombinant growth hormone for recovery, mass, and fat loss.",
    "description": "Somatropin (HGH), recombinant growth hormone for recovery, mass, and fat loss.",
    "images": [
      "/media/products/beltropin-hgh-10x10iu-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "HGH"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-viromone-100-testosterone-propionate-syncom-labs",
    "name": "Viromone 100 – Testosterone Propionate | Syncom Labs",
    "slug": "viromone-100-testosterone-propionate-syncom-labs",
    "sku": "SYNCOM-VIROMONE100",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": "Testosterone Propionate, a fast-acting ester with quick onset and clearance.",
    "description": "Testosterone Propionate, a fast-acting ester with quick onset and clearance.",
    "images": [
      "/media/products/viromone-100-testosterone-propionate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-dhb-100-dihydroboldenone-syncom-labs",
    "name": "DHB 100 – Dihydroboldenone | Syncom Labs",
    "slug": "dhb-100-dihydroboldenone-syncom-labs",
    "sku": "SYNCOM-DHB100",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 59.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": "Dihydroboldenone (1-Testosterone), a potent lean-mass compound for dry strength gains.",
    "description": "Dihydroboldenone (1-Testosterone), a potent lean-mass compound for dry strength gains.",
    "images": [
      "/media/products/dhb-100-dihydroboldenone-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testo-dec-300-testosterone-decanoate-syncom-labs",
    "name": "Testo Dec 300 – Testosterone Decanoate | Syncom Labs",
    "slug": "testo-dec-300-testosterone-decanoate-syncom-labs",
    "sku": "SYNCOM-TESTDEC300",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": "Testosterone Decanoate, a very long-acting ester for sustained release.",
    "description": "Testosterone Decanoate, a very long-acting ester for sustained release.",
    "images": [
      "/media/products/testo-dec-300-testosterone-decanoate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-primo-ace-100-methenolone-acetate-syncom-labs",
    "name": "Primo Ace 100 – Methenolone Acetate | Syncom Labs",
    "slug": "primo-ace-100-methenolone-acetate-syncom-labs",
    "sku": "SYNCOM-PRIMOE100",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 69.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": "Methenolone Acetate (Primobolan), a short-ester injectable mild compound for clean lean gains.",
    "description": "Methenolone Acetate (Primobolan), a short-ester injectable mild compound for clean lean gains.",
    "images": [
      "/media/products/primo-ace-100-methenolone-acetate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-tren-ena-200-trenbolone-enanthate-syncom-labs",
    "name": "Tren Ena 200 – Trenbolone Enanthate | Syncom Labs",
    "slug": "tren-ena-200-trenbolone-enanthate-syncom-labs",
    "sku": "SYNCOM-TRENAENAN200",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 54.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": "Trenbolone Enanthate, a long-acting 19-nor for lean mass and strength.",
    "description": "Trenbolone Enanthate, a long-acting 19-nor for lean mass and strength.",
    "images": [
      "/media/products/tren-ena-200-trenbolone-enanthate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-water-injections",
    "name": "Water for injections [Amp/2ml]",
    "slug": "water-injections",
    "sku": "301-1-1",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": "Sterile water for injection ampoules for reconstituting and diluting compounds.",
    "description": "Sterile water for injection ampoules for reconstituting and diluting compounds.",
    "images": [
      "/media/products/water-injections.webp"
    ],
    "tags": [
      "Other",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-etho-testosterone-enanthate-300mg-beligas-pharmaceuticals",
    "name": "Etho Testosterone Enanthate 300mg – Beligas Pharmaceuticals",
    "slug": "etho-testosterone-enanthate-300mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-ETHO300",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 42.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": "Testosterone Enanthate, a long-acting ester for steady mass and strength.",
    "description": "Testosterone Enanthate, a long-acting ester for steady mass and strength.",
    "images": [
      "/media/products/etho-testosterone-enanthate-300mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-primo-ena-100-primobolan-depot-syncom-labs",
    "name": "Primo Ena 100 – Primobolan Depot | Syncom Labs",
    "slug": "primo-ena-100-primobolan-depot-syncom-labs",
    "sku": "SYNCOM-PRIMOENA100",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 69.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": "Methenolone Enanthate (Primobolan Depot), a long-acting injectable for quality lean gains.",
    "description": "Methenolone Enanthate (Primobolan Depot), a long-acting injectable for quality lean gains.",
    "images": [
      "/media/products/primo-ena-100-primobolan-depot-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testo-phen-100-testosterone-phenlylpropionate-syncom-labs",
    "name": "Testo Phen 100 – Testosterone Phenlylpropionate | Syncom Labs",
    "slug": "testo-phen-100-testosterone-phenlylpropionate-syncom-labs",
    "sku": "SYNCOM-TESTPHEN100",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": "Testosterone Phenylpropionate, a fast-acting ester with quick onset and clearance.",
    "description": "Testosterone Phenylpropionate, a fast-acting ester with quick onset and clearance.",
    "images": [
      "/media/products/testo-phen-100-testosterone-phenlylpropionate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-testo-base-100-testosterone-base-syncom-labs",
    "name": "Testo Base 100 – Testosterone Base | Syncom Labs",
    "slug": "testo-base-100-testosterone-base-syncom-labs",
    "sku": "SYNCOM-TBASE100",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "Testosterone base, an unesterified fast-acting form with rapid onset and clearance.",
    "description": "Testosterone base, an unesterified fast-acting form with rapid onset and clearance.",
    "images": [
      "/media/products/testo-base-100-testosterone-base-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-tresto-ace-100-trestolone-acetate-syncom-labs",
    "name": "Tresto Ace 100 – Trestolone Acetate | Syncom Labs",
    "slug": "tresto-ace-100-trestolone-acetate-syncom-labs",
    "sku": "SYNCOM-TRESTA100",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-injectable",
    "categoryName": "Injectable",
    "categorySlug": "injectable",
    "priceGbp": 99.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": "Trestolone Acetate (MENT), a fast-acting 19-nor that is highly potent for mass and does not convert to DHT.",
    "description": "Trestolone Acetate (MENT), a fast-acting 19-nor that is highly potent for mass and does not convert to DHT.",
    "images": [
      "/media/products/tresto-ace-100-trestolone-acetate-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Injectable"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-qomatropin-100iu",
    "name": "Qomatropin HGH 100iu – Pharmaqo Labs",
    "slug": "qomatropin-100iu",
    "sku": "9191-02",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-hgh",
    "categoryName": "HGH",
    "categorySlug": "hgh",
    "priceGbp": 197.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "Somatropin (Human Growth Hormone), for recovery, body composition and tissue repair.",
    "description": "Somatropin (Human Growth Hormone), for recovery, body composition and tissue repair.",
    "images": [
      "/media/products/qomatropin-100iu.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "HGH"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-anapolon-oxymetholone-25mg-100tabs-syncom-labs",
    "name": "Anapolon – Oxymetholone [25mg/100tabs] | Syncom Labs",
    "slug": "anapolon-oxymetholone-25mg-100tabs-syncom-labs",
    "sku": "SYNCOM-ANAPOLON25",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "Oxymetholone (Anapolon), a potent oral for rapid mass and strength.",
    "description": "Oxymetholone (Anapolon), a potent oral for rapid mass and strength.",
    "images": [
      "/media/products/anapolon-oxymetholone-25mg-100tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-turinabol-t-bol-10mg-100tabs-syncom-labs",
    "name": "Turinabol T-bol [10mg/100tabs] | Syncom Labs",
    "slug": "turinabol-t-bol-10mg-100tabs-syncom-labs",
    "sku": "SYNCOM-TBOL-TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 64.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": "Turinabol, an oral steroid for lean dry gains without water retention.",
    "description": "Turinabol, an oral steroid for lean dry gains without water retention.",
    "images": [
      "/media/products/turinabol-t-bol-10mg-100tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-turinabol-sis-labs",
    "name": "Turinabol – Pharmaqo Labs [10mg/100tabs]",
    "slug": "turinabol-sis-labs",
    "sku": "44-1",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": "Turinabol, an oral steroid for lean dry gains without water retention.",
    "description": "Turinabol, an oral steroid for lean dry gains without water retention.",
    "images": [
      "/media/products/turinabol-sis-labs.webp"
    ],
    "tags": [
      "Pharmaqo Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-winstrol-stanozolol-100tabs-50mg-beligas-pharmaceuticals",
    "name": "Winstrol – Stanozolol (100tabs/50mg) – Beligas Pharmaceuticals",
    "slug": "winstrol-stanozolol-100tabs-50mg-beligas-pharmaceuticals",
    "sku": "ORA-STZ50-100T",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 99.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": "Stanozolol (Winstrol), a cutting-cycle oral known for hardness and dry strength.",
    "description": "Stanozolol (Winstrol), a cutting-cycle oral known for hardness and dry strength.",
    "images": [
      "/media/products/winstrol-stanozolol-100tabs-50mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-methandienone-dianabol-10mg-100tabs-syncom-labs",
    "name": "Methandienone – Dianabol [10mg/100tabs] | Syncom Labs",
    "slug": "methandienone-dianabol-10mg-100tabs-syncom-labs",
    "sku": "SYNCOM-DIANABOl10TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 34.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": "Methandienone (Dianabol), the classic oral for rapid bulk and strength.",
    "description": "Methandienone (Dianabol), the classic oral for rapid bulk and strength.",
    "images": [
      "/media/products/methandienone-dianabol-10mg-100tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-tudca-180mg-100caps-syncom-labs",
    "name": "TUDCA [180mg/100caps] | Syncom Labs",
    "slug": "tudca-180mg-100caps-syncom-labs",
    "sku": "Syncom-TUDCA",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": "TUDCA, a bile acid supplement for liver support during oral cycles.",
    "description": "TUDCA, a bile acid supplement for liver support during oral cycles.",
    "images": [
      "/media/products/tudca-180mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-stenabolic-sr-9009",
    "name": "Stenabolic SR-9009 | 60caps / 10mg",
    "slug": "stenabolic-sr-9009",
    "sku": "8989-01",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 55.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": "SR-9009 (Stenabolic), a REV-ERB agonist for endurance and fat metabolism.",
    "description": "SR-9009 (Stenabolic), a REV-ERB agonist for endurance and fat metabolism.",
    "images": [
      "/media/products/stenabolic-sr-9009.webp"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-clenbuterol-spiropent-40mcg-100tabs-syncom-labs",
    "name": "Clenbuterol – Spiropent [40mcg/100tabs] | Syncom Labs",
    "slug": "clenbuterol-spiropent-40mcg-100tabs-syncom-labs",
    "sku": "SYNCOM-SPIROPENT-TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": "Clenbuterol, a beta-2 agonist used as a thermogenic for fat loss.",
    "description": "Clenbuterol, a beta-2 agonist used as a thermogenic for fat loss.",
    "images": [
      "/media/products/clenbuterol-spiropent-40mcg-100tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-stanozolol-winstrol-10mg-100tabs-syncom-labs",
    "name": "Stanozolol – Winstrol [10mg/100tabs] | Syncom Labs",
    "slug": "stanozolol-winstrol-10mg-100tabs-syncom-labs",
    "sku": "SYNCOM-WIN10-TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": "Stanozolol (Winstrol), the cutting standard for hardness and dry strength.",
    "description": "Stanozolol (Winstrol), the cutting standard for hardness and dry strength.",
    "images": [
      "/media/products/stanozolol-winstrol-10mg-100tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-winstrol-lite-stanozolol-100tabs-10mg-beligas-pharmaceuticals",
    "name": "Winstrol Lite – Stanozolol (100tabs/10mg) – Beligas Pharmaceuticals",
    "slug": "winstrol-lite-stanozolol-100tabs-10mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-WIN-LITE10",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": "Stanozolol, the oral cutting standard for hardness and dry strength.",
    "description": "Stanozolol, the oral cutting standard for hardness and dry strength.",
    "images": [
      "/media/products/winstrol-lite-stanozolol-100tabs-10mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-superdrol-methasterone-20mg-100caps-syncom-labs",
    "name": "Superdrol – Methasterone [20mg/100caps] | Syncom Labs",
    "slug": "superdrol-methasterone-20mg-100caps-syncom-labs",
    "sku": "SYNCOM-SUPERDROL",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 99.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": "Methasterone (Superdrol), a strong oral for fast lean gains and hardness.",
    "description": "Methasterone (Superdrol), a strong oral for fast lean gains and hardness.",
    "images": [
      "/media/products/superdrol-methasterone-20mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-cardarine-gw501516",
    "name": "Cardarine GW501516 60 caps / 10 mg",
    "slug": "cardarine-gw501516",
    "sku": "8989-08",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 40.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": "GW-501516 (Cardarine), a PPAR agonist used for endurance and fat loss.",
    "description": "GW-501516 (Cardarine), a PPAR agonist used for endurance and fat loss.",
    "images": [
      "/media/products/cardarine-gw501516.webp"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-jack3d-dmaa-20mg-100caps-syncom-labs",
    "name": "Jack3d DMAA [20mg/100caps] | Syncom Labs",
    "slug": "jack3d-dmaa-20mg-100caps-syncom-labs",
    "sku": "SYNCOM-DMAA",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "DMAA, a potent stimulant pre-workout for energy and focus.",
    "description": "DMAA, a potent stimulant pre-workout for energy and focus.",
    "images": [
      "/media/products/jack3d-dmaa-20mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-ultima-oxa-anavar-10mg-50tabs",
    "name": "Ultima-Oxa Anavar 10mg/50tabs",
    "slug": "ultima-oxa-anavar-10mg-50tabs",
    "sku": "ULTI-OXA-10mg",
    "brandId": "brand-ultima-pharmaceuticals",
    "brandName": "Ultima Pharmaceuticals",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 34.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": "Oxandrolone (Anavar), a mild oral steroid for lean cutting and strength.",
    "description": "Oxandrolone (Anavar), a mild oral steroid for lean cutting and strength.",
    "images": [
      "/media/products/ultima-oxa-anavar-10mg-50tabs.webp"
    ],
    "tags": [
      "Ultima Pharmaceuticals",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-synephrin-ephderine-50mg-100caps-syncom-labs",
    "name": "Synephrin – Ephedrine [50mg/100caps] | Syncom Labs",
    "slug": "synephrin-ephderine-50mg-100caps-syncom-labs",
    "sku": "SYNCOM-SYNEPHRIN50",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 99.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": "Ephedrine, a stimulant used for fat loss and energy.",
    "description": "Ephedrine, a stimulant used for fat loss and energy.",
    "images": [
      "/media/products/synephrin-ephderine-50mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-stanozolol-winstrol-10mg-100caps-syncom-labs",
    "name": "Stanozolol – Winstrol [10mg/100caps] | Syncom Labs",
    "slug": "stanozolol-winstrol-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-WINSTROL10CAP",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": "Stanozolol (Winstrol), the cutting standard for hardness and dry strength.",
    "description": "Stanozolol (Winstrol), the cutting standard for hardness and dry strength.",
    "images": [
      "/media/products/stanozolol-winstrol-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-mesterolone-proviron-25mg-50tabs-syncom-labs",
    "name": "Mesterolone – Proviron [25mg/50tabs] | Syncom Labs",
    "slug": "mesterolone-proviron-25mg-50tabs-syncom-labs",
    "sku": "SYNCOM-PROVI25TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": "Mesterolone (Proviron), an oral androgen for hardening and free-testosterone support.",
    "description": "Mesterolone (Proviron), an oral androgen for hardening and free-testosterone support.",
    "images": [
      "/media/products/mesterolone-proviron-25mg-50tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-yk11",
    "name": "YK11 | 60 caps / 10mg",
    "slug": "yk11",
    "sku": "8989-03",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 55.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": "YK11, a myostatin-modulating compound used for lean mass gains.",
    "description": "YK11, a myostatin-modulating compound used for lean mass gains.",
    "images": [
      "/media/products/yk11.webp"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-sliv52ds-himalaya",
    "name": "Liver Tablets – Liv.52 60Tab",
    "slug": "sliv52ds-himalaya",
    "sku": "37-1-2-1",
    "brandId": "brand-pharma-grade-manufacturers",
    "brandName": "Pharma Grade Manufacturers",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 7.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": "Liv.52, a herbal liver-support supplement used for hepatic protection.",
    "description": "Liv.52, a herbal liver-support supplement used for hepatic protection.",
    "images": [
      "/media/products/sliv52ds-himalaya.webp"
    ],
    "tags": [
      "Pharma Grade Manufacturers",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.621Z",
    "updatedAt": "2026-09-08T08:02:30.621Z"
  },
  {
    "id": "prod-tadalafil-cialis-20mg-20caps-syncom-labs",
    "name": "Tadalafil – Cialis [20mg/20caps] | Syncom Labs",
    "slug": "tadalafil-cialis-20mg-20caps-syncom-labs",
    "sku": "SYNCOM-CIALIS20CAPS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
    "priceGbp": 24.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": "Tadalafil (Cialis), a long-acting PDE5 inhibitor for erectile support.",
    "description": "Tadalafil (Cialis), a long-acting PDE5 inhibitor for erectile support.",
    "images": [
      "/media/products/tadalafil-cialis-20mg-20caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-dianabol-methandienone-100tabs-10mg-beligas-pharmaceutical",
    "name": "Dianabol – Methandienone (100tabs/10mg) – Beligas Pharmaceuticals",
    "slug": "dianabol-methandienone-100tabs-10mg-beligas-pharmaceutical",
    "sku": "ORA-MD10-100T",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 29.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": "Methandienone (Dianabol), an oral bulking classic for rapid mass and strength.",
    "description": "Methandienone (Dianabol), an oral bulking classic for rapid mass and strength.",
    "images": [
      "/media/products/dianabol-methandienone-100tabs-10mg-beligas-pharmaceutical.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-superdrol-17a-methyltestosterone-25mg-50tabs-syncom-labs",
    "name": "Superdrol – Methasterone [25mg/50tabs] | Syncom Labs",
    "slug": "superdrol-17a-methyltestosterone-25mg-50tabs-syncom-labs",
    "sku": "SYNCOM-SUPERDROL-TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": "Methasterone (Superdrol), a potent oral for rapid dry mass and strength.",
    "description": "Methasterone (Superdrol), a potent oral for rapid dry mass and strength.",
    "images": [
      "/media/products/superdrol-17a-methyltestosterone-25mg-50tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-anapolon-oxymetholone-50mg-50tabs-syncom-labs",
    "name": "Anapolon – Oxymetholone [50mg/50tabs] | Syncom Labs",
    "slug": "anapolon-oxymetholone-50mg-50tabs-syncom-labs",
    "sku": "SYNCOM-ANAPOLON50TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": "Oxymetholone (Anapolon), a potent oral for rapid mass and strength.",
    "description": "Oxymetholone (Anapolon), a potent oral for rapid mass and strength.",
    "images": [
      "/media/products/anapolon-oxymetholone-50mg-50tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-levitra-verdanafil-20mg-20caps-syncom-labs",
    "name": "Levitra – Vardenafil [20mg/20caps] | Syncom Labs",
    "slug": "levitra-verdanafil-20mg-20caps-syncom-labs",
    "sku": "SYNCOM-LEVITRA20",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
    "priceGbp": 24.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": "Vardenafil, a PDE5 inhibitor for erectile support.",
    "description": "Vardenafil, a PDE5 inhibitor for erectile support.",
    "images": [
      "/media/products/levitra-verdanafil-20mg-20caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-anavar-lite-oxandrolone-10mg-100tabs-beligas-pharmaceuticals",
    "name": "Anavar Lite – Oxandrolone (10mg/100tabs) – Beligas Pharmaceuticals",
    "slug": "anavar-lite-oxandrolone-10mg-100tabs-beligas-pharmaceuticals",
    "sku": "BELIGAS-VAR-LITE10",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": "Oxandrolone (Anavar), a mild oral for lean gains and dry strength.",
    "description": "Oxandrolone (Anavar), a mild oral for lean gains and dry strength.",
    "images": [
      "/media/products/anavar-lite-oxandrolone-10mg-100tabs-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-s-23",
    "name": "S-23 | 60caps / 15mg",
    "slug": "s-23",
    "sku": "8989-02",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 50.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": "S-23, a potent oral SARM for lean mass and hardness.",
    "description": "S-23, a potent oral SARM for lean mass and hardness.",
    "images": [
      "/media/products/s-23.webp"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-shopkamagra-jelly",
    "name": "Kamagra Oral Jelly 100mg",
    "slug": "shopkamagra-jelly",
    "sku": "368",
    "brandId": "brand-ajanta-pharma",
    "brandName": "Ajanta Pharma",
    "categoryId": "cat-kamagra",
    "categoryName": "Kamagra",
    "categorySlug": "kamagra",
    "priceGbp": 19.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": "Kamagra jelly 100mg (Kamagra oral jelly UK) — adult catalogue listing with GBP pricing.",
    "description": "Kamagra oral jelly where to buy: Kamagra 100mg jelly in our Kamagra UK category. Adults only — not medical advice.",
    "seoTitle": "Kamagra Jelly 100mg UK | Steroids UK",
    "seoDescription": "Kamagra oral jelly 100mg UK — Kamagra jelly where to buy at Steroids UK with discreet tracked dispatch.",
    "images": [
      "/media/products/shopkamagra-jelly.webp"
    ],
    "tags": [
      "Ajanta Pharma",
      "Kamagra"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-kamagra-effervescent-tab",
    "name": "Kamagra Effervescent – 7 tabs/box",
    "slug": "kamagra-effervescent-tab",
    "sku": "368-1",
    "brandId": "brand-ajanta-pharma",
    "brandName": "Ajanta Pharma",
    "categoryId": "cat-kamagra",
    "categoryName": "Kamagra",
    "categorySlug": "kamagra",
    "priceGbp": 19.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "Sildenafil, a PDE5 inhibitor in effervescent tablets for erectile support.",
    "description": "Sildenafil, a PDE5 inhibitor in effervescent tablets for erectile support.",
    "images": [
      "/media/products/kamagra-effervescent-tab.webp"
    ],
    "tags": [
      "Ajanta Pharma",
      "Kamagra"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-anavar-oxandrolon-10mg-100caps-syncom-labs",
    "name": "Anavar Oxandrolon [10mg/100caps] | Syncom Labs",
    "slug": "anavar-oxandrolon-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-OXA10CAPS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 59.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": "Oxandrolone (Anavar), a mild oral for lean gains and cutting.",
    "description": "Oxandrolone (Anavar), a mild oral for lean gains and cutting.",
    "images": [
      "/media/products/anavar-oxandrolon-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-turinabol-10mg-100tabs-beligas-pharmaceuticals",
    "name": "Turinabol 10mg/100tabs – Beligas Pharmaceuticals",
    "slug": "turinabol-10mg-100tabs-beligas-pharmaceuticals",
    "sku": "BELIGAS-TBOL-10",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "Turinabol, an oral steroid for lean dry gains without water retention.",
    "description": "Turinabol, an oral steroid for lean dry gains without water retention.",
    "images": [
      "/media/products/turinabol-10mg-100tabs-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-oral-turinabol-10mg-100caps-syncom-labs",
    "name": "Oral Turinabol [10mg/100caps] | Syncom Labs",
    "slug": "oral-turinabol-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-TBOL10Caps",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 64.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "4-chlorodehydromethyltestosterone (Turinabol), an oral for steady dry gains without water retention.",
    "description": "4-chlorodehydromethyltestosterone (Turinabol), an oral for steady dry gains without water retention.",
    "images": [
      "/media/products/oral-turinabol-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-ibutamoren-mk677",
    "name": "Ibutamoren MK677 | 60caps / 10mg",
    "slug": "ibutamoren-mk677",
    "sku": "8989-06",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 55.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": "MK-677 (Ibutamoren), an oral growth hormone secretagogue for appetite and recovery.",
    "description": "MK-677 (Ibutamoren), an oral growth hormone secretagogue for appetite and recovery.",
    "images": [
      "/media/products/ibutamoren-mk677.webp"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-ligandrol-lgd4033-2",
    "name": "Ligandrol LGD4033 | 60 caps / 8mg",
    "slug": "ligandrol-lgd4033-2",
    "sku": "8989-07",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 40.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": "LGD-4033 (Ligandrol), a potent SARM for lean mass and strength.",
    "description": "LGD-4033 (Ligandrol), a potent SARM for lean mass and strength.",
    "images": [
      "/media/products/ligandrol-lgd4033-2.webp"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-methyltestosterone-25mg-100caps-syncom-labs",
    "name": "Methyltestosterone [25mg/100caps] | Syncom Labs",
    "slug": "methyltestosterone-25mg-100caps-syncom-labs",
    "sku": "SYNCOM-METHYLTEST25",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": "Methyltestosterone, an oral testosterone for strength and aggression.",
    "description": "Methyltestosterone, an oral testosterone for strength and aggression.",
    "images": [
      "/media/products/methyltestosterone-25mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-andarine-s4",
    "name": "Andarine S4 | 60caps /15mg",
    "slug": "andarine-s4",
    "sku": "8989-04",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 35.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": "Andarine (S4), a SARM for cutting and lean muscle retention.",
    "description": "Andarine (S4), a SARM for cutting and lean muscle retention.",
    "images": [
      "/media/products/andarine-s4.webp"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-dapoxetine-hcl-60mg-20caps-syncom-labs",
    "name": "Dapoxetine HCL [60mg/20caps] | Syncom Labs",
    "slug": "dapoxetine-hcl-60mg-20caps-syncom-labs",
    "sku": "SYNCOM-DAPOX60CAPS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
    "priceGbp": 24.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": "Dapoxetine, a short-acting SSRI used for premature ejaculation.",
    "description": "Dapoxetine, a short-acting SSRI used for premature ejaculation.",
    "images": [
      "/media/products/dapoxetine-hcl-60mg-20caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-aromasin-exemestane-20mg-100caps-syncom-labs",
    "name": "Aromasin – Exemestane [20mg/100caps] | Syncom Labs",
    "slug": "aromasin-exemestane-20mg-100caps-syncom-labs",
    "sku": "SYNCOM-AROMASIN20CAPS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 79.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": "Exemestane (Aromasin), a suicidal aromatase inhibitor for estrogen control.",
    "description": "Exemestane (Aromasin), a suicidal aromatase inhibitor for estrogen control.",
    "images": [
      "/media/products/aromasin-exemestane-20mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-primo-ace-primobolan-caps-25mg-100caps-syncom-labs",
    "name": "Primo Ace – Primobolan Caps [25mg/100caps] | Syncom Labs",
    "slug": "primo-ace-primobolan-caps-25mg-100caps-syncom-labs",
    "sku": "SYNCOM-PRIMOCAPS-25",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 149.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": "Methenolone Acetate (Primobolan), an oral form for lean tissue and cutting.",
    "description": "Methenolone Acetate (Primobolan), an oral form for lean tissue and cutting.",
    "images": [
      "/media/products/primo-ace-primobolan-caps-25mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-tamoxifen-citrate-20mg-100caps-syncom-labs",
    "name": "Tamoxifen Citrate [20mg/100caps] | Syncom Labs",
    "slug": "tamoxifen-citrate-20mg-100caps-syncom-labs",
    "sku": "SYNCOM-TAMOX-CAPS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": "Tamoxifen, a SERM for post-cycle therapy and estrogen control.",
    "description": "Tamoxifen, a SERM for post-cycle therapy and estrogen control.",
    "images": [
      "/media/products/tamoxifen-citrate-20mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-winstrol-50-stanozolol-syncom-labs",
    "name": "Winstrol 50 – Stanozolol | Syncom Labs",
    "slug": "winstrol-50-stanozolol-syncom-labs",
    "sku": "SYNCOM-WINSTROL50",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": "Stanozolol, the cutting standard for hardness and dry strength.",
    "description": "Stanozolol, the cutting standard for hardness and dry strength.",
    "images": [
      "/media/products/winstrol-50-stanozolol-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-halotestin-fluoxymesterone-10mg-100caps-syncom-labs",
    "name": "Halotestin Fluoxymesterone [10mg/100caps] | Syncom Labs",
    "slug": "halotestin-fluoxymesterone-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-HALOTEST",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 99.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": "Fluoxymesterone (Halotestin), a powerful oral androgen for strength and aggression.",
    "description": "Fluoxymesterone (Halotestin), a powerful oral androgen for strength and aggression.",
    "images": [
      "/media/products/halotestin-fluoxymesterone-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-t4-thyroxin-100mcg-50tabs-syncom-labs",
    "name": "T4 – Thyroxin [100mcg/50tabs] | Syncom Labs",
    "slug": "t4-thyroxin-100mcg-50tabs-syncom-labs",
    "sku": "SYNCOM-T4-TABLETS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 24.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": "Levothyroxine (T4), a thyroid hormone supporting metabolic rate.",
    "description": "Levothyroxine (T4), a thyroid hormone supporting metabolic rate.",
    "images": [
      "/media/products/t4-thyroxin-100mcg-50tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-sibutramin-reductil-10mg-100tabs-syncom-labs",
    "name": "Sibutramin – Reductil [10mg/100tabs] | Syncom Labs",
    "slug": "sibutramin-reductil-10mg-100tabs-syncom-labs",
    "sku": "SYNCOM-REDUCTIL-TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 79.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "Sibutramine (Reductil), an appetite suppressant for weight loss.",
    "description": "Sibutramine (Reductil), an appetite suppressant for weight loss.",
    "images": [
      "/media/products/sibutramin-reductil-10mg-100tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-oxymetholone-anapolon-50mg-100caps-syncom-labs",
    "name": "Oxymetholone – Anapolon [50mg/100caps] | Syncom Labs",
    "slug": "oxymetholone-anapolon-50mg-100caps-syncom-labs",
    "sku": "SYNCOM-ANAPOLON50CAPS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 79.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": "Oxymetholone (Anapolon), a strong oral for fast bulk and power.",
    "description": "Oxymetholone (Anapolon), a strong oral for fast bulk and power.",
    "images": [
      "/media/products/oxymetholone-anapolon-50mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-roaccutan-isotretinoin-20mg-100caps-syncom-labs",
    "name": "Roaccutan – Isotretinoin [20mg/100caps] | Syncom Labs",
    "slug": "roaccutan-isotretinoin-20mg-100caps-syncom-labs",
    "sku": "SYNCOM-Roaccutan",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": "Isotretinoin (Roaccutane), an oral retinoid for severe acne.",
    "description": "Isotretinoin (Roaccutane), an oral retinoid for severe acne.",
    "images": [
      "/media/products/roaccutan-isotretinoin-20mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-exemestane-aromasin-20mg-100tabs-syncom-labs",
    "name": "Exemestane – Aromasin [20mg/100tabs] | Syncom Labs",
    "slug": "exemestane-aromasin-20mg-100tabs-syncom-labs",
    "sku": "SYNCOM-EXEMESTANE-TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 79.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": "Exemestane, a suicidal aromatase inhibitor for estrogen control.",
    "description": "Exemestane, a suicidal aromatase inhibitor for estrogen control.",
    "images": [
      "/media/products/exemestane-aromasin-20mg-100tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-ostarine-mk2866-60caps-15mg",
    "name": "Ostarine MK2866 | 60caps / 15mg",
    "slug": "ostarine-mk2866-60caps-15mg",
    "sku": "8989-09",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 36.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": "MK-2866 (Ostarine), a mild SARM for lean mass and recomposition.",
    "description": "MK-2866 (Ostarine), a mild SARM for lean mass and recomposition.",
    "images": [
      "/media/products/ostarine-mk2866-60caps-15mg.webp"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-clomid-clomifene-citrate-50mg-100caps-syncom-labs",
    "name": "Clomid – Clomifene Citrate [50mg/100caps] | Syncom Labs",
    "slug": "clomid-clomifene-citrate-50mg-100caps-syncom-labs",
    "sku": "SYNCOM-CLOMID50CAPS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 79.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": "Clomiphene Citrate, a SERM used in PCT to restore natural testosterone.",
    "description": "Clomiphene Citrate, a SERM used in PCT to restore natural testosterone.",
    "images": [
      "/media/products/clomid-clomifene-citrate-50mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-methyl-1-test-metribolone-10mg-100caps-syncom-labs",
    "name": "Methyl-1-Test – Methyl-1-Testosterone [10mg/100caps] | Syncom Labs",
    "slug": "methyl-1-test-metribolone-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-METHYL1",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": "Methyl-1-Testosterone (M1T), a potent oral androgen derived from 1-testosterone (DHB) for dry strength and lean mass.",
    "description": "Methyl-1-Testosterone (M1T), a potent oral androgen derived from 1-testosterone (DHB) for dry strength and lean mass.",
    "images": [
      "/media/products/methyl-1-test-metribolone-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-methandienone-dianabol-10mg-100caps-syncom-labs",
    "name": "Methandienone – Dianabol [10mg/100caps] | Syncom Labs",
    "slug": "methandienone-dianabol-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-DBOL10CAPS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 42.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": "Methandienone (Dianabol), the classic oral for rapid bulk and strength.",
    "description": "Methandienone (Dianabol), the classic oral for rapid bulk and strength.",
    "images": [
      "/media/products/methandienone-dianabol-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-testolone-rad",
    "name": "Testolone RAD 140 | 60 caps / 10mg",
    "slug": "testolone-rad",
    "sku": "8989-05",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 45.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": "RAD-140 (Testolone), a potent SARM for lean mass and strength.",
    "description": "RAD-140 (Testolone), a potent SARM for lean mass and strength.",
    "images": [
      "/media/products/testolone-rad.webp"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-oxandrolone-anavar-10mg-100tabs-syncom-labs",
    "name": "Oxandrolone – Anavar [10mg/100tabs] | Syncom Labs",
    "slug": "oxandrolone-anavar-10mg-100tabs-syncom-labs",
    "sku": "SYNCOM-OXA10-TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 59.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": "Oxandrolone (Anavar), a mild oral for lean strength and cutting.",
    "description": "Oxandrolone (Anavar), a mild oral for lean strength and cutting.",
    "images": [
      "/media/products/oxandrolone-anavar-10mg-100tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-anavar-oxandrolone-50mg-100tabs-beligas-pharmaceutical",
    "name": "Anavar – Oxandrolone (50mg/100tabs) – Beligas Pharmaceutical",
    "slug": "anavar-oxandrolone-50mg-100tabs-beligas-pharmaceutical",
    "sku": "ORA-OX50-100T",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-oral",
    "categoryName": "Oral",
    "categorySlug": "oral",
    "priceGbp": 79.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": "Oxandrolone (Anavar), a mild oral for lean strength and hardness.",
    "description": "Oxandrolone (Anavar), a mild oral for lean strength and hardness.",
    "images": [
      "/media/products/anavar-oxandrolone-50mg-100tabs-beligas-pharmaceutical.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Oral"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-sarms-advanced-hardness-stack",
    "name": "Pharmaqo SARMs Advanced Hardness Stack",
    "slug": "sarms-advanced-hardness-stack",
    "sku": "STACK-1784637312713",
    "brandId": "brand-pharmaqo-labs",
    "brandName": "Pharmaqo Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": "Core SARMs Duo Advanced hardness + metabolic cutting stack",
    "description": "Core SARMs Duo Advanced hardness + metabolic cutting stack",
    "images": [
      "/media/products/sarms-advanced-hardness-stack.png"
    ],
    "tags": [
      "Pharmaqo Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-viogen-ibutamoren-mk677",
    "name": "Ibutemoren MK677",
    "slug": "viogen-ibutamoren-mk677",
    "sku": "VIOGEN-IBUTAMOREN",
    "brandId": "brand-viogen-pharmaceuticals",
    "brandName": "Viogen Pharmaceuticals",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 68.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": "Viogen Pharmaceuticals MK677 Ibutamoren tablets",
    "description": "Viogen Pharmaceuticals MK677 Ibutamoren tablets",
    "images": [
      "/media/products/viogen-ibutamoren-mk677.png"
    ],
    "tags": [
      "Viogen Pharmaceuticals",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-viogen-cardarine-gw501516",
    "name": "Cardarine GW501516",
    "slug": "viogen-cardarine-gw501516",
    "sku": "VIOGEN-CARDARINE",
    "brandId": "brand-viogen-pharmaceuticals",
    "brandName": "Viogen Pharmaceuticals",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 61.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": "Viogen Pharmaceuticals Cardarine GW501516",
    "description": "Viogen Pharmaceuticals Cardarine GW501516",
    "images": [
      "/media/products/viogen-cardarine-gw501516.png"
    ],
    "tags": [
      "Viogen Pharmaceuticals",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-sarms-advanced-cutting-stack",
    "name": "Sarms Advanced Cutting Stack",
    "slug": "sarms-advanced-cutting-stack",
    "sku": "STACK-1784636163733",
    "brandId": "brand-steroids-uk",
    "brandName": "Steroids UK",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": "The hardest, driest, most aggressive SARMs cutting stack",
    "description": "The hardest, driest, most aggressive SARMs cutting stack",
    "images": [
      "/media/products/sarms-advanced-cutting-stack.png"
    ],
    "tags": [
      "Steroids UK",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-sarms",
    "name": "Sarms Cutting Stack",
    "slug": "sarms",
    "sku": "STACK-1784635719203",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "The classic beginner cutting / recomp stack",
    "description": "The classic beginner cutting / recomp stack",
    "images": [
      "/media/products/sarms.png"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-sarms-stack-advanced-bulking",
    "name": "Sarms Advanced Bulking Stack",
    "slug": "sarms-stack-advanced-bulking",
    "sku": "STACK-1784635365863",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 40.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": "The most aggressive and popular advanced SARMs bulking",
    "description": "The most aggressive and popular advanced SARMs bulking",
    "images": [
      "/media/products/sarms-stack-advanced-bulking.png"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-lgd-4033-mk-677",
    "name": "Sarms Bulking Stack",
    "slug": "lgd-4033-mk-677",
    "sku": "STACK-1784554612549",
    "brandId": "brand-imuscle-sarms",
    "brandName": "iMuscle SARMs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "The most popular SARMS bulking stack",
    "description": "The most popular SARMS bulking stack",
    "images": [
      "/media/products/lgd-4033-mk-677.png"
    ],
    "tags": [
      "iMuscle SARMs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-s23-mastorin-s-23-25mg-30ml-syncom-labs",
    "name": "S23 Mastorin S-23 [25mg/30ml] | Syncom Labs",
    "slug": "s23-mastorin-s-23-25mg-30ml-syncom-labs",
    "sku": "SYNCOM-S23-LIQ",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "S-23, a potent SARM in liquid form for lean mass and hardness.",
    "description": "S-23, a potent SARM in liquid form for lean mass and hardness.",
    "images": [
      "/media/products/s23-mastorin-s-23-25mg-30ml-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-sr9009-stenabolic-liquid-25mg-30ml-syncom-labs",
    "name": "SR9009 – Stenabolic Liquid [25mg/30ml] | Syncom Labs",
    "slug": "sr9009-stenabolic-liquid-25mg-30ml-syncom-labs",
    "sku": "SYNCOM-SR9009-LIQ",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 69.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": "SR-9009 (Stenabolic), a REV-ERB agonist in liquid form for endurance and fat metabolism.",
    "description": "SR-9009 (Stenabolic), a REV-ERB agonist in liquid form for endurance and fat metabolism.",
    "images": [
      "/media/products/sr9009-stenabolic-liquid-25mg-30ml-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-andarine-s4-10mg-100-caps-syncom-labs",
    "name": "Andarine S4 [10mg/100 caps] | Syncom Labs",
    "slug": "andarine-s4-10mg-100-caps-syncom-labs",
    "sku": "SYNCOM-S4",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": "Andarine (S4), a SARM for cutting, strength, and muscle hardness.",
    "description": "Andarine (S4), a SARM for cutting, strength, and muscle hardness.",
    "images": [
      "/media/products/andarine-s4-10mg-100-caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-mastorin-s23-10mg-100caps-syncom-labs",
    "name": "Mastorin S23 [10mg/100caps] | Syncom Labs",
    "slug": "mastorin-s23-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-S23",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": "S23, a potent oral SARM for lean mass and hardening.",
    "description": "S23, a potent oral SARM for lean mass and hardening.",
    "images": [
      "/media/products/mastorin-s23-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-yk11-liquid-sarm-25mg-30ml-syncom-labs",
    "name": "YK11 Liquid SARM [25mg/30ml] | Syncom Labs",
    "slug": "yk11-liquid-sarm-25mg-30ml-syncom-labs",
    "sku": "SYNCOM-YK11-LIQ",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 64.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": "YK11, a myostatin-modulating compound in liquid form for lean mass gains.",
    "description": "YK11, a myostatin-modulating compound in liquid form for lean mass gains.",
    "images": [
      "/media/products/yk11-liquid-sarm-25mg-30ml-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-stenabolic-sr9009-10mg-100caps-syncom-labs",
    "name": "Stenabolic SR9009 [10mg/100caps] | Syncom Labs",
    "slug": "stenabolic-sr9009-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-SR9009",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 79.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": "SR-9009 (Stenabolic), a REV-ERB agonist for endurance and fat metabolism.",
    "description": "SR-9009 (Stenabolic), a REV-ERB agonist for endurance and fat metabolism.",
    "images": [
      "/media/products/stenabolic-sr9009-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-gw501516-cardarin-liquid-25mg-30ml-syncom-labs",
    "name": "GW501516 – CARDARIN Liquid [25mg/30ml] | Syncom Labs",
    "slug": "gw501516-cardarin-liquid-25mg-30ml-syncom-labs",
    "sku": "SYNCOM-CARDARIN-LIQ",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": "GW-501516 (Cardarine), a liquid PPAR-delta agonist for endurance and fat loss.",
    "description": "GW-501516 (Cardarine), a liquid PPAR-delta agonist for endurance and fat loss.",
    "images": [
      "/media/products/gw501516-cardarin-liquid-25mg-30ml-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-andarine-s4-liquid-25mg-30ml-syncom-labs",
    "name": "Andarine S4 Liquid [25mg/30ml] | Syncom Labs",
    "slug": "andarine-s4-liquid-25mg-30ml-syncom-labs",
    "sku": "SYNCOM-ANDARINE-LIQ",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 34.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": "Andarine (S4) in liquid form, a SARM for cutting and hardness.",
    "description": "Andarine (S4) in liquid form, a SARM for cutting and hardness.",
    "images": [
      "/media/products/andarine-s4-liquid-25mg-30ml-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-ligandrol-lgd-4033-5mg-100caps-syncom-labs",
    "name": "Ligandrol LGD-4033 [5mg/100caps] | Syncom Labs",
    "slug": "ligandrol-lgd-4033-5mg-100caps-syncom-labs",
    "sku": "SYNCOM-LGD4033",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": "LGD-4033 (Ligandrol), a potent SARM for lean mass and strength.",
    "description": "LGD-4033 (Ligandrol), a potent SARM for lean mass and strength.",
    "images": [
      "/media/products/ligandrol-lgd-4033-5mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-rad-140-testolone-liquid-25mg-30ml-syncom-labs",
    "name": "RAD-140 Testolone Liquid [25mg/30ml] | Syncom Labs",
    "slug": "rad-140-testolone-liquid-25mg-30ml-syncom-labs",
    "sku": "SYNCOM-RAD-LIQUID",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 79.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": "RAD-140 (Testolone), a liquid SARM for strength and lean muscle gains.",
    "description": "RAD-140 (Testolone), a liquid SARM for strength and lean muscle gains.",
    "images": [
      "/media/products/rad-140-testolone-liquid-25mg-30ml-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-mk2866-ostarine-liquid-25mg-30ml-syncom-labs",
    "name": "MK2866 – Ostarine Liquid [25mg/30ml] | Syncom Labs",
    "slug": "mk2866-ostarine-liquid-25mg-30ml-syncom-labs",
    "sku": "SYNCOM-OSTA-LIQ",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": "MK-2866 (Ostarine), a mild SARM for lean mass retention and recovery.",
    "description": "MK-2866 (Ostarine), a mild SARM for lean mass retention and recovery.",
    "images": [
      "/media/products/mk2866-ostarine-liquid-25mg-30ml-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-yk11-10mg-100caps-syncom-labs",
    "name": "YK11 [10mg/100caps] | Syncom Labs",
    "slug": "yk11-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-YK11",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 69.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": "YK11, a myostatin-modulating compound used for lean mass gains.",
    "description": "YK11, a myostatin-modulating compound used for lean mass gains.",
    "images": [
      "/media/products/yk11-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-ibutamoren-mk677-10mg-100caps-syncom-labs",
    "name": "Ibutamoren MK677 [10mg/100caps] | Syncom Labs",
    "slug": "ibutamoren-mk677-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-MK677",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 79.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "MK-677 (Ibutamoren), an oral growth hormone secretagogue for appetite and recovery.",
    "description": "MK-677 (Ibutamoren), an oral growth hormone secretagogue for appetite and recovery.",
    "images": [
      "/media/products/ibutamoren-mk677-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-testolon-rad-140-10mg-100caps-syncom-labs",
    "name": "Testolon RAD 140 [10mg/100caps] | Syncom Labs",
    "slug": "testolon-rad-140-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-RAD140",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 89.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": "RAD-140 (Testolone), a potent SARM for lean mass and strength.",
    "description": "RAD-140 (Testolone), a potent SARM for lean mass and strength.",
    "images": [
      "/media/products/testolon-rad-140-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-cardarine-gw501516-10mg-100caps-syncom-labs",
    "name": "Cardarine GW501516 [10mg/100caps] | Syncom Labs",
    "slug": "cardarine-gw501516-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-GW501516",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 69.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": "GW-501516 (Cardarine), a PPAR agonist used for endurance and fat loss.",
    "description": "GW-501516 (Cardarine), a PPAR agonist used for endurance and fat loss.",
    "images": [
      "/media/products/cardarine-gw501516-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-ostarin-mk2866-10mg-100caps-syncom-labs",
    "name": "Ostarin MK2866 [10mg/100caps] | Syncom Labs",
    "slug": "ostarin-mk2866-10mg-100caps-syncom-labs",
    "sku": "SYNCOM-MK2866",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": "MK-2866 (Ostarine), a beginner-friendly SARM for recomposition and recovery.",
    "description": "MK-2866 (Ostarine), a beginner-friendly SARM for recomposition and recovery.",
    "images": [
      "/media/products/ostarin-mk2866-10mg-100caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-mk677-ibutamoren-liquid-25mg-30ml-syncom-labs",
    "name": "MK677 – Ibutamoren Liquid [25mg/30ml] | Syncom Labs",
    "slug": "mk677-ibutamoren-liquid-25mg-30ml-syncom-labs",
    "sku": "SYNCOM-MK677-LIQ",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 54.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": "MK 677 UK Ibutamoren liquid — research SARM listing with batch context and tracked UK shipping.",
    "description": "MK 677 UK sits in our SARMs category for buy SARMs UK searches. Educational only.",
    "seoTitle": "MK 677 UK – Ibutamoren Liquid | Steroids UK",
    "seoDescription": "MK 677 UK (Ibutamoren) liquid from Syncom Labs. SARMs catalogue with GBP pricing and UK dispatch.",
    "images": [
      "/media/products/mk677-ibutamoren-liquid-25mg-30ml-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-lgd4033-ligandrol-liquid-25mg-30ml-syncom-labs",
    "name": "LGD4033 – Ligandrol Liquid [25mg/30ml] | Syncom Labs",
    "slug": "lgd4033-ligandrol-liquid-25mg-30ml-syncom-labs",
    "sku": "SYNCOM-LGD-LIQ",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-sarms",
    "categoryName": "SARMs",
    "categorySlug": "sarms",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": "LGD-4033 (Ligandrol), a potent SARM in liquid form for lean mass and strength.",
    "description": "LGD-4033 (Ligandrol), a potent SARM in liquid form for lean mass and strength.",
    "images": [
      "/media/products/lgd4033-ligandrol-liquid-25mg-30ml-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "SARMs"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-viogen-performance-pct",
    "name": "Performance PCT",
    "slug": "viogen-performance-pct",
    "sku": "VIOGEN-PCT",
    "brandId": "brand-viogen-pharmaceuticals",
    "brandName": "Viogen Pharmaceuticals",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 52.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": "Viogen Pharmaceuticals Performance PCT Blend contain,\nClomiphene Citrate, Tamoxifen Citrate, Tadalafil",
    "description": "Viogen Pharmaceuticals Performance PCT Blend contain,\nClomiphene Citrate, Tamoxifen Citrate, Tadalafil",
    "images": [
      "/media/products/viogen-performance-pct.png"
    ],
    "tags": [
      "Viogen Pharmaceuticals",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-syncom-pct-stack-advanced",
    "name": "Syncom Labs PCT Stack - Advanced",
    "slug": "syncom-pct-stack-advanced",
    "sku": "STACK-1785244530109",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": "Complete recovery protocol with testicular priming and liver support",
    "description": "Complete recovery protocol with testicular priming and liver support",
    "images": [
      "/media/products/syncom-pct-stack-advanced.png"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-syncom-labs-pct-stack-oral",
    "name": "Syncom Labs PCT Stack - Oral",
    "slug": "syncom-labs-pct-stack-oral",
    "sku": "STACK-1785242279976",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": "Standard dual-SERM recovery protocol with liver support",
    "description": "Standard dual-SERM recovery protocol with liver support",
    "images": [
      "/media/products/syncom-labs-pct-stack-oral.png"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-clomid-clomiphene-citrate-50mg-50tabs-syncom-labs",
    "name": "Clomid – Clomiphene Citrate [50mg/50tabs] | Syncom Labs",
    "slug": "clomid-clomiphene-citrate-50mg-50tabs-syncom-labs",
    "sku": "SYNCOM-CLOMID-TABLETS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": "Clomiphene Citrate, a SERM used in PCT to restore natural testosterone.",
    "description": "Clomiphene Citrate, a SERM used in PCT to restore natural testosterone.",
    "images": [
      "/media/products/clomid-clomiphene-citrate-50mg-50tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-hcg-10000iu-beligas-pharmaceuticals",
    "name": "HCG 10,000iu – Beligas Pharmaceuticals",
    "slug": "hcg-10000iu-beligas-pharmaceuticals",
    "sku": "BELIGAS-HCG-10kiu",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 54.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": "HCG, mimics LH to restore testicular function during or after a cycle.",
    "description": "HCG, mimics LH to restore testicular function during or after a cycle.",
    "images": [
      "/media/products/hcg-10000iu-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-ultima-clomid-50mg-50tabs",
    "name": "Ultima-Clomid 50mg/50tabs",
    "slug": "ultima-clomid-50mg-50tabs",
    "sku": "ULTI-CLO-50",
    "brandId": "brand-ultima-pharmaceuticals",
    "brandName": "Ultima Pharmaceuticals",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 34.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": "Clomiphene, a SERM for post-cycle therapy and natural testosterone recovery.",
    "description": "Clomiphene, a SERM for post-cycle therapy and natural testosterone recovery.",
    "images": [
      "/media/products/ultima-clomid-50mg-50tabs.webp"
    ],
    "tags": [
      "Ultima Pharmaceuticals",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-nolvadex-tamoxifen-50tabs-20mg-beligas-pharmaceuticals",
    "name": "Nolvadex – Tamoxifen (50tabs/20mg) – Beligas Pharmaceuticals",
    "slug": "nolvadex-tamoxifen-50tabs-20mg-beligas-pharmaceuticals",
    "sku": "ORA-TAMOX-50T",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 34.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": "Tamoxifen, a SERM for PCT and gynecomastia control.",
    "description": "Tamoxifen, a SERM for PCT and gynecomastia control.",
    "images": [
      "/media/products/nolvadex-tamoxifen-50tabs-20mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-bpc-157-5mg-beligas-pharmaceuticals",
    "name": "BPC 157 (5mg) – Beligas Pharmaceuticals",
    "slug": "bpc-157-5mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-BPC-157",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 45.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": "BPC-157, a healing peptide for tissue repair and recovery.",
    "description": "BPC-157, a healing peptide for tissue repair and recovery.",
    "images": [
      "/media/products/bpc-157-5mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-anastrozole-arimidex-1mg-50tabs-syncom-labs",
    "name": "Anastrozole – Arimidex [1mg/50tabs] | Syncom Labs",
    "slug": "anastrozole-arimidex-1mg-50tabs-syncom-labs",
    "sku": "SYNCOM-ARIMIDEX50",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 43.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": "Anastrozole (Arimidex), an aromatase inhibitor for estrogen control on cycle.",
    "description": "Anastrozole (Arimidex), an aromatase inhibitor for estrogen control on cycle.",
    "images": [
      "/media/products/anastrozole-arimidex-1mg-50tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-tamoxifen-nolvadex-20mg-100tabs-syncom-labs",
    "name": "Tamoxifen – Nolvadex [20mg/50tabs] | Syncom Labs",
    "slug": "tamoxifen-nolvadex-20mg-100tabs-syncom-labs",
    "sku": "SYNCOM-TAMOXIFENTABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "Tamoxifen (Nolvadex), a SERM for post-cycle therapy and estrogen control.",
    "description": "Tamoxifen (Nolvadex), a SERM for post-cycle therapy and estrogen control.",
    "images": [
      "/media/products/tamoxifen-nolvadex-20mg-100tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-raloxifene-50tabs-20mg-beligas-pharmaceuticals",
    "name": "Raloxifene (50tabs/20mg) – Beligas Pharmaceuticals",
    "slug": "raloxifene-50tabs-20mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-RALOXIFENE-20",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 34.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": "Raloxifene, a SERM used for gynecomastia control and estrogen management.",
    "description": "Raloxifene, a SERM used for gynecomastia control and estrogen management.",
    "images": [
      "/media/products/raloxifene-50tabs-20mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-mono-femara-letrozole-50tabs-2-5mg-beligas-pharmaceuticals",
    "name": "Mono-Femara Letrozole (50tabs/2.5mg) – Beligas Pharmaceuticals",
    "slug": "mono-femara-letrozole-50tabs-2-5mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-MONO-FEMARA",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 25.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "Letrozole, a potent aromatase inhibitor for strong estrogen control.",
    "description": "Letrozole, a potent aromatase inhibitor for strong estrogen control.",
    "images": [
      "/media/products/mono-femara-letrozole-50tabs-2-5mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-anastrozole-arimidex-1mg-100tabs-syncom-labs",
    "name": "Anastrozole – Arimidex [1mg/100tabs] | Syncom Labs",
    "slug": "anastrozole-arimidex-1mg-100tabs-syncom-labs",
    "sku": "SYNCOM-ARIMIDEX-TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-pct",
    "categoryName": "PCT",
    "categorySlug": "pct",
    "priceGbp": 84.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "Anastrozole (Arimidex), an aromatase inhibitor for estrogen control on cycle.",
    "description": "Anastrozole (Arimidex), an aromatase inhibitor for estrogen control on cycle.",
    "images": [
      "/media/products/anastrozole-arimidex-1mg-100tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "PCT"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-sermorelin-ghrh-10mg-syncom-labs",
    "name": "Sermorelin GHRH [10mg] | Syncom Labs",
    "slug": "sermorelin-ghrh-10mg-syncom-labs",
    "sku": "SYNCOM-SERMORELIN",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 44.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": "Sermorelin, a GHRH peptide that stimulates natural growth hormone release.",
    "description": "Sermorelin, a GHRH peptide that stimulates natural growth hormone release.",
    "images": [
      "/media/products/sermorelin-ghrh-10mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-adipotide-prohibitin-targeting-peptide-1-5mg-syncom-labs",
    "name": "Adipotide – Prohibitin-Targeting Peptide 1 [5mg] | Syncom Labs",
    "slug": "adipotide-prohibitin-targeting-peptide-1-5mg-syncom-labs",
    "sku": "SYNCOM-Adipotide5",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 69.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": "Adipotide, a prohibitin-targeting peptide investigated for adipose tissue reduction.",
    "description": "Adipotide, a prohibitin-targeting peptide investigated for adipose tissue reduction.",
    "images": [
      "/media/products/adipotide-prohibitin-targeting-peptide-1-5mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-aicar-aica-ribonucleotide-50mg-syncom-labs",
    "name": "Aicar – AICA ribonucleotide [50mg] | Syncom Labs",
    "slug": "aicar-aica-ribonucleotide-50mg-syncom-labs",
    "sku": "SYNCOM-AICAR",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": "AICAR, an AMPK activator studied for endurance and metabolic effects.",
    "description": "AICAR, an AMPK activator studied for endurance and metabolic effects.",
    "images": [
      "/media/products/aicar-aica-ribonucleotide-50mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-mgf-mechano-growth-factor-10mg-syncom-labs",
    "name": "MGF (Mechano Growth Factor) [10mg] | Syncom Labs",
    "slug": "mgf-mechano-growth-factor-10mg-syncom-labs",
    "sku": "SYNCOM-MGF",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": "MGF (Mechano Growth Factor), an IGF-1 splice variant peptide promoting muscle repair and growth.",
    "description": "MGF (Mechano Growth Factor), an IGF-1 splice variant peptide promoting muscle repair and growth.",
    "images": [
      "/media/products/mgf-mechano-growth-factor-10mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-hexarelin-examorelin-5mg-syncom-labs",
    "name": "Hexarelin – Examorelin [5mg] | Syncom Labs",
    "slug": "hexarelin-examorelin-5mg-syncom-labs",
    "sku": "SYNCOM-HEXARELIN-5",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 45.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": "Hexarelin, a potent growth hormone secretagogue for GH release.",
    "description": "Hexarelin, a potent growth hormone secretagogue for GH release.",
    "images": [
      "/media/products/hexarelin-examorelin-5mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-mots-c-peptide-10mg-syncom-labs",
    "name": "MOTS-C Peptide [10mg] | Syncom Labs",
    "slug": "mots-c-peptide-10mg-syncom-labs",
    "sku": "SYNCOM-MOTS-C",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 59.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": "MOTS-c, a mitochondrial peptide studied for metabolic regulation and endurance.",
    "description": "MOTS-c, a mitochondrial peptide studied for metabolic regulation and endurance.",
    "images": [
      "/media/products/mots-c-peptide-10mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-metastin-kisspetin-5mg-syncom-labs",
    "name": "Metastin – Kisspetin [5mg] | Syncom Labs",
    "slug": "metastin-kisspetin-5mg-syncom-labs",
    "sku": "SYNCOM-KISSPETIN",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": "Kisspeptin (Metastin), a peptide that stimulates gonadotropin and LH release.",
    "description": "Kisspeptin (Metastin), a peptide that stimulates gonadotropin and LH release.",
    "images": [
      "/media/products/metastin-kisspetin-5mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-epithalon-epitalon-10mg-syncom-labs",
    "name": "Epithalon – Epitalon [10mg] | Syncom Labs",
    "slug": "epithalon-epitalon-10mg-syncom-labs",
    "sku": "SYNCOM-EPITALON-10",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": "Epitalon, a synthetic peptide studied for telomerase activation and anti-aging.",
    "description": "Epitalon, a synthetic peptide studied for telomerase activation and anti-aging.",
    "images": [
      "/media/products/epithalon-epitalon-10mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-lipotropin-aod9604-5mg-syncom-labs",
    "name": "Lipotropin – AOD9604 [5mg] | Syncom Labs",
    "slug": "lipotropin-aod9604-5mg-syncom-labs",
    "sku": "SYNCOM-LIPOTROPIN-AOD9604",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": "AOD9604, a modified growth hormone fragment marketed for fat metabolism.",
    "description": "AOD9604, a modified growth hormone fragment marketed for fat metabolism.",
    "images": [
      "/media/products/lipotropin-aod9604-5mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-ipamorelin-peptide-10mg-syncom-labs",
    "name": "Ipamorelin Peptide [10mg] | Syncom Labs",
    "slug": "ipamorelin-peptide-10mg-syncom-labs",
    "sku": "SYNCOM-IPAMORELIN",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": "Ipamorelin, a selective growth hormone secretagogue for lean recovery.",
    "description": "Ipamorelin, a selective growth hormone secretagogue for lean recovery.",
    "images": [
      "/media/products/ipamorelin-peptide-10mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-melanotan2-mt-ii-nosespray-10-syncom-labs",
    "name": "Melanotan2 MT II [Nosespray 10] | Syncom Labs",
    "slug": "melanotan2-mt-ii-nosespray-10-syncom-labs",
    "sku": "SYNCOM-MT2NoseSpray",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 59.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": "Melanotan II, a melanocortin peptide for tanning and libido.",
    "description": "Melanotan II, a melanocortin peptide for tanning and libido.",
    "images": [
      "/media/products/melanotan2-mt-ii-nosespray-10-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-ghrp-2-peptide-syncom-labs",
    "name": "GHRP-2 Peptide | Syncom Labs",
    "slug": "ghrp-2-peptide-syncom-labs",
    "sku": "SYNCOM-GHRP2",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 34.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "GHRP-2, a growth hormone secretagogue stimulating GH release and appetite.",
    "description": "GHRP-2, a growth hormone secretagogue stimulating GH release and appetite.",
    "images": [
      "/media/products/ghrp-2-peptide-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-pt141-bremelanotide-10mg-syncom-labs",
    "name": "PT141 – Bremelanotide [10mg] | Syncom Labs",
    "slug": "pt141-bremelanotide-10mg-syncom-labs",
    "sku": "SYNCOM-PT141",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 40.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": "Bremelanotide (PT-141), a melanocortin peptide for libido and sexual arousal.",
    "description": "Bremelanotide (PT-141), a melanocortin peptide for libido and sexual arousal.",
    "images": [
      "/media/products/pt141-bremelanotide-10mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-ghrp-6-peptide-10mg-syncom-labs",
    "name": "GHRP-6 Peptide [10mg] | Syncom Labs",
    "slug": "ghrp-6-peptide-10mg-syncom-labs",
    "sku": "SYNCOM-GHRP6",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 34.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 32,
    "shortDescription": "GHRP-6, a growth hormone secretagogue with strong appetite stimulation.",
    "description": "GHRP-6, a growth hormone secretagogue with strong appetite stimulation.",
    "images": [
      "/media/products/ghrp-6-peptide-10mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-follistatin-fst-1mg-syncom-labs",
    "name": "Follistatin (FST) [1mg] | Syncom Labs",
    "slug": "follistatin-fst-1mg-syncom-labs",
    "sku": "SYNCOM-FOLLISTATIN-1",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-peptides",
    "categoryName": "Peptides",
    "categorySlug": "peptides",
    "priceGbp": 69.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 33,
    "shortDescription": "Follistatin, a myostatin-inhibiting protein for muscle growth potential.",
    "description": "Follistatin, a myostatin-inhibiting protein for muscle growth potential.",
    "images": [
      "/media/products/follistatin-fst-1mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Peptides"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-viogentropin-hgh-pen-50iu",
    "name": "Viogentropin HGH Pen 50IU",
    "slug": "viogentropin-hgh-pen-50iu",
    "sku": "VIOGEN-HGHPEN50iu",
    "brandId": "brand-viogen-pharmaceuticals",
    "brandName": "Viogen Pharmaceuticals",
    "categoryId": "cat-hgh",
    "categoryName": "HGH",
    "categorySlug": "hgh",
    "priceGbp": 89.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 34,
    "shortDescription": "Viogen Pharmaceuticals HGH 50iu Pen - Viogentropin - Human Growth Hormone.\n1 Click = 0.02ml / 0.33mg",
    "description": "Viogen Pharmaceuticals HGH 50iu Pen - Viogentropin - Human Growth Hormone.\n1 Click = 0.02ml / 0.33mg",
    "images": [
      "/media/products/viogentropin-hgh-pen-50iu.png"
    ],
    "tags": [
      "Viogen Pharmaceuticals",
      "HGH"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-syntropin-hgh-24iu-8mg-syncom-labs",
    "name": "Syntropin (HGH) [24iu/8mg] | Syncom Labs",
    "slug": "syntropin-hgh-24iu-8mg-syncom-labs",
    "sku": "SYNCOM-HGH24iu",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-hgh",
    "categoryName": "HGH",
    "categorySlug": "hgh",
    "priceGbp": 69.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 35,
    "shortDescription": "Somatropin (HGH), growth hormone for recovery, lean mass and fat loss.",
    "description": "Somatropin (HGH), growth hormone for recovery, lean mass and fat loss.",
    "images": [
      "/media/products/syntropin-hgh-24iu-8mg-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "HGH"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-rdna-syntropin-hgh-human-growth-hormone-100-i-u-syncom-labs",
    "name": "rDNA SYNTROPIN HGH (Human Growth Hormone) 100 i.u. | Syncom Labs",
    "slug": "rdna-syntropin-hgh-human-growth-hormone-100-i-u-syncom-labs",
    "sku": "SYNCOM-HGH-100iu",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-hgh",
    "categoryName": "HGH",
    "categorySlug": "hgh",
    "priceGbp": 279.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 36,
    "shortDescription": "Somatropin (Human Growth Hormone), for recovery, body composition and tissue repair.",
    "description": "Somatropin (Human Growth Hormone), for recovery, body composition and tissue repair.",
    "images": [
      "/media/products/rdna-syntropin-hgh-human-growth-hormone-100-i-u-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "HGH"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-tadafire-20-kamagra-tadalafil-20mg-10tabs",
    "name": "Tadafire 20 – Kamagra Tadalafil 20mg/10tabs",
    "slug": "tadafire-20-kamagra-tadalafil-20mg-10tabs",
    "sku": "TADAFIRE-20",
    "brandId": "brand-ajanta-pharma",
    "brandName": "Ajanta Pharma",
    "categoryId": "cat-kamagra",
    "categoryName": "Kamagra",
    "categorySlug": "kamagra",
    "priceGbp": 12.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 37,
    "shortDescription": "Tadalafil, a long-acting PDE5 inhibitor for erectile support.",
    "description": "Tadalafil, a long-acting PDE5 inhibitor for erectile support.",
    "images": [
      "/media/products/tadafire-20-kamagra-tadalafil-20mg-10tabs.webp"
    ],
    "tags": [
      "Ajanta Pharma",
      "Kamagra"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-shopkamagra-super",
    "name": "Kamagra Super",
    "slug": "shopkamagra-super",
    "sku": "22",
    "brandId": "brand-ajanta-pharma",
    "brandName": "Ajanta Pharma",
    "categoryId": "cat-kamagra",
    "categoryName": "Kamagra",
    "categorySlug": "kamagra",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 38,
    "shortDescription": "Sildenafil with Dapoxetine, combining erectile support and premature ejaculation control.",
    "description": "Sildenafil with Dapoxetine, combining erectile support and premature ejaculation control.",
    "images": [
      "/media/products/shopkamagra-super.webp"
    ],
    "tags": [
      "Ajanta Pharma",
      "Kamagra"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-lovegra-kamagra",
    "name": "Lovegra (Kamagra) [4Tab/100mg]",
    "slug": "lovegra-kamagra",
    "sku": "22-1-1",
    "brandId": "brand-ajanta-pharma",
    "brandName": "Ajanta Pharma",
    "categoryId": "cat-kamagra",
    "categoryName": "Kamagra",
    "categorySlug": "kamagra",
    "priceGbp": 12.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 39,
    "shortDescription": "Sildenafil, a PDE5 inhibitor formulated for female sexual support.",
    "description": "Sildenafil, a PDE5 inhibitor formulated for female sexual support.",
    "images": [
      "/media/products/lovegra-kamagra.webp"
    ],
    "tags": [
      "Ajanta Pharma",
      "Kamagra"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-cialis-tadalafil-liquid-25mg-30ml-syncom-labs",
    "name": "Cialis – Tadalafil Liquid [25mg/30ml] | Syncom Labs",
    "slug": "cialis-tadalafil-liquid-25mg-30ml-syncom-labs",
    "sku": "SYNCOM-CIALIS-LIQUID",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
    "priceGbp": 39.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 40,
    "shortDescription": "Tadalafil, a long-acting PDE5 inhibitor for erectile support.",
    "description": "Tadalafil, a long-acting PDE5 inhibitor for erectile support.",
    "images": [
      "/media/products/cialis-tadalafil-liquid-25mg-30ml-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-tadalafil-5-vidalista",
    "name": "Tadalafil 5 – Vidalista Pre-Workout Dose",
    "slug": "tadalafil-5-vidalista",
    "sku": "VIDALISTA-5-TADALAFIL",
    "brandId": "brand-pharma-grade-manufacturers",
    "brandName": "Pharma Grade Manufacturers",
    "categoryId": "cat-ed-meds",
    "categoryName": "ED Meds",
    "categorySlug": "ed-meds",
    "priceGbp": 4.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 41,
    "shortDescription": "Tadalafil (Vidalista), a low-dose long-acting PDE5 inhibitor for daily erectile support.",
    "description": "Tadalafil (Vidalista), a low-dose long-acting PDE5 inhibitor for daily erectile support.",
    "images": [
      "/media/products/tadalafil-5-vidalista.webp"
    ],
    "tags": [
      "Pharma Grade Manufacturers",
      "ED Meds"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-shopkamagra-tabs",
    "name": "Kamagra Gold – Sildenafil",
    "slug": "shopkamagra-tabs",
    "sku": "21",
    "brandId": "brand-ajanta-pharma",
    "brandName": "Ajanta Pharma",
    "categoryId": "cat-kamagra",
    "categoryName": "Kamagra",
    "categorySlug": "kamagra",
    "priceGbp": 12.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 42,
    "shortDescription": "Sildenafil, a PDE5 inhibitor for erectile support.",
    "description": "Sildenafil, a PDE5 inhibitor for erectile support.",
    "images": [
      "/media/products/shopkamagra-tabs.webp"
    ],
    "tags": [
      "Ajanta Pharma",
      "Kamagra"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-lovegra-women",
    "name": "For Women (Kamagra) Lovegra [4Tab/100mg]",
    "slug": "lovegra-women",
    "sku": "22-1",
    "brandId": "brand-ajanta-pharma",
    "brandName": "Ajanta Pharma",
    "categoryId": "cat-kamagra",
    "categoryName": "Kamagra",
    "categorySlug": "kamagra",
    "priceGbp": 12.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 43,
    "shortDescription": "Sildenafil (female formulation), a PDE5 inhibitor for arousal and blood flow support.",
    "description": "Sildenafil (female formulation), a PDE5 inhibitor for arousal and blood flow support.",
    "images": [
      "/media/products/lovegra-women.webp"
    ],
    "tags": [
      "Ajanta Pharma",
      "Kamagra"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-viagra-sildenafil-citrate-100mg-20caps-syncom-labs",
    "name": "Viagra – Sildenafil Citrate [100mg/20caps] | Syncom Labs",
    "slug": "viagra-sildenafil-citrate-100mg-20caps-syncom-labs",
    "sku": "SYNCOM-VIAGRA100CAPS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-viagra",
    "categoryName": "Viagra",
    "categorySlug": "viagra",
    "priceGbp": 49.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 44,
    "shortDescription": "Sildenafil, a fast-acting PDE5 inhibitor for erectile support.",
    "description": "Sildenafil, a fast-acting PDE5 inhibitor for erectile support.",
    "images": [
      "/media/products/viagra-sildenafil-citrate-100mg-20caps-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Viagra"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-t3-tiromel-25mcg-50tabs-syncom-labs",
    "name": "T3 – Tiromel [25mcg/50tabs] | Syncom Labs",
    "slug": "t3-tiromel-25mcg-50tabs-syncom-labs",
    "sku": "SYNCOM-T3-TABS",
    "brandId": "brand-syncom-labs",
    "brandName": "Syncom Labs",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 24.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 15,
    "shortDescription": "Liothyronine (T3), a thyroid hormone used to raise metabolism for fat loss.",
    "description": "Liothyronine (T3), a thyroid hormone used to raise metabolism for fat loss.",
    "images": [
      "/media/products/t3-tiromel-25mcg-50tabs-syncom-labs.webp"
    ],
    "tags": [
      "Syncom Labs",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-viogen-helios-liquid-thermo-burner",
    "name": "Helios Liquid Thermo Burner",
    "slug": "viogen-helios-liquid-thermo-burner",
    "sku": "VIOGEN-THERMOBURNER",
    "brandId": "brand-viogen-pharmaceuticals",
    "brandName": "Viogen Pharmaceuticals",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 38.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 16,
    "shortDescription": "Viogen Pharmaceuticals Helios Liquid Thermo Burner Contain:\n60mcg of Clenbuterol, 30mcg of T3 Liothyronine, and 5mg of Yohimbine HCL",
    "description": "Viogen Pharmaceuticals Helios Liquid Thermo Burner Contain:\n60mcg of Clenbuterol, 30mcg of T3 Liothyronine, and 5mg of Yohimbine HCL",
    "images": [
      "/media/products/viogen-helios-liquid-thermo-burner.png"
    ],
    "tags": [
      "Viogen Pharmaceuticals",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-viogen-clenbuterol-40",
    "name": "Clenbuterol 40",
    "slug": "viogen-clenbuterol-40",
    "sku": "VIOGEN-CLENBUTEROL",
    "brandId": "brand-viogen-pharmaceuticals",
    "brandName": "Viogen Pharmaceuticals",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 33.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 17,
    "shortDescription": "Viogen Clenbuterol Tablets 40mcg",
    "description": "Viogen Clenbuterol Tablets 40mcg",
    "images": [
      "/media/products/viogen-clenbuterol-40.png"
    ],
    "tags": [
      "Viogen Pharmaceuticals",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-helio-clenbuterol-yohimbine-10ml-40mcg5-5mg-beligas-pharmaceuticals",
    "name": "Helio Clenbuterol + Yohimbine (10ml/40mcg+5.5mg) – Beligas Pharmaceuticals",
    "slug": "helio-clenbuterol-yohimbine-10ml-40mcg5-5mg-beligas-pharmaceuticals",
    "sku": "BELIGAS-HELIOS",
    "brandId": "brand-beligas-pharmaceuticals",
    "brandName": "Beligas Pharmaceuticals",
    "categoryId": "cat-fat-loss",
    "categoryName": "Fat Loss",
    "categorySlug": "fat-loss",
    "priceGbp": 45.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 18,
    "shortDescription": "Clenbuterol with Yohimbine, a combined stimulant blend for fat loss and thermogenesis.",
    "description": "Clenbuterol with Yohimbine, a combined stimulant blend for fat loss and thermogenesis.",
    "images": [
      "/media/products/helio-clenbuterol-yohimbine-10ml-40mcg5-5mg-beligas-pharmaceuticals.webp"
    ],
    "tags": [
      "Beligas Pharmaceuticals",
      "Fat Loss"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-needle-21gx1-0-8x25mm-pack-of-10",
    "name": "Needle 21Gx1″ (0.8x25mm) – Pack of 10",
    "slug": "needle-21gx1-0-8x25mm-pack-of-10",
    "sku": "21g-needle",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 19,
    "shortDescription": "Sterile 21G needles for drawing or injecting, pack of ten.",
    "description": "Sterile 21G needles for drawing or injecting, pack of ten.",
    "images": [
      "/media/products/needle-21gx1-0-8x25mm-pack-of-10.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-needle-25gx1-0-5x25mm-pack-of-10",
    "name": "Needle 25Gx1 (0.5x25mm) – Pack of 10",
    "slug": "needle-25gx1-0-5x25mm-pack-of-10",
    "sku": "25g-needle",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 20,
    "shortDescription": "Sterile 25G needles for intramuscular or subcutaneous injection, pack of ten.",
    "description": "Sterile 25G needles for intramuscular or subcutaneous injection, pack of ten.",
    "images": [
      "/media/products/needle-25gx1-0-5x25mm-pack-of-10.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-5ml-syringes-pack-of-10",
    "name": "5ml Syringes (Pack of 10)",
    "slug": "5ml-syringes-pack-of-10",
    "sku": "5ml-terumo-slip",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 21,
    "shortDescription": "Sterile single-use 5ml syringes for accurate dosing, pack of ten.",
    "description": "Sterile single-use 5ml syringes for accurate dosing, pack of ten.",
    "images": [
      "/media/products/5ml-syringes-pack-of-10.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-hgh-syringe",
    "name": "10x Small syringe + needle for peptides / hcg / hgh",
    "slug": "hgh-syringe",
    "sku": "needles-syringes-small",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 9.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 22,
    "shortDescription": "Small syringes with needles for accurate peptide, HCG, and HGH injections.",
    "description": "Small syringes with needles for accurate peptide, HCG, and HGH injections.",
    "images": [
      "/media/products/hgh-syringe.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-3ml-syringes-pack-of-10",
    "name": "3ml Syringes (Pack of 10)",
    "slug": "3ml-syringes-pack-of-10",
    "sku": "3ml-terumo-slip",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 23,
    "shortDescription": "Sterile single-use 3ml syringes for accurate dosing, pack of ten.",
    "description": "Sterile single-use 3ml syringes for accurate dosing, pack of ten.",
    "images": [
      "/media/products/3ml-syringes-pack-of-10.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.622Z"
  },
  {
    "id": "prod-2ml-syringes-pack-of-10",
    "name": "2ml Syringes (Pack of 10)",
    "slug": "2ml-syringes-pack-of-10",
    "sku": "2ml-terumo-slip",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 24,
    "shortDescription": "Sterile single-use 2ml syringes for accurate dosing, pack of ten.",
    "description": "Sterile single-use 2ml syringes for accurate dosing, pack of ten.",
    "images": [
      "/media/products/2ml-syringes-pack-of-10.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.622Z",
    "updatedAt": "2026-09-08T08:02:30.623Z"
  },
  {
    "id": "prod-full-cycle-injection-kit",
    "name": "Full Cycle Injection Kit",
    "slug": "full-cycle-injection-kit",
    "sku": "KIT-INJ-FULLCYCLE",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 25.8,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 25,
    "shortDescription": "Stock up for a full cycle: three 3ml syringes, three 23G needles and two packs of pre-injection swabs.",
    "description": "Stock up for a full cycle: three 3ml syringes, three 23G needles and two packs of pre-injection swabs.",
    "images": [
      "/media/products/full-cycle-injection-kit.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.623Z",
    "updatedAt": "2026-09-08T08:02:30.623Z"
  },
  {
    "id": "prod-peptide-hgh-injection-kit",
    "name": "Peptide & HGH Injection Kit (Under-Skin)",
    "slug": "peptide-hgh-injection-kit",
    "sku": "KIT-INJ-SUBQ",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 8.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 26,
    "shortDescription": "A small gauge kit for subcutaneous and low volume shots: a 2ml syringe, a fine 25G needle and swabs.",
    "description": "A small gauge kit for subcutaneous and low volume shots: a 2ml syringe, a fine 25G needle and swabs.",
    "images": [
      "/media/products/peptide-hgh-injection-kit.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.623Z",
    "updatedAt": "2026-09-08T08:02:30.623Z"
  },
  {
    "id": "prod-essential-injection-kit",
    "name": "Essential Injection Kit (Muscle)",
    "slug": "essential-injection-kit",
    "sku": "KIT-INJ-ESSENTIAL",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 8.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 27,
    "shortDescription": "Everything you need for a clean intramuscular shot in one pack: a 3ml syringe, a 23G needle and pre-injection swabs.",
    "description": "Everything you need for a clean intramuscular shot in one pack: a 3ml syringe, a 23G needle and pre-injection swabs.",
    "images": [
      "/media/products/essential-injection-kit.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.623Z",
    "updatedAt": "2026-09-08T08:02:30.623Z"
  },
  {
    "id": "prod-complete-injection-kit",
    "name": "Complete Injection Kit (Muscle)",
    "slug": "complete-injection-kit",
    "sku": "KIT-INJ-COMPLETE",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 12.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 28,
    "shortDescription": "A full intramuscular set: a 3ml syringe, a 23G draw needle, a finer 25G injection needle and pre-injection swabs.",
    "description": "A full intramuscular set: a 3ml syringe, a 23G draw needle, a finer 25G injection needle and pre-injection swabs.",
    "images": [
      "/media/products/complete-injection-kit.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.623Z",
    "updatedAt": "2026-09-08T08:02:30.623Z"
  },
  {
    "id": "prod-large-volume-injection-kit",
    "name": "Large Volume Injection Kit (Muscle)",
    "slug": "large-volume-injection-kit",
    "sku": "KIT-INJ-LARGE",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 8.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 29,
    "shortDescription": "For higher volume oil injections: a 5ml syringe, a 23G needle and pre-injection swabs.",
    "description": "For higher volume oil injections: a 5ml syringe, a 23G needle and pre-injection swabs.",
    "images": [
      "/media/products/large-volume-injection-kit.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.623Z",
    "updatedAt": "2026-09-08T08:02:30.623Z"
  },
  {
    "id": "prod-needle-23gx1-0-6x25mm-pack-of-10",
    "name": "Needle 23Gx1 (0.6x25mm) – Pack of 10",
    "slug": "needle-23gx1-0-6x25mm-pack-of-10",
    "sku": "23g-needle",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 29.99,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": true,
    "ratingAvg": 4.8,
    "reviewCount": 30,
    "shortDescription": "Sterile 23G needles for intramuscular injection, pack of ten.",
    "description": "Sterile 23G needles for intramuscular injection, pack of ten.",
    "images": [
      "/media/products/needle-23gx1-0-6x25mm-pack-of-10.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.623Z",
    "updatedAt": "2026-09-08T08:02:30.623Z"
  },
  {
    "id": "prod-swabs",
    "name": "Pre-injection swabs x10",
    "slug": "swabs",
    "sku": "301-1-1-2",
    "brandId": "brand-other",
    "brandName": "Other",
    "categoryId": "cat-accessories",
    "categoryName": "Accessories",
    "categorySlug": "accessories",
    "priceGbp": 0.9,
    "stockQuantity": 100,
    "isPublished": true,
    "isFeatured": false,
    "isBestseller": false,
    "ratingAvg": 4.8,
    "reviewCount": 31,
    "shortDescription": "Sterile pre-injection alcohol swabs for cleaning the site before injection.",
    "description": "Sterile pre-injection alcohol swabs for cleaning the site before injection.",
    "images": [
      "/media/products/swabs.webp"
    ],
    "tags": [
      "Other",
      "Accessories"
    ],
    "purityScore": "99.4% HPLC Tested",
    "createdAt": "2026-09-08T08:02:30.623Z",
    "updatedAt": "2026-09-08T08:02:30.623Z"
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
