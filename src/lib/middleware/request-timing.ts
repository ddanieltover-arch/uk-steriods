import { Request, Response, NextFunction } from 'express';

const SLOW_API_MS = 400;

/**
 * Logs slow API requests with request ID, route, duration, and status.
 * Does not log bodies or query strings (may contain tokens).
 */
export function requestTiming(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    const durationMs = Date.now() - start;
    if (req.path.startsWith('/api/') && durationMs >= SLOW_API_MS) {
      console.warn(
        JSON.stringify({
          level: 'warn',
          type: 'slow-request',
          timestamp: new Date().toISOString(),
          requestId: req.requestId,
          method: req.method,
          route: req.path,
          status: res.statusCode,
          durationMs,
        })
      );
    }
  });
  next();
}
