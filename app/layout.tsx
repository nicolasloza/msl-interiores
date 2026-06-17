import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import NextTopLoader from 'nextjs-toploader';
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

export const metadata: Metadata = {
  title: 'MSL Interiores | Diseño de interiores residencial',
  description:
    'Estudio de diseño de interiores residencial. Proyectos integrales y dirección de obra.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          background: '#FDFAF5',
          color: '#2C2420',
        }}
      >
        <NextTopLoader color="#8B6F47" shadow={false} height={2} showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
