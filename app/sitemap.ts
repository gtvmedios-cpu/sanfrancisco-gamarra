import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://sanfrancisco-gamarra.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/programacion', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/historia-san-francisco', priority: 0.8, changeFrequency: 'monthly' as const },
  ];
  const base = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency, priority,
  }));
  const supabase = await createClient();
  if (!supabase) return base;
  const { data } = await supabase.from('news').select('slug,published_at,updated_at').eq('published', true).not('slug', 'is', null);
  return [...base, ...(data ?? []).filter(item => item.slug).map(item => ({
    url: `${siteUrl}/noticias/${item.slug}`,
    lastModified: new Date(item.updated_at ?? item.published_at ?? Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))];
}
