import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
const TABLE = 'news';
async function authorized(){const supabase=await createClient();if(!supabase)return {supabase:null,response:NextResponse.json({error:'Supabase no está configurado.'},{status:503})};const {data:{user}}=await supabase.auth.getUser();if(!user)return {supabase,response:NextResponse.json({error:'Debes iniciar sesión.'},{status:401})};if(user.app_metadata?.role!=='admin')return {supabase,response:NextResponse.json({error:'No tienes permisos de administrador.'},{status:403})};return {supabase,response:null};}
export async function GET(){const {supabase,response}=await authorized();if(response||!supabase)return response!;const {data,error}=await supabase.from(TABLE).select('*').order('created_at',{ascending:false});if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({data});}
export async function POST(request: Request) {
  const { supabase, response } = await authorized();
  if (response || !supabase) return response!;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'El cuerpo de la solicitud no es JSON válido.' }, { status: 400 });
  }

  const allowed = { title: body.title, summary: body.summary ?? '', body: body.body ?? '', image_url: body.image_url ?? '', published: Boolean(body.published), published_at: body.published ? new Date().toISOString() : null } ;
  if (typeof allowed.title !== 'string' || !allowed.title.trim()) {
    return NextResponse.json({ error: 'El título es obligatorio.' }, { status: 400 });
  }

  const { data, error } = await supabase.from('news').insert(allowed).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data }, { status: 201 });
}
export async function DELETE(request:Request){const {supabase,response}=await authorized();if(response||!supabase)return response!;const id=new URL(request.url).searchParams.get('id');if(!id)return NextResponse.json({error:'Falta el ID.'},{status:400});const {error}=await supabase.from(TABLE).delete().eq('id',id);if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({ok:true});}
