# Lighthouse Optimization Context

## Goal

This file captures the current performance-analysis context for the homepage so we can continue optimizations later without losing decisions, metrics, or next steps.

Date of context save: 2026-05-15

## Test History

We reviewed three stages of Lighthouse runs stored in `lighthouse-tests/`:

1. Local `localhost` dev/Turbopack runs
2. Production `Vercel` runs before fixes
3. Production `Vercel` runs after fixes

Important conclusion from the first stage:

- Local dev Lighthouse was useful only for rough signals
- Real prioritization should rely on `Vercel` production runs

## Agreed Decisions That Were Implemented

These changes were discussed, approved, and implemented:

1. Google Map on the homepage contacts section now loads lazily via `IntersectionObserver`
2. On mobile, hero uses only one main image and no slider
3. On desktop, the hero base image is the first hero frame, not an extra duplicated background
4. Hero and section image quality was reduced
5. `FloatingPromos` remain visible on mobile, but are smaller and lighter
6. `sizes` were improved for gallery and partner imagery
7. `prefetch` was disabled for secondary links in large menus and repeated card/list UI
8. `Plus Jakarta Sans` was removed completely
9. `Inter` weights were reduced to `400, 500, 600, 700, 900`
10. `Inter 800` usage was removed/replaced

## Files Touched In The First Optimization Wave

- [app/globals.css](/c:/PAPKA/projects/pharm-college_new/next/app/globals.css:1)
- [src/widgets/home/hero/hero-section.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/hero/hero-section.tsx:1)
- [src/widgets/home/hero/floating-promos.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/hero/floating-promos.tsx:1)
- [src/widgets/home/sections/contacts-section.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/sections/contacts-section.tsx:1)
- [src/widgets/home/sections/contacts/home-contacts-map.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/sections/contacts/home-contacts-map.tsx:1)
- [src/widgets/navigation/smart-link.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/navigation/smart-link.tsx:1)
- [src/widgets/navigation/desktop-navigation.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/navigation/desktop-navigation.tsx:1)
- [src/widgets/navigation/mobile-navigation-list.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/navigation/mobile-navigation-list.tsx:1)
- [src/widgets/navigation/mobile-navigation-footer.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/navigation/mobile-navigation-footer.tsx:1)
- [src/widgets/header/components/header-top-bar.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/header/components/header-top-bar.tsx:1)
- [src/widgets/home/news/news-card.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/news/news-card.tsx:1)
- [src/widgets/home/sections/about-section.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/sections/about-section.tsx:1)
- [src/widgets/home/sections/gallery-section.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/sections/gallery-section.tsx:1)
- [src/widgets/home/sections/partners-section.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/sections/partners-section.tsx:1)
- [src/widgets/home/sections/events-section.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/sections/events-section.tsx:1)
- [src/widgets/home/sections/stats-section.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/sections/stats-section.tsx:1)

## Production Lighthouse Results

### Before Fixes

Average `Vercel` results before fixes:

- Desktop:
  - Performance: `85.67`
  - FCP: `0.45s`
  - LCP: `1.55s`
  - Speed Index: `2.85s`
  - TBT: `50ms`
  - Main thread: `4.17s`
  - Bootup: `1.74s`
  - Transfer: `3215 KB`
- Mobile:
  - Performance: `62.67`
  - FCP: `1.76s`
  - LCP: `5.23s`
  - Speed Index: `2.28s`
  - TBT: `746ms`
  - Main thread: `5.61s`
  - Bootup: `2.32s`
  - Transfer: `1773.67 KB`

### After Fixes

Average `Vercel after-fix` results:

- Desktop:
  - Performance: `96`
  - FCP: `0.57s`
  - LCP: `1.09s`
  - Speed Index: `0.85s`
  - TBT: `72.4ms`
  - Main thread: `1.76s`
  - Bootup: `0.53s`
  - Transfer: `1244 KB`
- Mobile:
  - Performance: `68`
  - FCP: `1.72s`
  - LCP: `4.76s`
  - Speed Index: `1.87s`
  - TBT: `627.8ms`
  - Main thread: `4.35s`
  - Bootup: `1.69s`
  - Transfer: `1102 KB`

