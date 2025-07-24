# Product Requirements Document: Wheel-like Scrolling for About Page

## Overview
Transform the about page into an interactive wheel-like scrolling experience where users see one primary section clearly positioned 1/3 down from the top of the viewport, with the following section partially visible below it, fading gradually into the background.

## Problem Statement
The current about page uses traditional vertical scrolling with sections stacked sequentially. This conventional approach:
- Shows varying amounts of content at once
- Lacks visual distinctiveness
- Doesn't create a memorable user experience
- Doesn't leverage the full viewport effectively

## Goals
1. Create a unique, memorable scrolling experience
2. Display one primary section clearly at 1/3 viewport height
3. Show the next section with progressive transparency fade
4. Provide smooth, intuitive navigation between sections
5. Enhance the visual storytelling through depth and layering

## User Stories
- As a visitor, I want to see multiple sections of information simultaneously to get a better overview
- As a visitor, I want smooth scrolling between sections without losing context
- As a visitor, I want clear visual indicators of my current position and available content
- As a mobile user, I want the experience to degrade gracefully to standard scrolling

## Functional Requirements

### Core Functionality
1. **Section Display & Positioning**
   - Primary section positioned at 33.33vh from top (1/3 down the screen)
   - Primary section displayed at full opacity and clarity
   - Secondary section begins immediately below primary section
   - Secondary section has progressive opacity fade (100% to 0% from top to bottom)
   - Remaining viewport space above primary section (33.33vh) for visual breathing room

2. **Wheel Scrolling Behavior**
   - Scroll snaps to individual sections (not pairs)
   - Each scroll action advances one section
   - Smooth transitions with easing animations
   - Support for both mouse wheel and trackpad gestures
   - Keyboard navigation support (arrow keys, page up/down)

3. **Section Structure**
   - Bio section
   - Projects section
   - Tools section
   - Circular navigation: after Tools, return to Bio

### Navigation
1. **Scroll Indicators**
   - Visual progress indicator showing current position
   - Highlight primary section in sidebar (full opacity)
   - Secondary section in sidebar shows with reduced opacity
   - Smooth animation between states

2. **Direct Navigation**
   - Click sidebar labels to jump directly to sections
   - Selected section animates to primary position (1/3 down)
   - Maintain smooth scroll behavior

## Technical Requirements

### Implementation Details
1. **Container Structure**
   ```
   - Fixed height container (100vh)
   - Overflow hidden with custom scroll handling
   - Sections positioned absolutely within container
   - Top padding of 33.33vh for primary section positioning
   ```

2. **Section Sizing & Positioning**
   ```
   - Primary section: starts at 33.33vh from top
   - Section heights: flexible based on content
   - Secondary section: positioned immediately after primary
   - Gradient overlay on secondary section for fade effect
   ```

3. **Fade Implementation**
   ```
   - Linear gradient from rgba(255,255,255,0) to rgba(255,255,255,1)
   - Applied as overlay on secondary section
   - Fade starts at top of secondary section
   - Complete fade to background by bottom of viewport
   ```

4. **Scroll Handling**
   - Intercept wheel events
   - Implement debouncing for smooth behavior
   - Calculate section positions dynamically
   - Animate transitions using CSS transforms
   - Handle edge cases (rapid scrolling, touch gestures)

### Responsive Design
1. **Desktop (≥768px)**
   - Full wheel scrolling experience
   - Primary section at 1/3 position
   - Secondary section with fade effect
   - Sidebar navigation active

2. **Mobile (<768px)**
   - Fallback to standard vertical scrolling
   - Full-height sections
   - No fade effects
   - Bottom navigation instead of sidebar

## Visual Design

### Layout
```
+------------------+
|                  |  33.33vh (empty space)
|------------------|
|  Primary Section |  Variable height
|   (full opacity) |
|------------------|
| Secondary Section|  Remaining viewport
|  (fading out)    |  with gradient overlay
+------------------+
```

### Visual Effects
1. **Opacity Gradient**
   - Secondary section starts at 100% opacity at top
   - Linear fade to 0% opacity at viewport bottom
   - Gradient blends with background color

2. **Depth Perception**
   - Primary section appears "in focus"
   - Secondary section appears to recede into background
   - Creates visual hierarchy and depth

### Transitions
- Smooth ease-in-out animations (400-500ms)
- Sections slide up/down into position
- Opacity transitions synchronized with movement
- No jarring movements or flashes

### Visual Indicators
- Primary section has full visual weight
- Secondary section progressively lighter
- Active section indicators in sidebar
- Optional: Subtle scroll progress indicator

## Accessibility
- Keyboard navigation fully supported
- Screen reader announcements for section changes
- Respect prefers-reduced-motion settings
- Clear focus indicators
- Proper ARIA labels and landmarks

## Performance Considerations
- Optimize scroll event handling (throttling/debouncing)
- Use CSS transforms for smooth animations
- Minimize reflows and repaints
- Lazy load content if needed

## Success Metrics
1. Smooth performance (60fps scrolling)
2. Intuitive navigation (no user confusion)
3. Cross-browser compatibility
4. Positive user feedback on uniqueness
5. No accessibility regressions

## Implementation Phases

### Phase 1: Core Functionality
- Primary section positioning at 1/3 viewport
- Basic scroll snapping to sections
- Section transitions without fade
- Desktop experience only

### Phase 2: Visual Effects
- Implement opacity gradient for secondary section
- Smooth animations and transitions
- Synchronize fade with scroll position
- Refine visual hierarchy

### Phase 3: Polish & Mobile
- Mobile responsive fallback
- Keyboard navigation
- Performance optimizations
- Circular navigation implementation

## Edge Cases to Consider
- Rapid scrolling attempts
- Browser back/forward navigation
- Deep linking to specific sections
- Variable content lengths
- Different screen sizes and ratios

## Future Considerations
- Potential for horizontal wheel mode
- Dynamic section loading
- Parallax effects within sections
- Integration with other pages