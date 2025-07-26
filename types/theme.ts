export type FontMode = 'geist' | 'inter' | 'playfair' | 'spacemono' | 'system'

export interface ThemeContextType {
  font: FontMode
  setFont: (font: FontMode) => void
}