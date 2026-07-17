# Reports Architecture

## Overview
The Reports module acts as the business intelligence layer for the Stuti-Vani Foundation. It adheres strictly to the existing pattern: `Repository -> Service -> Aggregator -> View`.

## Architectural Boundaries
1. **Aggregators Over Direct Repositories:** No direct Firestore querying occurs in the dashboard or charting components. We use Aggregators (e.g., `FinancialStatisticsService`, `OrganizationStatisticsService`) that consume the domain's individual statistics services and sum/group them.
2. **Scheduled Reports (Future):** Support for automated delivery via `ReportSchedule` and `ScheduledReportLog` schemas.
3. **Analytics Cache Layer:** Prevents aggressive billing overhead from database reads.

## Custom Reports
The `ReportBuilderEngine` takes a `SavedReportDefinition` and transforms it into actionable queries. Columns, filters, and sort options are preserved and can be made `PUBLIC` or `PRIVATE`.
