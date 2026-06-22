import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPublishedProjects, getProjectBySlug } from '@/lib/data-access';
import ProyectoHeader from '@/components/ProyectoHeader';
import GalleryLightbox from '@/components/GalleryLightbox';
import FooterWrapper from '@/components/FooterWrapper';

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const desc = project.desafio.slice(0, 155);
  return {
    title: `${project.name} | MSL Interiores`,
    description: desc,
    openGraph: {
      title: `${project.name} | MSL Interiores`,
      description: desc,
      images: [{ url: project.img, width: 1200, height: 800, alt: project.name }],
      type: 'website',
      locale: 'es_AR',
    },
    twitter: {
      card: 'summary_large_image',
      images: [project.img],
    },
  };
}

export default async function ProyectoPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const PROJECTS = await getPublishedProjects();
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const next = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  const [hero] = project.gallery;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#FDFAF5', color: '#2C2420' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: var(--font-playfair), serif; }
        .ficha-item { border-top: 1px solid #EDE8E0; padding: 24px 0; }
        .proj-nav-link {
          text-decoration: none;
          color: #2C2420;
          transition: opacity 0.2s;
        }
        .proj-nav-link:hover { opacity: 0.6; }
        .gallery-item { position: relative; overflow: hidden; }
        .gallery-item img { transition: transform 0.6s ease; }
        .gallery-item:hover img { transform: scale(1.04); }
      `}</style>

      <ProyectoHeader currentSlug={project.slug} projects={PROJECTS} />

      {/* Hero */}
      <div style={{ position: 'relative', height: '70vh', minHeight: '480px' }}>
        <Image
          src={hero}
          alt={project.name}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(44,36,32,0.5) 100%)',
        }} />
        <div className="proyecto-hero-caption">
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
            {project.category} · {project.location} · {project.year}
          </p>
          <h1 className="serif" style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.1 }}>
            {project.name}
          </h1>
        </div>
      </div>

      {/* Ficha técnica */}
      {project.details.length > 0 && (
        <section style={{ borderBottom: '1px solid #EDE8E0' }}>
          <div className="proyecto-ficha-pad">
            {project.details.map((item) => (
              <div key={item.label} className="ficha-item" style={{ paddingRight: '32px' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '8px' }}>
                  {item.label}
                </p>
                <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.5, color: '#2C2420' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Descripción */}
      <section className="proyecto-desc-pad">
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '48px',
        }}>
          {[
            { num: '01', label: 'El desafío', text: project.desafio },
            { num: '02', label: 'La propuesta', text: project.propuesta },
            { num: '03', label: 'El resultado', text: project.resultado },
          ].map((block) => (
            <div key={block.num}>
              <p className="serif" style={{ fontSize: '36px', color: 'rgba(212,197,169,0.4)', fontWeight: 400, lineHeight: 1, marginBottom: '16px' }}>
                {block.num}
              </p>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '16px' }}>
                {block.label}
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#5C4A42', fontWeight: 300 }}>
                {block.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Galería con lightbox */}
      <GalleryLightbox
        images={project.gallery}
        projectName={project.name}
        superficie={project.superficie}
        tipo={project.tipo}
      />

      {/* Navegación anterior / siguiente */}
      <nav style={{ borderTop: '1px solid #EDE8E0' }}>
        <div className="proyecto-nav-pad">
          <div style={{ borderRight: '1px solid #EDE8E0', padding: '40px 40px 40px 0' }}>
            {prev ? (
              <Link href={`/proyectos/${prev.slug}`} className="proj-nav-link">
                <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '12px' }}>
                  ← Anterior
                </p>
                <p className="serif" style={{ fontSize: '22px', fontWeight: 400 }}>{prev.name}</p>
                <p style={{ fontSize: '12px', color: '#8B6F47', marginTop: '4px' }}>
                  {prev.location} · {prev.year}
                </p>
              </Link>
            ) : null}
          </div>
          <div style={{ padding: '40px 0 40px 40px', textAlign: 'right' }}>
            {next ? (
              <Link href={`/proyectos/${next.slug}`} className="proj-nav-link">
                <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '12px' }}>
                  Siguiente →
                </p>
                <p className="serif" style={{ fontSize: '22px', fontWeight: 400 }}>{next.name}</p>
                <p style={{ fontSize: '12px', color: '#8B6F47', marginTop: '4px' }}>
                  {next.location} · {next.year}
                </p>
              </Link>
            ) : null}
          </div>
        </div>
      </nav>

      <FooterWrapper />
    </div>
  );
}
