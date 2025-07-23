'use client'

import { memo, useState, useEffect, useRef, ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface IconMenuButtonProps {
  icon: LucideIcon
  title: string
  ariaLabel: string
  children: ReactNode | ((props: { close: () => void }) => ReactNode)
}

const IconMenuButton = memo(function IconMenuButton({
  icon: Icon,
  title,
  ariaLabel,
  children
}: IconMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="p-2 rounded-lg bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition-all duration-200 flex items-center justify-center"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
      >
        <Icon size={20} className="text-[#666666]" />
      </button>

      {/* Custom Hover Label - positioned to the left */}
      {isHovered && !isOpen && (
        <div className="absolute top-1/2 right-full mr-2 -translate-y-1/2 px-2 py-1 whitespace-nowrap">
          <span 
            className="text-xs text-[#666666] font-normal tracking-wide" 
            style={{ 
              fontFamily: 'Reef, var(--font-inter), system-ui, sans-serif',
              textTransform: 'none'
            }}
          >
            {title}
          </span>
        </div>
      )}

      {/* Dropdown Menu - positioned to the left */}
      {isOpen && (
        <div className="absolute top-0 right-full mr-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-md">
          {typeof children === 'function' ? children({ close: () => setIsOpen(false) }) : children}
        </div>
      )}
    </div>
  )
})

export default IconMenuButton