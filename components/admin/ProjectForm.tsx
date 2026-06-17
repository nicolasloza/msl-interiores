'use client';

import { useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Divider from '@mui/material/Divider';
import GalleryManager from './GalleryManager';
import CloudinaryUploadButton from './CloudinaryUploadButton';
import type { ProjectDB } from '@/lib/data-access';

type FormData = {
  slug: string;
  name: string;
  category: string;
  location: string;
  year: number;
  img: string;
  gallery: string[];
  superficie: number;
  tipo: 'Proyecto integral' | 'Dirección de obra' | 'Proyecto integral + Dirección de obra';
  duracion: string;
  materiales: { piso: string; revestimiento: string; paleta: string };
  desafio: string;
  propuesta: string;
  resultado: string;
  publicado: boolean;
  orden: number;
};

type Props = {
  initialData?: Partial<FormData>;
  projectId?: number;
  mode: 'create' | 'edit';
};

const TIPO_OPTIONS = [
  'Proyecto integral',
  'Dirección de obra',
  'Proyecto integral + Dirección de obra',
] as const;

const defaultForm: FormData = {
  slug: '',
  name: '',
  category: 'Residencial',
  location: '',
  year: new Date().getFullYear(),
  img: '',
  gallery: [],
  superficie: 0,
  tipo: 'Proyecto integral',
  duracion: '',
  materiales: { piso: '', revestimiento: '', paleta: '' },
  desafio: '',
  propuesta: '',
  resultado: '',
  publicado: true,
  orden: 999,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', margin: '24px 0 12px' }}>
      {children}
    </p>
  );
}

function Row({ children, cols }: { children: React.ReactNode; cols?: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: cols ?? '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
      {children}
    </div>
  );
}

