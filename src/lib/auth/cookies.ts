import type { CookieOptions, Response } from 'express';
import { getEnv } from '../config/env';

export const SESSION_COOKIE = 'session_id';
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export function sessionCookieOptions(): CookieOptions {
  const env = getEnv();
  return {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_MS,
  };
}

export function setSessionCookie(res: Response, sessionId: string) {
  res.cookie(SESSION_COOKIE, sessionId, sessionCookieOptions());
}

export function clearSessionCookie(res: Response) {
  const env = getEnv();
  res.clearCookie(SESSION_COOKIE, {
    path: '/',
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: 'lax',
  });
}
