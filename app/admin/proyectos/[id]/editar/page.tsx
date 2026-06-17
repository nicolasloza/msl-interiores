export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';
import { getProjectById } from '@/lib/data-access';

type Props = { params: Promise<{ id: string }> };

export default async function EditarProyectoPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(Number(id));
  if (!project) notFound();

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '8px' }}>
          Editando
        </p>
        <h1 style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif', fontSize: '28px', fontWeight: 400, color: '#2C2420', margin: 0 }}>
          {project.name}
        </h1>
      </div>

      <div style={{ background: '#FDFAF5', border: '1px solid #EDE8E0', padding: '32px' }}>
        <ProjectForm
          mode="edit"
          projectId={project.id}
          initialData={project}
        />
      </div>
    </div>
  );
}
