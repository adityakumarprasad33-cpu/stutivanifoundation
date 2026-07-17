import { IQueueProvider } from './queue.interface';
import { NotificationPayload } from '../types/notification.types';
import { logger } from '@/lib/logger';

/**
 * A lightweight, promise-based asynchronous queue suitable for local development
 * or single-instance deployments. It decouples the request from the execution loop.
 */
export class LocalQueue implements IQueueProvider {
  private queue: NotificationPayload[] = [];
  private processing: boolean = false;
  private worker?: (payload: NotificationPayload) => Promise<boolean>;

  async push(payload: NotificationPayload): Promise<void> {
    logger.debug('[LocalQueue] Enqueuing notification');
    this.queue.push(payload);
    
    // Trigger processing asynchronously without blocking the caller
    queueMicrotask(() => this.startProcessing());
    return Promise.resolve();
  }

  process(worker: (payload: NotificationPayload) => Promise<boolean>): void {
    this.worker = worker;
    if (this.queue.length > 0) {
      queueMicrotask(() => this.startProcessing());
    }
  }

  private async startProcessing(): Promise<void> {
    if (this.processing || !this.worker || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const payload = this.queue.shift();
      if (!payload) continue;

      try {
        logger.debug('[LocalQueue] Processing notification');
        await new Promise(resolve => setTimeout(resolve, 0));
        
        const success = await this.worker(payload);
        
        if (!success) {
          logger.warn('[LocalQueue] Worker failed to process notification');
        }
      } catch (error) {
        logger.error('[LocalQueue] Fatal error processing notification', error);
      }
    }

    this.processing = false;
  }
}
