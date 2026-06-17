import type { MetadataRoute } from 'next';
import { getPublishedProjects } from '@/lib/data-access';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedProjects();
  const now = new Date();

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `/proyectos/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: '/', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...projectRoutes,
  ];
}
