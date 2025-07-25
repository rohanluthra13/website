'use client'

import { useState } from 'react'
import { ErrorCard } from '../../components/ui/primitives/ErrorCard'

type ErrorType = 'generic' | 'network' | 'database' | 'custom'

const isValidErrorType = (value: string): value is ErrorType => {
  return ['generic', 'network', 'database', 'custom'].includes(value)
}

export default function ErrorPreviewPage() {
  const [errorType, setErrorType] = useState<ErrorType>('generic')
  
  const mockErrors = {
    generic: new Error('Something went wrong with the application'),
    network: new Error('fetch failed: Network request failed'),
    database: new Error('PGRST116: No rows found'),
    custom: Object.assign(new Error('Custom error with digest'), { digest: 'abc123' })
  }

  const mockError = mockErrors[errorType]
  mockError.stack = `Error: ${mockError.message}
    at Component.render (/app/page.tsx:25:15)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Error UI Preview</h1>
        
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Error Type:</label>
          <select 
            value={errorType} 
            onChange={(e) => {
              const value = e.target.value
              if (isValidErrorType(value)) {
                setErrorType(value)
              }
            }}
            className="border border-border rounded px-3 py-2 bg-surface"
          >
            <option value="generic">Generic Error</option>
            <option value="network">Network Error</option>
            <option value="database">Database Error</option>
            <option value="custom">Custom Error with Digest</option>
          </select>
        </div>

        <div className="border-2 border-dashed border-light p-8 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Error Card Preview:</h2>
          <ErrorCard
            title="Application Error"
            error={mockError}
            onRetry={() => alert('Retry clicked!')}
            showRetry={true}
            showHome={true}
            showBack={false}
          />
        </div>
      </div>
    </div>
  )
}