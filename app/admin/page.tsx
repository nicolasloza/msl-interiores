import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getProjects, getSiteContent } from '@/lib/data-access';
import ImageIcon from '@mui/icons-material/Image';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default async function AdminDashboard() {
  const [projects, content] = await Promise.all([getProjects(), getSiteContent()]);

  const publishedCount = projects.filter((p) => p.publicado).length;
  const draftCount = projects.length - publishedCount;

  const stats = [
    { label: 'Proyectos totales', value: projects.length, href: '/admin/proyectos' },
    { label: 'Publicados', value: publishedCount, href: '/admin/proyectos' },
    { label: 'Borradores', value: draftCount, href: '/admin/proyectos' },
  ];

  const sections = Object.keys(content) as (keyof typeof content)[];

  return (
    <div>
      {/* Encabezado */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '8px' }}>
          Bienvenida
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 400,
            color: '#2C2420',
            margin: 0,
          }}
        >
          Panel de administración
        </h1>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        {stats.map((s) => (
          <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <Card sx={{ '&:hover': { borderColor: '#D4C5A9' }, cursor: 'pointer' }}>
              <CardContent>
                <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B6F47', margin: '0 0 8px' }}>
                  {s.label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                    fontSize: '40px',
                    fontWeight: 400,
                    color: '#2C2420',
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  {s.value}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {/* Proyectos */}
        <Card>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <ImageIcon sx={{ color: '#8B6F47', fontSize: 20 }} />
              <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2C2420', margin: 0, fontWeight: 500 }}>
                Proyectos
              </p>
            </div>
            <p style={{ fontSize: '13px', color: '#5C4A42', lineHeight: 1.6, marginBottom: '20px' }}>
              Administrá el portfolio: crear, editar, publicar y reordenar proyectos.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link href="/admin/proyectos">
                <span style={quickLinkStyle}>Ver todos</span>
              </Link>
              <Link href="/admin/proyectos/nuevo">
                <span style={quickLinkStyle}>+ Nuevo</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Contenido */}
        <Card>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <EditNoteIcon sx={{ color: '#8B6F47', fontSize: 20 }} />
              <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2C2420', margin: 0, fontWeight: 500 }}>
                Contenido del sitio
              </p>
            </div>
            <p style={{ fontSize: '13px', color: '#5C4A42', lineHeight: 1.6, marginBottom: '20px' }}>
              Editá textos, títulos, imágenes y datos de contacto.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {sections.map((s) => (
                <Link key={s} href={`/admin/contenido/${s}`}>
                  <span style={quickLinkStyle}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ver sitio */}
        <Card>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <VisibilityIcon sx={{ color: '#8B6F47', fontSize: 20 }} />
              <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2C2420', margin: 0, fontWeight: 500 }}>
                Sitio público
              </p>
            </div>
            <p style={{ fontSize: '13px', color: '#5C4A42', lineHeight: 1.6, marginBottom: '20px' }}>
              Abrí el sitio en una nueva pestaña para ver los cambios publicados.
            </p>
            <a href="/" target="_blank" rel="noreferrer">
              <span style={quickLinkStyle}>Abrir sitio →</span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const quickLinkStyle: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#8B6F47',
  border: '1px solid #D4C5A9',
  padding: '6px 14px',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background 0.2s',
};
