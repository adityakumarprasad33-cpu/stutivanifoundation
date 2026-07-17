# 72. In-App Notifications

## The User Interface
The In-App Notification Center operates in two tiers:
1. **The Slide-Out (Bell Icon)**: Provides a quick, overlay view of recent updates without leaving the current dashboard page. It handles quick actions like "Mark as Read".
2. **The Historical View (`/dashboard/notifications`)**: A dedicated page for deep historical filtering, pagination, and bulk actions.

## Persistence
In-App notifications are persisted via the `InAppProvider`. Their status transitions from `QUEUED` -> `DELIVERED` -> `READ` -> `ARCHIVED`. They are immutable outside of this status track.
