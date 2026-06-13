'use client';

import Image from 'next/image';
import FadeIn from '@/components/FadeIn';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Nosotros() {
  return (
    <section id="nosotros" style={{ padding: '100px 48px', maxWidth: '1100px', margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        <FadeIn>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8B6F47',
              marginBottom: '24px',
            }}
          >
            El estudio
          </p>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: '24px',
            }}
          >
            Diseñamos desde
            <br />
            la escucha
          </h2>
          <div className="divider" />
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.85,
              color: '#5C4A42',
              fontWeight: 300,
              marginBottom: '20px',
            }}
          >
            En MSL Interiores creemos que cada hogar es el reflejo de quien lo habita. Por eso,
            antes de trazar una línea, nos tomamos el tiempo de entender cómo vivís, qué te genera
            bienestar y qué historia querés que cuente tu espacio.
          </p>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.85,
              color: '#5C4A42',
              fontWeight: 300,
              marginBottom: '40px',
            }}
          >
            Trabajamos proyectos residenciales integrales con un enfoque artesanal: atención al
            detalle, materialidad cuidada y un proceso cercano de principio a fin.
          </p>
          <button className="btn-dark" onClick={() => scrollTo('contacto')}>
            Hablemos de tu proyecto
          </button>
        </FadeIn>

        <FadeIn delay={150}>
          <div style={{ position: 'relative' }}>
            <Image
              src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80"
              alt="Detalle de diseño"
              width={800}
              height={1067}
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                width: '120px',
                height: '120px',
                background: '#D4C5A9',
                zIndex: -1,
              }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
