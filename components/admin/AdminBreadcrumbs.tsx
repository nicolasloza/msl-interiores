'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

const LABELS: Record<string, string> = {
  admin: 'Dashboard',
  proyectos: 'Proyectos',
  contenido: 'Contenido',
  nuevo: 'Nuevo',
  editar: 'Editar',
  hero: 'Hero',
  nosotros: 'Nosotros',
  servicios: 'Servicios',
  proceso: 'Proceso',
  contacto: 'Contacto',
  footer: 'Footer',
};

export default function AdminBreadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);

  const crumbs = parts.map((part, i) => {
    const href = '/' + parts.slice(0, i + 1).join('/');
    const isLast = i === parts.length - 1;
    const label = LABELS[part] ?? (isNaN(Number(part)) ? part : `#${part}`);

    return { href, label, isLast };
  });

  if (crumbs.length <= 1) {
    return (
      <span
        style={{
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#8B6F47',
        }}
      >
        Dashboard
      </span>
    );
  }

  return (
    <MuiBreadcrumbs
      separator={
        <span style={{ color: '#D4C5A9', fontSize: '12px' }}>·</span>
      }
      sx={{ fontSize: '12px' }}
    >
      {crumbs.map((crumb) =>
        crumb.isLast ? (
          <span
            key={crumb.href}
            style={{
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#2C2420',
              fontWeight: 500,
            }}
          >
            {crumb.label}
          </span>
        ) : (
          <Link
            key={crumb.href}
            href={crumb.href}
            style={{
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#8B6F47',
              textDecoration: 'none',
            }}
          >
            {crumb.label}
          </Link>
        )
      )}
    </MuiBreadcrumbs>
  );
}
