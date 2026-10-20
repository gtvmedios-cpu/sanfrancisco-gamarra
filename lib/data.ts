import { createClient } from '@/lib/supabase/server';

export type EventItem = { id?: string; title: string; description: string; starts_at: string | null; location: string; published?: boolean };
export type NewsItem = { id?: string; title: string; summary: string; body: string; image_url: string; published_at?: string; published?: boolean };
export type GalleryItem = { id?: string; title: string; image_url: string; caption: string; published?: boolean };

export async function getPublicContent() {
  const supabase = await createClient();
  if (!supabase) return { events: [] as EventItem[], news: [] as NewsItem[], gallery: [] as GalleryItem[] };
  const [e, n, g] = await Promise.all([
    supabase.from('events').select('id,title,description,starts_at,location,published').eq('published', true).order('starts_at', { ascending: true }),
    supabase.from('news').select('id,title,summary,body,image_url,published_at,published').eq('published', true).order('published_at', { ascending: false }).limit(6),
    supabase.from('gallery').select('id,title,image_url,caption,published').eq('published', true).order('created_at', { ascending: false }).limit(12)
  ]);
  return { events: (e.data ?? []) as EventItem[], news: (n.data ?? []) as NewsItem[], gallery: (g.data ?? []) as GalleryItem[] };
}
