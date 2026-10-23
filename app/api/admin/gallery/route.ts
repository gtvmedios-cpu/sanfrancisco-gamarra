import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
const TABLE = 'gallery';
async function authorized(){const supabase=await createClient();if(!supabase)return {supabase:null,response:NextResponse.json({error:'Supabase no está configurado.'},{status:503})};const {data:{user}}=await supabase.auth.getUser();if(!user)return {supabase,response:NextResponse.json({error:'Debes iniciar sesión.'},{status:401})};if(user.app_metadata?.role!=='admin')return {supabase,response:NextResponse.json({error:'No tienes permisos de administrador.'},{status:403})};return {supabase,response:null};}
export async function GET(){const {supabase,response}=await authorized();if(response||!supabase)return response!;const {data,error}=await supabase.from(TABLE).select('*').order('created_at',{ascending:false});if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({data});}
export async function POST(request: Request) {
  const { supabase, response } = await authorized();
  if (response || !supabase) return response!;
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'El cuerpo de la solicitud no es JSON válido.' }, { status: 400 }); }
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const imageUrls = Array.isArray(body.image_urls) ? body.image_urls.filter((x): x is string => typeof x === 'string' && x.startsWith('https://')) : [];
  if (!title) return NextResponse.json({ error: 'El título es obligatorio.' }, { status: 400 });
  const urls = imageUrls.length ? imageUrls : (typeof body.image_url === 'string' && body.image_url.startsWith('https://') ? [body.image_url] : []);
  if (!urls.length) return NextResponse.json({ error: 'Añade al menos una fotografía.' }, { status: 400 });
  let albumId: string | null = null;
  const albumTitle = typeof body.album_title === 'string' ? body.album_title.trim() : '';
  if (albumTitle) {
    const { data: album, error: albumError } = await supabase.from('gallery_albums').insert({ title: albumTitle, description: typeof body.album_description === 'string' ? body.album_description : '', published: Boolean(body.published) }).select('id').single();
    if (albumError) return NextResponse.json({ error: `No se pudo crear el álbum: ${albumError.message}` }, { status: 400 });
    albumId = album.id;
  }
  const records = urls.map((image_url, index) => ({ title, image_url, caption: typeof body.caption === 'string' ? body.caption : '', published: Boolean(body.published), album_id: albumId }));
  const { data, error } = await supabase.from('gallery').insert(records).select();
  if (error) { if (albumId) await supabase.from('gallery_albums').delete().eq('id', albumId); return NextResponse.json({ error: error.message }, { status: 400 }); }
  return NextResponse.json({ data, count: data.length }, { status: 201 });
}
export async function DELETE(request:Request){const {supabase,response}=await authorized();if(response||!supabase)return response!;const id=new URL(request.url).searchParams.get('id');if(!id)return NextResponse.json({error:'Falta el ID.'},{status:400});const {error}=await supabase.from(TABLE).delete().eq('id',id);if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({ok:true});}
