import Link from 'next/link';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { getProjects } from '@/lib/data-access';
import ProjectRowActions from './ProjectRowActions';

export const dynamic = 'force-dynamic';

export default async function ProyectosAdminPage() {
  const projects = await getProjects();
  const sorted = [...projects].sort((a, b) => a.orden - b.orden);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '8px' }}>
            Gestión
          </p>
          <h1 style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif', fontSize: '28px', fontWeight: 400, color: '#2C2420', margin: 0 }}>
            Proyectos
          </h1>
        </div>
        <Link href="/admin/proyectos/nuevo">
          <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
            Nuevo proyecto
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', border: '1px solid #EDE8E0', background: '#FDFAF5' }}>
          <p style={{ fontSize: '14px', color: '#8B6F47', letterSpacing: '0.05em', marginBottom: '24px' }}>
            No hay proyectos todavía
          </p>
          <Link href="/admin/proyectos/nuevo">
            <Button variant="outlined">Crear el primer proyecto</Button>
          </Link>
        </div>
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #EDE8E0' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Proyecto</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Año</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {project.img && (
                        <div style={{ width: '48px', height: '36px', position: 'relative', flexShrink: 0, border: '1px solid #EDE8E0', overflow: 'hidden' }}>
                          <Image
                            src={project.img}
                            alt={project.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="48px"
                          />
                        </div>
                      )}
                      <div>
                        <p style={{ fontSize: '14px', color: '#2C2420', margin: '0 0 2px', fontWeight: 400 }}>
                          {project.name}
                        </p>
                        <p style={{ fontSize: '11px', color: '#8B6F47', margin: 0, letterSpacing: '0.04em' }}>
                          {project.location} · orden {project.orden}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span style={{ fontSize: '13px', color: '#5C4A42' }}>{project.category}</span>
                  </TableCell>
                  <TableCell>
                    <span style={{ fontSize: '13px', color: '#5C4A42' }}>{project.year}</span>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={project.publicado ? 'Publicado' : 'Borrador'}
                      color={project.publicado ? 'success' : 'warning'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <ProjectRowActions projectId={project.id} publicado={project.publicado} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
