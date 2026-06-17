import type { Project, Service, Step } from '@/data/content';
import { PROJECTS, SERVICES, STEPS } from '@/data/content';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type ProjectDB = Project & {
  publicado: boolean;
  orden: number;
};

export type SiteContent = {
  hero: {
    label: string;
    title: string;
    subtitle: string;
    ctaText: string;
    imagen: string;
  };
  nosotros: {
    label: string;
    title: string;
    parrafo1: string;
    parrafo2: string;
    ctaText: string;
    imagen: string;
  };
  servicios: {
    label: string;
    title: string;
    items: Service[];
  };
  proceso: {
    label: string;
    title: string;
    steps: Step[];
  };
  contacto: {
    label: string;
    title: string;
    subtitle: string;
    email: string;
    instagram: string;
    instagramUrl: string;
  };
  footer: {
    brand: string;
    copyright: string;
  };
};

// ─── Detectar si Prisma/DB está disponible ────────────────────────────────────

function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

// ─── Importación dinámica de Prisma (sólo cuando hay DB) ──────────────────────

async function getPrisma() {
  const { prisma } = await import('@/lib/prisma');
  return prisma;
}

// ─── Mapeador Prisma → ProjectDB ─────────────────────────────────────────────

type PrismaProjectWithImages = {
  id: number;
  slug: string;
  name: string;
  category: string;
  location: string;
  year: number;
  img: string;
  superficie: number;
  tipo: string;
  duracion: string;
  piso: string;
  revestimiento: string;
  paleta: string;
  desafio: string;
  propuesta: string;
  resultado: string;
  publicado: boolean;
  orden: number;
  images: { url: string; orden: number }[];
};

function mapProject(p: PrismaProjectWithImages): ProjectDB {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    location: p.location,
    year: p.year,
    img: p.img,
    gallery: p.images.sort((a, b) => a.orden - b.orden).map((i) => i.url),
    superficie: p.superficie,
    tipo: p.tipo as Project['tipo'],
    duracion: p.duracion,
    materiales: { piso: p.piso, revestimiento: p.revestimiento, paleta: p.paleta },
    desafio: p.desafio,
    propuesta: p.propuesta,
    resultado: p.resultado,
    publicado: p.publicado,
    orden: p.orden,
  };
}

// ─── Proyectos ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<ProjectDB[]> {
  if (!isDbConfigured()) {
    return PROJECTS.map((p, i) => ({ ...p, publicado: true, orden: i + 1 }));
  }
  const prisma = await getPrisma();
  const rows = await prisma.project.findMany({ include: { images: true } });
  return rows.map(mapProject);
}

