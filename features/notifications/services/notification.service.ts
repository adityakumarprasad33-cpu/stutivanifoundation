import { INotificationProvider } from '../providers/provider.interface';
import { IQueueProvider } from '../queue/queue.interface';
import { PreferenceService } from './preference.service';
import { NotificationPayload, NotificationChannel, NotificationStatus, NotificationPriority } from '../types/notification.types';
import { logger } from '@/lib/logger';

export class NotificationService {
  constructor(
    private readonly queue: IQueueProvider,
    private readonly providers: Map<NotificationChannel, INotificationProvider>,
    private readonly preferenceService: PreferenceService
  ) {
    // Register the worker to process items from the queue
    this.queue.process(this.processNotification.bind(this));
  }

  /**
   * The central dispatch method called by ALL other modules (Events, Donations, etc.).
   */
  async dispatch(
    topic: 'marketing' | 'events' | 'volunteers' | 'donations' | 'security' | 'system',
    templateKey: string,
    recipientId: string,
    data: Record<string, unknown>,
    priority: NotificationPriority = NotificationPriority.NORMAL
  ): Promise<void> {
    logger.info(`[NotificationService] Dispatch requested for template: ${templateKey}`);
    
    // 1. Fetch User Preferences
    const prefs = await this.preferenceService.getUserPreferences(recipientId);
    
    // 2. Check Topic Subscription
    if (!prefs[topic]) {
      logger.info(`[NotificationService] Recipient opted out of topic: ${topic}. Aborting.`);
      return;
    }

    // 3. Determine Channels
    const channels: NotificationChannel[] = [];
    if (prefs.emailEnabled) channels.push(NotificationChannel.EMAIL);
    if (prefs.inAppEnabled) channels.push(NotificationChannel.IN_APP);

    if (channels.length === 0) {
      logger.info('[NotificationService] Recipient has no enabled channels. Aborting.');
      return;
    }

    // 4. Construct Payload
    const payload: NotificationPayload = {
      id: `NOTIF-${Date.now()}`,
      recipientId,
      recipientEmail: 'stub@example.com',
      templateKey,
      data,
      channels,
      priority,
      status: NotificationStatus.QUEUED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 5. Push to Queue
    await this.queue.push(payload);
  }

  /**
   * Internal worker function that runs asynchronously via the Queue.
   */
  private async processNotification(payload: NotificationPayload): Promise<boolean> {
    logger.info(`[NotificationService] Processing notification`);
    
    let allSuccessful = true;

    for (const channel of payload.channels) {
      const provider = this.providers.get(channel);
      if (!provider) {
        logger.warn(`[NotificationService] No provider registered for channel: ${channel}`);
        allSuccessful = false;
        continue;
      }

      try {
        const success = await provider.send(payload);
        if (!success) {
          allSuccessful = false;
        }
      } catch (error) {
        logger.error(`[NotificationService] Provider ${channel} failed`, error);
        allSuccessful = false;
      }
    }
    
    return allSuccessful;
  }
}
