# Refactor Plan

This document outlines a comprehensive refactoring plan for the personal website codebase based on architectural analysis and code review findings.

## Executive Summary

The codebase has several critical architectural issues including:
- Duplicate layout systems creating confusion and maintenance overhead
- State management conflicts with multiple sources of truth
- Significant amount of dead code (14+ unused components, 4 hooks, 5 assets)
- TypeScript safety issues and domain mismatches
- CSS organization challenges with 676-line monolithic file

**Estimated Impact**: ~50% reduction in codebase size, improved maintainability, eliminated architectural conflicts.

## Phase 1: Critical Architecture Fixes ✅ COMPLETE

### Priority: HIGH | Timeline: 1-2 days | **Status: COMPLETED 2025-01-25**

#### 1.1 Remove Duplicate Layout System ✅
**Problem**: `SidebarLayout.tsx` duplicates all functionality of `AppLayout.tsx` but is completely unused.

**Files Removed**:
- ✅ `/components/ui/layout/SidebarLayout.tsx`
- ✅ `/components/ui/layout/LeftSidebar.tsx` 
- ✅ `/components/ui/layout/NavItem.tsx`
- ✅ `/components/ui/layout/SideContent.tsx`

**Impact**: Eliminated 200+ lines of duplicate code, removed confusion about which layout to use.

#### 1.2 Fix State Management Architecture ✅
**Problem**: Multiple sources of truth for layout state causing localStorage race conditions.

**Actions Completed**:
- ✅ Verified no duplicate state management exists (SidebarLayout already removed)
- ✅ Confirmed `AppLayout` properly uses `LayoutProvider` for all state
- ✅ Verified no duplicate state logic in components
- ✅ Confirmed consistent responsive behavior

**Files Analyzed**:
- ✅ `/components/ui/providers/LayoutProvider.tsx` - All layout state properly centralized
- ✅ `/components/ui/layout/AppLayout.tsx` - No local state duplication found

#### 1.3 Fix TypeScript Safety Issues ✅
**Problem**: Usage of `any` types, unsafe localStorage assertions, missing type validation.

**Actions Completed**:
- ✅ Replaced `any` with `unknown` in `/hooks/useLocalStorage.ts:6`
- ✅ Replaced `as any` assertion in `/app/error-preview/page.tsx:30` with proper type guard
- ✅ Added type guards for localStorage operations in LayoutProvider
- ✅ Consolidated duplicate type definitions to use centralized `/types/layout.ts`

**Files Modified**:
- ✅ `/hooks/useLocalStorage.ts` - Improved type safety with `unknown`
- ✅ `/app/error-preview/page.tsx` - Added `isValidErrorType()` guard function
- ✅ `/components/ui/providers/LayoutProvider.tsx` - Added `isValidWidthMode()` and `isValidFontMode()` guards
- ✅ `/components/ui/layout/AppLayout.tsx` - Now imports from centralized types
- ✅ `/components/ui/layout/LeftSidebarNav.tsx` - Now imports from centralized types

## Phase 2: Dead Code Elimination ✅ COMPLETE

### Priority: MEDIUM | Timeline: 1 day | **Status: COMPLETED 2025-01-25**

#### 2.1 Remove Unused Primitive Components ✅
**Files Deleted**:
- ✅ `/components/ui/primitives/Input.tsx`
- ✅ `/components/ui/primitives/Table.tsx`
- ✅ `/components/ui/primitives/Tab.tsx`
- ✅ `/components/ui/primitives/LoadingCard.tsx`
- ✅ `/components/ui/primitives/Badge.tsx`

#### 2.2 Remove Unused Hooks ✅
**Files Deleted**:
- ✅ `/hooks/useContentWidth.ts`
- ✅ `/hooks/useFont.ts`
- ✅ `/hooks/useLocalStorage.ts`
- ✅ `/hooks/useResponsive.ts`

#### 2.3 Remove Unused Assets and Documentation ✅
**Files Deleted**:
- ✅ `/public/file.svg`
- ✅ `/public/globe.svg`
- ✅ `/public/next.svg`
- ✅ `/public/vercel.svg`
- ✅ `/public/window.svg`
- ✅ `PRD_wheel.md`
- ❌ `REFACTOR_PLAN.md` (did not exist)
- ❌ `SMOOTH_WIDTH_TRANSITIONS.md` (did not exist)

