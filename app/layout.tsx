import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'MSL Interiores | Diseño de interiores residencial',
  description:
    'Estudio de diseño de interiores residencial. Proyectos integrales y dirección de obra.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          background: '#FDFAF5',
          color: '#2C2420',
        }}
      >
        {/* Bloquea el scroll antes de que React hidrate para evitar el salto visual */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){if(!sessionStorage.getItem('msl-splash-done')){document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';}})()` }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
