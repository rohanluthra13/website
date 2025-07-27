# SEO Metadata Framework

This document outlines the metadata structure for each page/component in the website.

## Root Layout (`app/layout.tsx`)

```typescript
export const metadata: Metadata = {
  title: {
    template: '%s | Rohan Luthra',
    default: 'Rohan Luthra'
  },
  description: 'Personal website of Rohan Luthra',
  keywords: [],
  authors: [{ name: 'Rohan' }],
  creator: 'Rohan',
  metadataBase: new URL('https://www.rohanluthra.com'), // Replace with actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.rohanluthra.com',
    title: 'Rohan Luthra',
    description: 'Personal website of Rohan Luthra.',
    siteName: 'Rohan',
    images: [{
      url: '/og-image.jpg', // Add later
      width: 1200,
      height: 630,
      alt: 'Rohan Luthra',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohan Luthra',
    description: 'Personal website of Rohan Luthra',
    images: ['/og-image.jpg'], // Add later
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

## Home Page (`app/page.tsx`)

```typescript
export const metadata: Metadata = {
  title: 'Home',
  description: 'Latest writing and thoughts from Rohan on technology, development, and creative problem-solving.',
  openGraph: {
    title: 'Rohan - Creative Technologist',
    description: 'Latest writing and thoughts from Rohan on technology, development, and creative problem-solving.',
    url: '/',
  },
  twitter: {
    title: 'Rohan - Creative Technologist',
    description: 'Latest writing and thoughts from Rohan on technology, development, and creative problem-solving.',
  },
  alternates: {
    canonical: '/',
  },
}
```

## About Page (`app/about/page.tsx`)

```typescript
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Rohan - background, projects, tools, and what I\'m currently reading.',
  openGraph: {
    title: 'About Rohan',
    description: 'Learn more about Rohan - background, projects, tools, and what I\'m currently reading.',
    url: '/about',
  },
  twitter: {
    title: 'About Rohan',
    description: 'Learn more about Rohan - background, projects, tools, and what I\'m currently reading.',
  },
  alternates: {
    canonical: '/about',
  },
}
```

## Writing Index (`app/writing/page.tsx`)

```typescript
export const metadata: Metadata = {
  title: 'Writing',
  description: 'Articles and thoughts on technology, development, AI, and creative problem-solving.',
  openGraph: {
    title: 'Writing - Rohan',
    description: 'Articles and thoughts on technology, development, AI, and creative problem-solving.',
    url: '/writing',
  },
  twitter: {
    title: 'Writing - Rohan',
    description: 'Articles and thoughts on technology, development, AI, and creative problem-solving.',
  },
  alternates: {
    canonical: '/writing',
  },
}
```

## Individual Blog Posts (`app/writing/[slug]/page.tsx`)

```typescript
// Example for building-with-ai post
export const metadata: Metadata = {
  title: 'Building with AI: How Claude Changed My Development Workflow',
  description: 'A deep dive into how AI-powered coding assistants are revolutionizing the way we build software, from rapid prototyping to complex problem-solving.',
  keywords: ['AI', 'Claude', 'development workflow', 'coding assistants', 'productivity'],
  authors: [{ name: 'Rohan' }],
  publishedTime: '2024-01-15T00:00:00.000Z',
  openGraph: {
    type: 'article',
    title: 'Building with AI: How Claude Changed My Development Workflow',
    description: 'A deep dive into how AI-powered coding assistants are revolutionizing the way we build software, from rapid prototyping to complex problem-solving.',
    url: '/writing/building-with-ai',
    publishedTime: '2024-01-15T00:00:00.000Z',
    authors: ['Rohan'],
    tags: ['AI', 'Claude', 'development workflow', 'coding assistants'],
    images: [{
      url: '/writing/building-with-ai/og-image.jpg', // Add later
      width: 1200,
      height: 630,
      alt: 'Building with AI article',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Building with AI: How Claude Changed My Development Workflow',
    description: 'A deep dive into how AI-powered coding assistants are revolutionizing the way we build software.',
    images: ['/writing/building-with-ai/og-image.jpg'], // Add later
  },
  alternates: {
    canonical: '/writing/building-with-ai',
  },
}
```

## Additional Files Needed

### `public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

### `app/sitemap.ts` (Next.js generates automatically)
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://yoursite.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://yoursite.com/writing',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Add individual blog posts
    {
      url: 'https://yoursite.com/writing/building-with-ai',
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // ... other posts
  ]
}
```

## Implementation Notes

1. **metadataBase**: Update with actual domain when deployed
2. **Images**: Create Open Graph images (1200x630px) for each page
3. **Content**: Replace placeholder descriptions with actual content
4. **Keywords**: Refine based on actual content and target audience
5. **Dates**: Use actual publication dates for blog posts
6. **URLs**: Ensure canonical URLs match your domain structure

## Future Enhancements

- JSON-LD structured data for articles
- Schema.org markup for person/organization
- Search console verification meta tags
- Favicon and app icons setup
- Social media profile verification