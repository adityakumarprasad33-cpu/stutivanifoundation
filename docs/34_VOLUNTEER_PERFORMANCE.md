# Volunteer Performance Engine

## Philosophy
Performance metrics are volatile. Storing metrics like "Total Hours" or "Attendance Rate" in a Firestore document requires complex triggers or multi-document transactions whenever an attendance record is created, updated, or deleted. This often leads to desynchronization.

Our architecture **never persists performance metrics**. Instead, they are computed dynamically on the server when requested.

## Services

### 1. `VolunteerStatisticsService`
Aggregates baseline statistics:
- Total unique Projects, Programs, Events.
- Total Hours Assigned vs. Completed.

### 2. `VolunteerPerformanceService`
Computes behavioral metrics utilizing data from `VolunteerStatisticsService` and `VolunteerAttendanceRepository`.
- **Attendance Rate**: `(Actual Attendances / Expected Attendances) * 100`
- **Completion Rate**: `(Hours Completed / Hours Assigned) * 100`
- **Reliability Score**: Starts at 100, penalizing for `ABSENT` (-15) and `LATE` (-5).
- **Activity Score**: Degrades based on days since last activity, boosted by total participation.
- **Contribution Score**: Weighted average of completion, reliability, and attendance.

### 3. `VolunteerHealthService`
Monitors volunteer well-being.
- **Burnout Risk**: Identifies volunteers with extreme activity (e.g., >100 hours in the last 14 days) and flags them as `HIGH` risk, allowing coordinators to enforce mandatory breaks.

## Caching Strategy
Currently, these computations happen on-the-fly per request. In the future, if scale dictates, these results can be cached in Redis with a TTL of 1-4 hours, maintaining our "No Persistence" rule in the primary database.
