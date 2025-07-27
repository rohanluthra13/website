export type WidthMode = 'narrower' | 'narrow' | 'normal' | 'wide'

export interface LayoutContextType {
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
  isMobile: boolean
  contentWidth: WidthMode
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  setLeftSidebarOpen: (open: boolean) => void
  setRightSidebarOpen: (open: boolean) => void
  setContentWidth: (width: WidthMode) => void
}