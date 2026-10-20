'use client';

import { useEffect, useState } from 'react';
import { CalendarClock } from 'lucide-react';

type Remaining = { days: number; hours: number; minutes: number; seconds: number; started: boolean };
const targetTime = new Date('2026-11-02T16:30:00-05:00').getTime();

function getRemaining(): Remaining {
  const distance = targetTime - Date.now();
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true };
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance % 86_400_000) / 3_600_000),
    minutes: Math.floor((distance % 3_600_000) / 60_000),
    seconds: Math.floor((distance % 60_000) / 1_000),
    started: false,
  };
}

export default function Countdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  useEffect(() => {
    setRemaining(getRemaining());
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <section className="countdown-band" aria-label="Cuenta regresiva para la visita">
    <div className="wrap countdown-inner">
      <div className="countdown-copy">
        <span className="date-label">LA ESPERA YA COMENZÓ</span>
        <h2>La Reliquia llega a Gamarra</h2>
        <p>Cuenta regresiva para el encuentro de bienvenida, el 2 de noviembre de 2026 a las 4:30 p. m.</p>
      </div>
      <div className="countdown-clock" aria-live="polite">
        {remaining?.started ? <div className="countdown-started"><CalendarClock size={22}/> ¡La visita ha comenzado!</div> : <>
          {[['DÍAS', remaining?.days], ['HORAS', remaining?.hours], ['MINUTOS', remaining?.minutes], ['SEGUNDOS', remaining?.seconds]].map(([label, value]) => <div className="countdown-unit" key={label as string}><strong>{value === undefined || value === null ? '—' : String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
        </>}
      </div>
    </div>
  </section>;
}
