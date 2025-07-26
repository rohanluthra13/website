export interface SectionData {
  id: string
  label: string
}

export interface NavigationContextType {
  activeSection?: string
  setActiveSection: (section: string) => void
}