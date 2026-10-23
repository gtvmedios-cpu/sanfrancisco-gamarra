import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, CalendarDays, Images } from 'lucide-react';

export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) return { title: 'Noticias | Visita Franciscana a Gamarra' };
  const { data } = await supabase.from('news').select('title,summary,image_url').eq('slug', slug).eq('published', true).maybeSingle();
  if (!data) return { title: 'Noticia no encontrada | Visita Franciscana a Gamarra' };
  return { title: `${data.title} | Visita Franciscana a Gamarra`, description: data.summary, openGraph: { title: data.title, description: data.summary, images: data.image_url ? [data.image_url] : [] } };
}
export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) notFound();
  const { data: article } = await supabase.from('news').select('id,title,slug,summary,body,image_url,published_at').eq('slug', slug).eq('published', true).maybeSingle();
  if (!article) notFound();
  const { data: images } = await supabase.from('news_images').select('id,image_url,alt_text,sort_order').eq('news_id', article.id).order('sort_order', { ascending: true });
  const gallery = [...(article.image_url ? [{ id: 'cover', image_url: article.image_url, alt_text: article.title, sort_order: 0 }] : []), ...(images ?? [])];
  return <main className="article-page">
    <div className="topline"><span>PARROQUIA INMACULADA CONCEPCIÓN · GAMARRA, CESAR</span><span>VISITA FRANCISCANA</span></div>
    <header className="nav wrap"><a className="brand" href="/"><img className="official-emblem official-emblem-nav" src="https://i.ibb.co/DHK3vcBK/88ee063a-fe45-4a46-a092-a226465ca87e.jpg" alt="Emblema de la peregrinación"/><span><b>VISITA FRANCISCANA</b><small>Reliquia de San Francisco de Asís</small></span></a><a className="nav-cta" href="/#noticias"><ArrowLeft size={16}/> Volver a noticias</a></header>
    <article className="article-content wrap"><a className="article-back" href="/#noticias"><ArrowLeft size={16}/> Todas las noticias</a><div className="section-kicker">NOTICIAS Y COMUNICADOS</div><h1>{article.title}</h1>{article.published_at&&<p className="article-date"><CalendarDays size={16}/>{new Date(article.published_at).toLocaleDateString('es-CO',{day:'numeric',month:'long',year:'numeric',timeZone:'America/Bogota'})}</p>}{article.summary&&<p className="article-summary">{article.summary}</p>}{gallery.length>0&&<div className="article-image-grid" aria-label="Imágenes de la noticia">{gallery.map((img:any)=><figure key={img.id}><img src={img.image_url} alt={img.alt_text||article.title}/></figure>)}</div>}<div className="article-body">{(article.body||'').split(/\n\s*\n/).filter(Boolean).map((paragraph:string,i:number)=><p key={i}>{paragraph}</p>)}</div>{gallery.length>1&&<p className="article-image-count"><Images size={16}/> {gallery.length} imágenes en esta noticia</p>}<a className="button button-gold" href="/#noticias"><ArrowLeft size={16}/> Volver a noticias</a></article>
    <footer><div className="wrap footer-main"><div className="brand footer-brand"><span className="brandmark">✝</span><span><b>VISITA FRANCISCANA</b><small>Reliquia de San Francisco de Asís</small></span></div><p>Visita de la reliquia de San Francisco de Asís<br/>Gamarra, Cesar · 2 al 4 de noviembre de 2026</p><a href="/">Volver al inicio ↑</a></div><div className="wrap footer-bottom"><span>Información publicada por la parroquia organizadora.</span><span className="footer-credit">Creada por <strong>Gamarra TV</strong></span></div></footer>
  </main>;
}
