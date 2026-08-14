# Deployment Guide

Provider-neutral deployment for the UK Performance Supplements stack.

## Architecture constraints

This application is **not** a serverless-only SPA:

- Persistent **Node.js** process running Express (`server.ts` → `dist/server.cjs`)
- Embedded **notification outbox worker** started from the same process (`startNotificationWorker`)
- **PostgreSQL** required for readiness, sessions, checkout idempotency, orders, outbox
- Static Vite assets served by Express in production

Do **not** deploy as a static-only host without the Express server.

## Actual package.json commands

| Purpose | Command |
|---------|---------|
| Local development | `npm run dev` → `tsx server.ts` |
| Production build | `npm run build` → Vite client + esbuild `dist/server.cjs` |
| Production start | `npm start` → `node dist/server.cjs` |
| Typecheck / lint | `npm run lint` / `npm run typecheck` → `tsc --noEmit` |
| Unit + integration harness | `npm test` |
| DB integration only | `npm run test:integration` |
| Migrate status | `npm run db:migrate:status` |
| Migrate deploy | `npm run db:migrate:deploy` |
| Prisma generate | `npm run db:generate` |
| Seed | `npm run db:seed` |
| API smoke (server must be up) | `npm run smoke` |
| Frontend secret scan | `npm run scan:secrets` |

## Environments

### LOCAL

```bash
cp .env.example .env
# Start local PostgreSQL (Docker Desktop must be running with a healthy Linux engine):
docker compose up -d
# Wait until healthy, then:
npx prisma migrate deploy
npm run db:seed
npm run dev
```

- `EMAIL_PROVIDER=dev`
- `CLIENT_ORIGIN` includes `http://localhost:3001` (and Vite origin if used separately)
- Worker starts automatically with the HTTP process

### STAGING

Same build/start as production with non-production data and a disposable database.

```bash
npm run build
NODE_ENV=production npm start
```

Verify:

```bash
curl -sS https://staging.example/health
curl -sS https://staging.example/ready
npm run smoke   # BASE_URL=https://staging.example
```

### PRODUCTION

1. **Backup** PostgreSQL (see `docs/production-operations.md`)
2. Set production env (see `.env.example` classifications)
3. `npm ci`
4. `npx prisma generate`
5. `npx prisma migrate deploy`
6. `npm run build`
7. `NODE_ENV=production npm start`
8. Health / ready / smoke

## Safe deployment order (zero-downtime oriented)

1. Database backup (verified restore previously tested on disposable DB)
2. Apply **compatible** forward migrations (`prisma migrate deploy`)
3. Deploy application build (`dist/` + `dist/server.cjs`)
4. Restart Node process (worker starts with server)
5. `GET /health`
6. `GET /ready`
7. Smoke tests (`npm run smoke`)
8. Monitor structured access / error logs (`X-Request-ID`)

Avoid destructive schema changes without a maintenance window and explicit rollback plan.

## Health checks for load balancers

- Liveness: `GET /health` → `{ "status": "ok" }`
- Readiness: `GET /ready` → 200 when PostgreSQL answers; 503 when not

Do not route traffic to instances that fail `/ready`.

## Rollback

See `docs/production-operations.md` § Rollback.

Summary:

- Prefer rolling back the **application artifact** to the previous build
- Prisma migrations are **forward-only** in this project — do not assume automatic down migrations
- If a migration corrupted data, restore from the pre-deploy backup onto a recovered instance

## Rate limiting (multi-instance)

Default: in-memory `MemoryRateLimitStore` (single process).

For multiple Node replicas, inject `RedisRateLimitStore` via `setRateLimitStore()` when `REDIS_URL` and a Redis client are available (`src/lib/middleware/redis-rate-limit-store.ts`). Redis is **optional** and not required for single-instance production.
