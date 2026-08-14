-- Knowledge Hub blog

CREATE TYPE "BlogPostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

CREATE TABLE "BlogCategory" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "BlogCategory_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "BlogCategory_slug_key" ON "BlogCategory"("slug");
CREATE INDEX "BlogCategory_slug_idx" ON "BlogCategory"("slug");
CREATE INDEX "BlogCategory_sortOrder_idx" ON "BlogCategory"("sortOrder");

CREATE TABLE "BlogPost" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "bodyMarkdown" TEXT NOT NULL,
  "coverImageUrl" TEXT,
  "authorName" TEXT NOT NULL,
  "authorBio" TEXT,
  "status" "BlogPostStatus" NOT NULL DEFAULT 'DRAFT',
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMP(3),
  "readingMinutes" INTEGER NOT NULL DEFAULT 1,
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "faqJson" JSONB NOT NULL DEFAULT '[]',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE INDEX "BlogPost_slug_idx" ON "BlogPost"("slug");
CREATE INDEX "BlogPost_status_publishedAt_idx" ON "BlogPost"("status", "publishedAt");
CREATE INDEX "BlogPost_featured_status_idx" ON "BlogPost"("featured", "status");
CREATE INDEX "BlogPost_deletedAt_idx" ON "BlogPost"("deletedAt");

CREATE TABLE "BlogPostCategory" (
  "postId" TEXT NOT NULL,
  "categoryId" TEXT NOT NULL,
  CONSTRAINT "BlogPostCategory_pkey" PRIMARY KEY ("postId","categoryId")
);

CREATE INDEX "BlogPostCategory_categoryId_idx" ON "BlogPostCategory"("categoryId");

ALTER TABLE "BlogPostCategory" ADD CONSTRAINT "BlogPostCategory_postId_fkey"
  FOREIGN KEY ("postId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "BlogPostCategory" ADD CONSTRAINT "BlogPostCategory_categoryId_fkey"
  FOREIGN KEY ("categoryId") REFERENCES "BlogCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "BlogPostProduct" (
  "postId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  CONSTRAINT "BlogPostProduct_pkey" PRIMARY KEY ("postId","productId")
);

CREATE INDEX "BlogPostProduct_productId_idx" ON "BlogPostProduct"("productId");

ALTER TABLE "BlogPostProduct" ADD CONSTRAINT "BlogPostProduct_postId_fkey"
  FOREIGN KEY ("postId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "BlogPostProduct" ADD CONSTRAINT "BlogPostProduct_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
