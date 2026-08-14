import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { getEnv } from '../config/env';
import { ErrorReporter } from '../observability/error-reporter';

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public status = 400,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

function safeMessage(err: unknown, isProduction: boolean): { code: string; message: string; status: number } {
  if (err instanceof AppError) {
    return { code: err.code, message: err.message, status: err.status };
  }
  if (err instanceof ZodError) {
    return {
      code: 'INVALID_REQUEST',
      message: isProduction ? 'The request could not be processed.' : err.issues.map((e) => e.message).join('; '),
      status: 400,
    };
  }
  if (err && typeof err === 'object' && 'code' in err && (err as { code?: string }).code === 'P2025') {
    return { code: 'NOT_FOUND', message: 'Resource not found.', status: 404 };
  }

  const msg = err instanceof Error ? err.message : 'Unexpected error';
  const known = [
    'Invalid credentials',
    'Account is deactivated',
    'Not authenticated',
    'Insufficient permissions',
    'Session expired',
    'Cart is empty',
    'Invalid CSRF',
  ];
  if (known.some((k) => msg.includes(k)) || msg.length < 120) {
    if (/prisma|sql|database|ECONNREFUSED|password|secret/i.test(msg) && isProduction) {
      return { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.', status: 500 };
    }
  }

  if (isProduction) {
    return { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.', status: 500 };
  }

  return { code: 'INTERNAL_ERROR', message: msg, status: 500 };
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const env = getEnv();
  const safe = safeMessage(err, env.isProduction);

  if (safe.status >= 500) {
    ErrorReporter.captureException(err, {
      requestId: req.requestId,
      method: req.method,
      route: req.path,
      code: safe.code,
    });
  }

  const body: Record<string, unknown> = {
    error: {
      code: safe.code,
      message: safe.message,
      requestId: req.requestId,
    },
  };

  if (!env.isProduction && err instanceof Error && err.stack) {
    (body.error as Record<string, unknown>).debug = err.message;
  }

  res.status(safe.status).json(body);
}