export async function getPublishedProjects(): Promise<ProjectDB[]> {
  if (!isDbConfigured()) {
    return PROJECTS.map((p, i) => ({ ...p, publicado: true, orden: i + 1 }));
  }
  const prisma = await getPrisma();
  const rows = await prisma.project.findMany({
    where: { publicado: true },
    orderBy: { orden: 'asc' },
    include: { images: true },
  });
  return rows.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<ProjectDB | null> {
  if (!isDbConfigured()) {
    const p = PROJECTS.find((p) => p.slug === slug);
    return p ? { ...p, publicado: true, orden: 1 } : null;
  }
  const prisma = await getPrisma();
  const row = await prisma.project.findUnique({
    where: { slug },
    include: { images: true },
  });
  return row ? mapProject(row) : null;
}

export async function getProjectById(id: number): Promise<ProjectDB | null> {
  if (!isDbConfigured()) {
    const p = PROJECTS.find((p) => p.id === id);
    return p ? { ...p, publicado: true, orden: 1 } : null;
  }
  const prisma = await getPrisma();
  const row = await prisma.project.findUnique({
    where: { id },
    include: { images: true },
  });
  return row ? mapProject(row) : null;
}

export async function createProject(data: Omit<ProjectDB, 'id'>): Promise<ProjectDB> {
  const prisma = await getPrisma();
  const { gallery, materiales, ...rest } = data;
  const row = await prisma.project.create({
    data: {
      ...rest,
      piso: materiales?.piso ?? '',
      revestimiento: materiales?.revestimiento ?? '',
      paleta: materiales?.paleta ?? '',
      images: {
        create: (gallery ?? []).map((url, i) => ({ url, orden: i })),
      },
    },
    include: { images: true },
  });
  return mapProject(row);
}

export async function updateProject(id: number, data: Partial<ProjectDB>): Promise<ProjectDB | null> {
  const prisma = await getPrisma();
  const { gallery, materiales, ...rest } = data;

  const updates: Record<string, unknown> = { ...rest };
  if (materiales) {
    updates.piso = materiales.piso;
    updates.revestimiento = materiales.revestimiento;
    updates.paleta = materiales.paleta;
  }

  if (gallery !== undefined) {
    await prisma.projectImage.deleteMany({ where: { projectId: id } });
    await prisma.projectImage.createMany({
      data: gallery.map((url, i) => ({ url, orden: i, projectId: id })),
    });
  }

  const row = await prisma.project.update({
    where: { id },
    data: updates,
    include: { images: true },
  });
  return mapProject(row);
}

export async function deleteProject(id: number): Promise<boolean> {
  try {
    const prisma = await getPrisma();
    await prisma.project.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function reorderProjects(orderedIds: number[]): Promise<void> {
  const prisma = await getPrisma();
  await prisma.$transaction(
    orderedIds.map((id, i) =>
      prisma.project.update({ where: { id }, data: { orden: i + 1 } })
    )
  );
}

// ─── Contenido del sitio ──────────────────────────────────────────────────────

const defaultContent: SiteContent = {
  hero: {
    label: 'Diseño de interiores residencial',
    title: 'Tu hogar, rediseñado desde adentro',
    subtitle:
      'Transformamos casas en hogares únicos, diseñados desde la escucha y construidos con criterio.',
    ctaText: 'Ver proyectos',
    imagen: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=85',
  },
  nosotros: {
    label: 'El estudio',
    title: 'Diseñamos desde la escucha',
    parrafo1:
      'En MSL Interiores creemos que cada hogar es el reflejo de quien lo habita. Por eso, antes de trazar una línea, nos tomamos el tiempo de entender cómo vivís, qué te genera bienestar y qué historia querés que cuente tu espacio.',
    parrafo2:
      'Trabajamos proyectos residenciales integrales con un enfoque artesanal: atención al detalle, materialidad cuidada y un proceso cercano de principio a fin.',
    ctaText: 'Hablemos de tu proyecto',
    imagen: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
  },
  servicios: {
    label: 'Servicios',
    title: 'Cómo trabajamos',
    items: SERVICES,
  },
  proceso: {
    label: 'Proceso',
    title: 'Así es trabajar con nosotras',
    steps: STEPS,
  },
  contacto: {
    label: 'Contacto',
    title: 'Contanos tu proyecto',
    subtitle:
      'Cada proyecto comienza con una conversación. Escribinos y te respondemos a la brevedad.',
    email: 'msl.interioresba@gmail.com',
    instagram: '@msl.interiores',
    instagramUrl: 'https://instagram.com/msl.interiores',
  },
  footer: {
    brand: 'MSL Interiores',
    copyright: '© 2024 · Diseño de interiores residencial',
  },
};

export async function getSiteContent(): Promise<SiteContent> {
  if (!isDbConfigured()) return defaultContent;
  const prisma = await getPrisma();
  const rows = await prisma.siteContent.findMany();
  if (!rows.length) return defaultContent;

  const content = { ...defaultContent };
  for (const row of rows) {
    const key = row.section as keyof SiteContent;
    if (key in content) {
      (content as Record<string, unknown>)[key] = row.data;
    }
  }
  return content;
}

export async function getSiteSection<K extends keyof SiteContent>(
  section: K
): Promise<SiteContent[K]> {
  if (!isDbConfigured()) return defaultContent[section];
  const prisma = await getPrisma();
  const row = await prisma.siteContent.findUnique({ where: { section } });
  return row ? (row.data as SiteContent[K]) : defaultContent[section];
}

export async function updateSiteSection<K extends keyof SiteContent>(
  section: K,
  data: SiteContent[K]
): Promise<void> {
  const prisma = await getPrisma();
  await prisma.siteContent.upsert({
    where: { section },
    update: { data: data as object },
    create: { section, data: data as object },
  });
}
