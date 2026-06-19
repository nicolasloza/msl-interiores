'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import FadeIn from '@/components/FadeIn';

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px', flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px', flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

type ContactoProps = {
  label: string;
  title: string;
  subtitle: string;
  email: string;
  instagram: string;
  instagramUrl: string;
};

type FormValues = {
  nombre: string;
  email: string;
  mensaje: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.nombre.trim()) errors.nombre = 'El nombre es requerido';
  if (!values.email.trim()) {
    errors.email = 'El email es requerido';
  } else if (!validateEmail(values.email)) {
    errors.email = 'El formato del email no es válido';
  }
  if (!values.mensaje.trim()) errors.mensaje = 'El mensaje es requerido';
  return errors;
}

export default function Contacto({ label, title, subtitle, email, instagram, instagramUrl }: ContactoProps) {
  const [values, setValues] = useState<FormValues>({ nombre: '', email: '', mensaje: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    setServerError('');

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: honeypot }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error desconocido');
      }

      setStatus('success');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'No se pudo enviar el mensaje. Intentá de nuevo.');
      setStatus('error');
    }
  }

  return (
    <section id="contacto" className="section-pad" style={{ background: '#3D2E28' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D4C5A9',
              marginBottom: '20px',
            }}
          >
            {label}
          </p>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 400,
              color: '#FDFAF5',
              marginBottom: '16px',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(253,250,245,0.6)',
              fontWeight: 300,
              lineHeight: 1.7,
              marginBottom: '56px',
            }}
          >
            {subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          {status === 'success' ? (
            <div>
              <p style={{ color: '#D4C5A9', fontSize: '16px', lineHeight: 1.7, fontWeight: 300, marginBottom: '8px' }}>
                ¡Gracias por tu mensaje!
              </p>
              <p style={{ color: 'rgba(253,250,245,0.45)', fontSize: '14px', fontWeight: 300 }}>
                Te respondemos a la brevedad.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}
            >
              <div className="form-row">
                <div>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                  />
                  {errors.nombre && (
                    <p style={{ color: '#D4C5A9', fontSize: '11px', marginTop: '6px' }}>
                      {errors.nombre}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu email"
                    value={values.email}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                  />
                  {errors.email && (
                    <p style={{ color: '#D4C5A9', fontSize: '11px', marginTop: '6px' }}>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <textarea
                  name="mensaje"
                  placeholder="Contanos sobre tu proyecto..."
                  value={values.mensaje}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                />
                {errors.mensaje && (
                  <p style={{ color: '#D4C5A9', fontSize: '11px', marginTop: '6px' }}>
                    {errors.mensaje}
                  </p>
                )}
              </div>

              {serverError && (
                <p style={{ color: '#D4C5A9', fontSize: '13px', textAlign: 'center' }}>
                  {serverError}
                </p>
              )}

              <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                <label htmlFor="website">Sitio web</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  className="btn-light"
                  type="submit"
                  disabled={status === 'sending'}
                  style={{ opacity: status === 'sending' ? 0.6 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </div>
            </form>
          )}

          <div
            style={{
              marginTop: '64px',
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={`mailto:${email}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(253,250,245,0.55)',
                fontSize: '13px',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#FDFAF5')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(253,250,245,0.55)')}
            >
              <IconMail />
              {email}
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(253,250,245,0.55)',
                fontSize: '13px',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#FDFAF5')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(253,250,245,0.55)')}
            >
              <IconInstagram />
              {instagram}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