## Performance Impact Summary

### Desktop

- Performance improved from `85.67` to `96`
- LCP improved by about `29.7%`
- Speed Index improved by about `70.2%`
- Main-thread work improved by about `57.8%`
- Bootup improved by about `69.5%`
- Transfer size improved by about `61.3%`

### Mobile

- Performance improved from `62.67` to `68`
- LCP improved by about `9%`
- Speed Index improved by about `18%`
- TBT improved by about `15.8%`
- Main-thread work improved by about `22.5%`
- Bootup improved by about `27.2%`
- Transfer size improved by about `37.9%`

## Current State Assessment

### Desktop

Desktop is in very good shape now.

The homepage is likely not worth further major performance work unless we are polishing for near-perfect scores or addressing CLS variance in specific runs.

### Mobile

Mobile still has meaningful headroom.

The homepage is much better than before, but the main remaining bottleneck is client-side JavaScript rather than network/server response.

## Current Remaining Bottlenecks

From the latest `after-fix` mobile runs:

- One JS chunk around `120 KB` still shows about `53 KB` unused JS
- Main-thread work is still around `3.2s` in the best sample and higher in others
- Bootup is still around `1.4s` in the best sample
- There are still long tasks on mobile
- Fonts still account for around `162 KB`
- Images still account for around `302 KB`

Best sampled mobile `after-fix` resource summary:

- Total transfer: about `1121 KB`
- Scripts: about `358 KB`
- Images: about `302 KB`
- Fonts: about `162 KB`
- Third-party: about `77 KB`

This means the biggest next opportunity is still reducing homepage client JS and hydration work.

## Likely Remaining JS Sources On The Homepage

These client components are still on or close to the homepage critical path:

- [src/widgets/header/site-header.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/header/site-header.tsx:1)
- [src/widgets/search/site-search-dialog.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/search/site-search-dialog.tsx:1)
- [src/widgets/navigation/mobile-navigation.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/navigation/mobile-navigation.tsx:1)
- [src/widgets/navigation/desktop-navigation.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/navigation/desktop-navigation.tsx:1)
- [src/widgets/home/hero/hero-section.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/hero/hero-section.tsx:1)
- [src/widgets/home/sections/events-section.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/sections/events-section.tsx:1)
- [src/widgets/home/sections/contacts/home-contacts-map.tsx](/c:/PAPKA/projects/pharm-college_new/next/src/widgets/home/sections/contacts/home-contacts-map.tsx:1)

Note:

- The map now loads much better than before, so it is no longer the main culprit
- The next likely wins are in header/search/events/home interactivity

## Recommended Next Optimization Wave

These were the concrete next recommendations after reviewing the `after-fix` results:

1. Lazy-load search dialog
   - `SiteSearchDialog` should be loaded only when the user opens search or presses `Cmd/Ctrl+K`
   - This is one of the strongest next candidates for reducing homepage JS

2. Simplify header client boundary
   - Move toward a more server-first header shell
   - Keep only the necessary interactive islands client-side

3. Reduce `EventsSection` client work
   - It still contains carousel state, resize listener, and lightbox behavior
   - Possible options:
     - make mobile events static instead of carousel-driven
     - defer lightbox until user interaction
     - simplify interaction on mobile

4. Revisit homepage news interaction
   - If pagination on the homepage is non-essential, replace it with a smaller static slice plus a link to the news page
   - This could remove more client work

5. Optional second image pass
   - If desired, test slightly lower image quality on mobile again
   - Likely smaller win than the first wave

6. Optional font review later
   - Fonts were already improved
   - There is still some possible room, but likely lower ROI than JS/hydration work

## Recommendation Priority

If continuing later, start in this order:

1. Search dialog lazy-loading
2. Header client-boundary simplification
3. Events section simplification on mobile
4. Homepage news interaction simplification
5. Optional smaller image/font polish

## Validation Status

The first optimization wave was validated with:

- successful `npm run build`
- repeated `Vercel` Lighthouse runs before and after fixes

## Notes

- Desktop is already strong enough that most future work should target mobile
- The next phase should optimize JS/hydration, not server response time
- CMS-side PNG cleanup is still pending and can bring extra image wins later
