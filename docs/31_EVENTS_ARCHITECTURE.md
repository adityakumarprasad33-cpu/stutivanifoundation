# Events & Activity Management Architecture

## Overview
The Events Module is the centralized planning, scheduling, execution, and reporting system for all organizational activities in the Stuti-Vani Foundation.

It sits below Programs and Projects in the domain hierarchy, although it can exist independently.

## Domain Hierarchy
```
Organization
  ↳ Programs
    ↳ Projects
      ↳ Events
```

## AI Readiness
The Event document structure includes a dedicated `ai` block reserved for future capabilities, such as automatic summary generation, AI translations, and insight embedding.

```typescript
ai: {
  summary?: string;
  highlights?: string[];
  tags?: string[];
  keywords?: string[];
  embeddings?: number[];
  translations?: Record<string, string>;
  futureInsights?: string;
}
```

## Calendar Engine
- **Library**: `FullCalendar` (`@fullcalendar/react`).
- **Implementation**: The standard interface defaults to a responsive Month View. The underlying configuration is modular so that Agenda, Day, and Timeline views can be toggled without requiring heavy refactoring.

## Registration & Attendance (Architecture Only)
Phase 11 only establishes the registration data model. The frontend execution (QR scanning, external forms) will be implemented in future phases.

### Registration Modes Supported
- `NONE`, `ONLINE`, `OFFLINE`, `INVITATION`, `HYBRID`

### Attendance States
- `REGISTERED`, `CONFIRMED`, `CHECKED_IN`, `NO_SHOW`, `CANCELLED`, `VOLUNTEER`, `ORGANIZER`, `SPEAKER`, `GUEST`

## Statistics & Health Computation
Event metrics are **not** persisted in Firestore. They are computed dynamically in the Service layer to ensure accuracy and prevent out-of-sync states.

- **`EventStatisticsService`**: Computes registration percentage, capacity utilization, attendance rate, and remaining capacity based on scheduled dates and capacity counters.
- **`EventHealthService`**: Computes dynamic event states (`EXCELLENT`, `GOOD`, `WARNING`, `CRITICAL`) using statistical outcomes and timeline proximity.

## Media & Document Relationships
Events use the DAM (Digital Asset Management) module via the `MediaSelectorDialog`. 
- No direct document/image uploads exist in the Event forms. 
- All references are strictly stored as String IDs mapped to the Gallery module.

## Server Actions & Security
All operations route through Next.js Server Actions incorporating `requireAuth` and `requirePermission` guards. Each modification is strictly logged via the `ActivityRepository`.
