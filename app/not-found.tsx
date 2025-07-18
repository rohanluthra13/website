import { ErrorCard } from '../components/ui/primitives/ErrorCard'
import { Search, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <ErrorCard
          title="Page Not Found"
          message="The page you're looking for doesn't exist or may have been moved."
          showRetry={false}
          showHome={true}
          showBack={true}
        />
        
        <div className="mt-8 p-6 bg-surface border border-border rounded-card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Looking for something specific?
          </h3>
          
          <div className="space-y-3">
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 p-3 bg-background hover:bg-gray-50 border border-border rounded-lg transition-colors"
            >
              <Search className="h-4 w-4 text-accent" />
              <span className="text-text-primary">Search Companies</span>
            </Link>
            
            <Link 
              href="/company/AAPL"
              className="flex items-center justify-center gap-2 p-3 bg-background hover:bg-gray-50 border border-border rounded-lg transition-colors"
            >
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-text-primary">View Sample Company (AAPL)</span>
            </Link>
          </div>
          
          <p className="text-sm text-text-secondary mt-4">
            Try searching for a company ticker symbol like &ldquo;AAPL&rdquo;, &ldquo;GOOGL&rdquo;, or &ldquo;MSFT&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}