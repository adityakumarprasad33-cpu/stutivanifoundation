import { NotificationPayload, NotificationStatus } from '../types/notification.types';

export interface INotificationProvider {
  /**
   * Identifies the channel this provider handles (e.g., EMAIL, IN_APP, SMS).
   */
  readonly channel: string;
  
  /**
   * Renders and dispatches the notification to the external service or local database.
   * Returns a boolean indicating initial success of handoff.
   */
  send(payload: NotificationPayload): Promise<boolean>;

  /**
   * Retrieves the delivery status from the provider (if supported).
   */
  getStatus(notificationId: string): Promise<NotificationStatus>;
}
