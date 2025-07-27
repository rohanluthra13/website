
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto bg-[var(--color-background)] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)] relative z-20">
      <div className="w-full px-8 py-8 font-reef">
        <div className="text-sm text-muted mb-1">
          © {new Date().getFullYear()} rohan luthra
        </div>
        <Link href="/privacy" className="text-sm text-muted hover:text-gray-700 dark:hover:text-gray-300">
          privacy policy
        </Link>
      </div>
    </footer>
  )
}