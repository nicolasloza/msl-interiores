'use client';

import Image from 'next/image';
import FadeIn from '@/components/FadeIn';

type NosotrosProps = {
  label: string;
  title: string;
  parrafo1: string;
  parrafo2: string;
  ctaText: string;
  imagen: string;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Nosotros({ label, title, parrafo1, parrafo2, ctaText, imagen }: NosotrosProps) {
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
            {label}
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
            {title}
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
            {parrafo1}
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
            {parrafo2}
          </p>
          <button className="btn-dark" onClick={() => scrollTo('contacto')}>
            {ctaText}
          </button>
        </FadeIn>

        <FadeIn delay={150}>
          <div style={{ position: 'relative' }}>
            <Image
              src={imagen}
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
