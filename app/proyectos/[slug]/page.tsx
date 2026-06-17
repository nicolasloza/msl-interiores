import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPublishedProjects, getProjectBySlug } from '@/lib/data-access';
import ProyectoHeader from '@/components/ProyectoHeader';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} | MSL Interiores`,
    description: project.desafio.slice(0, 155),
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

  const [hero, g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11] = project.gallery;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#FDFAF5', color: '#2C2420' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: 'Playfair Display', serif; }
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
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(44,36,32,0.5) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '48px',
          left: '48px',
          right: '48px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
            {project.category} · {project.location} · {project.year}
          </p>
          <h1 className="serif" style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.1 }}>
            {project.name}
          </h1>
        </div>
      </div>

      {/* Ficha técnica */}
      <section style={{ borderBottom: '1px solid #EDE8E0' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        }}>
          {[
            { label: 'Superficie', value: `${project.superficie} m²` },
            { label: 'Tipo de proyecto', value: project.tipo },
            { label: 'Duración', value: project.duracion },
            { label: 'Piso', value: project.materiales.piso },
            { label: 'Revestimiento', value: project.materiales.revestimiento },
            { label: 'Paleta', value: project.materiales.paleta },
          ].map((item) => (
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

      {/* Descripción */}
      <section style={{ padding: '80px 48px' }}>
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

      {/* Galería */}
      <section style={{ padding: '0 48px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Fila 1: 2 columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          {[g1, g2].map((src, i) => src && (
            <div key={i} className="gallery-item" style={{ aspectRatio: '4/3' }}>
              <Image src={src} alt={`${project.name} — detalle ${i + 1}`} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        {/* Fila 2: imagen ancha */}
        {g3 && (
          <div className="gallery-item" style={{ position: 'relative', aspectRatio: '16/7', overflow: 'hidden', marginBottom: '12px' }}>
            <Image src={g3} alt={`${project.name} — vista general`} fill style={{ objectFit: 'cover' }} />
          </div>
        )}
        {/* Fila 3: 3 columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          {[g4, g5, g6].map((src, i) => src && (
            <div key={i} className="gallery-item" style={{ aspectRatio: '3/4' }}>
              <Image src={src} alt={`${project.name} — detalle ${i + 3}`} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        {/* Fila 4: 3 columnas */}
        {(g7 || g8 || g9) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            {[g7, g8, g9].map((src, i) => src && (
              <div key={i} className="gallery-item" style={{ aspectRatio: '4/3' }}>
                <Image src={src} alt={`${project.name} — detalle ${i + 6}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )}
        {/* Fila 5: 2 imágenes + celda de datos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {[g10, g11].map((src, i) => src && (
            <div key={i} className="gallery-item" style={{ aspectRatio: '3/4' }}>
              <Image src={src} alt={`${project.name} — detalle ${i + 9}`} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
          {/* Celda de cierre con datos */}
          <div style={{
            background: '#2C2420',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px',
            aspectRatio: '3/4',
          }}>
            {project.superficie > 0 && (
              <>
                <p className="serif" style={{ color: 'rgba(212,197,169,0.4)', fontSize: '56px', fontWeight: 400, lineHeight: 1, marginBottom: '24px' }}>
                  {project.superficie}
                </p>
                <p style={{ color: 'rgba(253,250,245,0.4)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  metros cuadrados
                </p>
                <div style={{ width: '32px', height: '1px', background: 'rgba(212,197,169,0.3)', margin: '20px 0' }} />
              </>
            )}
            <p style={{ color: 'rgba(253,250,245,0.55)', fontSize: '13px', fontWeight: 300, lineHeight: 1.6 }}>
              {project.tipo}
            </p>
          </div>
        </div>
      </section>

      {/* Navegación anterior / siguiente */}
      <nav style={{ borderTop: '1px solid #EDE8E0' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}>
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

      {/* Footer */}
      <footer style={{
        background: '#2C2420',
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <span className="serif" style={{ color: 'rgba(253,250,245,0.4)', fontSize: '14px' }}>MSL Interiores</span>
        <span style={{ color: 'rgba(253,250,245,0.3)', fontSize: '12px', letterSpacing: '0.05em' }}>© 2024 · Diseño de interiores residencial</span>
      </footer>
    </div>
  );
}
