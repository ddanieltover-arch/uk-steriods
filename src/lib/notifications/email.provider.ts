import { EmailMessage, EmailProvider, EmailSendResult, isValidEmail } from './notification.types';

export type { EmailProvider };

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const visible = local.slice(0, 1) || '*';
  return `${visible}***@${domain}`;
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
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: message.from.name
            ? `${message.from.name} <${message.from.email}>`
            : message.from.email,
          to: [message.to.email],
          reply_to: message.replyTo?.email,
          subject: message.subject,
          html: message.html,
          text: message.text,
          headers: message.idempotencyKey
            ? { 'Idempotency-Key': message.idempotencyKey }
            : undefined,
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

      const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string };

      if (!res.ok) {
        const permanent = res.status >= 400 && res.status < 500 && res.status !== 429;
        return {
          success: false,
          provider: this.name,
          errorCode: `HTTP_${res.status}`,
          errorMessage: body.message || 'Provider rejected the message.',
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
  const providerName = (process.env.EMAIL_PROVIDER || 'dev').toLowerCase().trim();
  const apiKey = (process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY || '').trim();
  const isProduction = (process.env.NODE_ENV || '').toLowerCase() === 'production';

  if (providerName === 'resend') {
    if (!apiKey) {
      const msg =
        '[email] EMAIL_PROVIDER=resend but EMAIL_API_KEY / RESEND_API_KEY is missing — cannot send mail';
      console.error(msg);
      if (isProduction) {
        throw new Error(msg);
      }
      console.warn('[email] Falling back to DevLoggingEmailProvider (non-production only)');
      return new DevLoggingEmailProvider();
    }

    console.info('[email] Active provider: resend', {
      from: process.env.EMAIL_FROM_ADDRESS || 'sales@uk-steroids.co.uk',
      keyPrefix: `${apiKey.slice(0, 3)}…`,
    });
    return new ResendEmailProvider(apiKey);
  }

  console.warn(
    `[email] Active provider: dev-logging (EMAIL_PROVIDER=${providerName || 'dev'}). ` +
      'Set EMAIL_PROVIDER=resend and EMAIL_API_KEY on the server to deliver real email.'
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
  const configured = (process.env.EMAIL_PROVIDER || 'dev').toLowerCase().trim();
  const apiKey = (process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY || '').trim();
  return {
    configured,
    active: configured === 'resend' && apiKey ? 'resend' : 'dev-logging',
    hasApiKey: Boolean(apiKey),
    from: process.env.EMAIL_FROM_ADDRESS || 'sales@uk-steroids.co.uk',
    replyTo: process.env.EMAIL_REPLY_TO || null,
    adminEmail: process.env.ADMIN_EMAIL || process.env.EMAIL_REPLY_TO || null,
  };
}

export function getEmailFromConfig() {
  return {
    email: process.env.EMAIL_FROM_ADDRESS || 'sales@uk-steroids.co.uk',
    name: process.env.EMAIL_FROM_NAME || 'Steroids UK',
  };
}

export function getEmailReplyTo() {
  const reply = process.env.EMAIL_REPLY_TO;
  return reply ? { email: reply } : undefined;
}
