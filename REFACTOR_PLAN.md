# Provider Refactor Plan - Best Practice Architecture

## Overview
This document outlines a plan to refactor the current provider structure following best practices:
1. Separate concerns into distinct providers
2. Expose width settings to all pages
3. Use accurate, descriptive naming conventions
4. Enable future extensibility

## Current State

### Problems
- `ThemeProvider` doesn't actually handle themes (dark/light mode)
- Width settings are trapped in `AppLayout` and not accessible to pages
- Mobile state and sidebar state are mixed together
- Font settings are also managed separately in `AppLayout`
- No clear separation of concerns

### Current Structure
```
AppLayout (manages width & font)
  └── ThemeProvider (manages sidebars & mobile state)
        └── Page Components (can't access width/font)
```

## Proposed Architecture

### Provider Hierarchy
Create separate providers for each concern:

```
MediaQueryProvider (responsive states)
  └── DisplayProvider (width & font settings)
        └── SidebarProvider (sidebar states)
              └── AppLayout
                    └── Page Components
```

### Provider Responsibilities

#### 1. MediaQueryProvider
- Detects and provides responsive breakpoints
- Manages `isMobile`, `isTablet`, `isDesktop` states
- Handles window resize events
- No localStorage needed (derived from window)

#### 2. DisplayProvider
- Manages `contentWidth` setting (narrower, narrow, normal, wide)
- Manages `font` setting (geist, inter, playfair, spacemono, system)
- Handles localStorage persistence for display preferences
- Updates CSS variables for width/font
- Future: theme (dark/light), contrast, spacing

#### 3. SidebarProvider
- Manages `leftSidebarOpen` and `rightSidebarOpen` states
- Provides toggle functions
- Handles localStorage persistence for sidebar states
- Responds to MediaQueryProvider for auto-closing on mobile

## Implementation Steps

### Phase 1: Create MediaQueryProvider
1. **Create new provider file**
   ```tsx
   // /components/ui/providers/MediaQueryProvider.tsx
   'use client' // Required for all providers in App Router
   
   - Track window dimensions
   - Provide breakpoint booleans
   - Handle SSR safely
   - Use useState for client-side state
   ```

2. **Define breakpoints**
   ```tsx
   - mobile: < 768px
   - tablet: 768px - 1024px
   - desktop: > 1024px
   ```

### Phase 2: Create DisplayProvider
1. **Create new provider file**
   ```tsx
   // /components/ui/providers/DisplayProvider.tsx
   'use client' // Required for all providers in App Router
   
   - Manage width and font state
   - Handle localStorage with useEffect
   - Update CSS variables with useEffect
   - Memoize context value to prevent re-renders
   ```

2. **Move logic from AppLayout**
   - Extract width/font state management
   - Extract CSS variable updates
   - Extract localStorage logic

### Phase 3: Create SidebarProvider
1. **Extract from ThemeProvider**
   ```tsx
   // /components/ui/providers/SidebarProvider.tsx
   'use client' // Required for all providers in App Router
   
   - Move sidebar state and toggles
   - Keep localStorage logic
   - Use MediaQueryProvider for responsive behavior
   - Implement mobile menu state
   ```

2. **Remove ThemeProvider**
   - Delete the misnamed file
   - Update all imports

### Phase 4: Update Component Structure
1. **Update app/layout.tsx**
   ```tsx
   <MediaQueryProvider>
     <DisplayProvider>
       <SidebarProvider>
         <body>{children}</body>
       </SidebarProvider>
     </DisplayProvider>
   </MediaQueryProvider>
   ```

2. **Update AppLayout**
   - Remove width/font state
   - Use `useDisplay()` hook
   - Keep layout structure only

3. **Update components**
   - Replace `useTheme()` with appropriate hooks
   - Use `useMediaQuery()`, `useDisplay()`, `useSidebar()`

### Phase 5: Enable Width-Responsive Pages
1. **Update pages to use display context**
   ```tsx
   // app/about/page.tsx
   const { contentWidth } = useDisplay()
   
   // Conditionally render based on width
   if (contentWidth === 'narrower') {
     return <CompactAboutLayout />
   }
   ```

