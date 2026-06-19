import { describe, it, expect } from 'vitest';

// La lógica del honeypot en route.ts es: if (website) return 200 sin enviar mail.
// Testeamos la condición pura — el contrato que determina si el envío procede.

function isHoneypotFilled(website: string | undefined): boolean {
  return Boolean(website);
}

describe('honeypot', () => {
  it('detecta el honeypot cuando el campo tiene contenido', () => {
    expect(isHoneypotFilled('http://spam.com')).toBe(true);
    expect(isHoneypotFilled('cualquier texto')).toBe(true);
    expect(isHoneypotFilled(' ')).toBe(true);
  });

  it('no activa el honeypot cuando el campo está vacío o ausente', () => {
    expect(isHoneypotFilled('')).toBe(false);
    expect(isHoneypotFilled(undefined)).toBe(false);
  });
});
