import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { getSiteSection, updateSiteSection, type SiteContent } from '@/lib/data-access';
import { deleteCloudinaryImages } from '@/lib/cloudinary';

type Params = { params: Promise<{ section: string }> };

const VALID_SECTIONS: (keyof SiteContent)[] = [
  'hero', 'nosotros', 'servicios', 'proceso', 'contacto', 'footer',
];

function unauthorized() {
  return Response.json({ error: 'No autorizado' }, { status: 401 });
}

export async function GET(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session) return unauthorized();

  const { section } = await params;
  if (!VALID_SECTIONS.includes(section as keyof SiteContent)) {
    return Response.json({ error: 'Sección inválida' }, { status: 400 });
  }

  const data = await getSiteSection(section as keyof SiteContent);
  return Response.json({ data });
}

export async function PUT(request: Request, { params }: Params) {
  const session = await auth();
  if (!session) return unauthorized();

  const { section } = await params;
  if (!VALID_SECTIONS.includes(section as keyof SiteContent)) {
    return Response.json({ error: 'Sección inválida' }, { status: 400 });
  }

  try {
    const body = await request.json();

    if ((section === 'hero' || section === 'nosotros') && body.imagen) {
      const oldData = await getSiteSection(section as 'hero') as { imagen?: string };
      const oldUrl = oldData?.imagen;
      if (oldUrl && oldUrl !== body.imagen && oldUrl.includes('cloudinary.com')) {
        deleteCloudinaryImages([{ url: oldUrl }]).catch(console.error);
      }
    }

    await updateSiteSection(section as keyof SiteContent, body);
    revalidatePath('/', 'layout');
    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Error al guardar' }, { status: 500 });
  }
}
