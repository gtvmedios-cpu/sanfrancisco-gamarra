import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Visita de la Reliquia de San Francisco de Asís | Gamarra, Cesar',
  description: 'Información oficial sobre la visita de la reliquia de San Francisco de Asís a Gamarra, Cesar, del 2 al 4 de noviembre de 2026.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
