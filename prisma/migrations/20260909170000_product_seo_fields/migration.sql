-- Optional per-product SEO overrides (mirrors BlogPost seoTitle/seoDescription).
ALTER TABLE "Product" ADD COLUMN "seoTitle" TEXT;
ALTER TABLE "Product" ADD COLUMN "seoDescription" TEXT;
