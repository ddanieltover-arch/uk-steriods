import { randomBytes } from 'crypto';
import type { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

const REQUEST_ID_RE = /^[A-Za-z0-9_-]{8,128}$/;

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const incoming = req.headers['x-request-id'];
  const candidate = typeof incoming === 'string' ? incoming.trim() : '';
  const id = REQUEST_ID_RE.test(candidate) ? candidate : randomBytes(16).toString('hex');
  req.requestId = id;
  res.setHeader('X-Request-ID', id);
  next();
}
