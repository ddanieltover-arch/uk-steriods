import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import type { Request, Response, NextFunction } from 'express';
import { getEnv } from '../config/env';

export const CSRF_COOKIE = 'csrf_token';
export const CSRF_HEADER = 'x-csrf-token';

export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

export function hashToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex');
}

export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/**
 * Ensures a CSRF cookie exists for browser clients.
 * Cookie is readable by JS (not HttpOnly) for double-submit pattern.
 */
export function ensureCsrfCookie(req: Request, res: Response): string {
  const existing = req.cookies?.[CSRF_COOKIE] as string | undefined;
  if (existing && existing.length >= 32) return existing;

  const token = generateCsrfToken();
  const env = getEnv();
  res.cookie(CSRF_COOKIE, token, {
    httpOnly: false,
    secure: env.cookieSecure,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });
  return token;
}

function hasBearerAuth(req: Request): boolean {
  const h = req.headers.authorization;
  return typeof h === 'string' && h.toLowerCase().startsWith('bearer ');
}

/**
 * CSRF defense for cookie-authenticated state-changing requests.
 * Bearer-authenticated API clients are exempt (no cookie session reliance).
 */
export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  const method = req.method.toUpperCase();
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    ensureCsrfCookie(req, res);
    return next();
  }

  // Safe paths that establish auth / CSRF bootstrap
  const path = req.path;
  if (
    path === '/api/v1/auth/csrf' ||
    path === '/api/v1/auth/login' ||
    path === '/api/v1/auth/register' ||
    path === '/api/v1/auth/password-reset/request' ||
    path === '/health' ||
    path === '/ready'
  ) {
    return next();
  }

  if (hasBearerAuth(req)) {
    return next();
  }

  // Only enforce when a session cookie is present (cookie-auth browser flow)
  const hasSessionCookie = Boolean(req.cookies?.session_id);
  if (!hasSessionCookie) {
    return next();
  }

  const cookieToken = req.cookies?.[CSRF_COOKIE] as string | undefined;
  const headerToken = (req.headers[CSRF_HEADER] || req.headers['x-xsrf-token']) as string | undefined;

  if (!cookieToken || !headerToken || !safeEqual(cookieToken, headerToken)) {
    return res.status(403).json({
      error: {
        code: 'CSRF_REJECTED',
        message: 'Invalid or missing CSRF token.',
        requestId: req.requestId,
      },
    });
  }

  return next();
}
