import { Request, Response, NextFunction } from 'express';
import { getRateLimitStore } from './rate-limit-store';

function clientKey(req: Request): string {
  return (
    (req.ip ||
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown') + (req.path || '')
  );
}

/**
 * Rate limiter backed by RateLimitStore (memory by default).
 * Multi-instance production should inject a distributed store via setRateLimitStore().
 */
export function rateLimit(options: { windowMs: number; max: number; message?: string }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = `${options.max}:${options.windowMs}:${clientKey(req)}`;
      const store = getRateLimitStore();
      const record = await store.incr(key, options.windowMs);

      if (record.count > options.max) {
        const retryAfter = Math.max(1, Math.ceil((record.resetAt - Date.now()) / 1000));
        res.setHeader('Retry-After', String(retryAfter));
        return res.status(429).json({
          error: {
            code: 'RATE_LIMITED',
            message: options.message || 'Too many requests. Please try again shortly.',
            requestId: req.requestId,
          },
        });
      }

      return next();
    } catch {
      // Fail open on store errors to avoid blocking legitimate traffic if store misconfigured
      return next();
    }
  };
}
