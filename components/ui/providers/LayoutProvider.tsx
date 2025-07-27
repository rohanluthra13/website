'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { type WidthMode, type LayoutContextType } from '../../../types/layout'

// Type guard for localStorage validation
const isValidWidthMode = (value: string): value is WidthMode => {
  return ['narrower', 'narrow', 'normal', 'wide'].includes(value)
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}

interface LayoutProviderProps {
  children: React.ReactNode
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [contentWidth, setContentWidthState] = useState<WidthMode>('narrower')

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedLeftSidebar = localStorage.getItem('leftSidebarOpen')
    const savedRightSidebar = localStorage.getItem('rightSidebarOpen')
    const savedWidth = localStorage.getItem('contentWidth')
    
    if (savedLeftSidebar !== null) {
      setLeftSidebarOpen(JSON.parse(savedLeftSidebar))
    }
    if (savedRightSidebar !== null) {
      setRightSidebarOpen(JSON.parse(savedRightSidebar))
    }
    if (savedWidth && isValidWidthMode(savedWidth)) {
      setContentWidthState(savedWidth)
    }
  }, [])

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      // Auto-close sidebars on mobile
      if (mobile) {
        setLeftSidebarOpen(false)
        setRightSidebarOpen(false)
      } else {
        // Restore saved preferences on desktop
        const savedLeftSidebar = localStorage.getItem('leftSidebarOpen')
        const savedRightSidebar = localStorage.getItem('rightSidebarOpen')
        
        if (savedLeftSidebar !== null) {
          setLeftSidebarOpen(JSON.parse(savedLeftSidebar))
        } else {
          setLeftSidebarOpen(true)
        }
        
        if (savedRightSidebar !== null) {
          setRightSidebarOpen(JSON.parse(savedRightSidebar))
        } else {
          setRightSidebarOpen(true)
        }
      }
    }

    // Set initial state
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Update CSS custom properties based on width mode
  useEffect(() => {
    const root = document.documentElement
    
    switch (contentWidth) {
      case 'narrower': // Even narrower content area
        root.style.setProperty('--sidebar-left-width', 'clamp(60px, 25vw, 500px)')
        root.style.setProperty('--sidebar-right-width', 'clamp(60px, 25vw, 500px)')
        break
      case 'narrow': // Current behavior (default)
        root.style.setProperty('--sidebar-left-width', 'clamp(60px, 20vw, 400px)')
        root.style.setProperty('--sidebar-right-width', 'clamp(60px, 20vw, 400px)')
        break
      case 'normal': // Moderately wider content
        root.style.setProperty('--sidebar-left-width', 'clamp(60px, 15vw, 300px)')
        root.style.setProperty('--sidebar-right-width', 'clamp(60px, 15vw, 300px)')
        break
      case 'wide': // Maximum content focus
        root.style.setProperty('--sidebar-left-width', 'clamp(60px, 12vw, 240px)')
        root.style.setProperty('--sidebar-right-width', 'clamp(60px, 12vw, 240px)')
        break
    }
  }, [contentWidth])


  // Persist sidebar state to localStorage
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('leftSidebarOpen', JSON.stringify(leftSidebarOpen))
    }
  }, [leftSidebarOpen, isMobile])

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('rightSidebarOpen', JSON.stringify(rightSidebarOpen))
    }
  }, [rightSidebarOpen, isMobile])

  const toggleLeftSidebar = useCallback(() => {
    setLeftSidebarOpen(prev => !prev)
  }, [])

  const toggleRightSidebar = useCallback(() => {
    setRightSidebarOpen(prev => !prev)
  }, [])

  // Stable callback for width changes with persistence
  const setContentWidth = useCallback((newWidth: WidthMode) => {
    setContentWidthState(newWidth)
    localStorage.setItem('contentWidth', newWidth)
  }, [])


  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo<LayoutContextType>(() => ({
    leftSidebarOpen,
    rightSidebarOpen,
    isMobile,
    contentWidth,
    toggleLeftSidebar,
    toggleRightSidebar,
    setLeftSidebarOpen,
    setRightSidebarOpen,
    setContentWidth,
  }), [
    leftSidebarOpen,
    rightSidebarOpen,
    isMobile,
    contentWidth,
    toggleLeftSidebar,
    toggleRightSidebar,
    setContentWidth,
  ])

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}