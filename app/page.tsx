import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Nosotros from '@/components/Nosotros';
import Servicios from '@/components/Servicios';
import Proyectos from '@/components/Proyectos';
import Proceso from '@/components/Proceso';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Nosotros />
      <Servicios />
      <Proyectos />
      <Proceso />
      <Contacto />
      <Footer />
    </>
  );
}
