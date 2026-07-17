# 28. Program Architecture

This document describes the architectural implementation of the **Programs Module** (Phase 8), establishing the core organizational initiative management system for Stuti-Vani Foundation.

## 1. Domain Hierarchy Update
The platform hierarchy has been formalized as:
**Organization → Programs → Projects → Events / Gallery / Blogs / Volunteers / Donations / Reports**

- **Programs**: Long-term organizational initiatives (e.g., "Women Empowerment").
- **Projects**: Time-bound, specific implementations executed under a Program.
- **Linkage**: `Project` documents store an optional `programId` reference. Programs do NOT embed Project IDs inside their document, ensuring decoupled read/write scalability.

## 2. Program Entity & Database Structure
Path: `features/programs/types/program.types.ts`
The Program document is stored in the `programs` Firestore collection. 

```typescript
export interface Program {
  id: string; 
  name: string;
  slug: string;
  categoryId: string; // Configuration driven
  status: ProgramStatus;
  
  // Strategic
  objectives: string[];
  expectedOutcomes: string[];
  
  // Location
  location: { state: string, district: string };
  
  // Statistics (Evaluated & Cached)
  beneficiaries: { expected: number; current: number; completed: number; };
  financials: { estimatedBudget: number; approvedBudget: number; fundsUtilized: number; };
  
  // Web Preparedness
  seo: { metaTitle: string; keywords: string[] };
  ai: { summary?: string; generatedTags?: string[] };
}
```

## 3. Infrastructure & Repository Layer
Path: `features/programs/services/program.repository.ts`
Extends `FirebaseRepository<Program>` with strong querying extensions:
- `getFeaturedPrograms()`
- `getLatestPrograms()`
- `getProgramsByCategory()`
- `getProgramsByLocation()`
- `searchPrograms()` - Utilizes `normalizedTitle` string boundary querying.
- `getProgramSummary()` - Yields a lightweight `Partial<Program>`.

## 4. Statistics & Health Engines
These stateless engines compute derived KPIs without polluting the Firestore document during frequent project updates.

**ProgramStatisticsService**:
Aggregates child Projects via `projectId` matching to calculate:
- `projectsCount`
- Overall `completionPercentage`
- Budget `fundsUtilized` vs `approvedBudget`
- Real-time `daysElapsed` and `daysRemaining`

**ProgramHealthService**:
Outputs structural health states: `EXCELLENT`, `GOOD`, `WARNING`, `CRITICAL`. It evaluates:
- Financial overdrafts (Funds Utilized > Budget).
- Impact lag (Completion % > 80 but Beneficiaries < 50%).
- Timeline expiration without `COMPLETED` status.

## 5. Centralized Policy Management
Path: `features/programs/policy/program.policy.ts`
Manages granular access controls matching the `constants/permissions.ts` expansion (`programs.create`, `programs.publish`). 
Enforces rigorous lifecycle transitions:
`DRAFT` ➔ `PENDING_REVIEW` ➔ `APPROVED` ➔ `PUBLISHED` ➔ `ACTIVE` ➔ `COMPLETED` ➔ `ARCHIVED`.

## 6. Server Actions & Mutations
Path: `features/programs/actions/program.actions.ts`
All writes occur via strongly-typed Server Actions which:
1. Validate authentication via `requireAuth()`.
2. Validate granular IAM via `requirePermission('programs.*')`.
3. Validate data integrity via Zod `programSchema`.
4. Run `generateUniqueSlug()`.
5. Dispatch `ActivityRepository.log()` for secure audit trails.

## 7. Dashboard Components
Abstracted widgets residing in `features/programs/components/ui`:
- `ProgramCard`
- `ProgramHeader`
- `ProgramSummary`
- `ProgramTimeline`
- `ProgramStatusBadge` & `ProgramHealthBadge`
- `ProgramStatisticsCard`, `ProgramBudgetCard`, `ProgramProgressCard`, `ProgramBeneficiaryCard`.

## 8. Category System Preparation
Categories (`categoryId`) are defined as strings to support configuration-driven schemas fetched dynamically from the future `Settings` module, avoiding hard-coded string unions.

## 9. AI & Vector Search Preparation
Reserved slots in the Domain model ensure AI agents can inject embeddings and summaries in future implementations:
```typescript
  searchVector?: number[];
  ai?: {
    summary?: string;
    generatedTags?: string[];
    insights?: string[];
    impactReport?: string;
  };
```
