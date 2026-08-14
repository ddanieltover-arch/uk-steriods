import type { Request, Response, NextFunction } from 'express';
import { getEnv } from '../config/env';

/**
 * Production-compatible CSP based on actual app usage:
 * - Vite-built SPA scripts/styles from same origin
 * - Google Fonts (stylesheet + fonts.gstatic)
 * - Images from same origin + https (product CDN URLs)
 * - API fetch same-origin
 * - No unsafe-eval
 * - style-src allows Google Fonts; avoid unsafe-inline where possible
 *   (Vite may inject inline styles in some cases — allow 'unsafe-inline' for style only, documented)
 */
export function securityHeaders(_req: Request, res: Response, next: NextFunction) {
  const env = getEnv();

  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  );

  if (env.cookieSecure || env.isProduction) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  const connectSrc = env.isDevelopment
    ? "connect-src 'self' ws: wss: http://localhost:* https://localhost:*"
    : "connect-src 'self'";

  const scriptSrc = env.isDevelopment
    ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'" // Vite React refresh preamble + HMR in development only
    : "script-src 'self'";

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    scriptSrc,
    // Styles: self + Google Fonts CSS. unsafe-inline needed for some Vite/CSS-in-JS edge cases.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    // Product images may be absolute https URLs configured by admins.
    "img-src 'self' data: blob: https:",
    connectSrc,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);
  next();
}
