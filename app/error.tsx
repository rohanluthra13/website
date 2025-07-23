'use client'

import { useEffect } from 'react'
import { ErrorCard } from '../components/ui/primitives/ErrorCard'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Global error boundary:', error)
    
    // In production, you might want to send to error reporting service
    // Example: reportError(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background p-4">
      <ErrorCard
        title="Application Error"
        error={error}
        onRetry={reset}
        showRetry={true}
        showHome={true}
        showBack={false}
      />
    </div>
  )
}