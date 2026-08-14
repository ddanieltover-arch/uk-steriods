# Release Checklist — Phase 15

Items are checked **only after actual verification in this environment**. Date: 2026-08-14.

## DATABASE

- [ ] PostgreSQL reachable (`GET /ready` returns database ok)
- [ ] `npx prisma migrate status` shows no pending migrations
- [ ] `npx prisma migrate deploy` applied successfully on the target environment
- [x] Prisma schema validated (`npx prisma validate`)
- [ ] Seed completed (`npm run db:seed`)
- [ ] Integration tests passed against PostgreSQL (`npm run test:integration`)

**Evidence 2026-08-14:** `DATABASE_URL` host=`localhost` port=`5432` db=`uk_ecommerce`. `npx prisma migrate status` → P1001 cannot reach server. Docker Desktop client present; Linux engine API returned HTTP 500. WSL list unavailable. **BLOCKED.**

Pending migrations (cannot apply until DB is up):

- `20260813000000_foundation` (baseline added so empty databases can migrate)
- `20260813120000_search_performance_indexes`
- `20260813180000_notifications_outbox`
- `20260813220000_phase13_sessions_idempotency`

## BACKUP

- [ ] Backup created
- [ ] Restore completed into a disposable database
- [ ] Restore integrity verified

**Evidence 2026-08-14:** Not executed. Procedure: `docs/backup-restore.md`. **BLOCKED.**

## EMAIL

- [ ] Provider configured for production (`EMAIL_PROVIDER=resend` + server-only `EMAIL_API_KEY`)
- [ ] Test delivery completed to a designated inbox
- [x] Notification worker code path present (starts with Express)
- [x] Retry / stale PROCESSING unit coverage exists
- [x] **Production email delivery pending provider credential verification** (explicit)

## SECURITY

- [x] Security unit tests passed (`npx tsx test/security.test.ts`)
- [x] Secret scan passed (`npm run scan:secrets`) after production build
- [x] Cookie flags implemented (HttpOnly session, Secure in production, SameSite=Lax)
- [x] CSRF middleware present (double-submit)
- [x] CORS restricted to `CLIENT_ORIGIN`
- [x] CSP/security headers middleware present
- [ ] Live production cookie/CSRF/CORS/CSP smoke against a DB-backed production process (partial: `/health` + unauth admin 401 + track without token when server was running in Phase 14; not re-verified with `/ready` healthy)

## APPLICATION

- [x] Production build passed (`npm run build`)
- [ ] Production server started with `/ready` healthy
- [x] `/health` implementation present (verified in Phase 14 smoke)
- [ ] `/ready` passed with PostgreSQL
- [ ] Full smoke tests passed with database (`npm run smoke`)

## SIGN-OFF

| Item | Status | Notes |
|------|--------|-------|
| Build | VERIFIED | `npm run build` |
| Migrations | BLOCKED | PostgreSQL unreachable |
| Integration tests | BLOCKED | Skipped/failed: no DB |
| Smoke (DB) | BLOCKED | Catalogue/checkout need DB |
| Email | PENDING | No Resend credential |
| Backup/restore | BLOCKED | Not executed |
| Approver | | |

**RELEASE STATUS: NOT PRODUCTION READY**
