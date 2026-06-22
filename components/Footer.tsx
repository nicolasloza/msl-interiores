'use client';

type Props = {
  brand: string;
  copyright: string;
  email?: string;
  instagram?: string;
  instagramUrl?: string;
};

const NAV_LINKS = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
];

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px', flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px', flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const linkBase: React.CSSProperties = {
  color: 'rgba(253,250,245,0.45)',
  textDecoration: 'none',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  transition: 'color 0.2s',
};

export default function Footer({ brand, copyright, email, instagram, instagramUrl }: Props) {
  return (
    <footer style={{ background: '#2C2420' }}>

      {/* Fila superior */}
      <div
        style={{
          padding: '48px clamp(20px, 4vw, 48px) 36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        {/* Navegación */}
        <nav
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 28px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={linkBase}
              onMouseOver={(e) => (e.currentTarget.style.color = 'rgba(253,250,245,0.85)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(253,250,245,0.45)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contacto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
          {email && (
            <a
              href={`mailto:${email}`}
              style={{ ...linkBase, display: 'flex', alignItems: 'center', gap: '7px', textTransform: 'none', letterSpacing: '0.04em' }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'rgba(253,250,245,0.85)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(253,250,245,0.45)')}
            >
              <IconMail />
              {email}
            </a>
          )}
          {instagram && (
            <a
              href={instagramUrl ?? '#'}
              target="_blank"
              rel="noreferrer"
              style={{ ...linkBase, display: 'flex', alignItems: 'center', gap: '7px', textTransform: 'none', letterSpacing: '0.04em' }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'rgba(253,250,245,0.85)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(253,250,245,0.45)')}
            >
              <IconInstagram />
              {instagram}
            </a>
          )}
        </div>
      </div>

      {/* Separador */}
      <div style={{ height: '1px', background: 'rgba(253,250,245,0.08)', margin: '0 clamp(20px, 4vw, 48px)' }} />

      {/* Fila inferior */}
      <div
        style={{
          padding: '20px clamp(20px, 4vw, 48px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <span className="serif" style={{ color: 'rgba(253,250,245,0.3)', fontSize: '13px', letterSpacing: '0.03em' }}>
          {brand}
        </span>
        <span style={{ color: 'rgba(253,250,245,0.2)', fontSize: '11px', letterSpacing: '0.05em' }}>
          {copyright}
        </span>
      </div>

    </footer>
  );
}
