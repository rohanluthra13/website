'use client'

import { Button } from './Button'
import { AlertCircle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export interface ErrorCardProps {
  title?: string
  message?: string
  error?: Error & { digest?: string }
  showRetry?: boolean
  showHome?: boolean
  showBack?: boolean
  onRetry?: () => void
  className?: string
}

export function ErrorCard({
  title = 'Something went wrong',
  message,
  error,
  showRetry = true,
  showHome = true,
  showBack = false,
  onRetry,
  className = ''
}: ErrorCardProps) {
  const getErrorMessage = () => {
    if (message) return message
    if (error?.message) {
      // Handle common Supabase/PostgreSQL errors
      if (error.message.includes('PGRST116')) return 'No data found for this request.'
      if (error.message.includes('PGRST301')) return 'Unable to connect to database.'
      if (error.message.includes('fetch')) return 'Network error. Please check your connection.'
      return error.message
    }
    return 'An unexpected error occurred. Please try again.'
  }

  const getErrorType = () => {
    if (error?.message?.includes('fetch') || error?.message?.includes('network')) return 'Network'
    if (error?.message?.includes('PGRST') || error?.message?.includes('database')) return 'Database'
    if (error?.message?.includes('404') || error?.message?.includes('not found')) return 'Not Found'
    return 'Application'
  }

  return (
    <div className={`bg-surface border border-border rounded-card p-8 text-center max-w-md mx-auto ${className}`}>
      <div className="flex justify-center mb-4">
        <AlertCircle className="h-12 w-12 text-error" />
      </div>
      
      <h2 className="text-xl font-semibold text-text-primary mb-2">
        {title}
      </h2>
      
      <p className="text-text-secondary mb-6 leading-relaxed">
        {getErrorMessage()}
      </p>

      {process.env.NODE_ENV === 'development' && error && (
        <details className="mb-6 text-left">
          <summary className="text-sm text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
            Error Details ({getErrorType()})
          </summary>
          <div className="mt-2 p-3 bg-gray-50 rounded border text-xs font-mono text-gray-700 overflow-auto max-h-32">
            <div><strong>Message:</strong> {error.message}</div>
            {error.digest && <div><strong>Digest:</strong> {error.digest}</div>}
            {error.stack && (
              <div className="mt-2">
                <strong>Stack:</strong>
                <pre className="whitespace-pre-wrap">{error.stack}</pre>
              </div>
            )}
          </div>
        </details>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {showRetry && onRetry && (
          <Button 
            onClick={onRetry}
            variant="primary"
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
        
        {showBack && (
          <Button 
            onClick={() => window.history.back()}
            variant="secondary"
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        )}
        
        {showHome && (
          <Link href="/">
            <Button 
              variant="secondary"
              className="inline-flex items-center gap-2 w-full sm:w-auto"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}