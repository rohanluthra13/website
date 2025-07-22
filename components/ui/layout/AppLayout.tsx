'use client'

import { useState, useEffect, useCallback } from 'react'
import RightSidebarControls, { type WidthMode } from './RightSidebarControls'
import { type FontMode } from '../primitives/DisplayOptions'
import { MobileNav, MobileHeader } from './MobileNav'
import NavBar from './NavBar'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  // Width control state with persistence
  const [contentWidth, setContentWidth] = useState<WidthMode>('narrower')
  
  // Font control state with persistence
  const [font, setFont] = useState<FontMode>('geist')

  // Load persisted preferences on mount
  useEffect(() => {
    const savedWidth = localStorage.getItem('contentWidth') as WidthMode
    if (savedWidth && ['narrower', 'narrow', 'normal', 'wide'].includes(savedWidth)) {
      setContentWidth(savedWidth)
    }
    
    const savedFont = localStorage.getItem('font') as FontMode
    if (savedFont && ['geist', 'inter', 'playfair', 'spacemono', 'system'].includes(savedFont)) {
      setFont(savedFont)
    }
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

  // Update font family based on font mode
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

  // Stable callback for width changes with persistence
  const handleContentWidthChange = useCallback((newWidth: WidthMode) => {
    setContentWidth(newWidth)
    localStorage.setItem('contentWidth', newWidth)
  }, [])

  // Stable callback for font changes with persistence
  const handleFontChange = useCallback((newFont: FontMode) => {
    setFont(newFont)
  }, [])

  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)]">
        {/* Mobile Header */}
        <MobileHeader />

        {/* 3-Column CSS Grid Layout: Left Sidebar - Main Content - Right Sidebar */}
        <div className="grid grid-cols-[var(--sidebar-left-width)_1fr_var(--sidebar-right-width)] min-h-[calc(100vh-var(--mobile-header-height,0px))]">
          {/* Left Sidebar - Navigation */}
          <div className="bg-[var(--color-surface)] border-r border-[var(--color-border)] border-2 border-dashed border-red-300">
          </div>

          {/* Main Content - Primary content area */}
          <main className="page-transition border-2 border-dashed border-blue-300">
            {children}
          </main>

          {/* Right Sidebar - Controls Panel */}
          <RightSidebarControls 
            contentWidth={contentWidth}
            onContentWidthChange={handleContentWidthChange}
            font={font}
            onFontChange={handleFontChange}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </>
  )
}