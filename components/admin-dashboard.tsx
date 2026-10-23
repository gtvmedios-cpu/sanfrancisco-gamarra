'use client';
import { FormEvent, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/browser';
type Row={id:string;title:string;description?:string;summary?:string;body?:string;image_url?:string;caption?:string;location?:string;starts_at?:string|null;published?:boolean};
type Kind='events'|'news'|'gallery';
export default function AdminDashboard({email}:{email:string}){
 const [kind,setKind]=useState<Kind>('events');const [rows,setRows]=useState<Row[]>([]);const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);
 async function load(){const r=await fetch(`/api/admin/${kind}`,{cache:'no-store'});const j=await r.json();setRows(j.data??[]);if(j.error)setMessage(j.error)}
 useEffect(()=>{load()},[kind]);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();const form=e.currentTarget;setBusy(true);setMessage('');
  try {
   const fd=new FormData(form);const payload:Record<string, any>=Object.fromEntries(fd.entries());
   const files=fd.getAll('image_files').filter((x): x is File => x instanceof File && x.size>0);delete payload.image_files;payload.published=fd.get('published')==='on';
   if(kind==='events'&&!payload.starts_at)payload.starts_at=null;
   const imageUrls:string[]=[];
   if(files.length){
    const supabase=createClient();
    for(const file of files){
     if(!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type))throw new Error('Todas las imágenes deben ser JPG, PNG, WEBP o GIF.');
     if(file.size>8*1024*1024)throw new Error(`La imagen ${file.name} supera los 8 MB.`);
     const safeName=file.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9._-]/g,'-');
     const folder=kind==='news'?'news':'gallery';const path=`${folder}/${Date.now()}-${Math.random().toString(36).slice(2,8)}-${safeName}`;
     const {error:uploadError}=await supabase.storage.from('site-media').upload(path,file,{cacheControl:'3600',upsert:false,contentType:file.type});
     if(uploadError)throw new Error(`No se pudo subir ${file.name}: ${uploadError.message}. Verifica el bucket site-media y sus políticas.`);
     imageUrls.push(supabase.storage.from('site-media').getPublicUrl(path).data.publicUrl);
    }
   }
   if(imageUrls.length){payload.image_urls=imageUrls;if(kind==='news')payload.image_url=imageUrls[0];else payload.image_url=imageUrls[0];}

   if((kind==='news'||kind==='gallery')&&!payload.image_url)throw new Error('Selecciona al menos una imagen o introduce una URL de imagen.');
   const r=await fetch(`/api/admin/${kind}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const j=await r.json();
   if(!r.ok)throw new Error(j.error??'No se pudo guardar.');
   setMessage('Contenido guardado correctamente.');form.reset();await load();
  }catch(err){setMessage(err instanceof Error?err.message:'No se pudo guardar el contenido.');}finally{setBusy(false)}
 }
 async function remove(id:string){if(!confirm('¿Seguro que deseas eliminar este contenido?'))return;const r=await fetch(`/api/admin/${kind}?id=${encodeURIComponent(id)}`,{method:'DELETE'});const j=await r.json();setMessage(r.ok?'Contenido eliminado.':j.error);load()}
 async function logout(){const supabase=createClient();await supabase.auth.signOut();window.location.href='/admin/login'}
 const title=kind==='events'?'Programación':kind==='news'?'Noticias y comunicados':'Galería de imágenes';
 return <main className="admin-wrap"><div className="wrap"><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,flexWrap:'wrap'}}><a href="/" className="brand"><span className="brandmark">✝</span><span><b>CAMINO DE FE</b><small>Administración del sitio</small></span></a><div style={{display:'flex',gap:14,alignItems:'center',fontSize:12}}><span>{email}</span><button className="admin-button" onClick={logout}>Cerrar sesión</button></div></div><div className="admin-card"><div className="section-kicker">GESTIÓN DE CONTENIDO</div><h1 className="admin-title">Panel administrativo</h1><p style={{fontSize:13,color:'#77766d'}}>Publica información oficial de la visita de la reliquia a Gamarra, Cesar. Las imágenes subidas se guardan en Supabase Storage.</p><div className="admin-tabs"><button className="admin-button" onClick={()=>setKind('events')}>Programación</button><button className="admin-button" onClick={()=>setKind('news')}>Noticias</button><button className="admin-button" onClick={()=>setKind('gallery')}>Galería</button><a href="/" target="_blank">Ver página pública ↗</a></div><h2 style={{fontFamily:'Playfair Display,serif',fontWeight:500,fontSize:25}}>{title}</h2>
 <form className="admin-form" onSubmit={submit}><label>Título<input name="title" required maxLength={160} placeholder={kind==='events'?'Ej. Celebración eucarística':'Título del contenido'}/></label>{kind==='events'&&<><label>Fecha y hora (hora de Colombia)<input name="starts_at" type="datetime-local"/></label><label>Lugar<input name="location" placeholder="Templo parroquial / lugar por confirmar" maxLength={200}/></label><label>Descripción<textarea name="description" placeholder="Detalles de la actividad"/></label></>}{kind==='news'&&<><label>Resumen<textarea name="summary" required placeholder="Resumen breve del comunicado"/></label><label>Contenido completo<textarea name="body" placeholder="Texto completo de la noticia"/></label><label>Subir varias imágenes desde el dispositivo<input name="image_files" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif"/><small>La primera imagen será la portada; las demás aparecerán dentro de la noticia. Máximo 8 MB por imagen.</small></label><label>O URL de imagen<input name="image_url" type="url" placeholder="https://…"/></label></>}{kind==='gallery'&&<><label>Subir una o varias fotografías<input name="image_files" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif"/><small>Selecciona varias fotos para subirlas individualmente o agruparlas en un álbum. Máximo 8 MB por foto.</small></label><label>Nombre del álbum (opcional)<input name="album_title" placeholder="Ej. Llegada de la reliquia a Gamarra" maxLength={160}/></label><label>Descripción del álbum (opcional)<textarea name="album_description" placeholder="Describe los momentos de esta colección de fotografías"/></label><label>O URL pública de la imagen<input name="image_url" type="url" placeholder="https://…"/></label><label>Pie de foto<input name="caption" placeholder="Descripción de la fotografía"/></label></>}<label style={{display:'flex',gap:9,alignItems:'center',fontSize:12}}><input type="checkbox" name="published" style={{width:16}}/> Publicar inmediatamente en la página</label><button disabled={busy}>{busy?'Guardando…':'Guardar contenido'}</button></form>{message&&<p style={{fontSize:12,color:message.includes('correctamente')||message.includes('eliminado')?'#39704d':'#8c4444'}}>{message}</p>}<h3 style={{fontSize:15,marginTop:30}}>Contenido existente</h3>{rows.length===0?<p style={{fontSize:12,color:'#77766d'}}>Todavía no hay elementos en esta sección.</p>:rows.map(row=><div className="admin-list" key={row.id}><div><b style={{fontSize:13}}>{row.title}</b><p>{row.published?'Publicado':'Borrador'}{row.starts_at?' · '+new Date(row.starts_at).toLocaleString('es-CO'):''}</p></div><button onClick={()=>remove(row.id)}>Eliminar</button></div>)}</div></div></main>
}