#### 2.4 Remove Unused Font Import ❌ SKIPPED
**Actions**:
- ❌ **CANNOT REMOVE** - `Permanent_Marker` font is still actively used in `/components/ui/layout/RightSidebarControls.tsx`
- Font import and CSS class must remain until usage is removed

**Impact**: Eliminated 13 unused files (~400 lines of code), reduced bundle size, cleaner codebase structure.

## Phase 3: CSS and Component Standardization

### Priority: MEDIUM | Timeline: 2-3 days

#### 3.1 Split Monolithic CSS File ✅
**Problem**: 676-line `globals.css` handles too many responsibilities.

**Actions Completed**:
- ✅ Created `/app/styles/` directory structure
- ✅ Extracted CSS variables into `variables.css` (126 lines)
- ✅ Extracted component utility classes into `components.css` (145 lines) 
- ✅ Extracted animations and keyframes into `animations.css` (175 lines)
- ✅ Extracted helper classes into `utilities.css` (65 lines)
- ✅ Updated `globals.css` to only contain imports and base styles (27 lines)

**New Structure**: ✅ IMPLEMENTED
```
/app/styles/
├── globals.css (base styles and imports only - 27 lines)
├── variables.css (design tokens - 126 lines)
├── components.css (component utility classes - 145 lines)
├── animations.css (animations and transitions - 175 lines)
└── utilities.css (helper classes - 65 lines)
```

**Impact**: Reduced monolithic CSS from 676 lines to organized modules totaling 538 lines with clear separation of concerns.

#### 3.2 Remove Unused CSS Variables ✅
**Problem**: CSS variables for deleted components remain in `variables.css`, adding unnecessary bloat.

**Actions Completed**:
- ✅ Removed 5 table-related variables (`--table-*`)
- ✅ Removed 8 tab-related variables (`--tab-*`) 
- ✅ Removed 8 input-related variables (`--input-*`)
- ✅ Removed 5 badge-related variables (`--badge-*`)
- ✅ Removed 4 financial data variables (`--value-positive`, `--value-negative`, etc.)

**Impact**: Reduced `variables.css` from 129 lines to 95 lines (26% reduction). Build verification confirmed no broken CSS variable references.

#### 3.3 Standardize Color Usage ✅
**Problem**: Hardcoded hex values in components instead of CSS variables.

**Actions Completed**:
- ✅ Added 12 new CSS variables to `variables.css` for missing color tokens
- ✅ Updated 3 primitive components (MetricRow, DisplayOptions, IconMenuButton) - replaced 20+ hardcoded hex values
- ✅ Updated 3 layout components (Footer, MobileNav, RightSidebarControls) - standardized shadows and interactive colors
- ✅ Created 15 utility classes in `components.css` for common Tailwind color patterns
- ✅ Updated 4 page components (about, global-error, home, error-preview) - replaced Tailwind color classes
- ✅ Removed redundant `@theme inline` section from `variables.css`

**Files Modified**:
- ✅ `/app/styles/variables.css` - Added semantic color variables (text-tertiary, text-disabled, hover states, etc.)
- ✅ `/app/styles/components.css` - Added utility classes for consistent color usage
- ✅ `/components/ui/primitives/MetricRow.tsx` - All hardcoded colors now use CSS variables
- ✅ `/components/ui/primitives/DisplayOptions.tsx` - Standardized border and text colors
- ✅ `/components/ui/primitives/IconMenuButton.tsx` - Replaced hardcoded secondary text color
- ✅ `/components/ui/layout/Footer.tsx` - Shadow now uses CSS variable
- ✅ `/components/ui/layout/MobileNav.tsx` - Interactive states use CSS variables
- ✅ `/components/ui/layout/RightSidebarControls.tsx` - Text colors standardized
- ✅ `/app/about/page.tsx` - Tailwind color classes replaced with utility classes
- ✅ `/app/global-error.tsx` - Error states use semantic CSS variables
- ✅ `/app/page.tsx` - Link and text colors standardized
- ✅ `/app/error-preview/page.tsx` - Border colors use CSS variables

**Impact**: 50+ hardcoded color values replaced with semantic CSS variables. Zero hardcoded colors remain in component library files. Future theme support enabled through centralized variable system.

