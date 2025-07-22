import { Button } from '../primitives/Button'
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="w-full border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Header/Label */}
        <div className="text-lg font-medium text-[var(--color-text)] ml-96">
          rohanluthra
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4 absolute" style={{left: 'calc(50% + 200px)'}}>
          <Link href="/about">
            <Button variant="secondary" size="sm">
              about
            </Button>
          </Link>
          <Link href="/writing">
            <Button variant="secondary" size="sm">
              writing
            </Button>
          </Link>
          <Link href="/reading">
            <Button variant="secondary" size="sm">
              reading
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="secondary" size="sm">
              projects
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}