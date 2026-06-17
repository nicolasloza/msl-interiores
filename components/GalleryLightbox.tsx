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
  sizes,
  onClick,
}: {
  src: string;
  alt: string;
  aspectRatio: string;
  sizes: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{ position: 'relative', aspectRatio, overflow: 'hidden', cursor: 'zoom-in' }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }} />
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(44,36,32,0)', transition: 'background 0.3s' }}
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

export default function GalleryLightbox({ images, projectName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);
  const [labelCollapsed, setLabelCollapsed] = useState(true);

  // gallery = todas las imágenes excepto el hero (índice 0)
  const gallery = images.slice(1).filter(Boolean);
  const slides = gallery.map((src) => ({ src }));

  const preview = gallery.slice(0, 4);
  const extra = gallery.slice(4);
  const hasMore = extra.length > 0;

  return (
    <>
      <section className="proyecto-gallery-pad">

        {/* img1 — ancho completo */}
        {preview[0] && (
          <div style={{ marginBottom: '12px' }}>
            <GalleryItem
              src={preview[0]}
              alt={`${projectName} — 1`}
              aspectRatio="16/9"
              sizes="(max-width: 768px) 100vw, min(1100px, 100vw)"
              onClick={() => setLightboxIndex(0)}
            />
          </div>
        )}

        {/* img2 + img3 — dos columnas */}
        {(preview[1] || preview[2]) && (
          <div className="gallery-grid-2">
            {preview[1] && (
              <GalleryItem
                src={preview[1]}
                alt={`${projectName} — 2`}
                aspectRatio="4/3"
                sizes="(max-width: 768px) 100vw, 50vw"
                onClick={() => setLightboxIndex(1)}
              />
            )}
            {preview[2] && (
              <GalleryItem
                src={preview[2]}
                alt={`${projectName} — 3`}
                aspectRatio="4/3"
                sizes="(max-width: 768px) 100vw, 50vw"
                onClick={() => setLightboxIndex(2)}
              />
            )}
          </div>
        )}

        {/* img4 — ancho completo */}
        {preview[3] && (
          <div style={{ marginTop: '12px' }}>
            <GalleryItem
              src={preview[3]}
              alt={`${projectName} — 4`}
              aspectRatio="16/9"
              sizes="(max-width: 768px) 100vw, min(1100px, 100vw)"
              onClick={() => setLightboxIndex(3)}
            />
          </div>
        )}

        {/* Sección expandible */}
        {hasMore && (
          <div
            onTransitionEnd={() => { if (!showAll) setLabelCollapsed(true); }}
            style={{
              overflow: 'hidden',
              maxHeight: showAll ? `${extra.length * 600}px` : '0',
              transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="gallery-extra-grid" style={{ marginTop: '12px' }}>
              {extra.map((src, i) => (
                <GalleryItem
                  key={src}
                  src={src}
                  alt={`${projectName} — ${i + 5}`}
                  aspectRatio="4/3"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  onClick={() => setLightboxIndex(i + 4)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Botón Ver más / Ver menos */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                  // labelCollapsed se actualiza en onTransitionEnd
                } else {
                  setShowAll(true);
                  setLabelCollapsed(false);
                }
              }}
              style={{
                background: 'none',
                border: '1px solid #2C2420',
                color: '#2C2420',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '14px 36px',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#2C2420';
                (e.currentTarget as HTMLButtonElement).style.color = '#FDFAF5';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'none';
                (e.currentTarget as HTMLButtonElement).style.color = '#2C2420';
              }}
            >
              {labelCollapsed ? `Ver más — ${extra.length} foto${extra.length > 1 ? 's' : ''}` : `Ver menos`}
            </button>
          </div>
        )}

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
