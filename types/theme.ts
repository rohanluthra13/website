export type FontMode = 'reef' | 'geist' | 'inter' | 'playfair' | 'spacemono'

export interface ThemeContextType {
  font: FontMode
  setFont: (font: FontMode) => void
}