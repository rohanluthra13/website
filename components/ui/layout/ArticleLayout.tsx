import { ReactNode } from 'react'
import Link from 'next/link'
import AppLayout from './AppLayout'

interface ArticleLayoutProps {
  title: string
  date: string
  readTime: string
  children: ReactNode
}

export default function ArticleLayout({ title, date, readTime, children }: ArticleLayoutProps) {
  return (
    <AppLayout>
      <article className="px-8 pb-80">
        <header className="mb-12">
          <div className="h-4"></div>
          <Link href="/" className="text-sm text-muted hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 inline-block">
            ← back
          </Link>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <div className="text-sm text-muted dark:text-gray-400">
            <time>{new Date(date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</time>
            <span className="mx-2">·</span>
            <span>{readTime}</span>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-p:mb-6 prose-p:leading-relaxed">
          {children}
        </div>
      </article>
    </AppLayout>
  )
}