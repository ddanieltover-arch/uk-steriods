# Production Operations

## Runtime model

- Entry (dev): `npm run dev` → `tsx server.ts`
- Entry (prod): `npm run build` then `npm start` → `node dist/server.cjs`
- Notification worker: started inside the HTTP process via `startNotificationWorker()` (no separate process required for single-instance)

## Environment

See `.env.example` for PUBLIC / SERVER_ONLY / REQUIRED / OPTIONAL classifications.

Never expose `DATABASE_URL`, `AUTH_SECRET`, or `EMAIL_API_KEY` through `VITE_*` variables.

## PostgreSQL backup requirement

Operators **must** configure PostgreSQL backups independently of this application.

### Recommended strategy

| Item | Guidance |
|------|----------|
| Method | Managed provider snapshots **and/or** `pg_dump` logical dumps |
| Frequency | At least daily; before every production migration |
| Retention | Meet business RPO (example: 7–30 daily + weekly) |
| Encryption | At rest and in transit |
| Responsible operator | On-call / platform owner (assign named human) |

### Example logical backup (operator-run)

```bash
pg_dump --format=custom --file="uk_ecommerce_$(date +%Y%m%d).dump" "$DATABASE_URL"
```

### Example restore into disposable database (never onto live prod)

```bash
createdb uk_ecommerce_restore_test
pg_restore --clean --if-exists --dbname="$RESTORE_DATABASE_URL" uk_ecommerce_YYYYMMDD.dump
```

Then verify row presence for: User, Product, ProductInventory/VariantInventory, Order, OrderItem, Payment, Shipment, AuthSession, Notification, PasswordResetToken, AuditLog.

**Warning:** Untested backups are not a recovery plan. Restore drills must be performed periodically.

### Phase 15 status

Backup/restore verification was **not performed**. PostgreSQL was unreachable at `localhost:5432`. Docker Desktop’s Linux engine returned HTTP 500. See `docs/backup-restore.md`. This remains a **release blocker**.

## Local PostgreSQL (Docker Compose)

From the repo root, with Docker Desktop **engine healthy**:

```bash
npm run db:up
npx prisma migrate deploy
npm run db:seed
npx prisma migrate status
```

If `docker compose up -d` fails with engine API HTTP 500, the Linux engine is not ready (often WSL2). Do not use `prisma db push` as a substitute.

## Migrations

```bash
npx prisma validate
npx prisma generate
npx prisma migrate status
npx prisma migrate deploy   # production / staging apply
```

- Never edit applied migration files
- Do not use `prisma db push` as the production strategy when migrations exist
- Empty databases need `20260813000000_foundation` then later Phase 11–13 migrations, including `20260813220000_phase13_sessions_idempotency`

## Email

| Mode | Config | Status |
|------|--------|--------|
| Development | `EMAIL_PROVIDER=dev` | Logs only |
| Production | `EMAIL_PROVIDER=resend` + `EMAIL_API_KEY` | **Pending credential verification** unless keys are provisioned |

Checkout never waits on provider delivery. Failures stay in the outbox.

**Production email delivery pending provider credential verification.**

## Worker operations

- Conditional claim: `PENDING` → `PROCESSING` (`updateMany` where status still PENDING)
- Stale `PROCESSING` reclaimed after ~5 minutes
- Retries use `nextAttemptAt`
- `SENT` rows are not reprocessed
- Manual admin resend uses a distinct idempotency key

Worker restart: pending rows remain in PostgreSQL and are picked up after restart.

## Logging & monitoring

- Access log: timestamp, requestId, method, route, status, durationMs
- Slow API (≥400ms): warn with requestId
- Slow Prisma queries (≥500ms): warn (query truncated; no secrets)
- `ErrorReporter.captureException` for 500-class errors (console sink by default)

Never log passwords, session tokens, reset tokens, Authorization headers, API keys, or payment secrets.

## Health

- `GET /health` — process alive
- `GET /ready` — PostgreSQL `SELECT 1` (no credential leakage)

## Rollback

1. Point the process manager at the previous `dist/` artifact and restart
2. If a bad migration shipped: restore DB from pre-migrate backup to a recovered instance, then start the matching app version
3. Reconcile notification outbox (FAILED / PENDING) after restore
4. Sessions: customers re-authenticate if `AuthSession` table restored to older state
5. Inventory: prefer backup restore over manual patching after partial failure

Prisma does **not** provide automatic down migrations in this repository.

## Rate limiting

- Development / single instance: `MemoryRateLimitStore`
- Multi-instance: configure Redis and `RedisRateLimitStore` (optional; see `docs/deployment.md`)
