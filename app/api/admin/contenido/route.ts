import { auth } from '@/auth';
import { getSiteContent } from '@/lib/data-access';

function unauthorized() {
  return Response.json({ error: 'No autorizado' }, { status: 401 });
}

export async function GET() {
  const session = await auth();
  if (!session) return unauthorized();

  const content = await getSiteContent();
  return Response.json({ content });
}
