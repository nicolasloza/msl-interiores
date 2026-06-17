import { auth } from '@/auth';
import { getProjects, createProject } from '@/lib/data-access';
import type { ProjectDB } from '@/lib/data-access';

function unauthorized() {
  return Response.json({ error: 'No autorizado' }, { status: 401 });
}

export async function GET() {
  const session = await auth();
  if (!session) return unauthorized();

  const projects = await getProjects();
  return Response.json({ projects });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return unauthorized();

  try {
    const body = await request.json() as Omit<ProjectDB, 'id'>;

    if (!body.name?.trim()) return Response.json({ error: 'El nombre es requerido' }, { status: 400 });
    if (!body.slug?.trim()) return Response.json({ error: 'El slug es requerido' }, { status: 400 });
    if (!body.img?.trim()) return Response.json({ error: 'La imagen principal es requerida' }, { status: 400 });

    // Verificar slug único
    const existing = await getProjects();
    if (existing.some((p) => p.slug === body.slug)) {
      return Response.json({ error: 'Ya existe un proyecto con ese slug' }, { status: 400 });
    }

    const project = await createProject({
      slug: body.slug,
      name: body.name,
      category: body.category ?? 'Residencial',
      location: body.location ?? '',
      year: body.year ?? new Date().getFullYear(),
      img: body.img,
      gallery: body.gallery ?? [],
      superficie: body.superficie ?? 0,
      tipo: body.tipo ?? 'Proyecto integral',
      duracion: body.duracion ?? '',
      materiales: body.materiales ?? { piso: '', revestimiento: '', paleta: '' },
      desafio: body.desafio ?? '',
      propuesta: body.propuesta ?? '',
      resultado: body.resultado ?? '',
      publicado: body.publicado ?? true,
      orden: body.orden ?? 999,
    });

    return Response.json({ project }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
}
