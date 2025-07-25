export type WidthMode = 'narrower' | 'narrow' | 'normal' | 'wide'
export type FontMode = 'geist' | 'inter' | 'playfair' | 'spacemono' | 'system'

export interface LayoutContextType {
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
  mobileMenuOpen: boolean
  isMobile: boolean
  contentWidth: WidthMode
  font: FontMode
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  setLeftSidebarOpen: (open: boolean) => void
  setRightSidebarOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  setContentWidth: (width: WidthMode) => void
  setFont: (font: FontMode) => void
}

export interface SectionData {
  id: string
  label: string
}