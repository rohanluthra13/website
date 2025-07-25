# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Next.js 15.3.4, TypeScript, and Tailwind CSS v4. The site features multiple pages (about, projects, reading, writing) with a responsive sidebar layout system and theme support.

## Key Commands

```bash
# Development (uses Turbopack for fast refresh)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **UI**: Custom component library with layout primitives
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics & Speed Insights

### Directory Structure
- `/app` - Next.js App Router pages and layouts
  - Each page directory contains a `page.tsx` file
  - Global styles in `app/globals.css` with CSS custom properties
  - Root layout wraps app with LayoutProvider
- `/components/ui` - Component library organized by type:
  - `/layout` - Page layout components (NavBar, Sidebar, etc.)
  - `/primitives` - Base UI components (Button, Input, etc.)
  - `/providers` - Context providers (LayoutProvider)
- `/hooks` - Custom React hooks (useContentWidth, useFont, useLocalStorage, useResponsive)
- `/lib` - Utility functions (currently contains `cn()` for className merging)
- `/types` - TypeScript type definitions
- `/public` - Static assets

### Component Patterns

1. **Layout System**: Uses a flexible sidebar layout with:
   - `AppLayout` - Main wrapper with navigation
   - `SidebarLayout` - Manages left/right sidebars with responsive behavior
   - `NavBar` - Top navigation with page links

2. **Styling Approach**:
   - Tailwind classes with custom design tokens
   - CSS variables for theming (defined in globals.css)
   - Component classes use `cn()` utility from lib/utils.ts
   - Responsive breakpoints: mobile-first with md: and lg: prefixes

3. **TypeScript**: 
   - Path alias `@/*` maps to project root
   - Strict mode enabled
   - Component props use TypeScript interfaces

### Layout System Architecture

The site uses a sophisticated responsive layout system:

1. **LayoutProvider**: Central state management for:
   - Sidebar visibility (left/right)
   - Mobile menu state
   - Content width settings (narrower, narrow, normal, wide)
   - Font selection (geist, inter, playfair, spacemono, system)
   - Persists preferences to localStorage

2. **CSS Grid Layout**: 
   - 3-column layout: `Left Sidebar | Main Content | Right Sidebar`
   - Uses CSS custom properties for responsive widths
   - Sidebar widths adjust using `clamp()` for fluid responsive behavior
   - Mobile responsive with automatic layout changes

3. **CSS Custom Properties**: Extensive use of CSS variables for:
   - Colors and theming
   - Spacing (4px base unit system)
   - Typography (fluid sizing with clamp())
   - Layout dimensions (sidebar widths)
   - Component styling (buttons, inputs, tables, etc.)

4. **Font System**: Multiple Google Fonts loaded with CSS variables:
   - Geist (default), Inter, Playfair Display, Space Mono, Permanent Marker
   - Dynamic font switching via body class manipulation

### GitHub Actions

The project includes Claude-powered GitHub Actions workflows:
- `.github/workflows/claude-code-review.yml` - Automated PR reviews
- `.github/workflows/claude-pr-assistant.yml` - PR assistance

### Development Guidelines

- Components should follow the existing pattern of separating layout vs primitive components
- Use the established CSS variable system for colors and spacing
- Maintain TypeScript types for all component props
- Follow the responsive design patterns using Tailwind breakpoints
- Keep the sidebar layout system's fluid sizing behavior when adding new pages