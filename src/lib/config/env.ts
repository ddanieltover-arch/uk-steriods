import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  AUTH_SECRET: z.string().min(16, 'AUTH_SECRET must be at least 16 characters').optional(),
  SITE_URL: z.string().url().optional(),
  PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  CLIENT_ORIGIN: z.string().optional(),
  EMAIL_PROVIDER: z.enum(['dev', 'resend']).default('dev'),
  EMAIL_FROM_ADDRESS: z.string().optional(),
  EMAIL_FROM_NAME: z.string().optional(),
  EMAIL_REPLY_TO: z.string().optional(),
  EMAIL_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  NOTIFICATION_POLL_MS: z.coerce.number().int().positive().default(5000),
  ALLOW_EMAIL_PREVIEW: z.string().optional(),
  COOKIE_SECURE: z.string().optional(),
});

export type AppEnv = z.infer<typeof EnvSchema> & {
  isProduction: boolean;
  isDevelopment: boolean;
  siteUrl: string;
  clientOrigins: string[];
  cookieSecure: boolean;
};

let cached: AppEnv | null = null;

export function loadEnv(env: NodeJS.ProcessEnv = process.env): AppEnv {
  if (cached) return cached;

  // Prefer Prisma-oriented Neon / Vercel Postgres URLs when present.
  if (!env.DATABASE_URL && (env.POSTGRES_PRISMA_URL || env.POSTGRES_URL || env.DATABASE_URL_UNPOOLED)) {
    env.DATABASE_URL =
      env.POSTGRES_PRISMA_URL || env.POSTGRES_URL || env.DATABASE_URL_UNPOOLED;
  }

  // channel_binding=require can break Prisma on some serverless runtimes.
  if (env.DATABASE_URL && /channel_binding=require/i.test(env.DATABASE_URL)) {
    env.DATABASE_URL = env.DATABASE_URL
      .replace(/([?&])channel_binding=require&?/i, '$1')
      .replace(/[?&]$/, '');
  }

  const parsed = EnvSchema.safeParse(env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(`Invalid environment configuration: ${issues}`);
  }

  const data = parsed.data;
  const isProduction = data.NODE_ENV === 'production';
  const isDevelopment = data.NODE_ENV === 'development';

  if (isProduction && (!data.AUTH_SECRET || data.AUTH_SECRET.length < 16)) {
    throw new Error('AUTH_SECRET (min 16 characters) is required in production.');
  }

  const emailApiKey = data.EMAIL_API_KEY || data.RESEND_API_KEY;

  if (isProduction && data.EMAIL_PROVIDER === 'resend' && !emailApiKey) {
    throw new Error('EMAIL_API_KEY or RESEND_API_KEY is required when EMAIL_PROVIDER=resend in production.');
  }

  if (isProduction && data.EMAIL_PROVIDER === 'dev') {
    console.warn(
      '[env] WARNING: EMAIL_PROVIDER=dev in production — emails will not be delivered externally.'
    );
  }

  const siteUrl = (
    data.SITE_URL ||
    data.PUBLIC_SITE_URL ||
    data.NEXT_PUBLIC_SITE_URL ||
    `http://localhost:${data.PORT}`
  ).replace(/\/$/, '');

  const clientOrigins = (data.CLIENT_ORIGIN || siteUrl)
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean);

  const cookieSecure =
    data.COOKIE_SECURE === 'true' || (data.COOKIE_SECURE !== 'false' && isProduction);

  cached = {
    ...data,
    EMAIL_API_KEY: emailApiKey,
    isProduction,
    isDevelopment,
    siteUrl,
    clientOrigins,
    cookieSecure,
  };

  return cached;
}

export function getEnv(): AppEnv {
  return cached || loadEnv();
}

export function resetEnvCache() {
  cached = null;
}
