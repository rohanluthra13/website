'use client'

import { memo, useState, useEffect, useRef } from 'react'
import { useLayout } from '../providers/LayoutProvider'
import { useTheme } from '../providers/ThemeProvider'
import DisplayOptions from '../primitives/DisplayOptions'

const RightSidebarControls = memo(function RightSidebarControls() {
  const { isMobile, contentWidth, setContentWidth } = useLayout()
  const { font, setFont } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
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

  // Hide on mobile
  if (isMobile) {
    return null
  }

  return (
    <div ref={containerRef} className="fixed right-4 z-50" style={{ 
      top: '80px' 
    }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition-all duration-200 flex items-center justify-center"
            aria-label="display settings"
            aria-expanded={isOpen}
          >
            <span 
              className="font-permanent-marker text-[var(--color-text-primary)]" 
              style={{ fontSize: '32px', lineHeight: '40px' }}
            >
              Aa
            </span>
          </button>

          {/* Dropdown Menu - positioned to the left */}
          {isOpen && (
            <div className="absolute top-0 right-full mr-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-md">
              <DisplayOptions
                contentWidth={contentWidth}
                onContentWidthChange={setContentWidth}
                font={font}
                onFontChange={setFont}
                onClose={() => setIsOpen(false)}
              />
            </div>
          )}
    </div>
  )
})

export default RightSidebarControls