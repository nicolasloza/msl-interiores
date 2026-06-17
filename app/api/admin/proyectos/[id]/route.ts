import { auth } from '@/auth';
import { getProjectById, updateProject, deleteProject } from '@/lib/data-access';
import type { ProjectDB } from '@/lib/data-access';

type Params = { params: Promise<{ id: string }> };

function unauthorized() {
  return Response.json({ error: 'No autorizado' }, { status: 401 });
}

export async function GET(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session) return unauthorized();

  const { id } = await params;
  const project = await getProjectById(Number(id));
  if (!project) return Response.json({ error: 'No encontrado' }, { status: 404 });
  return Response.json({ project });
}

export async function PUT(request: Request, { params }: Params) {
  const session = await auth();
  if (!session) return unauthorized();

  const { id } = await params;
  try {
    const body = await request.json() as Partial<ProjectDB>;
    const updated = await updateProject(Number(id), body);
    if (!updated) return Response.json({ error: 'Proyecto no encontrado' }, { status: 404 });
    return Response.json({ project: updated });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session) return unauthorized();

  const { id } = await params;
  const deleted = await deleteProject(Number(id));
  if (!deleted) return Response.json({ error: 'Proyecto no encontrado' }, { status: 404 });
  return Response.json({ ok: true });
}
