import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { PROJECTS } from '@/data/content';

export default function Proyectos() {
  return (
    <section id="proyectos" style={{ padding: '100px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <FadeIn>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8B6F47',
              marginBottom: '16px',
            }}
          >
            Proyectos
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '56px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <h2
              className="serif"
              style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400 }}
            >
              Trabajo reciente
            </h2>
            <span style={{ fontSize: '13px', color: '#8B6F47', letterSpacing: '0.05em' }}>
              2023 — 2024
            </span>
          </div>
        </FadeIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 80}>
              <Link
                href={`/proyectos/${p.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div className="project-card">
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={800}
                    height={600}
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                  />
                  <div className="project-overlay">
                    <div>
                      <p
                        style={{
                          color: 'rgba(255,255,255,0.65)',
                          fontSize: '11px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          marginBottom: '6px',
                        }}
                      >
                        {p.category} · {p.location} · {p.year}
                      </p>
                      <p className="serif" style={{ color: 'white', fontSize: '20px', fontWeight: 400 }}>
                        {p.name}
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Ver proyecto →
                      </p>
                    </div>
                  </div>
                  {/* Mobile caption */}
                  <div style={{ padding: '16px 0 8px' }}>
                    <p
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#8B6F47',
                        marginBottom: '4px',
                      }}
                    >
                      {p.category} · {p.location} · {p.year}
                    </p>
                    <p className="serif" style={{ fontSize: '17px', fontWeight: 400 }}>
                      {p.name}
                    </p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
