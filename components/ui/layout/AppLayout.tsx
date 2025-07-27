'use client'

import RightSidebarControls from './RightSidebarControls'
import LeftSidebarNav from './LeftSidebarNav'
import Footer from './Footer'
import { type SectionData } from '../../../types/navigation'

interface AppLayoutProps {
  children: React.ReactNode
  sections?: SectionData[]
}

export default function AppLayout({ children, sections }: AppLayoutProps) {

  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
        {/* 3-Column CSS Grid Layout: Left Sidebar - Main Content - Right Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-[var(--sidebar-left-width)_1fr_var(--sidebar-right-width)] flex-1">
          {/* Left Sidebar - Navigation */}
          <div className="hidden md:block bg-[var(--color-surface)]">
            {sections && <LeftSidebarNav sections={sections} />}
          </div>

          {/* Main Content - Primary content area */}
          <main className="page-transition flex flex-col">
            <div className="flex-1">
              {children}
            </div>
          </main>

          {/* Right Sidebar - Empty container like left sidebar */}
          <div className="hidden md:block bg-[var(--color-surface)] relative">
            {/* The sidebar is just an empty container */}
          </div>
        </div>
        
        {/* Footer - Full width */}
        <Footer />
      </div>

      {/* Floating Display Settings Button - Outside the grid */}
      <RightSidebarControls />
    </>
  )
}