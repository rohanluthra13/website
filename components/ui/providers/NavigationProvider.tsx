'use client'

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { type NavigationContextType } from '../../../types/navigation'

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}

interface NavigationProviderProps {
  children: React.ReactNode
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [activeSection, setActiveSectionState] = useState<string>()

  // Stable callback for section changes
  const setActiveSection = useCallback((section: string) => {
    setActiveSectionState(section)
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo<NavigationContextType>(() => ({
    activeSection,
    setActiveSection,
  }), [activeSection, setActiveSection])

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}