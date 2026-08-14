# Backup and restore verification

Never commit credentials. Use `DATABASE_URL` from the environment only.

Phase 15 status: **not verified** — PostgreSQL was unreachable, so no dump/restore was executed.

## Recommended frequency

- Daily automated dump or provider snapshot
- Immediate dump before every `prisma migrate deploy`
- Retain according to RPO (example: 7 daily + 4 weekly)

## Backup (logical)

```bash
pg_dump --format=custom --file="uk_ecommerce_$(date +%Y%m%d).dump" "$DATABASE_URL"
```

Docker Compose (local only, uses the compose service user/db names — still do not commit production secrets):

```bash
docker compose exec -T postgres pg_dump -U postgres -d uk_ecommerce -Fc > uk_ecommerce.dump
```

## Restore into a disposable database (never onto live production)

```bash
createdb uk_ecommerce_restore_test
pg_restore --clean --if-exists --dbname="$RESTORE_DATABASE_URL" uk_ecommerce_YYYYMMDD.dump
```

Local Docker example (separate database in the same instance):

```bash
docker compose exec -T postgres createdb -U postgres uk_ecommerce_restore_test
docker compose exec -T postgres pg_restore -U postgres -d uk_ecommerce_restore_test --clean --if-exists < uk_ecommerce.dump
```

Point a throwaway `DATABASE_URL` at the restore database, then:

```bash
npx prisma migrate status
npx prisma validate
npm run test:integration
```

## Integrity checks after restore

Confirm non-zero or expected counts for:

- User
- Product / ProductInventory / VariantInventory
- Order / OrderItem / Payment / Shipment
- AuthSession
- Notification
- PasswordResetToken
- AuditLog

## Recovery procedure

1. Stop application processes.
2. Restore from the last known-good dump/snapshot into a recovered instance.
3. Start the **matching** application version.
4. Confirm `/health` and `/ready`.
5. Reconcile notification outbox (`PENDING` / `FAILED`).
6. Customers may need to sign in again if sessions restored to an older state.

Untested backups are not a recovery plan.
