'use client'

import RightSidebarControls from './RightSidebarControls'
import { MobileNav, MobileHeader } from './MobileNav'
import NavBar from './NavBar'
import Footer from './Footer'
import { useLayout } from '../providers/LayoutProvider'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { contentWidth, font, setContentWidth, setFont } = useLayout()

  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
        {/* Mobile Header */}
        <MobileHeader />

        {/* 3-Column CSS Grid Layout: Left Sidebar - Main Content - Right Sidebar */}
        <div className="grid grid-cols-[var(--sidebar-left-width)_1fr_var(--sidebar-right-width)] flex-1">
          {/* Left Sidebar - Navigation */}
          <div className="bg-[var(--color-surface)]">
          </div>

          {/* Main Content - Primary content area */}
          <main className="page-transition flex flex-col">
            <div className="flex-1">
              {children}
            </div>
          </main>

          {/* Right Sidebar - Controls Panel */}
          <RightSidebarControls 
            contentWidth={contentWidth}
            onContentWidthChange={setContentWidth}
            font={font}
            onFontChange={setFont}
          />
        </div>
        
        {/* Footer - Full width */}
        <Footer />
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </>
  )
}