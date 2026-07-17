# Dashboard Widgets Architecture

## Centralized Widget Registry
Similar to navigation, widgets are managed via `DashboardWidgetRegistry` (`config/dashboard-widgets.ts`). 
- **Registry Traits:** Size, layout position, required permissions, supported filters, and visibility.
- **KPI Dictionary:** `config/analytics-kpis.ts` defines how a specific KPI behaves (e.g., trend analysis, formatting). 

## Theme-Aware Visualizations
All charts are implemented via Recharts (`features/analytics/components/charts/*`). They bind directly to the platform's CSS variables (e.g., `hsl(var(--background))`, `hsl(var(--foreground))`) ensuring perfect integration with Light/Dark/System themes.

## Snapshot Integration
Dashboards can take a `DashboardSnapshot` - capturing the exact filters, totals, and layout used by a user at a given point in time to save or share.
