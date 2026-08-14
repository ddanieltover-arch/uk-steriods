-- Phase 12: transactional notification outbox + password reset tokens

CREATE TYPE "NotificationEventType" AS ENUM (
  'ORDER_CREATED',
  'PAYMENT_INSTRUCTIONS',
  'PAYMENT_CONFIRMED',
  'ORDER_PROCESSING',
  'ORDER_SHIPPED',
  'ORDER_DELIVERED',
  'ORDER_CANCELLED',
  'PASSWORD_CHANGED',
  'PASSWORD_RESET_REQUESTED',
  'ACCOUNT_CREATED'
);

CREATE TYPE "NotificationChannel" AS ENUM ('EMAIL');

CREATE TYPE "NotificationStatus" AS ENUM (
  'PENDING',
  'PROCESSING',
  'SENT',
  'FAILED',
  'CANCELLED'
);

CREATE TYPE "NotificationFailureClass" AS ENUM (
  'TRANSIENT',
  'PERMANENT',
  'INVALID_RECIPIENT',
  'PROVIDER_ERROR',
  'RATE_LIMITED'
);

CREATE TABLE "Notification" (
  "id" TEXT NOT NULL,
  "eventType" "NotificationEventType" NOT NULL,
  "channel" "NotificationChannel" NOT NULL DEFAULT 'EMAIL',
  "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
  "recipient" TEXT NOT NULL,
  "subject" TEXT,
  "userId" TEXT,
  "orderId" TEXT,
  "idempotencyKey" TEXT NOT NULL,
  "provider" TEXT,
  "providerMessageId" TEXT,
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "maxAttempts" INTEGER NOT NULL DEFAULT 3,
  "nextAttemptAt" TIMESTAMP(3),
  "lastAttemptAt" TIMESTAMP(3),
  "sentAt" TIMESTAMP(3),
  "failedAt" TIMESTAMP(3),
  "failureClass" "NotificationFailureClass",
  "errorCode" TEXT,
  "errorMessage" TEXT,
  "payload" JSONB,
  "isManualResend" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Notification_idempotencyKey_key" ON "Notification"("idempotencyKey");
CREATE INDEX "Notification_status_nextAttemptAt_idx" ON "Notification"("status", "nextAttemptAt");
CREATE INDEX "Notification_eventType_idx" ON "Notification"("eventType");
CREATE INDEX "Notification_orderId_idx" ON "Notification"("orderId");
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");
CREATE INDEX "Notification_recipient_idx" ON "Notification"("recipient");

ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "PasswordResetToken" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");
CREATE INDEX "PasswordResetToken_expiresAt_idx" ON "PasswordResetToken"("expiresAt");

ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
