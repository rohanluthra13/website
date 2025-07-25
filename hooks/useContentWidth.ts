import { useEffect } from 'react'
import type { WidthMode } from '@/types/layout'

const widthValues = {
  narrower: 'clamp(60px, 25vw, 500px)',
  narrow: 'clamp(60px, 20vw, 400px)', 
  normal: 'clamp(60px, 15vw, 300px)',
  wide: 'clamp(60px, 12vw, 240px)'
}

export function useContentWidth(contentWidth: WidthMode) {
  useEffect(() => {
    const root = document.documentElement
    const targetWidth = widthValues[contentWidth]
    
    // Add transition class for smooth animation
    root.classList.add('width-transitioning')
    
    // Signal to layout components that transition is active
    root.setAttribute('data-width-transitioning', 'true')
    
    // Update the CSS custom properties
    root.style.setProperty('--sidebar-left-width', targetWidth)
    root.style.setProperty('--sidebar-right-width', targetWidth)
    
    // Clean up after transition completes
    const cleanup = setTimeout(() => {
      root.classList.remove('width-transitioning')
      root.removeAttribute('data-width-transitioning')
    }, 300)
    
    return () => {
      clearTimeout(cleanup)
      root.classList.remove('width-transitioning')
      root.removeAttribute('data-width-transitioning')
    }
  }, [contentWidth])
}