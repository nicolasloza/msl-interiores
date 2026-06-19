import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, rateLimitMap, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from '../rate-limit';

beforeEach(() => {
  rateLimitMap.clear();
});

describe('checkRateLimit', () => {
  it('permite los primeros RATE_LIMIT_MAX envíos', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      expect(checkRateLimit('1.2.3.4')).toBe(true);
    }
  });

  it('bloquea el envío N+1 dentro de la ventana', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      checkRateLimit('1.2.3.4');
    }
    expect(checkRateLimit('1.2.3.4')).toBe(false);
  });

  it('resetea el contador después de que expira la ventana', () => {
    const now = Date.now();

    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      checkRateLimit('1.2.3.4', now);
    }
    expect(checkRateLimit('1.2.3.4', now)).toBe(false);

    // Simulamos que pasaron 10 minutos + 1ms
    const later = now + RATE_LIMIT_WINDOW_MS + 1;
    expect(checkRateLimit('1.2.3.4', later)).toBe(true);
  });

  it('IPs distintas no se interfieren', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      checkRateLimit('1.1.1.1');
    }
    // 1.1.1.1 está bloqueada, pero 2.2.2.2 no
    expect(checkRateLimit('1.1.1.1')).toBe(false);
    expect(checkRateLimit('2.2.2.2')).toBe(true);
  });

  it('el primer envío tras un estado limpio siempre pasa', () => {
    expect(checkRateLimit('5.5.5.5')).toBe(true);
  });
});
