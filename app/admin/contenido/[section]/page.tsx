import { notFound } from 'next/navigation';
import { getSiteSection, type SiteContent } from '@/lib/data-access';
import ContentSectionForm from '@/components/admin/ContentSectionForm';

type Props = { params: Promise<{ section: string }> };

const SECTION_TITLES: Record<string, string> = {
  hero: 'Hero',
  nosotros: 'Nosotros',
  servicios: 'Servicios',
  proceso: 'Proceso',
  contacto: 'Contacto',
  footer: 'Footer',
};

const VALID_SECTIONS: (keyof SiteContent)[] = [
  'hero', 'nosotros', 'servicios', 'proceso', 'contacto', 'footer',
];

export default async function EditarSeccionPage({ params }: Props) {
  const { section } = await params;

  if (!VALID_SECTIONS.includes(section as keyof SiteContent)) {
    notFound();
  }

  const key = section as keyof SiteContent;
  const data = await getSiteSection(key);
  const title = SECTION_TITLES[section] ?? section;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '8px' }}>
          Contenido · {title}
        </p>
        <h1 style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif', fontSize: '28px', fontWeight: 400, color: '#2C2420', margin: 0 }}>
          Editar {title}
        </h1>
      </div>

      <div style={{ background: '#FDFAF5', border: '1px solid #EDE8E0', padding: '32px', maxWidth: '720px' }}>
        <ContentSectionForm section={key} initialData={data} />
      </div>
    </div>
  );
}
