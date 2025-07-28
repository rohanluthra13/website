'use client'

import { useState, useRef, useEffect } from 'react'
import { Mail, Copy, ExternalLink } from 'lucide-react'

interface EmailLinkProps {
  email: string
  className?: string
}

export default function EmailLink({ email, className = '' }: EmailLinkProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setCopySuccess(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }


  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={handleOpen}
        className={`group relative p-2 rounded-lg bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition-all duration-200 cursor-pointer ${className}`}
        aria-label="Email options"
        aria-expanded={isOpen}
      >
        <Mail size={20} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors" />
      </button>

      {isOpen && (
        <div className="absolute -top-2 left-full -ml-4 md:ml-0 bg-[var(--color-surface)] rounded-lg z-10 min-w-[150px] max-w-[160px] md:min-w-[180px] md:max-w-none">
          <div className="py-2">
            <button
              onClick={handleCopyEmail}
              className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-background)] transition-colors flex items-center gap-1 md:gap-2 cursor-pointer group"
              style={{ fontFamily: 'var(--font-family-reef)' }}
            >
              <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors flex-1">
                {copySuccess ? 'copied!' : 'copy email address'}
              </span>
              <Copy size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors flex-shrink-0" />
            </button>
            
            <a
              href={`mailto:${email}`}
              className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-background)] transition-colors flex items-center gap-1 md:gap-2 group"
              style={{ fontFamily: 'var(--font-family-reef)' }}
            >
              <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors flex-1">
                send email
              </span>
              <ExternalLink size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors flex-shrink-0" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}