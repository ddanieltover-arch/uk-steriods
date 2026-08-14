import type { Request, Response, NextFunction } from 'express';
import { getEnv } from '../config/env';

/**
 * Restrict CORS to configured CLIENT_ORIGIN list.
 * Never pairs Access-Control-Allow-Origin: * with credentials.
 */
export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  const env = getEnv();
  const origin = req.headers.origin;

  if (origin && env.clientOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-CSRF-Token, X-Request-ID, Idempotency-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Max-Age', '86400');
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  return next();
}
