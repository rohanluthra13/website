'use client'

import { memo, useState } from 'react'
import { useLayout } from '../providers/LayoutProvider'
import { useTheme } from '../providers/ThemeProvider'
import DisplayOptions from '../primitives/DisplayOptions'

const RightSidebarControls = memo(function RightSidebarControls() {
  const { isMobile, contentWidth, setContentWidth } = useLayout()
  const { font, setFont } = useTheme()
  const [isOpen, setIsOpen] = useState(false)


  // Hide on mobile
  if (isMobile) {
    return null
  }

  return (
    <div className="fixed right-4 z-50" style={{ 
      top: '80px' 
    }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group p-2 rounded-lg bg-[var(--color-background)] flex items-center justify-center cursor-pointer"
            aria-label="display settings"
            aria-expanded={isOpen}
          >
            <span 
              className="font-permanent-marker text-[var(--color-text-primary)] drop-shadow-md group-hover:drop-shadow-xl group-hover:scale-110 group-active:scale-95 group-active:drop-shadow-sm transition-all duration-150" 
              style={{ fontSize: '32px', lineHeight: '40px' }}
            >
              Aa
            </span>
          </button>

          {/* Dropdown Menu - positioned below */}
          {isOpen && (
            <div className="absolute top-full right-0 mt-2 bg-[var(--color-surface)] rounded-lg">
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