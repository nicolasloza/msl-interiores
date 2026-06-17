'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Image from 'next/image';
import CloudinaryUploadButton from './CloudinaryUploadButton';

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
  slug?: string;
};

export default function GalleryManager({ images, onChange, slug = '' }: Props) {
  const [newUrl, setNewUrl] = useState('');
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [loadedUrls, setLoadedUrls] = useState<Set<string>>(new Set());

  function markLoaded(url: string) {
    setLoadedUrls((prev) => new Set([...prev, url]));
  }

  function addImage() {
    const url = newUrl.trim();
    if (!url) return;
    onChange([...images, url]);
    setNewUrl('');
  }

  function addImages(urls: string[]) {
    onChange([...images, ...urls]);
  }

  function removeImage(idx: number) {
    onChange(images.filter((_, i) => i !== idx));
  }

  function handleDragStart(idx: number) {
    setDragIdx(idx);
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const updated = [...images];
    const [moved] = updated.splice(dragIdx, 1);
    updated.splice(idx, 0, moved);
    onChange(updated);
    setDragIdx(idx);
  }

  function handleDragEnd() {
    setDragIdx(null);
  }

  return (
    <div>
      {/* Grid de imágenes */}
      {images.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              style={{
                position: 'relative',
                aspectRatio: '1',
                border: dragIdx === idx ? '2px solid #8B6F47' : '1px solid #EDE8E0',
                background: '#F0EBE1',
                cursor: 'grab',
                opacity: dragIdx === idx ? 0.6 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {!loadedUrls.has(src) && (
                <Skeleton
                  variant="rectangular"
                  sx={{ position: 'absolute', inset: 0, zIndex: 1, transform: 'none' }}
                />
              )}
              <Image
                src={src}
                alt={`Imagen ${idx + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="120px"
                onLoad={() => markLoaded(src)}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(44,36,32,0)',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: '4px',
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background = 'rgba(44,36,32,0.35)')
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background = 'rgba(44,36,32,0)')
                }
              >
                <DragIndicatorIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }} />
                <IconButton
                  size="small"
                  onClick={() => removeImage(idx)}
                  sx={{
                    background: 'rgba(44,36,32,0.7)',
                    color: '#FDFAF5',
                    borderRadius: 0,
                    width: 24,
                    height: 24,
                    '&:hover': { background: '#b5451b' },
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 12 }} />
                </IconButton>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: '4px',
                  background: 'rgba(44,36,32,0.6)',
                  color: '#FDFAF5',
                  fontSize: '9px',
                  padding: '1px 4px',
                  letterSpacing: '0.05em',
                }}
              >
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subir desde PC */}
      <div style={{ marginBottom: '12px' }}>
        <CloudinaryUploadButton slug={slug} onUpload={addImages} />
        {slug && (
          <p style={{ fontSize: '11px', color: '#8B6F47', marginTop: '6px', letterSpacing: '0.04em' }}>
            Las imágenes se guardan en <code style={{ background: '#EDE8E0', padding: '1px 4px', fontSize: '10px' }}>msl-interiores/proyectos/{slug}</code>
          </p>
        )}
      </div>

      <Divider sx={{ my: 1.5 }}>
        <span style={{ fontSize: '11px', color: '#8B6F47', letterSpacing: '0.08em' }}>o pegá una URL</span>
      </Divider>

      {/* Agregar URL manual */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <TextField
          fullWidth
          size="small"
          label="URL de imagen"
          placeholder="https://res.cloudinary.com/..."
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addImage()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addImage}
          disabled={!newUrl.trim()}
          startIcon={<AddIcon />}
          sx={{ flexShrink: 0 }}
        >
          Agregar
        </Button>
      </div>

      {images.length > 0 && (
        <p style={{ fontSize: '11px', color: '#8B6F47', marginTop: '8px', letterSpacing: '0.05em' }}>
          {images.length} imagen{images.length !== 1 ? 'es' : ''} · Arrastrá para reordenar
        </p>
      )}
    </div>
  );
}
