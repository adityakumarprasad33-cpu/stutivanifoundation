# Campaign Architecture

## Overview
The Campaign Module provides structural planning and goal-oriented tracking for fundraising activities.

## Core Models
- `Campaign`: Represents a target-based initiative with `goalAmount`, `raisedAmount`, `startDate`, `endDate`, and robust visibility controls.

## Calculation Engine
1. **Dynamic Computing:** `raisedAmount` and `donorCount` are re-calculated dynamically during display or periodically cached. They are *not* strictly maintained incrementally to avoid write contention and race conditions.
2. **Campaign Health Service:** A dedicated class (`CampaignHealthService`) processes the aggregate metrics, returning percentage metrics and determining health statuses (On Track, Behind, etc.).

## Security
- Managed by `DonationPolicy`, enforcing that only users with `MANAGE_CAMPAIGNS` can create or modify them, though public data is exposed via safe DTOs.
