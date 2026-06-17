'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import type { SiteContent } from '@/lib/data-access';

type Props<K extends keyof SiteContent> = {
  section: K;
  initialData: SiteContent[K];
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', margin: '24px 0 12px 0' }}>
      {children}
    </p>
  );
}

// ─── Editors por sección ──────────────────────────────────────────────────────

function HeroEditor({ data, onChange }: { data: SiteContent['hero']; onChange: (d: SiteContent['hero']) => void }) {
  function set<K extends keyof SiteContent['hero']>(k: K, v: SiteContent['hero'][K]) {
    onChange({ ...data, [k]: v });
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField fullWidth size="small" label="Etiqueta superior" value={data.label} onChange={(e) => set('label', e.target.value)} />
      <TextField fullWidth size="small" label="Título principal" value={data.title} onChange={(e) => set('title', e.target.value)} />
      <TextField fullWidth size="small" multiline label="Subtítulo" value={data.subtitle} onChange={(e) => set('subtitle', e.target.value)} />
      <TextField fullWidth size="small" label="Texto del botón CTA" value={data.ctaText} onChange={(e) => set('ctaText', e.target.value)} />
      <TextField fullWidth size="small" label="URL imagen de fondo" value={data.imagen} onChange={(e) => set('imagen', e.target.value)} helperText="URL de Unsplash o Cloudinary" />
    </div>
  );
}

function NosotrosEditor({ data, onChange }: { data: SiteContent['nosotros']; onChange: (d: SiteContent['nosotros']) => void }) {
  function set<K extends keyof SiteContent['nosotros']>(k: K, v: SiteContent['nosotros'][K]) {
    onChange({ ...data, [k]: v });
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField fullWidth size="small" label="Etiqueta" value={data.label} onChange={(e) => set('label', e.target.value)} />
      <TextField fullWidth size="small" label="Título" value={data.title} onChange={(e) => set('title', e.target.value)} />
      <TextField fullWidth size="small" multiline minRows={3} label="Primer párrafo" value={data.parrafo1} onChange={(e) => set('parrafo1', e.target.value)} />
      <TextField fullWidth size="small" multiline minRows={3} label="Segundo párrafo" value={data.parrafo2} onChange={(e) => set('parrafo2', e.target.value)} />
      <TextField fullWidth size="small" label="Texto del botón CTA" value={data.ctaText} onChange={(e) => set('ctaText', e.target.value)} />
      <TextField fullWidth size="small" label="URL imagen" value={data.imagen} onChange={(e) => set('imagen', e.target.value)} />
    </div>
  );
}

