/* eslint-disable @typescript-eslint/no-explicit-any */
 
export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  tags?: string[];
}

export class AnalyticsCacheService {
  private static cache: Map<string, { data: any; expiry: number }> = new Map();
  private static defaultTTL = 300; // 5 minutes

  /**
   * Abstract cache getter. Currently uses in-memory Map, but prepared for Redis/Distributed Cache.
   */
  static async getCachedAnalytics<T>(key: string): Promise<T | null> {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  /**
   * Abstract cache setter.
   */
  static async setCachedAnalytics<T>(key: string, data: T, options?: CacheOptions): Promise<void> {
    const ttl = options?.ttl || this.defaultTTL;
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl * 1000
    });
  }

  /**
   * Invalidate specific cache keys or patterns.
   */
  static async invalidateCache(keyPattern: string): Promise<void> {
    // Basic exact match invalidation for now
    if (this.cache.has(keyPattern)) {
      this.cache.delete(keyPattern);
      return;
    }

    // Prefix match
    for (const key of Array.from(this.cache.keys())) {
      if (key.startsWith(keyPattern)) {
        this.cache.delete(key);
      }
    }
  }
}
