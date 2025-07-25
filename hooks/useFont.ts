import { useEffect } from 'react'
import type { FontMode } from '@/types/layout'

export function useFont(font: FontMode) {
  useEffect(() => {
    // Remove all font classes first
    document.body.classList.remove('font-geist', 'font-inter', 'font-playfair', 'font-spacemono')
    
    // Add the selected font class
    switch (font) {
      case 'geist':
        // Default font, no additional class needed
        break
      case 'inter':
        document.body.classList.add('font-inter')
        break
      case 'playfair':
        document.body.classList.add('font-playfair')
        break
      case 'spacemono':
        document.body.classList.add('font-spacemono')
        break
      case 'system':
        // Use system font by not adding any class
        break
    }
  }, [font])
}