import type { Request, Response, NextFunction } from 'express';

/**
 * Structured access log for API requests.
 * Includes request ID, method, route, status, duration.
 * Never logs bodies, Authorization headers, cookies, or tokens.
 */
export function accessLog(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    if (!req.path.startsWith('/api/') && req.path !== '/health' && req.path !== '/ready') {
      return;
    }
    const durationMs = Date.now() - start;
    const entry = {
      level: 'info',
      type: 'access',
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
      method: req.method,
      route: req.path,
      status: res.statusCode,
      durationMs,
    };
    if (res.statusCode >= 500) {
      console.error(JSON.stringify(entry));
    } else {
      console.log(JSON.stringify(entry));
    }
  });
  next();
}
