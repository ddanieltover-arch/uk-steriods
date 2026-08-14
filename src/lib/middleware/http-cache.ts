import { Request, Response, NextFunction } from 'express';

export function publicCache(maxAgeSeconds: number) {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader(
      'Cache-Control',
      `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${Math.max(maxAgeSeconds * 2, 60)}`
    );
    next();
  };
}

export function noStore(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('Cache-Control', 'no-store, private');
  next();
}
