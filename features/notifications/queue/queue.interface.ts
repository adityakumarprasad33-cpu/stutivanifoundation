import { NotificationPayload } from '../types/notification.types';

export interface IQueueProvider {
  /**
   * Pushes a notification onto the queue.
   */
  push(payload: NotificationPayload): Promise<void>;
  
  /**
   * Registers a worker function to process items from the queue.
   */
  process(worker: (payload: NotificationPayload) => Promise<boolean>): void;
}
