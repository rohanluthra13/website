import { Button } from '../primitives/Button'
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="w-full bg-[var(--color-surface)]">
      {/* Grid matching the main layout: left sidebar | content | right sidebar */}
      {/* On mobile, this becomes a single column */}
      <div className="grid grid-cols-1 md:grid-cols-[var(--sidebar-left-width)_1fr_var(--sidebar-right-width)]">
        {/* Empty left column to match sidebar - hidden on mobile */}
        <div className="hidden md:block"></div>
        
        {/* Main nav content - aligned with main content area */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Header/Label */}
            <Link 
              href="/" 
              className="text-xl font-medium text-[var(--color-text)]"
              style={{ fontFamily: 'Reef, var(--font-inter), system-ui, sans-serif' }}
            >
              rohanluthra
            </Link>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button 
                  variant="secondary" 
                  size="sm"
                  style={{ fontFamily: 'Reef, var(--font-inter), system-ui, sans-serif' }}
                >
                  writing
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="secondary" 
                  size="sm"
                  style={{ fontFamily: 'Reef, var(--font-inter), system-ui, sans-serif' }}
                >
                  about
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Empty right column to match sidebar - hidden on mobile */}
        <div className="hidden md:block"></div>
      </div>
    </nav>
  )
}