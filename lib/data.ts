import { createClient } from '@/lib/supabase/server';

export type EventItem = { id?: string; title: string; description: string; starts_at: string | null; location: string; published?: boolean };
export type NewsItem = { id?: string; title: string; slug: string; summary: string; body: string; image_url: string; published_at?: string; published?: boolean };
export type GalleryItem = { id?: string; title: string; image_url: string; caption: string; album_id?: string | null; published?: boolean };
export type GalleryAlbum = { id: string; title: string; description: string; published?: boolean };

export async function getPublicContent() {
  const supabase = await createClient();
  if (!supabase) return { events: [] as EventItem[], news: [] as NewsItem[], gallery: [] as GalleryItem[], albums: [] as GalleryAlbum[] };
  const [e, n, g] = await Promise.all([
    supabase.from('events').select('id,title,description,starts_at,location,published').eq('published', true).order('starts_at', { ascending: true }),
    supabase.from('news').select('id,title,slug,summary,body,image_url,published_at,published').eq('published', true).order('published_at', { ascending: false }).limit(6),
    supabase.from('gallery').select('id,title,image_url,caption,album_id,published').eq('published', true).order('created_at', { ascending: false }).limit(12)
  ]);
  const a = await supabase.from('gallery_albums').select('id,title,description,published').eq('published', true).order('created_at', { ascending: false });
  return { events: (e.data ?? []) as EventItem[], news: (n.data ?? []) as NewsItem[], gallery: (g.data ?? []) as GalleryItem[], albums: (a.data ?? []) as GalleryAlbum[] };
}
