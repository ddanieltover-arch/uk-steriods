# Security Model (Phase 13)

## Authentication

- Passwords are hashed with **bcryptjs** (cost factor 12). Plaintext passwords are never stored or logged.
- Sessions use cryptographically random tokens (`sess_` + 32 bytes hex).
- The raw session token is set only in an **HttpOnly** `session_id` cookie.
- The database stores **SHA-256(token)** in `AuthSession.tokenHash` — never the raw token.
- Sessions expire after 30 days. Logout deletes the server-side session row.
- Password change and password reset **invalidate all** of the user’s sessions.
- Password reset tokens are hashed, single-use, and expire after 30 minutes.
- Password-reset request responses are enumeration-safe:

> If an account exists for this email address, password reset instructions will be sent.

- Browser clients must **not** store session tokens in `localStorage`. Use `credentials: 'include'` via `src/lib/api/client.ts`.
- Bearer `Authorization` remains supported for non-browser API clients; CSRF is skipped for Bearer requests.

## CSRF

Double-submit cookie pattern:

1. Server sets readable `csrf_token` cookie (not HttpOnly).
2. Browser sends the same value in `X-CSRF-Token` on state-changing requests when `session_id` cookie is present.
3. GET/HEAD/OPTIONS are unaffected.
4. Login/register/password-reset request bootstrap paths are exempt so a session can be established.

## CORS

- Origins allowed only from `CLIENT_ORIGIN` (comma-separated).
- Credentialed responses never use `Access-Control-Allow-Origin: *`.

## Security headers

- `Content-Security-Policy` (production: no `unsafe-eval`; development allows Vite HMR)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera/mic/geo/payment/usb disabled)
- `Strict-Transport-Security` when Secure cookies / production
- `X-Frame-Options: DENY` / CSP `frame-ancestors 'none'`

CSP `style-src` includes `'unsafe-inline'` for Vite/CSS compatibility (documented). Scripts do not use `unsafe-inline` in production.

## Authorization / RBAC

Permissions are defined in `RBACService` (`src/lib/services/rbac.service.ts`). Admin routes call `requirePermission(...)` server-side. Frontend route guards are not authoritative.

STAFF does **not** receive: role management, settings manage, payment confirmation, discount manage, notification resend, destructive product delete (beyond existing matrix).

## Rate limiting

`RateLimitStore` abstraction (`memory` default). Suitable for a single Node process.

Multi-instance production should inject `RedisRateLimitStore` (`src/lib/middleware/redis-rate-limit-store.ts`) when Redis/Upstash is available. Redis is optional and not required for local development.

## Logging

Do not log passwords, session tokens, reset tokens, Authorization headers, API keys, or payment secrets. Prefer request IDs, actor IDs, action, entity, entity ID.

Structured access logs include: timestamp, requestId, method, route, status, durationMs.

## Error monitoring

`ErrorReporter` (`src/lib/observability/error-reporter.ts`) centralizes exception capture. Default sink is safe console JSON. Swap sinks via `ErrorReporter.setSink()` — do not scatter third-party SDKs through business code.

## Request IDs

Every response includes `X-Request-ID`. Clients may supply a valid ID; otherwise the server generates one.

## Health

- `GET /health` — process liveness
- `GET /ready` — PostgreSQL connectivity (no credential leakage)

## Images

Product images are URL-only. Admin-supplied HTTPS URLs must remain compatible with CSP `img-src 'self' data: blob: https:`. No executable upload pipeline is enabled.
