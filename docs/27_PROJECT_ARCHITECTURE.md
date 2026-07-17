# Projects Module Architecture (Phase 7)

## Overview
The Projects module forms the core operational entity of the Stuti-Vani Foundation. It coordinates timelines, financials, media, locations, volunteers, and beneficiaries.

## Architecture Guidelines
- **Domain Modeling**: The `Project` model is defined strictly in `project.types.ts` and validated via `projectSchema` in Zod before hitting the database.
- **Repository Pattern**: `ProjectRepository` handles direct Firestore interactions, leveraging the `projectConverter` to translate complex data structures (like Firestore `Timestamp`s) to JavaScript `Date`s safely.
- **Policy Engine**: `ProjectPolicy` enforces all state transitions (Draft -> Review -> Published). **No business transition rules exist inside UI components**. All decisions on whether a role can perform an action are kept here.
- **Service Integration**: The `ProjectStatisticsService` and `ProjectHealthService` process runtime states and mathematical transformations on demand without bloating the Firestore schema.

## Storage
- **Database**: Firestore Collections (`projects`).
- **Media**: Secure Cloudinary integrations. Images should use `ProjectMediaUploader` and store standard `CloudinaryAssetReference` objects into Firestore.

## Component Strategy
- Use generic semantic HTML layouts (`projects-data-table.tsx`).
- Abstract reusable display layers to the `components/ui/` folder (e.g., `ProjectCard`, `ProjectHealthBadge`, `ProjectStatisticsCard`). These elements accept `Project` or computed `ProjectStatisticsSummary` types.

## AI & Search Preparation (Phase 7 Enhancements)
- The architecture is pre-configured with structural slots (`ai`, `analytics`, `normalizedTitle`, `searchVector`) ready for Firebase Extensions or custom server logic to hydrate embeddings, summaries, and tags in future phases without needing a schema migration.

## Extension Points
1. **Programs Integration**: Connect projects structurally via `parentProjectId` and `childProjectIds`.
2. **Algolia / Elasticsearch**: Connect to the Search preparation fields for deep text indexing.
3. **Analytics Tracking**: Populate the `analytics` node via server middleware or edge functions as traffic increases.
