import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import ArticleLayout from '@/components/ui/layout/ArticleLayout'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { meta } = await getPostBySlug(resolvedParams.slug)
  
  return {
    title: meta.title,
    description: meta.excerpt,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  try {
    const { meta, content } = await getPostBySlug(resolvedParams.slug)
    
    return (
      <ArticleLayout
        title={meta.title}
        date={meta.date}
        readTime={meta.readTime}
      >
        <MDXRemote source={content} />
      </ArticleLayout>
    )
  } catch {
    notFound()
  }
}