'use client'

import { memo, useState, useEffect, useRef } from 'react'
import { useLayout } from '../providers/LayoutProvider'
import DisplayOptions, { type FontMode } from '../primitives/DisplayOptions'

export type WidthMode = 'narrower' | 'narrow' | 'normal' | 'wide'

interface RightSidebarControlsProps {
  contentWidth: WidthMode
  onContentWidthChange: (width: WidthMode) => void
  font: FontMode
  onFontChange: (font: FontMode) => void
}

const RightSidebarControls = memo(function RightSidebarControls({
  contentWidth,
  onContentWidthChange,
  font,
  onFontChange
}: RightSidebarControlsProps) {
  const { rightSidebarOpen, isMobile } = useLayout()
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="p-2 rounded-lg bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition-all duration-200 flex items-center justify-center"
            aria-label="display settings"
            aria-expanded={isOpen}
          >
            <span 
              className="font-permanent-marker text-black" 
              style={{ fontSize: '32px', lineHeight: '40px' }}
            >
              Aa
            </span>
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
                display settings
              </span>
            </div>
          )}

          {/* Dropdown Menu - positioned to the left */}
          {isOpen && (
            <div className="absolute top-0 right-full mr-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-md">
              <DisplayOptions
                contentWidth={contentWidth}
                onContentWidthChange={onContentWidthChange}
                font={font}
                onFontChange={onFontChange}
                onClose={() => setIsOpen(false)}
              />
            </div>
          )}
    </div>
  )
})

export default RightSidebarControls