import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { getProjects, createProject } from '@/lib/data-access';
import { projectCreateSchema } from '@/lib/schemas';

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
    const raw = await request.json().catch(() => null);
    if (!raw) return Response.json({ error: 'Cuerpo inválido' }, { status: 400 });

    const parsed = projectCreateSchema.safeParse(raw);
    if (!parsed.success) {
      return Response.json(
        { error: 'Datos inválidos', campos: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const existing = await getProjects();
    if (existing.some((p) => p.slug === data.slug)) {
      return Response.json({ error: 'Ya existe un proyecto con ese slug' }, { status: 400 });
    }

    const project = await createProject(
      {
        slug:      data.slug,
        name:      data.name,
        category:  data.category,
        location:  data.location,
        year:      data.year,
        img:       data.img,
        gallery:   data.gallery.map((img) => img.url),
        superficie: data.superficie,
        tipo:      data.tipo,
        details:   data.details,
        desafio:   data.desafio,
        propuesta: data.propuesta,
        resultado: data.resultado,
        publicado: data.publicado,
        orden:     data.orden,
      },
      data.gallery
    );

    revalidatePath('/', 'layout');
    return Response.json({ project }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
}
