/**
 * Optional Redis-compatible RateLimitStore.
 *
 * Not wired by default. Requires a Redis/Upstash client to be injected.
 * Local development continues to use MemoryRateLimitStore.
 *
 * Multi-instance production: setRateLimitStore(new RedisRateLimitStore(client))
 * after connecting your Redis provider. Do not commit Redis credentials.
 *
 * REDIS_URL is documented as OPTIONAL / SERVER_ONLY. No Redis npm dependency
 * is required until an operator chooses to add one.
 */

import type { RateLimitRecord, RateLimitStore } from './rate-limit-store';
import { MemoryRateLimitStore } from './rate-limit-store';

/** Minimal Redis surface needed for rate limiting (compatible with ioredis / node-redis). */
export interface RedisLike {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode: 'PX', ttlMs: number): Promise<unknown>;
  incr(key: string): Promise<number>;
  pexpire(key: string, ttlMs: number): Promise<unknown>;
  pttl(key: string): Promise<number>;
}

export class RedisRateLimitStore implements RateLimitStore {
  constructor(
    private redis: RedisLike,
    private prefix = 'rl:'
  ) {}

  private key(key: string) {
    return `${this.prefix}${key}`;
  }

  async get(key: string): Promise<RateLimitRecord | null> {
    const raw = await this.redis.get(this.key(key));
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as RateLimitRecord;
      if (!parsed || typeof parsed.count !== 'number') return null;
      if (Date.now() > parsed.resetAt) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  async set(key: string, record: RateLimitRecord): Promise<void> {
    const ttl = Math.max(1, record.resetAt - Date.now());
    await this.redis.set(this.key(key), JSON.stringify(record), 'PX', ttl);
  }

  async incr(key: string, windowMs: number): Promise<RateLimitRecord> {
    const k = this.key(key);
    const count = await this.redis.incr(k);
    if (count === 1) {
      await this.redis.pexpire(k, windowMs);
      return { count: 1, resetAt: Date.now() + windowMs };
    }
    const ttl = await this.redis.pttl(k);
    const resetAt = Date.now() + (ttl > 0 ? ttl : windowMs);
    return { count, resetAt };
  }
}

/**
 * Factory: Memory by default. Pass redisClient + REDIS_URL for distributed limiting.
 */
export function createRateLimitStoreFromEnv(options?: {
  redisClient?: RedisLike | null;
}): RateLimitStore {
  if (options?.redisClient && process.env.REDIS_URL) {
    return new RedisRateLimitStore(options.redisClient);
  }
  return new MemoryRateLimitStore();
}
