import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.rohanluthra.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.rohanluthra.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.rohanluthra.com/writing',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.rohanluthra.com/writing/building-with-ai',
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://www.rohanluthra.com/writing/future-of-web-development',
      lastModified: new Date('2024-01-10'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://www.rohanluthra.com/writing/lessons-from-side-projects',
      lastModified: new Date('2024-01-05'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}