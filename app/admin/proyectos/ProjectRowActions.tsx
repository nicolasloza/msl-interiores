'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

type Props = {
  projectId: number;
  publicado: boolean;
};

export default function ProjectRowActions({ projectId, publicado }: Props) {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  async function togglePublish() {
    setLoading(true);
    await fetch(`/api/admin/proyectos/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicado: !publicado }),
    });
    router.refresh();
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/admin/proyectos/${projectId}`, { method: 'DELETE' });
    setConfirmDelete(false);
    router.refresh();
    setLoading(false);
  }

  return (
    <>
      <Tooltip title="Editar">
        <Link href={`/admin/proyectos/${projectId}/editar`}>
          <IconButton size="small" sx={{ color: '#5C4A42' }}>
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Link>
      </Tooltip>

      <Tooltip title={publicado ? 'Despublicar' : 'Publicar'}>
        <IconButton size="small" onClick={togglePublish} disabled={loading} sx={{ color: '#8B6F47' }}>
          {publicado ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Eliminar">
        <IconButton size="small" onClick={() => setConfirmDelete(true)} sx={{ color: '#b5451b' }}>
          <DeleteIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>

      <ConfirmDialog
        open={confirmDelete}
        title="Eliminar proyecto"
        description="Esta acción no se puede deshacer. El proyecto será eliminado permanentemente del sistema."
        confirmLabel="Eliminar"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
        loading={loading}
      />
    </>
  );
}
