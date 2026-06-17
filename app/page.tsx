export const revalidate = 60;

import type { Metadata } from 'next';
import ScrollToHash from '@/components/ScrollToHash';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';
import Hero from '@/components/Hero';
import Nosotros from '@/components/Nosotros';
import Servicios from '@/components/Servicios';
import Proyectos from '@/components/Proyectos';
import Proceso from '@/components/Proceso';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';
import { getSiteContent, getPublishedProjects } from '@/lib/data-access';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const desc = 'Estudio de diseño de interiores residencial. Proyectos integrales y dirección de obra.';
  return {
    openGraph: {
      title: 'MSL Interiores | Diseño de interiores residencial',
      description: desc,
      images: [{ url: content.hero.imagen, width: 1200, height: 800, alt: 'MSL Interiores' }],
      type: 'website',
      locale: 'es_AR',
    },
    twitter: {
      card: 'summary_large_image',
      images: [content.hero.imagen],
    },
  };
}

export default async function Page() {
  const [content, projects] = await Promise.all([
    getSiteContent(),
    getPublishedProjects(),
  ]);

  return (
    <>
      <ScrollToHash />
      <SplashScreen />
      <Navbar
        projects={projects}
        email={content.contacto.email}
        instagram={content.contacto.instagram}
        instagramUrl={content.contacto.instagramUrl}
      />
      <Hero {...content.hero} />
      <Nosotros {...content.nosotros} />
      <Servicios {...content.servicios} />
      <Proyectos projects={projects} />
      <Proceso {...content.proceso} />
      <Contacto {...content.contacto} />
      <Footer {...content.footer} />
    </>
  );
}
