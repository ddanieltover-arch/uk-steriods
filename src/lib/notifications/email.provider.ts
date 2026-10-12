import { EmailMessage, EmailProvider, EmailSendResult, isValidEmail } from './notification.types';

export type { EmailProvider };

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const visible = local.slice(0, 1) || '*';
  return `${visible}***@${domain}`;
}

/** Strip wrapping quotes Vercel sometimes stores from pasted .env lines. */
export function readEmailEnv(value: string | undefined): string {
  let v = (value || '').trim();
  if (
    (v.startsWith('"') && v.endsWith('"') && v.length >= 2) ||
    (v.startsWith("'") && v.endsWith("'") && v.length >= 2)
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

export function emailApiKeyFrom(env: {
  EMAIL_API_KEY?: string;
  RESEND_API_KEY?: string;
}): string {
  return readEmailEnv(env.EMAIL_API_KEY) || readEmailEnv(env.RESEND_API_KEY);
}

/**
 * Resend is used when explicitly selected, or whenever an API key is present
 * and the provider was not forced to `dev`. An unset EMAIL_PROVIDER used to
 * fall through to the logger and mark mail as sent without delivery.
 */
export function resolveEmailTransport(env: {
  EMAIL_PROVIDER?: string;
  EMAIL_API_KEY?: string;
  RESEND_API_KEY?: string;
}): 'resend' | 'dev' {
  const explicit = readEmailEnv(env.EMAIL_PROVIDER).toLowerCase();
  if (explicit === 'dev') return 'dev';
  if (explicit === 'resend') return 'resend';
  if (emailApiKeyFrom(env)) return 'resend';
  return 'dev';
}

/**
 * Development-safe provider. Never sends real email.
 * Logs sanitized metadata only (no HTML body, no tokens, no secrets).
 */
export class DevLoggingEmailProvider implements EmailProvider {
  readonly name = 'dev-logging';
  public readonly sent: Array<{
    to: string;
    subject: string;
    idempotencyKey?: string;
    at: string;
  }> = [];

  async send(message: EmailMessage): Promise<EmailSendResult> {
    if (!isValidEmail(message.to.email)) {
      return {
        success: false,
        provider: this.name,
        errorCode: 'INVALID_RECIPIENT',
        errorMessage: 'Recipient email is invalid.',
        failureClass: 'INVALID_RECIPIENT',
      };
    }

    const record = {
      to: maskEmail(message.to.email),
      subject: message.subject,
      idempotencyKey: message.idempotencyKey,
      at: new Date().toISOString(),
    };
    this.sent.push(record);

    console.info('[email:dev]', {
      provider: this.name,
      to: record.to,
      subject: record.subject,
      idempotencyKey: record.idempotencyKey,
      hasHtml: Boolean(message.html),
      hasText: Boolean(message.text),
    });

    return {
      success: true,
      provider: this.name,
      messageId: `dev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    };
  }
}

/**
 * Optional Resend adapter. Only used when EMAIL_PROVIDER=resend and EMAIL_API_KEY is set.
 * Credentials never leave the server process.
 */
export class ResendEmailProvider implements EmailProvider {
  readonly name = 'resend';

  constructor(private readonly apiKey: string) {}

  async send(message: EmailMessage): Promise<EmailSendResult> {
    if (!isValidEmail(message.to.email)) {
      return {
        success: false,
        provider: this.name,
        errorCode: 'INVALID_RECIPIENT',
        errorMessage: 'Recipient email is invalid.',
        failureClass: 'INVALID_RECIPIENT',
      };
    }

    try {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      };
      // Resend dedupes on this HTTP header. It is not an email header.
      if (message.idempotencyKey) {
        headers['Idempotency-Key'] = message.idempotencyKey;
      }

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: message.from.name
            ? `${message.from.name} <${message.from.email}>`
            : message.from.email,
          to: [message.to.email],
          reply_to: message.replyTo?.email,
          subject: message.subject,
          html: message.html,
          text: message.text,
        }),
      });

      if (res.status === 429) {
        return {
          success: false,
          provider: this.name,
          errorCode: 'RATE_LIMITED',
          errorMessage: 'Provider rate limited the request.',
          failureClass: 'RATE_LIMITED',
        };
      }

      const body = (await res.json().catch(() => ({}))) as {
        id?: string;
        message?: string;
        name?: string;
      };

      if (!res.ok) {
        const permanent = res.status >= 400 && res.status < 500 && res.status !== 429;
        const detail = [body.name, body.message].filter(Boolean).join(': ');
        return {
          success: false,
          provider: this.name,
          errorCode: `HTTP_${res.status}`,
          errorMessage: detail || 'Provider rejected the message.',
          failureClass: permanent ? 'PERMANENT' : 'TRANSIENT',
        };
      }

      return {
        success: true,
        provider: this.name,
        messageId: body.id,
      };
    } catch (err: any) {
      return {
        success: false,
        provider: this.name,
        errorCode: 'PROVIDER_ERROR',
        errorMessage: err?.message || 'Provider request failed.',
        failureClass: 'TRANSIENT',
      };
    }
  }
}

export function createEmailProvider(): EmailProvider {
  const transport = resolveEmailTransport(process.env);
  const apiKey = emailApiKeyFrom(process.env);
  const isProduction = (process.env.NODE_ENV || '').toLowerCase() === 'production';

  if (transport === 'resend') {
    if (!apiKey) {
      const msg =
        '[email] Resend selected but EMAIL_API_KEY / RESEND_API_KEY is missing — cannot send mail';
      console.error(msg);
      if (isProduction) {
        throw new Error(msg);
      }
      console.warn('[email] Falling back to DevLoggingEmailProvider (non-production only)');
      return new DevLoggingEmailProvider();
    }

    console.info('[email] Active provider: resend', {
      from: readEmailEnv(process.env.EMAIL_FROM_ADDRESS) || 'sales@uk-steroids.co.uk',
      keyPrefix: `${apiKey.slice(0, 3)}…`,
    });
    return new ResendEmailProvider(apiKey);
  }

  console.warn(
    `[email] Active provider: dev-logging (EMAIL_PROVIDER=${readEmailEnv(process.env.EMAIL_PROVIDER) || 'unset'}). ` +
      'Set EMAIL_API_KEY or RESEND_API_KEY on the server to deliver real email.'
  );
  return new DevLoggingEmailProvider();
}

export function describeEmailProvider(): {
  configured: string;
  active: string;
  hasApiKey: boolean;
  from: string;
  replyTo: string | null;
  adminEmail: string | null;
} {
  const configured = readEmailEnv(process.env.EMAIL_PROVIDER).toLowerCase() || 'unset';
  const apiKey = emailApiKeyFrom(process.env);
  const transport = resolveEmailTransport(process.env);
  return {
    configured,
    active: transport === 'resend' && apiKey ? 'resend' : 'dev-logging',
    hasApiKey: Boolean(apiKey),
    from: readEmailEnv(process.env.EMAIL_FROM_ADDRESS) || 'sales@uk-steroids.co.uk',
    replyTo: readEmailEnv(process.env.EMAIL_REPLY_TO) || null,
    adminEmail:
      readEmailEnv(process.env.ADMIN_EMAIL) || readEmailEnv(process.env.EMAIL_REPLY_TO) || null,
  };
}

export function getEmailFromConfig() {
  return {
    email: readEmailEnv(process.env.EMAIL_FROM_ADDRESS) || 'sales@uk-steroids.co.uk',
    name: readEmailEnv(process.env.EMAIL_FROM_NAME) || 'Steroids UK',
  };
}

export function getEmailReplyTo() {
  const reply = readEmailEnv(process.env.EMAIL_REPLY_TO);
  return reply ? { email: reply } : undefined;
}
