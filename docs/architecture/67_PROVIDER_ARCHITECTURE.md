# 67. Provider Architecture

## INotificationProvider
Every channel (Email, SMS, Push, In-App) must implement the `INotificationProvider` interface.

### Responsibilities:
- Expose the `channel` it handles.
- Implement the `send(payload)` method.
- (Optional) Implement `getStatus(notificationId)` to poll delivery receipts.

## Current Implementations
- `EmailProvider`: Resolves the React component template to an HTML string and dispatches it via a transport layer.
- `InAppProvider`: Persists the payload into the user's local database feed.
