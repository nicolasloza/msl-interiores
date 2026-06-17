'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AdminThemeProvider from '@/components/admin/AdminThemeProvider';

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setError('Credenciales incorrectas. Verificá tu email y contraseña.');
      setLoading(false);
    } else {
      window.location.href = callbackUrl;
    }
  }

  return (
    <AdminThemeProvider>
      <div
        style={{
          minHeight: '100vh',
          background: '#FDFAF5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          padding: '24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '380px' }}>
          {/* Encabezado */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8B6F47',
                marginBottom: '16px',
              }}
            >
              Panel administrativo
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                fontSize: '32px',
                fontWeight: 400,
                color: '#2C2420',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              MSL Interiores
            </h1>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: '#D4C5A9',
                margin: '20px auto 0',
              }}
            />
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {error && (
                <Alert severity="error" sx={{ fontSize: '13px' }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
                autoFocus
              />

              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                disabled={loading}
                sx={{ mt: 1, py: 1.5 }}
              >
                {loading ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </div>
          </form>

          {/* Volver al sitio */}
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <a
              href="/"
              style={{
                fontSize: '12px',
                color: '#8B6F47',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              ← Volver al sitio
            </a>
          </div>
        </div>
      </div>
    </AdminThemeProvider>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
