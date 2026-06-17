'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import type { ProjectDB } from '@/lib/data-access';

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px', flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px', flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

type Props = {
  currentSlug: string;
  projects: ProjectDB[];
};

export default function ProyectoHeader({ currentSlug, projects }: Props) {
  const [open, setOpen] = useState(false);
  const [proyectosOpen, setProyectosOpen] = useState(false);

  function close() {
    setOpen(false);
    setProyectosOpen(false);
  }

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: '#FDFAF5',
          borderBottom: '1px solid #EDE8E0',
          padding: '0 clamp(16px, 4vw, 48px)',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <Link
          href="/"
          className="serif"
          style={{
            fontSize: '18px',
            fontWeight: 500,
            color: '#2C2420',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            flexShrink: 0,
          }}
        >
          MSL Interiores
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link
            href="/#proyectos"
            className="hide-mobile"
            style={{
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(44,36,32,0.45)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#2C2420')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(44,36,32,0.45)')}
          >
            ← Volver a proyectos
          </Link>

          {/* Botón menú */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              flexShrink: 0,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{ display: 'block', width: '24px', height: '1px', background: '#2C2420' }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(44,36,32,0.4)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          zIndex: 201,
          width: 'min(400px, 90vw)',
          background: '#FDFAF5',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          boxShadow: '-32px 0 80px rgba(44,36,32,0.15)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Cabecera sidebar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            height: '72px',
            borderBottom: '1px solid #EDE8E0',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47' }}>
            Menú
          </span>
          <button
            onClick={close}
            aria-label="Cerrar menú"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', color: '#2C2420', lineHeight: 1, padding: '4px', opacity: 0.6 }}
          >
            ✕
          </button>
        </div>

        {/* Ítems */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {['Nosotros', 'Servicios'].map((label) => (
            <SidebarLink key={label} label={label} href={`/#${label.toLowerCase()}`} onClick={close} />
          ))}

          {/* Proyectos — desplegable */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EDE8E0' }}>
              <Link href="/#proyectos" onClick={close} style={{ ...linkStyle, flex: 1 }}>
                Proyectos
              </Link>
              <button
                onClick={() => setProyectosOpen((v) => !v)}
                aria-label={proyectosOpen ? 'Colapsar proyectos' : 'Expandir proyectos'}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0 40px 0 8px', color: '#8B6F47', fontSize: '11px', lineHeight: 1,
                  flexShrink: 0, transform: proyectosOpen ? 'scaleY(-1)' : 'scaleY(1)',
                  transition: 'transform 0.3s ease',
                }}
              >
                ▼
              </button>
            </div>

            <div
              style={{
                overflow: 'hidden',
                maxHeight: proyectosOpen ? `${projects.length * 72}px` : '0',
                transition: 'max-height 0.4s ease',
                background: '#F7F3ED',
              }}
            >
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/proyectos/${p.slug}`}
                  onClick={close}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 40px 16px 56px', borderBottom: '1px solid #EDE8E0',
                    textDecoration: 'none',
                    background: p.slug === currentSlug ? '#EDE8E0' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#EDE8E0')}
                  onMouseOut={(e) => (e.currentTarget.style.background = p.slug === currentSlug ? '#EDE8E0' : 'transparent')}
                >
                  <div>
                    <p style={{ fontSize: '15px', color: '#2C2420', fontWeight: p.slug === currentSlug ? 500 : 400, fontFamily: 'var(--font-playfair), serif' }}>
                      {p.name}
                    </p>
                    <p style={{ fontSize: '11px', color: '#8B6F47', marginTop: '3px', letterSpacing: '0.05em' }}>
                      {p.location} · {p.year}
                    </p>
                  </div>
                  <span style={{ color: p.slug === currentSlug ? '#2C2420' : '#8B6F47', fontSize: '14px' }}>
                    {p.slug === currentSlug ? '·' : '→'}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {['Proceso', 'Contacto'].map((label) => (
            <SidebarLink key={label} label={label} href={`/#${label.toLowerCase()}`} onClick={close} />
          ))}
        </nav>

        {/* Pie */}
        <div style={{ padding: '28px 40px', borderTop: '1px solid #EDE8E0', flexShrink: 0 }}>
          <a href="mailto:msl.interioresba@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8B6F47', textDecoration: 'none', letterSpacing: '0.05em', marginBottom: '10px' }}>
            <IconMail />
            msl.interioresba@gmail.com
          </a>
          <a href="https://instagram.com/msl.interiores" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8B6F47', textDecoration: 'none', letterSpacing: '0.05em' }}>
            <IconInstagram />
            @msl.interiores
          </a>
        </div>
      </aside>
    </>
  );
}

const linkStyle: CSSProperties = {
  fontFamily: 'var(--font-playfair), serif',
  fontSize: 'clamp(20px, 2.5vw, 26px)',
  fontWeight: 400,
  color: '#2C2420',
  letterSpacing: '0.01em',
  textDecoration: 'none',
  display: 'block',
  padding: '22px 40px',
};

function SidebarLink({ label, href, onClick }: { label: string; href: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} style={{ ...linkStyle, borderBottom: '1px solid #EDE8E0' }}>
      {label}
    </Link>
  );
}
