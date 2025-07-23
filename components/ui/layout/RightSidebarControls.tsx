'use client'

import { memo } from 'react'
import { ALargeSmall } from 'lucide-react'
import { useLayout } from '../providers/LayoutProvider'
import IconMenuButton from '../primitives/IconMenuButton'
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

  // Hide on mobile and when sidebar is closed
  if (isMobile || !rightSidebarOpen) {
    return null
  }


  return (
    <aside className="w-full bg-[var(--color-surface)] min-h-screen sticky top-0 overflow-y-auto">
      {/* Icon Group - aligned with search bar */}
      <div className="fixed right-0 p-4 flex flex-col gap-2 z-50" style={{ top: 'calc(22px - 0.875rem/2)' }}>
        {/* Display Settings */}
        <IconMenuButton
          icon={ALargeSmall}
          title="display settings"
          ariaLabel="display settings"
        >
          {({ close }) => (
            <DisplayOptions
              contentWidth={contentWidth}
              onContentWidthChange={onContentWidthChange}
              font={font}
              onFontChange={onFontChange}
              onClose={close}
            />
          )}
        </IconMenuButton>
      </div>
    </aside>
  )
})

export default RightSidebarControls