import { INotificationProvider } from './provider.interface';
import { NotificationPayload, NotificationStatus } from '../types/notification.types';
import { EmailService } from '../services/email.service';
import { logger } from '@/lib/logger';

export class EmailNotificationProvider implements INotificationProvider {
  readonly channel = 'email' as const;

  async send(payload: NotificationPayload): Promise<boolean> {
    logger.info(`[EmailProvider] Processing email notification`);
    
    if (!payload.recipientEmail) {
      logger.warn(`[EmailProvider] No email address provided`);
      return false;
    }
    
    try {
      const result = await EmailService.dispatch({
        to: payload.recipientEmail,
        subject: `Notification: ${payload.templateKey}`,
        textBody: JSON.stringify(payload.data),
      });

      logger.info(`[EmailProvider] Email dispatched successfully`);
      return result.success;
    } catch (error) {
      logger.error('[EmailProvider] Failed to send email', error);
      return false;
    }
  }

  async getStatus(notificationId: string): Promise<NotificationStatus> {
    // Stub: Usually requires querying the provider's API (e.g. Resend webhooks)
    return NotificationStatus.SENT;
  }
}