## Phase 4: State Management Optimization

### Priority: LOW | Timeline: 2-3 days

#### 4.1 Separate Provider Concerns
**Current**: Monolithic `LayoutProvider` handles all layout-related state.

**Proposed Structure**:
```typescript
<ThemeProvider>      // fonts, colors, themes
  <LayoutProvider>     // sidebars, content width
    <NavigationProvider> // active sections, routing state
      {children}
    </NavigationProvider>
  </LayoutProvider>
</ThemeProvider>
```

#### 4.2 Performance Optimizations
**Actions**:
- Add `useCallback` and `useMemo` for expensive operations
- Batch DOM manipulation operations
- Implement proper cleanup patterns for event listeners
- Optimize localStorage operations with debouncing

#### 4.3 Add State Validation
**Actions**:
- Add runtime validation for localStorage values
- Implement proper error boundaries
- Add fallback states for invalid configurations

## Implementation Order

### Week 1: Critical Fixes
- [x] ✅ Day 1-2: Phase 1 (Architecture fixes) - COMPLETED 2025-01-25
- [x] ✅ Day 3: Phase 2 (Dead code elimination) - COMPLETED 2025-01-25

### Week 2: Standardization  
- [x] ✅ Day 1: Phase 3.1 (CSS file split) - COMPLETED 2025-01-25
- [x] ✅ Day 2: Phase 3.2 (Remove unused CSS variables) - COMPLETED 2025-01-25
- [x] ✅ Day 3: Phase 3.3 (Standardize color usage) - COMPLETED 2025-01-25
- [ ] Day 4-5: Phase 4 (State management optimization)

## Testing Strategy

### After Each Phase:
1. **Build Verification**: Ensure `npm run build` passes
2. **Type Checking**: Ensure `npm run lint` passes
3. **Functionality Testing**: Verify all pages load and interact correctly
4. **Responsive Testing**: Test mobile and desktop layouts
5. **State Persistence**: Verify localStorage preferences work correctly

## Risk Mitigation

### High Risk Items:
- **Layout Changes**: Extensive testing needed after removing duplicate layout system
- **State Management**: Verify no localStorage race conditions after centralization
- **Type Safety**: Ensure no runtime errors after TypeScript improvements

### Rollback Plan:
- Each phase should be committed separately
- Keep backup of original files during major structural changes
- Test thoroughly before proceeding to next phase

## Success Metrics

### Quantitative:
- **Code Reduction**: ~50% reduction in component files
- **Bundle Size**: Smaller CSS and JS bundles
- **Build Time**: Faster builds due to fewer files

### Qualitative:
- **Developer Experience**: Clear architecture, no confusion about which components to use
- **Maintainability**: Single source of truth for state, consistent patterns
- **Type Safety**: No `any` usage, proper validation throughout

## Post-Refactor Architecture

### Final Structure:
```
/app
├── layout.tsx (simplified, single layout system)
└── globals.css (split into focused modules)

/components/ui
├── layout/ (only AppLayout and essential components)
├── primitives/ (only used components)
└── providers/ (focused, single-responsibility providers)

/types
└── layout.ts (centralized type definitions)
```

### Key Improvements:
- Single layout system (`AppLayout` only)
- Centralized state management
- Clean separation of concerns
- No unused code
- Type-safe throughout
- Maintainable CSS architecture

---

**Document Status**: In Progress - Phase 3.3 Complete  
**Last Updated**: 2025-01-25  
**Estimated Total Effort**: 1-2 weeks  
**Priority**: High - Address architectural debt before adding new features

---

## Progress Summary

### ✅ COMPLETED PHASES:
- **Phase 1**: Critical Architecture Fixes (2025-01-25)
- **Phase 2**: Dead Code Elimination (2025-01-25) 
- **Phase 3.1**: CSS File Split (2025-01-25)
- **Phase 3.2**: Remove Unused CSS Variables (2025-01-25)
- **Phase 3.3**: Standardize Color Usage (2025-01-25)

### 🔄 REMAINING WORK:
- **Phase 4**: State management optimization (OPTIONAL - Low Priority)

### 🎯 CURRENT STATUS:
**85% COMPLETE** - All critical architectural issues resolved. Remaining work is optional performance optimizations.