# 81. Performance Optimization Guide

## Overview
Performance is vital for the Stuti-Vani Foundation platform, specifically for the public-facing pages where donors and volunteers engage.

## Image Optimization
Always use the Next.js `<Image>` component (`next/image`) rather than native `<img>` tags.
- `<Image>` automatically serves WebP/AVIF formats based on browser support.
- Automatically handles lazy loading (unless `priority` is set).
- Protects against Cumulative Layout Shift (CLS) when width/height/fill are provided.

## Data Fetching (ISR)
The public website leverages Incremental Static Regeneration (ISR).
- Instead of Server-Side Rendering (SSR) every request, data is fetched once and cached.
- Next.js regenerates the page in the background based on the `revalidate` interval (e.g., `revalidate = 300` for 5 minutes).
- This provides the speed of static sites with the freshness of dynamic data.

## Bundle Size
- Avoid large barrel file exports in client components if they import server-only code (which Next.js App Router usually protects against, but it's good practice).
- Lazy load heavy client components (like charts or rich text editors) using `next/dynamic`.