function ServiciosEditor({ data, onChange }: { data: SiteContent['servicios']; onChange: (d: SiteContent['servicios']) => void }) {
  function setItem(idx: number, key: keyof SiteContent['servicios']['items'][0], val: string) {
    const updated = data.items.map((item, i) => i === idx ? { ...item, [key]: val } : item);
    onChange({ ...data, items: updated });
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField fullWidth size="small" label="Etiqueta" value={data.label} onChange={(e) => onChange({ ...data, label: e.target.value })} />
      <TextField fullWidth size="small" label="Título de sección" value={data.title} onChange={(e) => onChange({ ...data, title: e.target.value })} />
      {data.items.map((item, idx) => (
        <div key={idx} style={{ padding: '16px', border: '1px solid #EDE8E0', background: '#F7F3ED' }}>
          <p style={{ fontSize: '11px', color: '#8B6F47', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Servicio {idx + 1}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <TextField fullWidth size="small" label="Título" value={item.title} onChange={(e) => setItem(idx, 'title', e.target.value)} />
            <TextField fullWidth size="small" multiline minRows={2} label="Descripción" value={item.desc} onChange={(e) => setItem(idx, 'desc', e.target.value)} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProcesoEditor({ data, onChange }: { data: SiteContent['proceso']; onChange: (d: SiteContent['proceso']) => void }) {
  function setStep(idx: number, key: keyof SiteContent['proceso']['steps'][0], val: string) {
    const updated = data.steps.map((s, i) => i === idx ? { ...s, [key]: val } : s);
    onChange({ ...data, steps: updated });
  }
  function addStep() {
    const num = String(data.steps.length + 1).padStart(2, '0');
    onChange({ ...data, steps: [...data.steps, { num, title: '', desc: '' }] });
  }
  function removeStep(idx: number) {
    onChange({ ...data, steps: data.steps.filter((_, i) => i !== idx) });
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField fullWidth size="small" label="Etiqueta" value={data.label} onChange={(e) => onChange({ ...data, label: e.target.value })} />
      <TextField fullWidth size="small" label="Título de sección" value={data.title} onChange={(e) => onChange({ ...data, title: e.target.value })} />
      {data.steps.map((step, idx) => (
        <div key={idx} style={{ padding: '16px', border: '1px solid #EDE8E0', background: '#F7F3ED', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={{ fontSize: '11px', color: '#8B6F47', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Paso {step.num}</p>
            <IconButton size="small" onClick={() => removeStep(idx)} sx={{ color: '#b5451b', borderRadius: 0 }}>
              <DeleteIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <TextField fullWidth size="small" label="Número" value={step.num} onChange={(e) => setStep(idx, 'num', e.target.value)} />
            <TextField fullWidth size="small" label="Título" value={step.title} onChange={(e) => setStep(idx, 'title', e.target.value)} />
            <TextField fullWidth size="small" multiline label="Descripción" value={step.desc} onChange={(e) => setStep(idx, 'desc', e.target.value)} />
          </div>
        </div>
      ))}
      <Button variant="outlined" startIcon={<AddIcon />} onClick={addStep} size="small">
        Agregar paso
      </Button>
    </div>
  );
}

function ContactoEditor({ data, onChange }: { data: SiteContent['contacto']; onChange: (d: SiteContent['contacto']) => void }) {
  function set<K extends keyof SiteContent['contacto']>(k: K, v: SiteContent['contacto'][K]) {
    onChange({ ...data, [k]: v });
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField fullWidth size="small" label="Etiqueta" value={data.label} onChange={(e) => set('label', e.target.value)} />
      <TextField fullWidth size="small" label="Título" value={data.title} onChange={(e) => set('title', e.target.value)} />
      <TextField fullWidth size="small" multiline label="Subtítulo" value={data.subtitle} onChange={(e) => set('subtitle', e.target.value)} />
      <TextField fullWidth size="small" label="Email" type="email" value={data.email} onChange={(e) => set('email', e.target.value)} />
      <TextField fullWidth size="small" label="Instagram (@usuario)" value={data.instagram} onChange={(e) => set('instagram', e.target.value)} />
      <TextField fullWidth size="small" label="URL de Instagram" value={data.instagramUrl} onChange={(e) => set('instagramUrl', e.target.value)} />
    </div>
  );
}

function FooterEditor({ data, onChange }: { data: SiteContent['footer']; onChange: (d: SiteContent['footer']) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField fullWidth size="small" label="Nombre / marca" value={data.brand} onChange={(e) => onChange({ ...data, brand: e.target.value })} />
      <TextField fullWidth size="small" label="Texto de copyright" value={data.copyright} onChange={(e) => onChange({ ...data, copyright: e.target.value })} />
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ContentSectionForm<K extends keyof SiteContent>({ section, initialData }: Props<K>) {
  const router = useRouter();
  const [data, setData] = useState<SiteContent[K]>(initialData);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false, message: '', severity: 'success',
  });

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/contenido/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Error al guardar');
      setSnack({ open: true, message: 'Cambios guardados correctamente', severity: 'success' });
    } catch (err) {
      setSnack({ open: true, message: err instanceof Error ? err.message : 'Error', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }

  function renderEditor() {
    switch (section) {
      case 'hero':
        return <HeroEditor data={data as SiteContent['hero']} onChange={(d) => setData(d as SiteContent[K])} />;
      case 'nosotros':
        return <NosotrosEditor data={data as SiteContent['nosotros']} onChange={(d) => setData(d as SiteContent[K])} />;
      case 'servicios':
        return <ServiciosEditor data={data as SiteContent['servicios']} onChange={(d) => setData(d as SiteContent[K])} />;
      case 'proceso':
        return <ProcesoEditor data={data as SiteContent['proceso']} onChange={(d) => setData(d as SiteContent[K])} />;
      case 'contacto':
        return <ContactoEditor data={data as SiteContent['contacto']} onChange={(d) => setData(d as SiteContent[K])} />;
      case 'footer':
        return <FooterEditor data={data as SiteContent['footer']} onChange={(d) => setData(d as SiteContent[K])} />;
      default:
        return <p style={{ color: '#8B6F47' }}>Sección no encontrada</p>;
    }
  }

  return (
    <div>
      {renderEditor()}

      <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={() => router.push('/admin/contenido')} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSave} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
        <Alert severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
