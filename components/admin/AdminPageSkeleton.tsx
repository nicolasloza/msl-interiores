import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// ── Lista de tarjetas (proyectos, contenido) ──────────────────────────────────
export function CardListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Box>
      <Skeleton variant="text" width={220} height={32} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width={340} height={20} sx={{ mb: 4 }} />
      <Skeleton variant="rectangular" height={48} sx={{ mb: 2 }} />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={64} sx={{ mb: 1 }} />
      ))}
    </Box>
  );
}

// ── Formulario de proyecto ─────────────────────────────────────────────────────
export function ProjectFormSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={180} height={32} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width={280} height={20} sx={{ mb: 4 }} />

      {/* Campos básicos */}
      <Skeleton variant="text" width={140} height={16} sx={{ mb: 1.5 }} />
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2, mb: 2 }}>
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 2 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={56} />
        ))}
      </Box>

      {/* Imagen principal */}
      <Skeleton variant="text" width={140} height={16} sx={{ mb: 1.5 }} />
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Skeleton variant="rectangular" width={160} height={120} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="rectangular" height={40} width={160} sx={{ mb: 1.5 }} />
          <Skeleton variant="text" width={200} height={16} />
        </Box>
      </Box>

      {/* Galería */}
      <Skeleton variant="text" width={140} height={16} sx={{ mb: 1.5 }} />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, mb: 3 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" sx={{ aspectRatio: '1' }} />
        ))}
      </Box>

      {/* Descripción */}
      <Skeleton variant="text" width={140} height={16} sx={{ mb: 1.5 }} />
      <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
    </Box>
  );
}

// ── Editor de sección de contenido ────────────────────────────────────────────
export function ContentEditorSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={180} height={32} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width={300} height={20} sx={{ mb: 4 }} />
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={56} sx={{ mb: 2 }} />
      ))}
      <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={40} width={140} />
    </Box>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export function DashboardSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={200} height={36} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width={320} height={20} sx={{ mb: 4 }} />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 4 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={100} />
        ))}
      </Box>
      <Skeleton variant="rectangular" height={240} />
    </Box>
  );
}

// ── Perfil ────────────────────────────────────────────────────────────────────
export function PerfilSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={120} height={32} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width={280} height={20} sx={{ mb: 4 }} />
      <Skeleton variant="rectangular" width={480} height={320} />
    </Box>
  );
}
