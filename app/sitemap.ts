import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\\/$/, '')
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://sanfrancisco-gamarra-cesar.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/programacion', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/historia-san-francisco', priority: 0.8, changeFrequency: 'monthly' as const },
  ];
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
