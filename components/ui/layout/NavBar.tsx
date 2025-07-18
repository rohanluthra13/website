import { Button } from '../primitives/Button'

export default function NavBar() {
  return (
    <nav className="w-full border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Header/Label */}
        <div className="text-lg font-medium text-[var(--color-text)]">
          rohanluthra
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4 absolute" style={{left: 'calc(50% + 200px)'}}>
          <Button variant="secondary" size="sm">
            about
          </Button>
          <Button variant="secondary" size="sm">
            writing
          </Button>
          <Button variant="secondary" size="sm">
            reading
          </Button>
          <Button variant="secondary" size="sm">
            projects
          </Button>
        </div>
      </div>
    </nav>
  )
}