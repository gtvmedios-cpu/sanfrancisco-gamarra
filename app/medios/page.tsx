import { ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Señal en vivo y medios de comunicación | Peregrinación a Gamarra',
  description: 'Transmisión en vivo y canales de televisión y emisoras que acompañan la visita de la reliquia de San Francisco de Asís a Gamarra, Cesar.',
};

export default function MediosPage() {
  return <main>
    <div className="topline"><span>PARROQUIA INMACULADA CONCEPCIÓN · GAMARRA, CESAR</span><span>2 — 4 NOVIEMBRE 2026</span></div>
    <header className="nav wrap"><a className="brand" href="/"><img className="official-emblem official-emblem-nav" src="https://i.ibb.co/DHK3vcBK/88ee063a-fe45-4a46-a092-a226465ca87e.jpg" alt="Emblema de la peregrinación"/><span><b>VISITA FRANCISCANA</b><small>Reliquia de San Francisco de Asís</small></span></a><nav><a href="/">Inicio</a><a href="/programacion">Programación</a><a href="/historia-san-francisco">Historia del santo</a></nav><a className="nav-cta" href="/">Volver al inicio <ArrowUpRight size={16}/></a></header>
    <section className="section wrap" style={{paddingTop:50}}><div className="section-kicker">COBERTURA ESPECIAL · GAMARRA 2026</div><h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(38px,6vw,72px)',lineHeight:1.1}}>Señal en vivo y <em>medios de comunicación</em></h1><p className="hero-lead" style={{maxWidth:760}}>Acompaña la llegada y las celebraciones de la reliquia de San Francisco de Asís a Gamarra, Cesar, a través de nuestros canales y emisoras aliados.</p></section>
    <section className="live-section section wrap" id="senal-en-vivo"><div className="section-heading"><div><div className="section-kicker">TRANSMISIÓN ESPECIAL</div><h2>La visita en vivo</h2></div><p>Conéctate a la transmisión de la peregrinación.</p></div><div className="live-player"><iframe src="https://new.opencaster.com/player/embed?user=ENTREFAMOSOSTV" title="Señal en vivo de la peregrinación de San Francisco de Asís a Gamarra" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"/><div className="live-player-caption"><span className="live-dot"/> TRANSMISIÓN EN DIRECTO · ENTREFAMOSOSTV</div></div></section>
    <section className="coverage-section section wrap" id="medios"><div className="section-heading"><div><div className="section-kicker">COBERTURA Y ACOMPAÑAMIENTO</div><h2>Medios de comunicación</h2></div><p>Canales y emisoras que acompañan el cubrimiento de esta visita de fe.</p></div>
    <div className="media-group"><h3><span/> Canales de televisión</h3><div className="media-logos media-tv">
      <a className="media-logo" href="https://gamarra-tv.vercel.app" target="_blank" rel="noopener noreferrer"><img src="https://i.ibb.co/gGgdZ6x/Chat-GPT-Image-14-may-2026-18-57-48.png" alt="Gamarra TV"/><span>Gamarra TV</span></a>
      <a className="media-logo" href="https://canal-del-rio.vercel.app/" target="_blank" rel="noopener noreferrer"><img src="https://canal-del-rio.vercel.app/_next/image?url=%2Fimages%2Flogo-header.png&w=1920&q=75" alt="Canal del Río"/><span>Canal del Río</span></a>
      <a className="media-logo" href="https://www.influencersdelsenor.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.influencersdelsenor.com/logo-influencers-del-senor.png" alt="Influencers del Señor TV"/><span>Influencers del Señor TV</span></a>
      <a className="media-logo" href="#medios"><img src="https://i.ibb.co/xPhVMZ5/3dfe9250-0ff1-40b7-9881-ddedb589adbe.png" alt="Tigre Teve"/><span>Tigre Teve</span></a>
      <a className="media-logo" href="#medios"><img src="https://cdn.phototourl.com/member/2026-11-02-d208064d-5e41-42ff-b082-41fe3ec34a7f.png" alt="San Alberto TV"/><span>San Alberto TV</span></a>
    </div></div><div className="media-group"><h3><span/> Emisoras de radio</h3><div className="media-logos media-radio">
      <a className="media-logo" href="#senal-en-vivo"><img src="https://cdn.phototourl.com/member/2026-11-02-cad0d6d9-079a-4958-9e9c-184b2288a562.png" alt="Gamarra TV Radio"/><span>Gamarra TV Radio</span></a>
      <a className="media-logo" href="https://www.influencersdelsenor.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.influencersdelsenor.com/logo-influencers-del-senor.png" alt="Influencers del Señor Emisora Online"/><span>Influencers del Señor · Online</span></a>
      <a className="media-logo" href="#senal-en-vivo"><img src="https://cdn.phototourl.com/member/2026-11-02-7efbaba6-c674-417f-985d-3f187b642567.png" alt="San Alberto TV Radio"/><span>San Alberto TV Radio</span></a>
    </div></div></section><footer className="footer wrap"><a href="/">← Regresar a la página principal</a></footer>
  </main>;
}
