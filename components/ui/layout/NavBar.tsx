import { Button } from '../primitives/Button'

export default function NavBar() {
  return (
    <nav className="w-full border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
      <div className="flex items-center justify-center">
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="secondary" size="sm">
            About
          </Button>
          <Button variant="secondary" size="sm">
            Writing
          </Button>
          <Button variant="secondary" size="sm">
            Reading
          </Button>
          <Button variant="secondary" size="sm">
            Projects
          </Button>
        </div>
      </div>
    </nav>
  )
}