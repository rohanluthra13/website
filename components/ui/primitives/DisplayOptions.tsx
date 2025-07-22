'use client'

import { memo, useState } from 'react'
import { ChevronsRightLeft, ChevronsLeftRight, ArrowLeft } from 'lucide-react'
import { type WidthMode } from '../layout/RightSidebarControls'

export type FontMode = 'geist' | 'inter' | 'playfair' | 'spacemono' | 'system'

const fontOptions: { value: FontMode; label: string; cssVar: string }[] = [
  { value: 'geist', label: 'Geist', cssVar: 'var(--font-geist-sans), system-ui, sans-serif' },
  { value: 'inter', label: 'Inter', cssVar: 'var(--font-inter), system-ui, sans-serif' },
  { value: 'playfair', label: 'Playfair', cssVar: 'var(--font-playfair), serif' },
  { value: 'spacemono', label: 'Space Mono', cssVar: 'var(--font-space-mono), monospace' },
  { value: 'system', label: 'System', cssVar: 'system-ui, -apple-system, sans-serif' }
]

interface DisplayOptionsProps {
  contentWidth: WidthMode
  onContentWidthChange: (width: WidthMode) => void
  font: FontMode
  onFontChange: (font: FontMode) => void
  onClose: () => void
}

const DisplayOptions = memo(function DisplayOptions({
  contentWidth,
  onContentWidthChange,
  font,
  onFontChange,
  onClose
}: DisplayOptionsProps) {
  const [showFontPicker, setShowFontPicker] = useState(false)
  const widthModes: WidthMode[] = ['narrower', 'narrow', 'normal', 'wide']
  const currentIndex = widthModes.indexOf(contentWidth)
  
  const canNarrow = currentIndex > 0
  const canWiden = currentIndex < widthModes.length - 1

  const handleNarrow = () => {
    if (canNarrow) {
      onContentWidthChange(widthModes[currentIndex - 1])
    }
  }

  const handleWiden = () => {
    if (canWiden) {
      onContentWidthChange(widthModes[currentIndex + 1])
    }
  }

  const currentFont = fontOptions.find(f => f.value === font) || fontOptions[0]

  const handleFontSelect = (selectedFont: FontMode) => {
    onFontChange(selectedFont)
    setShowFontPicker(false)
  }

  return (
    <div className="w-[160px] h-[160px] p-3 relative">
      {/* Font Row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#1A1A1A]">Font</span>
        
        <button
          onClick={() => setShowFontPicker(!showFontPicker)}
          className="px-2 py-1 text-xs rounded border border-[#333333] text-[#1A1A1A] hover:bg-[var(--color-surface)] transition-all duration-200"
          title="Change font"
          aria-label="Change font family"
        >
          {currentFont.label}
        </button>
      </div>

      {/* Width Row */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#1A1A1A]">Width</span>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleNarrow}
            disabled={!canNarrow}
            className={`
              p-1 rounded border transition-all duration-200
              ${canNarrow 
                ? 'text-[#1A1A1A] hover:bg-[var(--color-surface)] border-[#333333]' 
                : 'text-[#CCCCCC] cursor-not-allowed border-[#E5E5E5]'
              }
            `}
            title="Make narrower"
            aria-label="Make content narrower"
          >
            <ChevronsRightLeft size={16} />
          </button>
          
          <button
            onClick={handleWiden}
            disabled={!canWiden}
            className={`
              p-1 rounded border transition-all duration-200
              ${canWiden 
                ? 'text-[#1A1A1A] hover:bg-[var(--color-surface)] border-[#333333]' 
                : 'text-[#CCCCCC] cursor-not-allowed border-[#E5E5E5]'
              }
            `}
            title="Make wider"
            aria-label="Make content wider"
          >
            <ChevronsLeftRight size={16} />
          </button>
        </div>
      </div>

      {/* Font Picker Overlay */}
      {showFontPicker && (
        <div className="absolute inset-0 bg-[var(--color-surface)] rounded z-10 p-3 flex flex-col">
          <div className="flex items-center gap-3 mb-3 flex-shrink-0">
            <button
              onClick={() => setShowFontPicker(false)}
              className="text-[#666666] hover:text-[#1A1A1A] transition-colors"
              aria-label="Back to main options"
            >
              <ArrowLeft size={14} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="space-y-1 pr-1">
              {fontOptions.map((fontOption) => (
                <button
                  key={fontOption.value}
                  onClick={() => handleFontSelect(fontOption.value)}
                  className={`
                    w-full text-left px-2 py-2 text-xs rounded transition-all duration-200 
                    hover:bg-[var(--color-background)] hover:font-semibold text-[#1A1A1A]
                    ${font === fontOption.value ? 'font-semibold' : 'font-normal'}
                  `}
                  style={{ fontFamily: fontOption.cssVar }}
                  title={`Switch to ${fontOption.label}`}
                >
                  {fontOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

export default DisplayOptions