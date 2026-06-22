import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const CLD = (id: string) =>
  `https://res.cloudinary.com/dkjmjmqvo/image/upload/f_auto,q_auto/${id}`;

async function main() {
  console.log('Seeding database...');

  // ── Usuario admin ──────────────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@mslinteriores.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'cambiar_esta_password';

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Administrador',
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log(`✓ Usuario admin: ${adminEmail}`);

  // ── Proyecto Pelliza ───────────────────────────────────────────────────────
  const gallery = [
    CLD('IMG_4643_ceooym'),
    CLD('IMG_2697_lxn6gk'),
    CLD('IMG_2689_l5eh6f'),
    CLD('6d5f5853-90b9-4557-943a-d3eb469713b0_imkwr6'),
    CLD('IMG_4645_ayrnc5'),
    CLD('IMG_2687_yddv5k'),
    CLD('IMG-20240106-WA0032_Original_pbhfiq'),
    CLD('IMG_4649_bisndp'),
    CLD('IMG_4653_wczzw1'),
    CLD('d22dddb2-1181-4f91-b25b-3ea91e272f26_vesl3r'),
    CLD('77474437-92ac-417e-96fa-b6bdf8f3d314_sxsr9y'),
    CLD('6d0950b2-a542-4710-bb93-009b1c97d20e_b5wfkj'),
  ];

  const pelliza = await prisma.project.upsert({
    where: { slug: 'pelliza' },
    update: {},
    create: {
      slug: 'pelliza',
      name: 'Pelliza',
      category: 'Residencial',
      location: 'CABA',
      year: 2024,
      img: CLD('IMG_4643_ceooym'),
      superficie: 0,
      tipo: 'Proyecto integral',
      details: [],
      desafio: '',
      propuesta: '',
      resultado: '',
      publicado: true,
      orden: 1,
    },
  });

  // Imágenes del proyecto (sólo si no existen)
  const existing = await prisma.projectImage.count({ where: { projectId: pelliza.id } });
  if (existing === 0) {
    await prisma.projectImage.createMany({
      data: gallery.map((url, i) => ({ url, orden: i, projectId: pelliza.id })),
    });
  }
  console.log(`✓ Proyecto: ${pelliza.name} (${gallery.length} imágenes)`);

  // ── Contenido del sitio ────────────────────────────────────────────────────
  const sections = [
    {
      section: 'hero',
      data: {
        label: 'Diseño de interiores residencial',
        title: 'Tu hogar, rediseñado desde adentro',
        subtitle:
          'Transformamos casas en hogares únicos, diseñados desde la escucha y construidos con criterio.',
        ctaText: 'Ver proyectos',
        imagen: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=85',
      },
    },
    {
      section: 'nosotros',
      data: {
        label: 'El estudio',
        title: 'Diseñamos desde la escucha',
        parrafo1:
          'En MSL Interiores creemos que cada hogar es el reflejo de quien lo habita. Por eso, antes de trazar una línea, nos tomamos el tiempo de entender cómo vivís, qué te genera bienestar y qué historia querés que cuente tu espacio.',
        parrafo2:
          'Trabajamos proyectos residenciales integrales con un enfoque artesanal: atención al detalle, materialidad cuidada y un proceso cercano de principio a fin.',
        ctaText: 'Hablemos de tu proyecto',
        imagen: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
      },
    },
    {
      section: 'servicios',
      data: {
        label: 'Servicios',
        title: 'Cómo trabajamos',
        items: [
          {
            iconId: 'proyecto-integral',
            title: 'Proyecto Integral',
            desc: 'Diseñamos cada espacio desde cero: distribución, materialidad, mobiliario y paleta. Un proceso completo que convierte tu visión en un hogar coherente y único.',
          },
          {
            iconId: 'direccion-obra',
            title: 'Dirección de Obra',
            desc: 'Coordinamos y supervisamos cada etapa de la ejecución. Nos aseguramos de que lo diseñado se construya tal como fue concebido, cuidando tiempos y detalles.',
          },
        ],
      },
    },
    {
      section: 'proceso',
      data: {
        label: 'Proceso',
        title: 'Así es trabajar con nosotras',
        steps: [
          { num: '01', title: 'Consulta inicial', desc: 'Nos reunimos para entender tu proyecto, necesidades y estilo de vida.' },
          { num: '02', title: 'Propuesta de diseño', desc: 'Desarrollamos una propuesta visual con planos, renders y selección de materiales.' },
          { num: '03', title: 'Desarrollo', desc: 'Ajustamos cada detalle hasta lograr un diseño que te represente completamente.' },
          { num: '04', title: 'Dirección de obra', desc: 'Acompañamos la ejecución para garantizar que el resultado final sea fiel al diseño.' },
        ],
      },
    },
    {
      section: 'contacto',
      data: {
        label: 'Contacto',
        title: 'Contanos tu proyecto',
        subtitle: 'Cada proyecto comienza con una conversación. Escribinos y te respondemos a la brevedad.',
        email: 'msl.interioresba@gmail.com',
        instagram: '@msl.interiores',
        instagramUrl: 'https://instagram.com/msl.interiores',
      },
    },
    {
      section: 'footer',
      data: {
        brand: 'MSL Interiores',
        copyright: '© 2024 · Diseño de interiores residencial',
      },
    },
  ];

  for (const { section, data } of sections) {
    await prisma.siteContent.upsert({
      where: { section },
      update: {},
      create: { section, data },
    });
  }
  console.log('✓ Contenido del sitio (6 secciones)');

  console.log('\nSeed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
