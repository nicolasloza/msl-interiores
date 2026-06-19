// Rate limiter in-memory por IP.
// Si el tráfico escala, migrar a Upstash Redis (https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)
// para persistir el estado entre instancias y cold starts.

export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

export const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string, now = Date.now()): boolean {
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}
