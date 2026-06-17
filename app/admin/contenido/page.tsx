import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getSiteContent } from '@/lib/data-access';

export const dynamic = 'force-dynamic';

const SECTION_LABELS: Record<string, { title: string; description: string }> = {
  hero: { title: 'Hero', description: 'Imagen principal, título, subtítulo y CTA de la pantalla de inicio.' },
  nosotros: { title: 'Nosotros', description: 'Etiqueta, título, párrafos de texto e imagen del estudio.' },
  servicios: { title: 'Servicios', description: 'Títulos y descripciones de los servicios ofrecidos.' },
  proceso: { title: 'Proceso', description: 'Título y pasos del proceso de trabajo.' },
  contacto: { title: 'Contacto', description: 'Título, subtítulo, email e Instagram.' },
  footer: { title: 'Footer', description: 'Marca y texto de copyright.' },
};

export default async function ContenidoAdminPage() {
  const content = await getSiteContent();
  const sections = Object.keys(content) as (keyof typeof content)[];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '8px' }}>
          Gestión
        </p>
        <h1 style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif', fontSize: '28px', fontWeight: 400, color: '#2C2420', margin: 0 }}>
          Contenido del sitio
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {sections.map((section) => {
          const info = SECTION_LABELS[section] ?? { title: section, description: '' };
          return (
            <Link key={section} href={`/admin/contenido/${section}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { borderColor: '#8B6F47' }, transition: 'border-color 0.2s' }}>
                <CardContent>
                  <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B6F47', margin: '0 0 10px' }}>
                    Sección
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif', fontSize: '20px', fontWeight: 400, color: '#2C2420', margin: '0 0 10px' }}>
                    {info.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#5C4A42', lineHeight: 1.6, margin: 0 }}>
                    {info.description}
                  </p>
                  <p style={{ fontSize: '11px', color: '#8B6F47', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '16px', marginBottom: 0 }}>
                    Editar →
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
