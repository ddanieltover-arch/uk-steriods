# API Security

## Base

- REST under `/api/v1/*`
- Money in integer pence; server services are authoritative for price, tax, shipping, discount, inventory, and payment status.
- Clients must never supply `userId`, `role`, payment status, or order status for self-authorization.

## Auth

| Mechanism | Use |
|-----------|-----|
| Cookie `session_id` | Browser SPA (preferred) |
| `Authorization: Bearer <session>` | Non-browser API clients |
| CSRF `X-CSRF-Token` | Required for cookie-auth mutations |

## Error format

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request could not be processed.",
    "requestId": "…"
  }
}
```

Production responses omit stack traces, Prisma/SQL internals, and filesystem paths.

## Sensitive routes (examples)

- Account / addresses / orders / wishlist — scoped to authenticated user ID from session
- Guest tracking — order number + high-entropy tracking token; PII masked
- Admin — RBAC permission checks + audit log on mutations
- Checkout — server calculation; durable idempotency via `CheckoutIdempotency`
- Password reset — hashed one-time tokens; generic responses

## Checkout idempotency

Header or body idempotency key is claimed in PostgreSQL (`CheckoutIdempotency.key` unique). Same key returns the original successful response; concurrent duplicates are rejected while `IN_PROGRESS`.

## Notification outbox

`Notification` rows are claimed with conditional `PENDING → PROCESSING` updates. Stale `PROCESSING` rows are reclaimed after 5 minutes. Manual resend uses a distinct idempotency key.
