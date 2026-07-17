# 58. Volunteer Dashboard

## Dashboard Widgets
The main `/portal` route aggregates data from multiple modules to provide a unified snapshot:
1. **Performance**: Total Hours, Reliability Score, Contribution Score.
2. **Operations**: Upcoming Events & Active Assignments.
3. **Communications**: Organization Announcements and recent notifications.

## Architecture
The Dashboard UI is entirely read-only. It calls the respective statistics services (e.g., `VolunteerPerformanceService`, `VolunteerStatisticsService`) to compute scores on-the-fly. We never persist these computed metrics to avoid data desynchronization.
