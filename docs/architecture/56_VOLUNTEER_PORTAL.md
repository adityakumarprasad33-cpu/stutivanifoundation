# 56. Volunteer Portal Architecture

## Overview
The Volunteer Portal (`app/(portal)`) is a dedicated Route Group designed exclusively for self-service volunteer actions. It is completely isolated from the Admin Dashboard (`app/dashboard`).

## Layout Strategy
- **Portal Shell**: Uses its own `PortalSidebar` and `PortalHeader`, independent of the admin navigation.
- **Context**: Managed by `PortalContext` (sidebar toggles, notification drawer state).
- **Navigation**: Defined in `config/portal-nav.ts`.

## Integration
The portal never duplicates business logic. It securely consumes data via existing layers:
- `VolunteerRepository` (Profile)
- `VolunteerAssignmentRepository` (Assignments)
- `VolunteerPerformanceService` (Metrics)

## Performance
- **Server Components**: Leveraged by default for data fetching (e.g., Attendance records).
- **Suspense**: Used to stream heavy aggregations (like Performance calculations) without blocking the initial UI paint.
