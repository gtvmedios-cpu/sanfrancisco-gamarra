import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://sanfrancisco-gamarra-cesar.vercel.app';

const emblemUrl = 'https://i.ibb.co/B5vCnJZ2/Emblema-de-la-Reliquia-de-San-Francisco.png';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Visita de la Reliquia de San Francisco de Asís a Gamarra 2026',
    template: '%s | Visita de la Reliquia de San Francisco de Asís',
  },
  description:
    'Información oficial sobre la visita de la reliquia de San Francisco de Asís a Gamarra, Cesar, Colombia, del 2 al 4 de noviembre de 2026. Invitación, programación, noticias y galería.',
  applicationName: 'Visita de la Reliquia de San Francisco de Asís a Gamarra',
  keywords: [
    'Visita de la Reliquia de San Francisco de Asís',
    'San Francisco de Asís en Gamarra',
    'reliquia San Francisco de Asís 2026',
    'Gamarra Cesar',
    'Parroquia Inmaculada Concepción de Gamarra',
    'Comunidad Franciscana Provincia de la Santa Fe',
    'programación visita franciscana Gamarra',
  ],
  authors: [{ name: 'Parroquia Inmaculada Concepción de Gamarra y Comunidad Franciscana, Provincia de la Santa Fe' }],
  creator: 'Gamarra TV',
  publisher: 'Parroquia Inmaculada Concepción de Gamarra y Comunidad Franciscana, Provincia de la Santa Fe',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: emblemUrl, type: 'image/png' }],
    shortcut: [emblemUrl],
    apple: [{ url: emblemUrl, type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: siteUrl,
    siteName: 'Visita de la Reliquia de San Francisco de Asís a Gamarra',
    title: 'Visita de la Reliquia de San Francisco de Asís a Gamarra | 2 al 4 de noviembre de 2026',
    description:
      'Conoce la invitación, programación y noticias de la visita de la reliquia de San Francisco de Asís a Gamarra, Cesar, del 2 al 4 de noviembre de 2026.',
    images: [{ url: emblemUrl, width: 1200, height: 1200, alt: 'Emblema oficial de la visita de la reliquia de San Francisco de Asís a Gamarra' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visita de la Reliquia de San Francisco de Asís a Gamarra 2026',
    description: 'Toda la información de la visita del 2 al 4 de noviembre de 2026 en Gamarra, Cesar.',
    images: [emblemUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-CO"><body>{children}</body></html>;
}
