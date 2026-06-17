'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

type Props = {
  images: string[];
  projectName: string;
  superficie?: number;
  tipo?: string;
};

function GalleryItem({
  src,
  alt,
  aspectRatio,
  onClick,
}: {
  src: string;
  alt: string;
  aspectRatio: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        aspectRatio,
        overflow: 'hidden',
        cursor: 'zoom-in',
      }}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(44,36,32,0)',
          transition: 'background 0.3s',
        }}
        onMouseOver={(e) => {
          (e.currentTarget.previousElementSibling as HTMLImageElement).style.transform = 'scale(1.04)';
          e.currentTarget.style.background = 'rgba(44,36,32,0.08)';
        }}
        onMouseOut={(e) => {
          (e.currentTarget.previousElementSibling as HTMLImageElement).style.transform = 'scale(1)';
          e.currentTarget.style.background = 'rgba(44,36,32,0)';
        }}
      />
    </div>
  );
}

export default function GalleryLightbox({ images, projectName, superficie, tipo }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // gallery = todas las imágenes excepto el hero (índice 0)
  const gallery = images.slice(1).filter(Boolean);
  const slides = gallery.map((src) => ({ src }));

  const [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11] = gallery;

  return (
    <>
      <section style={{ padding: '0 48px 80px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* Fila 1: 2 columnas */}
        {(g1 || g2) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            {g1 && <GalleryItem src={g1} alt={`${projectName} — detalle 1`} aspectRatio="4/3" onClick={() => setLightboxIndex(0)} />}
            {g2 && <GalleryItem src={g2} alt={`${projectName} — detalle 2`} aspectRatio="4/3" onClick={() => setLightboxIndex(1)} />}
          </div>
        )}

        {/* Fila 2: imagen ancha */}
        {g3 && (
          <div style={{ marginBottom: '12px' }}>
            <GalleryItem src={g3} alt={`${projectName} — vista general`} aspectRatio="16/7" onClick={() => setLightboxIndex(2)} />
          </div>
        )}

        {/* Fila 3: 3 columnas */}
        {(g4 || g5 || g6) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            {g4 && <GalleryItem src={g4} alt={`${projectName} — detalle 4`} aspectRatio="3/4" onClick={() => setLightboxIndex(3)} />}
            {g5 && <GalleryItem src={g5} alt={`${projectName} — detalle 5`} aspectRatio="3/4" onClick={() => setLightboxIndex(4)} />}
            {g6 && <GalleryItem src={g6} alt={`${projectName} — detalle 6`} aspectRatio="3/4" onClick={() => setLightboxIndex(5)} />}
          </div>
        )}

        {/* Fila 4: 3 columnas */}
        {(g7 || g8 || g9) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            {g7 && <GalleryItem src={g7} alt={`${projectName} — detalle 7`} aspectRatio="4/3" onClick={() => setLightboxIndex(6)} />}
            {g8 && <GalleryItem src={g8} alt={`${projectName} — detalle 8`} aspectRatio="4/3" onClick={() => setLightboxIndex(7)} />}
            {g9 && <GalleryItem src={g9} alt={`${projectName} — detalle 9`} aspectRatio="4/3" onClick={() => setLightboxIndex(8)} />}
          </div>
        )}

        {/* Fila 5: 2 imágenes + celda de datos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {g10 && <GalleryItem src={g10} alt={`${projectName} — detalle 10`} aspectRatio="3/4" onClick={() => setLightboxIndex(9)} />}
          {g11 && <GalleryItem src={g11} alt={`${projectName} — detalle 11`} aspectRatio="3/4" onClick={() => setLightboxIndex(10)} />}
          <div style={{
            background: '#2C2420',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px',
            aspectRatio: '3/4',
          }}>
            {superficie && superficie > 0 ? (
              <>
                <p style={{ color: 'rgba(212,197,169,0.4)', fontSize: '56px', fontWeight: 400, lineHeight: 1, marginBottom: '24px', fontFamily: 'var(--font-playfair), serif' }}>
                  {superficie}
                </p>
                <p style={{ color: 'rgba(253,250,245,0.4)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  metros cuadrados
                </p>
                <div style={{ width: '32px', height: '1px', background: 'rgba(212,197,169,0.3)', margin: '20px 0' }} />
              </>
            ) : null}
            {tipo && (
              <p style={{ color: 'rgba(253,250,245,0.55)', fontSize: '13px', fontWeight: 300, lineHeight: 1.6 }}>
                {tipo}
              </p>
            )}
          </div>
        </div>

      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{ position: 'bottom', width: 80, height: 60, gap: 8, border: 0 }}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        styles={{ container: { backgroundColor: 'rgba(20,14,12,0.97)' } }}
      />
    </>
  );
}
