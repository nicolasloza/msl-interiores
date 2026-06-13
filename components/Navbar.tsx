'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { useScrolled } from '@/hooks/useScrolled';
import { PROJECTS } from '@/data/content';

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

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [proyectosOpen, setProyectosOpen] = useState(false);

  function close() {
    setOpen(false);
    setProyectosOpen(false);
  }

  return (
    <>
      {/* Barra fija */}
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: '0 48px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? '#FDFAF5' : 'transparent',
          borderBottom: scrolled ? '1px solid #EDE8E0' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <button
          onClick={() => scrollTo('hero')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span
            className="serif"
            style={{
              fontSize: '20px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: scrolled ? '#2C2420' : 'white',
              transition: 'color 0.4s',
            }}
          >
            MSL Interiores
          </span>
        </button>

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
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '1px',
                background: scrolled ? '#2C2420' : 'white',
                transition: 'background 0.4s',
              }}
            />
          ))}
        </button>
      </nav>

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
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#8B6F47',
            }}
          >
            Menú
          </span>
          <button
            onClick={close}
            aria-label="Cerrar menú"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '22px',
              color: '#2C2420',
              lineHeight: 1,
              padding: '4px',
              opacity: 0.6,
            }}
          >
            ✕
          </button>
        </div>

        {/* Ítems de navegación */}
        <nav style={{ flex: 1, padding: '16px 0' }}>

          <SidebarLink label="Nosotros" onClick={() => { scrollTo('nosotros'); close(); }} />
          <SidebarLink label="Servicios" onClick={() => { scrollTo('servicios'); close(); }} />

          {/* Proyectos — desplegable */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #EDE8E0',
              }}
            >
              <button
                onClick={() => { scrollTo('proyectos'); close(); }}
                style={linkStyle}
              >
                Proyectos
              </button>
              <button
                onClick={() => setProyectosOpen((v) => !v)}
                aria-label={proyectosOpen ? 'Colapsar proyectos' : 'Expandir proyectos'}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 40px 0 8px',
                  color: '#8B6F47',
                  fontSize: '11px',
                  lineHeight: 1,
                  flexShrink: 0,
                  transform: proyectosOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              >
                ▼
              </button>
            </div>

            {/* Lista de proyectos */}
            <div
              style={{
                overflow: 'hidden',
                maxHeight: proyectosOpen ? `${PROJECTS.length * 72}px` : '0',
                transition: 'max-height 0.4s ease',
                background: '#F7F3ED',
              }}
            >
              {PROJECTS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/proyectos/${p.slug}`}
                  onClick={close}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 40px 16px 56px',
                    borderBottom: '1px solid #EDE8E0',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#EDE8E0')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '15px',
                        color: '#2C2420',
                        fontWeight: 400,
                        fontFamily: 'var(--font-playfair), serif',
                      }}
                    >
                      {p.name}
                    </p>
                    <p style={{ fontSize: '11px', color: '#8B6F47', marginTop: '3px', letterSpacing: '0.05em' }}>
                      {p.location} · {p.year}
                    </p>
                  </div>
                  <span style={{ color: '#8B6F47', fontSize: '14px' }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          <SidebarLink label="Proceso" onClick={() => { scrollTo('proceso'); close(); }} />
          <SidebarLink label="Contacto" onClick={() => { scrollTo('contacto'); close(); }} />
        </nav>

        {/* Pie del sidebar */}
        <div
          style={{
            padding: '28px 40px',
            borderTop: '1px solid #EDE8E0',
            flexShrink: 0,
          }}
        >
          <a
            href="mailto:msl.interioresba@gmail.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#8B6F47',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              marginBottom: '10px',
            }}
          >
            <IconMail />
            msl.interioresba@gmail.com
          </a>
          <a
            href="https://instagram.com/msl.interiores"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#8B6F47',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
          >
            <IconInstagram />
            @msl.interiores
          </a>
        </div>
      </aside>
    </>
  );
}

const linkStyle: CSSProperties = {
  flex: 1,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
  padding: '22px 40px',
  fontFamily: 'var(--font-playfair), serif',
  fontSize: 'clamp(20px, 2.5vw, 26px)',
  fontWeight: 400,
  color: '#2C2420',
  letterSpacing: '0.01em',
};

function SidebarLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ ...linkStyle, width: '100%', borderBottom: '1px solid #EDE8E0' }}
    >
      {label}
    </button>
  );
}
