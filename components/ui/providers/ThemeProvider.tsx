'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
  mobileMenuOpen: boolean
  isMobile: boolean
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  setLeftSidebarOpen: (open: boolean) => void
  setRightSidebarOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
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
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedLeftSidebar = localStorage.getItem('leftSidebarOpen')
    const savedRightSidebar = localStorage.getItem('rightSidebarOpen')
    
    if (savedLeftSidebar !== null) {
      setLeftSidebarOpen(JSON.parse(savedLeftSidebar))
    }
    if (savedRightSidebar !== null) {
      setRightSidebarOpen(JSON.parse(savedRightSidebar))
    }
  }, [])

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      // Auto-close sidebars and mobile menu on mobile
      if (mobile) {
        setLeftSidebarOpen(false)
        setRightSidebarOpen(false)
        setMobileMenuOpen(false)
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

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(prev => !prev)
  }

  const toggleRightSidebar = () => {
    setRightSidebarOpen(prev => !prev)
  }

  const value: ThemeContextType = {
    leftSidebarOpen,
    rightSidebarOpen,
    mobileMenuOpen,
    isMobile,
    toggleLeftSidebar,
    toggleRightSidebar,
    setLeftSidebarOpen,
    setRightSidebarOpen,
    setMobileMenuOpen,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}