export const revalidate = 60;

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
