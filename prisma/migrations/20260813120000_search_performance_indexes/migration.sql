-- Phase 11: search and catalogue performance indexes
-- Reason: public catalogue filters by published+deleted, price, featured, createdAt;
-- search matches name/SKU via ILIKE; order admin filters by paymentStatus.

CREATE INDEX IF NOT EXISTS "Product_basePricePence_idx" ON "Product"("basePricePence");
CREATE INDEX IF NOT EXISTS "Product_createdAt_idx" ON "Product"("createdAt");
CREATE INDEX IF NOT EXISTS "Product_isFeatured_isPublished_idx" ON "Product"("isFeatured", "isPublished");
CREATE INDEX IF NOT EXISTS "Product_name_idx" ON "Product"("name");
CREATE INDEX IF NOT EXISTS "Order_paymentStatus_idx" ON "Order"("paymentStatus");
CREATE INDEX IF NOT EXISTS "Review_isApproved_idx" ON "Review"("isApproved");

-- Optional trigram indexes for ILIKE '%term%' search. Safe if extension is available.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS "Product_name_trgm_idx" ON "Product" USING gin ("name" gin_trgm_ops);
CREATE INDEX IF NOT EXISTS "Product_sku_trgm_idx" ON "Product" USING gin ("sku" gin_trgm_ops);
CREATE INDEX IF NOT EXISTS "Product_shortDescription_trgm_idx" ON "Product" USING gin ("shortDescription" gin_trgm_ops);
