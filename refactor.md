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

## Phase 1: Critical Architecture Fixes

### Priority: HIGH | Timeline: 1-2 days

#### 1.1 Remove Duplicate Layout System
**Problem**: `SidebarLayout.tsx` duplicates all functionality of `AppLayout.tsx` but is completely unused.

**Files to Remove**:
- `/components/ui/layout/SidebarLayout.tsx`
- `/components/ui/layout/LeftSidebar.tsx` 
- `/components/ui/layout/NavItem.tsx`
- `/components/ui/layout/SideContent.tsx`

**Impact**: Eliminates 200+ lines of duplicate code, removes confusion about which layout to use.

#### 1.2 Fix State Management Architecture
**Problem**: Multiple sources of truth for layout state causing localStorage race conditions.

**Actions**:
- Remove all local state management from unused `SidebarLayout`
- Ensure `AppLayout` properly uses `LayoutProvider` for all state
- Remove duplicate state logic in components
- Fix responsive behavior inconsistencies

**Files Modified**:
- `/components/ui/providers/LayoutProvider.tsx` - Centralize all layout state
- `/components/ui/layout/AppLayout.tsx` - Remove any local state duplication

#### 1.3 Fix TypeScript Safety Issues
**Problem**: Usage of `any` types, unsafe localStorage assertions, missing type validation.

**Actions**:
- Replace `any` with `unknown` in `/hooks/useLocalStorage.ts:6`
- Replace `as any` assertion in `/app/error-preview/page.tsx:30`
- Add type guards for localStorage operations
- Consolidate duplicate type definitions

**Files Modified**:
- `/hooks/useLocalStorage.ts`
- `/app/error-preview/page.tsx`
- `/components/ui/providers/LayoutProvider.tsx`
- `/types/layout.ts` - Centralize all type definitions

## Phase 2: Dead Code Elimination

### Priority: MEDIUM | Timeline: 1 day

#### 2.1 Remove Unused Primitive Components
**Files to Delete**:
- `/components/ui/primitives/Input.tsx`
- `/components/ui/primitives/Table.tsx`
- `/components/ui/primitives/Tab.tsx`
- `/components/ui/primitives/LoadingCard.tsx`
- `/components/ui/primitives/Badge.tsx`

#### 2.2 Remove Unused Hooks
**Files to Delete**:
- `/hooks/useContentWidth.ts`
- `/hooks/useFont.ts`
- `/hooks/useLocalStorage.ts`
- `/hooks/useResponsive.ts`

#### 2.3 Remove Unused Assets and Documentation
**Files to Delete**:
- `/public/file.svg`
- `/public/globe.svg`
- `/public/next.svg`
- `/public/vercel.svg`
- `/public/window.svg`
- `PRD_wheel.md`
- `REFACTOR_PLAN.md`
- `SMOOTH_WIDTH_TRANSITIONS.md`

#### 2.4 Remove Unused Font Import
**Actions**:
- Remove `Permanent_Marker` font import from `/app/layout.tsx`
- Remove `.font-permanent-marker` CSS class from `/app/globals.css`

## Phase 3: CSS and Component Standardization

### Priority: MEDIUM | Timeline: 2-3 days

#### 3.1 Split Monolithic CSS File
**Problem**: 676-line `globals.css` handles too many responsibilities.

**New Structure**:
```
/app/styles/
├── globals.css (base styles only)
├── variables.css (design tokens)
├── components.css (component utility classes)
├── animations.css (animations and transitions)
└── utilities.css (helper classes)
```

#### 3.2 Remove Unused CSS Variables
**Variables to Remove** (related to deleted components):
- Table-related variables (`--table-*`)
- Tab-related variables (`--tab-*`)
- Input-related variables (`--input-*`)
- Badge-related variables (`--badge-*`)
- Financial data variables (`--value-positive`, `--value-negative`, etc.)

#### 3.3 Standardize Color Usage
**Problem**: Hardcoded hex values in components instead of CSS variables.

**Actions**:
- Replace hardcoded colors in `NavItem.tsx` with CSS variables
- Ensure all components use design token system
- Remove redundant `@theme inline` section in globals.css

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
- [ ] Day 1-2: Phase 1 (Architecture fixes)
- [ ] Day 3: Phase 2 (Dead code elimination)

### Week 2: Standardization  
- [ ] Day 1-3: Phase 3 (CSS and component standardization)
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

**Document Status**: Draft  
**Last Updated**: 2025-01-25  
**Estimated Total Effort**: 1-2 weeks  
**Priority**: High - Address architectural debt before adding new features