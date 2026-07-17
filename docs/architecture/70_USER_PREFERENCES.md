# 70. User Preferences

## Preference Service
Before a notification is pushed to the Queue, the `NotificationService` consults the `PreferenceService`.

## Structure
Preferences are split into two categories:
1. **Channels**: `emailEnabled`, `inAppEnabled`, `smsEnabled`
2. **Topics**: `marketing`, `events`, `volunteers`, `donations`

If a user disables `marketing`, any payload dispatched under the `marketing` topic is instantly discarded, saving processing time and honoring user consent. `security` and `system` topics are typically immutable and cannot be disabled.
