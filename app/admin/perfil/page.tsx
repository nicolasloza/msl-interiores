'use client';

import { useState, type FormEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function PerfilPage() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (next !== confirm) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }
    if (next.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al cambiar la contraseña');
      } else {
        setSuccess(true);
        setCurrent('');
        setNext('');
        setConfirm('');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 500 }}>
        Perfil
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Administrá tu cuenta de acceso al dashboard.
      </Typography>

      <Paper variant="outlined" sx={{ maxWidth: 480, p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <LockOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight={500}>
            Cambiar contraseña
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {error && <Alert severity="error" sx={{ fontSize: 13 }}>{error}</Alert>}
            {success && (
              <Alert
                severity="success"
                icon={<CheckCircleOutlineIcon fontSize="inherit" />}
                sx={{ fontSize: 13 }}
              >
                Contraseña actualizada correctamente.
              </Alert>
            )}

            <TextField
              label="Contraseña actual"
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              fullWidth
              required
            />
            <TextField
              label="Nueva contraseña"
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
              helperText="Mínimo 8 caracteres"
              fullWidth
              required
            />
            <TextField
              label="Confirmar nueva contraseña"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading || !current || !next || !confirm}
              sx={{ mt: 1, py: 1.5 }}
            >
              {loading ? 'Guardando...' : 'Cambiar contraseña'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
