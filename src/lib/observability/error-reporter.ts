/**
 * Lightweight error monitoring abstraction.
 * Development: structured console logging.
 * Production: same safe console sink by default; swap via setErrorReporter()
 * when an external provider is configured (do not scatter provider SDKs).
 */

export type ErrorContext = {
  requestId?: string;
  route?: string;
  method?: string;
  actorId?: string;
  code?: string;
  extra?: Record<string, unknown>;
};

export interface ErrorReporterSink {
  captureException(error: unknown, context?: ErrorContext): void;
  captureMessage(message: string, context?: ErrorContext): void;
}

function sanitizeContext(context?: ErrorContext): ErrorContext | undefined {
  if (!context) return undefined;
  const extra = context.extra ? { ...context.extra } : undefined;
  if (extra) {
    for (const key of Object.keys(extra)) {
      if (/password|token|authorization|secret|api[_-]?key|cookie/i.test(key)) {
        extra[key] = '[REDACTED]';
      }
    }
  }
  return { ...context, extra };
}

function toSafeMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
      .replace(/Bearer\s+\S+/gi, 'Bearer [REDACTED]')
      .replace(/password[=:]\s*\S+/gi, 'password=[REDACTED]');
  }
  return 'Unknown error';
}

class ConsoleErrorReporter implements ErrorReporterSink {
  captureException(error: unknown, context?: ErrorContext): void {
    const safe = sanitizeContext(context);
    console.error(
      JSON.stringify({
        level: 'error',
        timestamp: new Date().toISOString(),
        message: toSafeMessage(error),
        name: error instanceof Error ? error.name : 'Error',
        ...safe,
      })
    );
  }

  captureMessage(message: string, context?: ErrorContext): void {
    const safe = sanitizeContext(context);
    console.warn(
      JSON.stringify({
        level: 'warn',
        timestamp: new Date().toISOString(),
        message,
        ...safe,
      })
    );
  }
}

let sink: ErrorReporterSink = new ConsoleErrorReporter();

export const ErrorReporter = {
  captureException(error: unknown, context?: ErrorContext) {
    sink.captureException(error, sanitizeContext(context));
  },
  captureMessage(message: string, context?: ErrorContext) {
    sink.captureMessage(message, sanitizeContext(context));
  },
  setSink(next: ErrorReporterSink) {
    sink = next;
  },
  resetSink() {
    sink = new ConsoleErrorReporter();
  },
};
