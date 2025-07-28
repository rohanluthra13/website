import { Metadata } from 'next'
import AppLayout from '@/components/ui/layout/AppLayout'
import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Articles and thoughts from Rohan Luthra',
  alternates: {
    canonical: '/writing',
  },
}

export default async function WritingPage() {
  const posts = await getAllPosts()

  return (
    <AppLayout>
      <div className="px-8">
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/writing/${post.slug}`} className="block p-6 -mx-6 rounded-lg transition-colors">
                <time className="text-sm text-muted dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  <span className="mx-2">·</span>
                  {post.readTime}
                </time>
                <h2 className="text-2xl font-semibold mt-2 mb-3 group-hover:text-link dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted dark:text-gray-400 leading-relaxed">
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