export default function ProjectForm({ initialData, projectId, mode }: Props) {
  const router = useRouter();
  const initialForm = useRef<FormData>({ ...defaultForm, ...initialData });
  const [form, setForm] = useState<FormData>({ ...defaultForm, ...initialData });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(initialForm.current),
    [form]
  );
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false, message: '', severity: 'success',
  });

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function setMaterial(key: keyof FormData['materiales'], value: string) {
    setForm((prev) => ({ ...prev, materiales: { ...prev.materiales, [key]: value } }));
  }

  function validate(): boolean {
    const e: Partial<Record<string, string>> = {};
    if (!form.name.trim()) e.name = 'El nombre es requerido';
    if (!form.slug.trim()) e.slug = 'El slug es requerido';
    if (!/^[a-z0-9-]+$/.test(form.slug)) e.slug = 'Solo letras minúsculas, números y guiones';
    if (!form.location.trim()) e.location = 'La ubicación es requerida';
    if (!form.img.trim()) e.img = 'La imagen principal es requerida';
    if (form.year < 2000 || form.year > 2100) e.year = 'Año inválido';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const url = mode === 'create' ? '/api/admin/proyectos' : `/api/admin/proyectos/${projectId}`;
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Error al guardar');
      }

      setSnack({ open: true, message: mode === 'create' ? 'Proyecto creado correctamente' : 'Proyecto actualizado', severity: 'success' });
      setTimeout(() => router.push('/admin/proyectos'), 1200);
    } catch (err) {
      setSnack({ open: true, message: err instanceof Error ? err.message : 'Error desconocido', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <SectionLabel>Información básica</SectionLabel>

      <Row cols="2fr 1fr">
        <TextField
          fullWidth label="Nombre del proyecto *" value={form.name}
          onChange={(e) => {
            set('name', e.target.value);
            if (!projectId) {
              set('slug', e.target.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
            }
          }}
          error={!!errors.name} helperText={errors.name}
        />
        <TextField
          fullWidth label="Slug (URL) *" value={form.slug}
          onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
          error={!!errors.slug} helperText={errors.slug ?? 'Ej: departamento-palermo'}
        />
      </Row>

      <Row cols="1fr 1fr 1fr 1fr">
        <TextField fullWidth label="Categoría" value={form.category} onChange={(e) => set('category', e.target.value)} />
        <TextField fullWidth label="Ubicación *" value={form.location} onChange={(e) => set('location', e.target.value)} error={!!errors.location} helperText={errors.location} />
        <TextField fullWidth label="Año" type="number" value={form.year} onChange={(e) => set('year', Number(e.target.value))} error={!!errors.year} helperText={errors.year} />
        <TextField fullWidth label="Orden" type="number" value={form.orden} onChange={(e) => set('orden', Number(e.target.value))} helperText="Posición en grid" />
      </Row>

      <Row cols="1fr 1fr 1fr">
        <TextField fullWidth select label="Tipo de proyecto" value={form.tipo} onChange={(e) => set('tipo', e.target.value as FormData['tipo'])}>
          {TIPO_OPTIONS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
        </TextField>
        <TextField fullWidth label="Superficie (m²)" type="number" value={form.superficie} onChange={(e) => set('superficie', Number(e.target.value))} />
        <TextField fullWidth label="Duración" value={form.duracion} onChange={(e) => set('duracion', e.target.value)} placeholder="Ej: 6 meses" />
      </Row>

      <SectionLabel>Imagen principal</SectionLabel>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '16px' }}>
        {/* Preview */}
        <div style={{
          width: '160px', aspectRatio: '4/3', flexShrink: 0,
          border: '1px solid #EDE8E0', background: '#F0EBE1',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          {form.img
            ? <img src={form.img} alt="Principal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> // eslint-disable-line @next/next/no-img-element
            : <span style={{ fontSize: '11px', color: '#8B6F47', letterSpacing: '0.06em' }}>Sin imagen</span>
          }
        </div>

        <div style={{ flex: 1, minWidth: '200px' }}>
          {/* Subir nueva */}
          <CloudinaryUploadButton
            slug={form.slug}
            onUpload={(urls) => set('img', urls[0])}
          />

          {/* Elegir de la galería */}
          {form.gallery.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '8px' }}>
                O elegí de la galería
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {form.gallery.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => set('img', url)}
                    title={`Usar imagen ${i + 1} como principal`}
                    style={{
                      width: '56px', height: '42px', padding: 0, cursor: 'pointer',
                      border: form.img === url ? '2px solid #8B6F47' : '1px solid #EDE8E0',
                      overflow: 'hidden', flexShrink: 0, background: 'none',
                      opacity: form.img === url ? 1 : 0.75,
                      transition: 'opacity 0.15s, border-color 0.15s',
                    }}
                    onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                    onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = form.img === url ? '1' : '0.75'; }}
                  >
                    <img src={url} alt={`img ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> {/* eslint-disable-line @next/next/no-img-element */}
                  </button>
                ))}
              </div>
            </div>
          )}

          {errors.img && (
            <p style={{ fontSize: '12px', color: '#d32f2f', marginTop: '8px' }}>{errors.img}</p>
          )}
        </div>
      </div>

      <SectionLabel>Galería de imágenes</SectionLabel>
      <GalleryManager images={form.gallery} onChange={(imgs) => set('gallery', imgs)} slug={form.slug} />

      <SectionLabel>Materiales</SectionLabel>
      <Row cols="1fr 1fr 1fr">
        <TextField fullWidth label="Piso" value={form.materiales.piso} onChange={(e) => setMaterial('piso', e.target.value)} />
        <TextField fullWidth label="Revestimiento" value={form.materiales.revestimiento} onChange={(e) => setMaterial('revestimiento', e.target.value)} />
        <TextField fullWidth label="Paleta" value={form.materiales.paleta} onChange={(e) => setMaterial('paleta', e.target.value)} />
      </Row>

      <SectionLabel>Descripción narrativa</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
        <TextField fullWidth multiline minRows={3} label="01 · El desafío" value={form.desafio} onChange={(e) => set('desafio', e.target.value)} />
        <TextField fullWidth multiline minRows={3} label="02 · La propuesta" value={form.propuesta} onChange={(e) => set('propuesta', e.target.value)} />
        <TextField fullWidth multiline minRows={3} label="03 · El resultado" value={form.resultado} onChange={(e) => set('resultado', e.target.value)} />
      </div>

      <Divider sx={{ my: 3 }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <FormControlLabel
          control={<Switch checked={form.publicado} onChange={(e) => set('publicado', e.target.checked)} />}
          label={<span style={{ fontSize: '13px', color: '#5C4A42' }}>{form.publicado ? 'Publicado — visible en el sitio' : 'Borrador — no visible'}</span>}
        />
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outlined" onClick={() => router.push('/admin/proyectos')} disabled={loading}>Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={loading || (mode === 'edit' && !isDirty)}
            title={mode === 'edit' && !isDirty ? 'No hay cambios para guardar' : undefined}
          >
            {loading ? 'Guardando...' : mode === 'create' ? 'Crear proyecto' : 'Guardar cambios'}
          </Button>
        </div>
      </div>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
        <Alert severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))}>{snack.message}</Alert>
      </Snackbar>
    </form>
  );
}
