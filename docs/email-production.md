# Production email verification

## Configuration (server-only)

| Variable | Role |
|----------|------|
| `EMAIL_PROVIDER` | `dev` (default) or `resend` |
| `EMAIL_API_KEY` | Required when `EMAIL_PROVIDER=resend` in production |
| `EMAIL_FROM_ADDRESS` | From mailbox |
| `EMAIL_FROM_NAME` | From display name |
| `EMAIL_REPLY_TO` | Optional reply-to |

Never prefix these with `VITE_`. Never log API keys or reset tokens.

## Development

`EMAIL_PROVIDER=dev` uses `DevLoggingEmailProvider`. Checkout and auth enqueue outbox rows; the worker “sends” by logging masked recipients.

## Production procedure (Resend)

1. Set `EMAIL_PROVIDER=resend` and `EMAIL_API_KEY` on the server.
2. Confirm startup: missing API key must fail env validation in production.
3. Place a **demo** order (fictional catalogue) to a designated test inbox.
4. Confirm outbox: `PENDING` → `PROCESSING` → `SENT`.
5. Confirm events as they occur:

- ORDER_CREATED
- PAYMENT_INSTRUCTIONS (same checkout path as order created where applicable)
- PAYMENT_CONFIRMED (admin payment confirmation — not client-set)
- ORDER_PROCESSING / ORDER_SHIPPED / ORDER_DELIVERED / ORDER_CANCELLED
- ACCOUNT_CREATED
- PASSWORD_RESET_REQUESTED
- PASSWORD_CHANGED

6. Confirm failed provider calls do not fail checkout HTTP.
7. Confirm duplicate business events reuse `idempotencyKey`.
8. Confirm admin manual resend uses a distinct idempotency key.

## Phase 15 status

Transactional email is live when `EMAIL_PROVIDER=resend` and `EMAIL_API_KEY` (or `RESEND_API_KEY`) are set on the **running server / Vercel project**.

If Admin → Notifications shows `provider: dev-logging`, real mail was not sent. Fix env vars, redeploy/restart, then run:

```bash
npm run email:requeue-dev
```

to re-deliver rows that were falsely marked SENT.
