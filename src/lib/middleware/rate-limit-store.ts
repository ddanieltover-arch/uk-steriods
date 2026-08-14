/**
 * Rate limit store abstraction.
 * Memory implementation for single-process / development.
 * Production multi-instance deployments should swap in a distributed store later.
 */

export interface RateLimitRecord {
  count: number;
  resetAt: number;
}

export interface RateLimitStore {
  get(key: string): Promise<RateLimitRecord | null>;
  set(key: string, record: RateLimitRecord): Promise<void>;
  incr(key: string, windowMs: number): Promise<RateLimitRecord>;
}

export class MemoryRateLimitStore implements RateLimitStore {
  private buckets = new Map<string, RateLimitRecord>();

  async get(key: string): Promise<RateLimitRecord | null> {
    const rec = this.buckets.get(key);
    if (!rec) return null;
    if (Date.now() > rec.resetAt) {
      this.buckets.delete(key);
      return null;
    }
    return rec;
  }

  async set(key: string, record: RateLimitRecord): Promise<void> {
    this.buckets.set(key, record);
  }

  async incr(key: string, windowMs: number): Promise<RateLimitRecord> {
    const now = Date.now();
    const existing = await this.get(key);
    if (!existing) {
      const record = { count: 1, resetAt: now + windowMs };
      await this.set(key, record);
      return { ...record };
    }
    existing.count += 1;
    await this.set(key, existing);
    return { ...existing };
  }

  /** Test helper */
  clear() {
    this.buckets.clear();
  }
}

let store: RateLimitStore = new MemoryRateLimitStore();

export function getRateLimitStore(): RateLimitStore {
  return store;
}

export function setRateLimitStore(next: RateLimitStore) {
  store = next;
}
