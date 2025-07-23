'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export interface ErrorCardProps {
  title?: string
  message?: string
  error?: Error & { digest?: string }
  showRetry?: boolean
  showHome?: boolean
  showBack?: boolean
  onRetry?: () => void
  className?: string
  autoRedirect?: boolean
  redirectDelay?: number
}

export function ErrorCard({
  title = 'Something went wrong',
  message,
  error,
  showRetry = true,
  showHome = true,
  showBack = false,
  onRetry,
  className = '',
  autoRedirect = true,
  redirectDelay = 3000
}: ErrorCardProps) {
  const router = useRouter()

  useEffect(() => {
    if (autoRedirect) {
      const timer = setTimeout(() => {
        router.push('/')
      }, redirectDelay)
      return () => clearTimeout(timer)
    }
  }, [autoRedirect, redirectDelay, router])

  return (
    <div className={`text-left ${className}`}>
      <p 
        className="text-text-primary cursor-pointer hover:opacity-70 transition-opacity" 
        style={{ fontFamily: 'Reef, var(--font-inter), system-ui, sans-serif' }}
        onClick={() => router.push('/')}
      >
        sorry something went wrong, redirecting...
      </p>
    </div>
  )
}