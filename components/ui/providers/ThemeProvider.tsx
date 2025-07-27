'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { type FontMode, type ThemeContextType } from '../../../types/theme'

// Type guard for localStorage validation
const isValidFontMode = (value: string): value is FontMode => {
  return ['reef', 'geist', 'inter', 'playfair', 'spacemono'].includes(value)
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [font, setFontState] = useState<FontMode>('reef')

  // Load font preference from localStorage on mount
  useEffect(() => {
    const savedFont = localStorage.getItem('font')
    if (savedFont && isValidFontMode(savedFont)) {
      setFontState(savedFont)
    }
  }, [])

  // Update font family based on font mode
  useEffect(() => {
    // Remove all font classes first
    document.body.classList.remove('font-reef', 'font-geist', 'font-inter', 'font-playfair', 'font-spacemono')
    
    // Add the selected font class
    switch (font) {
      case 'reef':
        // Default font, no additional class needed
        break
      case 'geist':
        document.body.classList.add('font-geist')
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
    }
  }, [font])

  // Stable callback for font changes with persistence
  const setFont = useCallback((newFont: FontMode) => {
    setFontState(newFont)
    localStorage.setItem('font', newFont)
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo<ThemeContextType>(() => ({
    font,
    setFont,
  }), [font, setFont])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}