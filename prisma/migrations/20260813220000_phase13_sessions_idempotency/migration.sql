-- Phase 13: durable auth sessions + checkout idempotency

CREATE TABLE "AuthSession" (
  "id" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userAgent" TEXT,
  "ipAddress" TEXT,
  CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AuthSession_tokenHash_key" ON "AuthSession"("tokenHash");
CREATE INDEX "AuthSession_userId_idx" ON "AuthSession"("userId");
CREATE INDEX "AuthSession_expiresAt_idx" ON "AuthSession"("expiresAt");

ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "CheckoutIdempotency" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "responseJson" JSONB NOT NULL,
  "orderId" TEXT,
  "orderNumber" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CheckoutIdempotency_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CheckoutIdempotency_key_key" ON "CheckoutIdempotency"("key");
CREATE INDEX "CheckoutIdempotency_expiresAt_idx" ON "CheckoutIdempotency"("expiresAt");