2. **Create width-specific components**
   - Compact versions for narrower widths
   - Expanded versions for wider widths
   - Progressive disclosure patterns

## Architecture Benefits

### Separation of Concerns
- **MediaQueryProvider**: Pure responsive state management
- **DisplayProvider**: Display preferences (width, font, future theme)
- **SidebarProvider**: Layout UI state management
- Each provider has a single, clear responsibility

### Performance
- Components only re-render when their specific context changes
- No unnecessary re-renders from unrelated state updates
- Granular subscription to only needed state

### Extensibility
- Easy to add dark/light theme to DisplayProvider
- Can add more breakpoints to MediaQueryProvider
- New display settings (contrast, spacing) fit naturally

### Developer Experience
- Clear naming matches functionality
- Intuitive hooks: `useMediaQuery()`, `useDisplay()`, `useSidebar()`
- TypeScript autocomplete shows exactly what each hook provides

## Migration Guide

### Hook Changes
```tsx
// Before
import { useTheme } from '../providers/ThemeProvider'
const { leftSidebarOpen, isMobile } = useTheme()

// After
import { useSidebar } from '../providers/SidebarProvider'
import { useMediaQuery } from '../providers/MediaQueryProvider'
const { leftSidebarOpen } = useSidebar()
const { isMobile } = useMediaQuery()
```

### Page Width Responsiveness
```tsx
// New capability for all pages
import { useDisplay } from '../providers/DisplayProvider'

export default function AboutPage() {
  const { contentWidth } = useDisplay()
  
  return (
    <div>
      {contentWidth === 'narrower' && <CompactBio />}
      {contentWidth === 'normal' && <StandardBio />}
      {contentWidth === 'wide' && <DetailedBio />}
    </div>
  )
}
```

## Files to Create/Update

### New Files
1. `/components/ui/providers/MediaQueryProvider.tsx`
2. `/components/ui/providers/DisplayProvider.tsx`
3. `/components/ui/providers/SidebarProvider.tsx`

### Files to Update
1. `/app/layout.tsx` - new provider hierarchy
2. `/components/ui/layout/AppLayout.tsx` - remove state, use hooks
3. `/components/ui/layout/NavBar.tsx` - use `useSidebar()`
4. `/components/ui/layout/LeftSidebar.tsx` - use `useSidebar()`
5. `/components/ui/layout/RightSidebarControls.tsx` - use `useDisplay()`
6. All pages - add width responsiveness

### Files to Delete
1. `/components/ui/providers/ThemeProvider.tsx`

## Key Implementation Notes

### Based on React & Next.js 15 Best Practices:

1. **All providers must use `'use client'` directive** - Required for App Router
2. **Memoize context values** - Use `useMemo` to prevent unnecessary re-renders
3. **Handle SSR properly** - Check for `window` existence before using it
4. **Provider order matters** - MediaQuery → Display → Sidebar (dependency order)

### Example Provider Structure:
```tsx
'use client'

import { createContext, useContext, useMemo } from 'react'

const DisplayContext = createContext<DisplayContextType | null>(null)

export function useDisplay() {
  const context = useContext(DisplayContext)
  if (!context) {
    throw new Error('useDisplay must be used within DisplayProvider')
  }
  return context
}

export function DisplayProvider({ children }: { children: React.ReactNode }) {
  // State and effects here...
  
  const value = useMemo(
    () => ({ contentWidth, font, setContentWidth, setFont }),
    [contentWidth, font]
  )
  
  return <DisplayContext value={value}>{children}</DisplayContext>
}
```

## Testing Checklist
- [ ] All providers have `'use client'` directive
- [ ] Context values are memoized
- [ ] All sidebar toggles work correctly
- [ ] Width settings persist on reload
- [ ] Font settings persist on reload
- [ ] Mobile auto-closes sidebars
- [ ] Desktop restores sidebar state
- [ ] Pages respond to width changes
- [ ] No performance regressions
- [ ] TypeScript types are correct
- [ ] SSR works without hydration errors
- [ ] No console errors about invalid hook usage