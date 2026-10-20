import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen, Heart, Leaf, Church, Cross } from 'lucide-react';

export const metadata = {
  title: 'Historia de San Francisco de Asís',
  description: 'Conoce la vida, conversión y legado espiritual de San Francisco de Asís, en el marco de la visita de su reliquia a Gamarra, Cesar, del 2 al 4 de noviembre de 2026.',
  alternates: { canonical: '/historia-san-francisco' },
};

export default function HistoriaSanFranciscoPage() {
  return <main className="history-page">
    <div className="topline"><span>PARROQUIA · GAMARRA, CESAR</span><span>2 — 4 NOVIEMBRE 2026</span></div>
    <header className="nav wrap">
      <Link className="brand" href="/"><img className="official-emblem official-emblem-nav" src="https://i.ibb.co/DHK3vcBK/88ee063a-fe45-4a46-a092-a226465ca87e.jpg" alt="Emblema oficial de la visita de la Reliquia de San Francisco de Asís"/><span><b>VISITA FRANCISCANA</b><small>Reliquia de San Francisco de Asís</small></span></Link>
      <nav><Link href="/">Inicio</Link><Link href="/programacion">Programación</Link><Link href="/historia-san-francisco" aria-current="page">Historia del santo</Link></nav>
      <Link className="nav-cta" href="/programacion">Ver programación <ArrowUpRight size={16}/></Link>
    </header>
    <section className="history-hero">
      <div className="history-hero-overlay"/>
      <div className="wrap history-hero-content">
        <div className="eyebrow"><span/> VIDA Y ESPIRITUALIDAD FRANCISCANA</div>
        <h1>San Francisco<br/><em>de Asís</em></h1>
        <p>Una vida transformada por el Evangelio, entregada a los pobres y llena de amor por toda la creación.</p>
        <div className="history-facts"><span><Cross size={17}/> Nació hacia 1181–1182</span><span><Church size={17}/> Asís, Italia</span><span><BookOpen size={17}/> Canonizado en 1228</span></div>
      </div>
    </section>
    <article className="history-content wrap">
      <div className="history-intro">
        <div className="section-kicker">HISTORIA DEL SANTO</div>
        <h2>Un hombre que eligió vivir el Evangelio.</h2>
        <p>San Francisco de Asís es uno de los santos más queridos de la Iglesia católica. Su vida es recordada por la humildad, la sencillez, la fraternidad, el amor a los pobres y el cuidado de la creación. Nació en Asís, Italia, alrededor de 1181 o 1182, en una familia acomodada.</p>
      </div>
      <section className="history-chapter">
        <div className="history-chapter-icon"><Heart size={24}/></div>
        <div><span className="history-number">01 · CONVERSIÓN</span><h2>El llamado de Dios</h2>
        <p>En su juventud, Francisco soñaba con alcanzar honores y reconocimiento. Diversas experiencias lo llevaron a revisar sus aspiraciones y a buscar el sentido profundo de su vida. Poco a poco descubrió que su alegría no dependía de las riquezas, sino de seguir a Jesucristo y vivir el Evangelio.</p>
        <p>Renunció a una vida de comodidad y comenzó a dedicarse a la oración, al servicio de los pobres y a la reparación de pequeñas iglesias. Su conversión fue un camino de discernimiento y entrega que inspiró a muchas personas.</p></div>
      </section>
      <section className="history-chapter">
        <div className="history-chapter-icon"><Church size={24}/></div>
        <div><span className="history-number">02 · FRATERNIDAD</span><h2>El nacimiento de la familia franciscana</h2>
        <p>La forma de vida de Francisco atrajo a compañeros que deseaban seguir a Cristo con sencillez. Así nació la fraternidad franciscana, que con el tiempo se extendió por el mundo. Su testimonio también inspiró a Santa Clara de Asís, fundadora de las Hermanas Pobres, conocidas como clarisas.</p>
        <p>La espiritualidad franciscana invita a vivir con humildad, alegría, misericordia, fraternidad y cercanía con quienes sufren.</p></div>
      </section>
      <section className="history-chapter">
        <div className="history-chapter-icon"><Leaf size={24}/></div>
        <div><span className="history-number">03 · CUIDADO DE LA CREACIÓN</span><h2>Hermano de todas las criaturas</h2>
        <p>Francisco reconocía la creación como un regalo de Dios. Esta mirada se expresa de manera especial en el <em>Cántico de las criaturas</em>, en el que alaba al Creador por el sol, la luna, el agua, la tierra y todos los seres creados. Por eso, el arte cristiano suele representarlo acompañado de aves y animales.</p>
        <p>Su ejemplo continúa inspirando el respeto por la naturaleza y la responsabilidad de cuidar nuestra casa común.</p></div>
      </section>
      <section className="history-chapter">
        <div className="history-chapter-icon"><Cross size={24}/></div>
        <div><span className="history-number">04 · TESTIMONIO DE FE</span><h2>Los últimos años y su legado</h2>
        <p>Según la tradición franciscana, en 1224 Francisco recibió los estigmas de Cristo mientras oraba en el monte Alverna. Murió en Asís el 3 de octubre de 1226 y fue canonizado por el papa Gregorio IX en 1228.</p>
        <p>Su legado permanece vivo en las comunidades franciscanas y en quienes buscan construir la paz, servir a los demás y vivir con sencillez.</p></div>
      </section>
      <section className="history-quote"><span>ESPÍRITU FRANCISCANO</span><blockquote>“Señor, haz de mí un instrumento de tu paz”.</blockquote><p>Oración tradicionalmente asociada a la espiritualidad franciscana.</p></section>
      <section className="history-relic">
        <div className="history-relic-icon"><Heart size={28}/></div>
        <div><span className="section-kicker">LA VISITA A GAMARRA</span><h2>Un encuentro para renovar la fe</h2>
        <p>La visita de la reliquia de San Francisco de Asís a Gamarra, Cesar, del 2 al 4 de noviembre de 2026, es una oportunidad para reunirse en oración y recordar su testimonio de seguimiento a Jesucristo. La comunidad está invitada a vivir este encuentro con fe, fraternidad y esperanza.</p>
        <p><strong>Invitan:</strong> la Parroquia Inmaculada Concepción de Gamarra, Cesar, y la Comunidad Franciscana, Provincia de la Santa Fe.</p>
        <Link className="button button-gold" href="/programacion">Consultar programación <ArrowUpRight size={17}/></Link></div>
      </section>
    </article>
    <footer><div className="wrap footer-main"><Link className="brand footer-brand" href="/"><img className="official-emblem official-emblem-footer" src="https://i.ibb.co/DHK3vcBK/88ee063a-fe45-4a46-a092-a226465ca87e.jpg" alt="Emblema oficial de la visita"/><span><b>VISITA FRANCISCANA</b><small>Reliquia de San Francisco de Asís</small></span></Link><p>Visita de la reliquia de San Francisco de Asís<br/>Gamarra, Cesar · 2 al 4 de noviembre de 2026</p><Link href="/">Volver al inicio ↑</Link></div><div className="wrap footer-bottom"><span>Información de la visita franciscana.</span><span className="footer-credit"><span>Creada por</span><img src="https://i.ibb.co/gGgdZ6x/Chat-GPT-Image-14-may-2026-18-57-48.png" alt="Logo de Gamarra TV" loading="lazy"/><strong>Gamarra TV</strong></span></div></footer>
  </main>;
}
