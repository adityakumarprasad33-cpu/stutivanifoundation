# 66. Notification Architecture

## The Central Engine
The Stuti-Vani platform employs a centralized `NotificationService`. Modules like Events, Volunteers, and Donations do **not** format emails or push to databases directly. They simply call:
`NotificationService.dispatch(topic, templateKey, recipientId, data)`

## Benefits
1. **Decoupling**: Business logic remains entirely separate from messaging logic.
2. **Provider Agnostic**: If we switch from SendGrid to Resend, the Events module doesn't need a single line of code changed.
3. **Auditability**: All messages flow through a single choke point, allowing unified Activity Logging and Analytics.
