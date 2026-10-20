import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Visita Franciscana | Reliquia de San Francisco de Asís en Gamarra',
  description: 'Portal informativo de la visita de la reliquia de San Francisco de Asís a Gamarra, Cesar, del 2 al 4 de noviembre de 2026. Paz y Bien.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
