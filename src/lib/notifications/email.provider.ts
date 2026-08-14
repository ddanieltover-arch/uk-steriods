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
  const providerName = (process.env.EMAIL_PROVIDER || 'dev').toLowerCase();
  const apiKey = process.env.EMAIL_API_KEY;

  if (providerName === 'resend' && apiKey) {
    return new ResendEmailProvider(apiKey);
  }

  return new DevLoggingEmailProvider();
}

export function getEmailFromConfig() {
  return {
    email: process.env.EMAIL_FROM_ADDRESS || 'noreply@ukperformance.local',
    name: process.env.EMAIL_FROM_NAME || 'UK Performance',
  };
}

export function getEmailReplyTo() {
  const reply = process.env.EMAIL_REPLY_TO;
  return reply ? { email: reply } : undefined;
}
