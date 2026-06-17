'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AdminLoginModal({ open, onClose }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Bloquear scroll cuando está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Limpiar al cerrar
  useEffect(() => {
    if (!open) {
      setEmail('');
      setPassword('');
      setError('');
      setLoading(false);
    }
  }, [open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Completá todos los campos');
      return;
    }
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Credenciales incorrectas');
      setLoading(false);
    } else {
      onClose();
      router.push('/admin');
    }
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          background: 'rgba(44,36,32,0.55)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.25s ease',
        }}
      />

      {/* Panel del modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Ingresar al dashboard"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 301,
          width: 'min(420px, calc(100vw - 32px))',
          background: '#FDFAF5',
          padding: '48px 40px 40px',
          animation: 'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            color: '#2C2420',
            opacity: 0.4,
            lineHeight: 1,
            padding: '4px',
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.8'; }}
          onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.4'; }}
        >
          ✕
        </button>

        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8B6F47',
              marginBottom: '12px',
            }}
          >
            Panel administrativo
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontSize: '28px',
              fontWeight: 400,
              color: '#2C2420',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            MSL Interiores
          </h2>
          <div
            style={{
              width: '32px',
              height: '1px',
              background: '#D4C5A9',
              margin: '16px auto 0',
            }}
          />
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {error && (
              <div
                style={{
                  padding: '10px 14px',
                  background: '#FDF2F2',
                  border: '1px solid #E8C5C5',
                  fontSize: '13px',
                  color: '#8B2020',
                  letterSpacing: '0.02em',
                }}
              >
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="modal-email"
                style={{
                  display: 'block',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#5C4A42',
                  marginBottom: '6px',
                }}
              >
                Email
              </label>
              <input
                id="modal-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: '#FDFAF5',
                  border: '1px solid #D4C5A9',
                  fontSize: '14px',
                  color: '#2C2420',
                  outline: 'none',
                  fontFamily: 'var(--font-inter), sans-serif',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#8B6F47'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#D4C5A9'; }}
              />
            </div>

            <div>
              <label
                htmlFor="modal-password"
                style={{
                  display: 'block',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#5C4A42',
                  marginBottom: '6px',
                }}
              >
                Contraseña
              </label>
              <input
                id="modal-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: '#FDFAF5',
                  border: '1px solid #D4C5A9',
                  fontSize: '14px',
                  color: '#2C2420',
                  outline: 'none',
                  fontFamily: 'var(--font-inter), sans-serif',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#8B6F47'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#D4C5A9'; }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '6px',
                padding: '14px',
                background: loading ? '#C4A882' : '#2C2420',
                color: '#FDFAF5',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-inter), sans-serif',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => {
                if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#5C4A42';
              }}
              onMouseOut={(e) => {
                if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#2C2420';
              }}
            >
              {loading ? 'Ingresando...' : 'Ingresar al dashboard'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 16px)); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  );
}
