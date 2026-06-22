import { getSiteContent } from '@/lib/data-access';
import Footer from './Footer';

export default async function FooterWrapper() {
  const content = await getSiteContent();
  return (
    <Footer
      {...content.footer}
      email={content.contacto.email}
      instagram={content.contacto.instagram}
      instagramUrl={content.contacto.instagramUrl}
    />
  );
}
