import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '',
    '/about',
    '/programs',
    '/projects',
    '/events',
    '/blogs',
    '/gallery',
    '/donate',
    '/volunteer',
    '/contact'
  ];

  const staticRoutes = routes.map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // TODO: Fetch dynamic routes from Repositories for Programs, Projects, Blogs, Events
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  return [...staticRoutes, ...dynamicRoutes];
}
