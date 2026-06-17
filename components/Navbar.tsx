'use client';

import { useState, useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useScrolled } from '@/hooks/useScrolled';
import type { ProjectDB } from '@/lib/data-access';
import AdminLoginModal from '@/components/AdminLoginModal';

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

type NavbarProps = {
  projects: ProjectDB[];
  email?: string;
  instagram?: string;
  instagramUrl?: string;
};

export default function Navbar({
  projects,
  email = 'msl.interioresba@gmail.com',
  instagram = '@msl.interiores',
  instagramUrl = 'https://instagram.com/msl.interiores',
}: NavbarProps) {
  const scrolled = useScrolled();
  const router = useRouter();
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [proyectosOpen, setProyectosOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  function close() {
    setOpen(false);
    setProyectosOpen(false);
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const first = sidebarRef.current?.querySelector<HTMLElement>('button, a[href]');
      first?.focus();
    } else {
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      const sidebar = sidebarRef.current;
      if (!sidebar) return;
      const focusable = Array.from(
        sidebar.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function handleDashboardClick() {
    close();
    if (status === 'authenticated') {
      router.push('/admin');
    } else {
      setLoginModalOpen(true);
    }
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
          ref={triggerRef}
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="nav-sidebar"
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
        ref={sidebarRef}
        id="nav-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
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
                aria-expanded={proyectosOpen}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 40px 0 8px',
                  color: '#8B6F47',
                  fontSize: '11px',
                  lineHeight: 1,
                  flexShrink: 0,
                  transform: proyectosOpen ? 'scaleY(-1)' : 'scaleY(1)',
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

        {/* Dashboard */}
        <div
          style={{
            borderTop: '1px solid #EDE8E0',
            padding: '20px 40px',
            flexShrink: 0,
          }}
        >
          <button
            onClick={handleDashboardClick}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(44,36,32,0.35)',
              transition: 'color 0.2s',
              fontFamily: 'var(--font-inter), sans-serif',
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#8B6F47')}
            onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(44,36,32,0.35)')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '13px', height: '13px', flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Dashboard
          </button>
        </div>

        {/* Pie del sidebar */}
        <div
          style={{
            padding: '28px 40px',
            borderTop: '1px solid #EDE8E0',
            flexShrink: 0,
          }}
        >
          <a
            href={`mailto:${email}`}
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
              fontSize: '13px',
              color: '#8B6F47',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
          >
            <IconInstagram />
            {instagram}
          </a>
        </div>
      </aside>

      <AdminLoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
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
