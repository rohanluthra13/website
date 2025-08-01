'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error (root layout):', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-hover-lighter flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface)] border border-light rounded-lg p-8 text-center max-w-md mx-auto shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-error-light flex items-center justify-center">
                <svg className="h-6 w-6 text-[var(--color-error)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              Critical Application Error
            </h2>
            
            <p className="text-muted mb-6 leading-relaxed">
              The application encountered a critical error and needs to be restarted. 
              This usually happens due to a fundamental issue with the application.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-muted cursor-pointer hover:text-strong">
                  Error Details (Development Only)
                </summary>
                <div className="mt-2 p-3 bg-hover-lighter rounded border text-xs font-mono text-strong overflow-auto max-h-32">
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

            <div className="flex flex-col gap-3">
              <button 
                onClick={reset}
                className="bg-[var(--color-accent)] hover:bg-[var(--button-primary-hover)] text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Restart Application
              </button>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-hover-light hover:bg-hover-lighter text-strong px-4 py-2 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}