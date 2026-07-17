# 73. Future Messaging Architecture

## Adding a New Channel
To add SMS or WhatsApp support in the future:
1. Create `SmsProvider` implementing `INotificationProvider`.
2. Register it in the `NotificationService` constructor.
3. Update `UserNotificationPreferences` to include `smsEnabled`.

No modifications will be needed in the Events or Donations modules. The central engine automatically handles formatting the payload for the new provider if the user has opted in.
