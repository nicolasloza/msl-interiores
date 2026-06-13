'use client';

import Image from 'next/image';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', minHeight: '600px' }}>
      <Image
        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=85"
        alt="Interior"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(44,36,32,0.35) 0%, rgba(44,36,32,0.55) 100%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <p
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          Diseño de interiores residencial
        </p>
        <h1
          className="serif"
          style={{
            color: 'white',
            fontSize: 'clamp(38px, 6vw, 72px)',
            fontWeight: 400,
            lineHeight: 1.15,
            maxWidth: '720px',
            marginBottom: '20px',
          }}
        >
          Tu hogar,
          <br />
          <em>rediseñado desde adentro</em>
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '15px',
            fontWeight: 300,
            maxWidth: '440px',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}
        >
          Transformamos casas en hogares únicos, diseñados desde la escucha y construidos con
          criterio.
        </p>
        <button className="btn-primary" onClick={() => scrollTo('proyectos')}>
          Ver proyectos
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.3)' }} />
      </div>
    </section>
  );
}
