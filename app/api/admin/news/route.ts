import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
const TABLE = 'news';
async function authorized(){const supabase=await createClient();if(!supabase)return {supabase:null,response:NextResponse.json({error:'Supabase no está configurado.'},{status:503})};const {data:{user}}=await supabase.auth.getUser();if(!user)return {supabase,response:NextResponse.json({error:'Debes iniciar sesión.'},{status:401})};if(user.app_metadata?.role!=='admin')return {supabase,response:NextResponse.json({error:'No tienes permisos de administrador.'},{status:403})};return {supabase,response:null};}
export async function GET(){const {supabase,response}=await authorized();if(response||!supabase)return response!;const {data,error}=await supabase.from(TABLE).select('*').order('created_at',{ascending:false});if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({data});}
function makeSlug(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 140);
}
export async function POST(request: Request) {
  const { supabase, response } = await authorized();
  if (response || !supabase) return response!;
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'El cuerpo de la solicitud no es JSON válido.' }, { status: 400 }); }
  if (typeof body.title !== 'string' || !body.title.trim()) return NextResponse.json({ error: 'El título es obligatorio.' }, { status: 400 });
  const baseSlug = typeof body.slug === 'string' && body.slug.trim() ? makeSlug(body.slug) : makeSlug(body.title);
  const slug = `${baseSlug || 'noticia'}-${crypto.randomUUID().slice(0, 8)}`;
  const published = Boolean(body.published);
  const allowed = { title: body.title.trim(), slug, summary: typeof body.summary === 'string' ? body.summary : '', body: typeof body.body === 'string' ? body.body : '', image_url: typeof body.image_url === 'string' ? body.image_url : '', published, published_at: published ? new Date().toISOString() : null };
  const { data, error } = await supabase.from('news').insert(allowed).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  const imageUrls = Array.isArray(body.image_urls) ? body.image_urls.filter((x): x is string => typeof x === 'string' && x.startsWith('https://')) : [];
  const extras = imageUrls.filter(url => url !== allowed.image_url).map((image_url, index) => ({ news_id: data.id, image_url, alt_text: allowed.title, sort_order: index + 1 }));
  if (extras.length) {
    const { error: imageError } = await supabase.from('news_images').insert(extras);
    if (imageError) { await supabase.from('news').delete().eq('id', data.id); return NextResponse.json({ error: `La noticia no pudo guardar sus imágenes: ${imageError.message}` }, { status: 400 }); }
  }
  return NextResponse.json({ data: { ...data, extra_images: extras.length } }, { status: 201 });
}
export async function DELETE(request:Request){const {supabase,response}=await authorized();if(response||!supabase)return response!;const id=new URL(request.url).searchParams.get('id');if(!id)return NextResponse.json({error:'Falta el ID.'},{status:400});const {error}=await supabase.from(TABLE).delete().eq('id',id);if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({ok:true});}
