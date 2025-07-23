'use client'

import AppLayout from '@/components/ui/layout/AppLayout'
import Link from 'next/link'

const posts = [
  {
    slug: 'building-with-ai',
    title: 'Building with AI: How Claude Changed My Development Workflow',
    date: '2024-01-15',
    excerpt: 'A deep dive into how AI-powered coding assistants are revolutionizing the way we build software, from rapid prototyping to complex problem-solving.',
    readTime: '5 min read'
  },
  {
    slug: 'future-of-web-development',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    date: '2024-01-10',
    excerpt: 'Exploring emerging technologies and paradigms that are shaping the future of web development, including edge computing, WebAssembly, and AI integration.',
    readTime: '8 min read'
  },
  {
    slug: 'lessons-from-side-projects',
    title: 'Lessons Learned from Shipping 10 Side Projects',
    date: '2024-01-05',
    excerpt: 'Reflections on what I learned from building and launching multiple side projects, including time management, scope creep, and the importance of shipping.',
    readTime: '6 min read'
  }
]

export default function WritingPage() {
  return (
    <AppLayout>
      <div className="px-8">
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/writing/${post.slug}`} className="block p-6 -mx-6 rounded-lg transition-colors">
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  <span className="mx-2">·</span>
                  {post.readTime}
                </time>
                <h2 className="text-2xl font-semibold mt-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}