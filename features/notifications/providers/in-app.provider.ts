import { INotificationProvider } from './provider.interface';
import { NotificationPayload, NotificationStatus } from '../types/notification.types';
import { logger } from '@/lib/logger';

export class InAppNotificationProvider implements INotificationProvider {
  readonly channel = 'in_app' as const;

  async send(payload: NotificationPayload): Promise<boolean> {
    logger.info('[InAppProvider] Creating in-app notification');
    
    try {
      // TODO: Persist to Firestore notifications collection
      // const notificationRepo = new NotificationRepository();
      // await notificationRepo.create({ ... });

      logger.info('[InAppProvider] In-app notification persisted');
      return true;
    } catch (error) {
      logger.error('[InAppProvider] Failed to create in-app notification', error);
      return false;
    }
  }

  async getStatus(notificationId: string): Promise<NotificationStatus> {
    // Stub: Query local database
    return NotificationStatus.SENT;
  }
}
