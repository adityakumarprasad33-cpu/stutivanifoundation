# 42. Public Website Architecture

## Overview
The Public Website transforms the backend-driven Admin CMS into a modern, SEO-optimized, and highly performant visitor-facing experience using Next.js App Router.

## Principles
1. **Server-First Execution:** Server Components are used by default for data fetching and layout to reduce client-side bundle size.
2. **Repository → Service Integration:** UI components never query Firestore directly. All data is fetched via the centralized Service layer.
3. **Configuration-Driven:** Navigation, Branding, and Settings are driven by centralized constants (`public-nav.ts`, `branding.ts`).
4. **Hybrid ISR Caching:** Routes are revalidated based on content velocity.

## Structure
```
app/(public)/
  layout.tsx (Providers, Nav)
  page.tsx (Home)
  about/
  donate/
  ...
features/public/
  components/
    cards/
    forms/
    layout/
    search/
    sections/
    skeletons/
    structured-data/
  utils/
```
