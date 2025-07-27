'use client'

import { memo, useState } from 'react'
import { ChevronsRightLeft, ChevronsLeftRight, ChevronLeft } from 'lucide-react'
import { type WidthMode } from '../../../types/layout'
import { type FontMode } from '../../../types/theme'
import ButtonTile from './ButtonTile'

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
    <div className="w-[213px] h-[200px] relative overflow-hidden">
      {/* Main View */}
      <div 
        className={`absolute inset-0 p-3 transition-transform duration-300 ease-in-out ${
          showFontPicker ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Font Row */}
        <div className="flex items-center gap-5 mb-5">
          <span className="text-s text-[var(--color-text-primary)] w-20" style={{ fontFamily: 'Reef, sans-serif' }}>font</span>
          
          <ButtonTile
            onClick={() => setShowFontPicker(!showFontPicker)}
            className="!text-xs !px-2 !py-1"
            style={{ 
              fontFamily: currentFont.cssVar,
              boxShadow: '0px 3px 0px black'
            }}
            title="Change font"
            aria-label="Change font family"
          >
            {currentFont.label}
          </ButtonTile>
        </div>

        {/* Width Row */}
        <div className="flex items-center gap-5">
          <span className="text-s text-[var(--color-text-primary)] w-20" style={{ fontFamily: 'Reef, sans-serif' }}>page width</span>
          
          <div className="flex items-center gap-2">
            <ButtonTile
              onClick={handleNarrow}
              disabled={!canNarrow}
              className={`!p-1 ${!canNarrow ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Make narrower"
              aria-label="Make content narrower"
            >
              <ChevronsRightLeft size={16} />
            </ButtonTile>
            
            <ButtonTile
              onClick={handleWiden}
              disabled={!canWiden}
              className={`!p-1 ${!canWiden ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Make wider"
              aria-label="Make content wider"
            >
              <ChevronsLeftRight size={16} />
            </ButtonTile>
          </div>
        </div>
      </div>

      {/* Font Picker Overlay */}
      <div 
        className={`absolute inset-0 bg-[var(--color-surface)] rounded p-3 flex flex-col transition-transform duration-300 ease-in-out ${
          showFontPicker ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 mb-3 flex-shrink-0">
          <button
            onClick={() => setShowFontPicker(false)}
            className="text-muted hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Back to main options"
          >
            <ChevronLeft size={14} />
          </button>
          <span 
            className="text-xs text-muted italic"
            style={{ fontFamily: 'Reef, sans-serif' }}
          >
            select a font
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="grid grid-cols-2 gap-x-2 gap-y-3 ml-auto w-fit">
            {fontOptions.map((fontOption) => (
              <ButtonTile
                key={fontOption.value}
                onClick={() => handleFontSelect(fontOption.value)}
                className={`
                  !text-xs !px-2 !py-1 !w-[81px]
                  ${font === fontOption.value ? 'font-semibold' : 'font-normal'}
                `}
                style={{ 
                  fontFamily: fontOption.cssVar,
                  boxShadow: '0px 3px 0px black'
                }}
                title={`Switch to ${fontOption.label}`}
              >
                {fontOption.label}
              </ButtonTile>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export default DisplayOptions