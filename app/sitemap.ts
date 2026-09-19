import type { MetadataRoute } from 'next'
import { services } from '@/lib/site'

const routes = ['', '/about', '/services', '/process', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `https://hudaconsultancy.com${route || '/'}`,
    lastModified: new Date('2026-09-12'),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `https://hudaconsultancy.com/services/${s.slug}`,
    lastModified: new Date('2026-09-12'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  return [...staticRoutes, ...serviceRoutes]
}
