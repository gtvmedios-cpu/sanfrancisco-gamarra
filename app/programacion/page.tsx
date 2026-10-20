import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, MapPin, Church } from 'lucide-react';

export const metadata = {
  title: 'Programación oficial de la visita',
  description: 'Consulta la programación de la visita de la reliquia de San Francisco de Asís a Gamarra, Cesar, del 2 al 4 de noviembre de 2026.',
  alternates: { canonical: '/programacion' },
};

const agenda = [
  { day: 'Lunes', date: '2', title: 'Bienvenida a la Reliquia', items: [
    { time: '4:30 p. m.', title: 'Encuentro en el puente Caño Rabón', detail: 'Se invita a llevar velas blancas o faroles.' },
    { time: '8:00 p. m.', title: 'Eucaristía', detail: 'Celebración eucarística de bienvenida.' },
  ]},
  { day: 'Martes', date: '3', title: 'Jornada de veneración', items: [
    { time: '8:00 a. m.', title: 'Veneración de la reliquia', detail: 'Espacio de oración y veneración.' },
    { time: '10:00 a. m.', title: 'Eucaristía', detail: 'Celebración eucarística.' },
    { time: '5:00 p. m.', title: 'Eucaristía', detail: 'Celebración eucarística.' },
    { time: 'Horario por confirmar', title: 'Confesiones', detail: 'El afiche anuncia confesiones, pero no especifica la hora.' },
  ]},
  { day: 'Miércoles', date: '4', title: 'Clausura y despedida', items: [
    { time: '8:00 a. m.', title: 'Veneración de la reliquia', detail: 'Espacio de oración y veneración.' },
    { time: '9:00 a. m.', title: 'Eucaristía de clausura', detail: 'Celebración eucarística de cierre de la visita.' },
  ]},
];

export default function ProgramacionPage() {
  return <main className="history-page">
    <div className="topline"><span>PARROQUIA · GAMARRA, CESAR</span><span>2 — 4 NOVIEMBRE 2026</span></div>
    <header className="nav wrap">
      <Link className="brand" href="/"><img className="official-emblem official-emblem-nav" src="https://i.ibb.co/B5vCnJZ2/Emblema-de-la-Reliquia-de-San-Francisco.png" alt="Emblema oficial de la visita"/><span><b>VISITA FRANCISCANA</b><small>Reliquia de San Francisco de Asís</small></span></Link>
      <nav><Link href="/">Inicio</Link><Link href="/historia-san-francisco">Historia del santo</Link><Link href="/programacion" aria-current="page">Programación</Link></nav>
      <Link className="nav-cta" href="/historia-san-francisco">Historia de San Francisco <ArrowUpRight size={16}/></Link>
    </header>
    <section className="history-hero program-hero">
      <div className="history-hero-overlay"/>
      <div className="wrap history-hero-content">
        <div className="eyebrow"><span/> AGENDA DE LA PEREGRINACIÓN</div>
        <h1>Programación<br/><em>de la visita</em></h1>
        <p>Consulta las celebraciones y los momentos de oración previstos para el encuentro con la reliquia de San Francisco de Asís en Gamarra, Cesar.</p>
        <div className="history-facts"><span><CalendarDays size={17}/> 2 al 4 de noviembre de 2026</span><span><MapPin size={17}/> Gamarra, Cesar, Colombia</span></div>
      </div>
    </section>
    <section className="wrap program-content">
      <div className="program-intro"><div className="section-kicker">AGENDA POR DÍAS</div><h2>Tres días de fe, oración y fraternidad.</h2><p>Los horarios que aparecen a continuación corresponden a la programación compartida para la visita. Confirma con la parroquia cualquier actualización antes de desplazarte.</p></div>
      <div className="program-days">{agenda.map(day => <section className="program-day" key={day.date}>
        <div className="program-day-heading"><div className="program-date-number"><span>{day.day}</span><b>{day.date}</b><small>NOV 2026</small></div><div><span className="section-kicker">{day.day.toUpperCase()} · {day.date} DE NOVIEMBRE</span><h2>{day.title}</h2></div></div>
        <div className="program-items">{day.items.map((item, i) => <article className="program-item" key={item.time + item.title}><div className="program-time"><Clock3 size={16}/>{item.time}</div><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div>
      </section>)}</div>
      <div className="program-note"><Church size={24}/><div><strong>Invitan</strong><p>Parroquia Inmaculada Concepción de Gamarra, Cesar, y Comunidad Franciscana, Provincia de la Santa Fe.</p><small>La programación puede recibir ajustes oficiales. Las confesiones figuran sin hora específica en el afiche recibido.</small></div></div>
      <div className="program-back"><Link href="/"><ArrowLeft size={16}/> Volver al inicio</Link><Link href="/historia-san-francisco">Leer la historia de San Francisco <ArrowUpRight size={16}/></Link></div>
    </section>
    <footer><div className="wrap footer-main"><Link className="brand footer-brand" href="/"><img className="official-emblem official-emblem-footer" src="https://i.ibb.co/B5vCnJZ2/Emblema-de-la-Reliquia-de-San-Francisco.png" alt="Emblema oficial de la visita"/><span><b>VISITA FRANCISCANA</b><small>Reliquia de San Francisco de Asís</small></span></Link><p>Gamarra, Cesar · 2 al 4 de noviembre de 2026</p><Link href="/">Volver al inicio ↑</Link></div><div className="wrap footer-bottom"><span>Información de la visita franciscana.</span><span className="footer-credit"><span>Creada por</span><img src="https://i.ibb.co/gGgdZ6x/Chat-GPT-Image-14-may-2026-18-57-48.png" alt="Logo de Gamarra TV" loading="lazy"/><strong>Gamarra TV</strong></span></div></footer>
  </main>;
}
