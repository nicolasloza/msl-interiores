import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { getProjectById, updateProject, deleteProject } from '@/lib/data-access';
import { deleteCloudinaryImages } from '@/lib/cloudinary';
import { projectUpdateSchema } from '@/lib/schemas';

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
    const raw = await request.json().catch(() => null);
    if (!raw) return Response.json({ error: 'Cuerpo inválido' }, { status: 400 });

    const parsed = projectUpdateSchema.safeParse(raw);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      return Response.json(
        {
          error: flat.formErrors[0] ?? 'Datos inválidos',
          campos: flat.fieldErrors,
        },
        { status: 400 }
      );
    }

    const updated = await updateProject(Number(id), parsed.data);
    if (!updated) return Response.json({ error: 'Proyecto no encontrado' }, { status: 404 });
    revalidatePath('/', 'layout');
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

  // Obtener imágenes antes de borrar de la DB
  const project = await getProjectById(Number(id));
  if (!project) return Response.json({ error: 'Proyecto no encontrado' }, { status: 404 });

  const allImages = [project.img, ...project.gallery].filter(Boolean).map((url) => ({ url }));

  const deleted = await deleteProject(Number(id));
  if (!deleted) return Response.json({ error: 'Error al eliminar' }, { status: 500 });

  deleteCloudinaryImages(allImages).catch(console.error);

  revalidatePath('/', 'layout');
  return Response.json({ ok: true });
}
