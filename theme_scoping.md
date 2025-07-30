# Theme System Scoping Document

## Current State

The website currently uses a single light theme with the following characteristics:
- **Background**: `#EDE7E3` (light beige)
- **Text**: `#1A1A1A` (near black)
- **Theme Infrastructure**: Exists for font switching via `ThemeProvider`
- **Color Management**: All colors defined as CSS variables in `/app/styles/variables.css`

## Scope of Theme Implementation

### 1. Core Color Variables Requiring Theme Variants

These colors must change between themes for proper contrast and readability:

| Variable | Current Value | Usage |
|----------|---------------|-------|
| `--color-background` | `#EDE7E3` | Main page background |
| `--color-surface` | `#EDE7E3` | Cards, code blocks, elevated surfaces |
| `--color-text-primary` | `#1A1A1A` | Main text color |
| `--color-text-secondary` | `#666666` | Muted/secondary text |
| `--color-border` | `#E5E5E5` | All borders |

### 2. Additional Color Variables Needing Variants

| Variable | Current Value | Usage |
|----------|---------------|-------|
| `--color-text-tertiary` | `#999999` | Even more muted text |
| `--color-text-disabled` | `#CCCCCC` | Disabled elements, scrollbars |
| `--color-text-muted` | `#6B7280` | Muted text |
| `--color-text-strong` | `#374151` | Emphasized text |
| `--color-hover-light` | `#F3F4F6` | Hover states |
| `--color-hover-lighter` | `#F9FAFB` | Lighter hover states |
| `--color-border-light` | `#E5E7EB` | Light borders |
| `--color-overlay` | `rgba(0,0,0,0.5)` | Modal overlays |

### 3. Colors That May Remain Constant

These could potentially stay the same across themes, though they might need slight adjustments:

- `--color-accent`: `#0066CC` (brand blue)
- `--color-link`: `#2563EB` (link blue)
- `--color-success`: `#10B981` (green)
- `--color-error`: `#EF4444` (red)
- `--color-error-bg`: `#FEE2E2` (error background)
- `--color-success-bg`: `#D1FAE5` (success background)

## Implementation Requirements

### 1. CSS Variable Structure

Each theme would need to define all color variables. Example structure:

```css
/* Light Theme (current) */
.theme-light {
  --color-background: #EDE7E3;
  --color-text-primary: #1A1A1A;
  /* ... all other variables ... */
}

/* Dark Theme (new) */
.theme-dark {
  --color-background: #1A1A1A;
  --color-text-primary: #EDE7E3;
  /* ... all other variables ... */
}
```

### 2. ThemeProvider Extension

The existing `ThemeProvider` would need to:
- Add color theme state alongside font state
- Manage theme class on body element
- Persist theme preference to localStorage
- Handle system theme preference detection (optional)

### 3. Files Requiring Updates

1. **Type definitions** (`/types/theme.ts`):
   - Add `ColorTheme` type
   - Extend `ThemeContextType` interface

2. **CSS files**:
   - `/app/styles/variables.css` - Add theme-specific variable sets
   - No changes needed to component CSS files (they already use variables)

3. **React components**:
   - `/components/ui/providers/ThemeProvider.tsx` - Add color theme logic
   - UI components for theme switching

4. **Root layout**:
   - Ensure theme class is applied at the appropriate level

## Affected UI Elements

Based on CSS analysis, theme changes would affect:
- Page backgrounds
- Text colors (primary, secondary, tertiary, muted, strong, disabled)
- Borders and dividers
- Surface colors (cards, code blocks)
- Hover states
- Scrollbar colors
- Navigation elements
- Footer
- All prose/article content

## Considerations

1. **Contrast Ratios**: Ensure WCAG compliance for text/background combinations
2. **Transition Effects**: Smooth theme switching animations
3. **Code Syntax Highlighting**: May need theme-aware syntax colors
4. **Images/Assets**: Consider if any images need dark mode variants
5. **System Preference**: Option to follow OS dark/light mode preference
6. **Performance**: Theme switching should not cause layout shifts

## Minimal Implementation Path

For a basic theme system:
1. Define light/dark variants for the 13 core color variables
2. Extend ThemeProvider to manage color themes
3. Add theme toggle UI component
4. Test all pages and components for proper theming