# 47. Public ISR Caching Strategy

## Concept
Incremental Static Regeneration (ISR) provides static-site performance while allowing dynamic content updates.

## Centralized Configuration
`constants/revalidation.ts` dictates global cache TTLs based on content velocity:
- **Homepage & Events**: 300 seconds (5 minutes)
- **Programs & Projects**: 1800 seconds (30 minutes)
- **Blogs & Gallery**: 3600 seconds (1 hour)
- **Static Pages (About, Contact)**: 86400 seconds (24 hours)

## Implementation
Exported globally at the top of Server Components:
```tsx
import { REVALIDATION } from '@/constants/revalidation';
export const revalidate = REVALIDATION.HOMEPAGE;
```
