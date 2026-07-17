import { NotificationService } from './services/notification.service';
import { LocalQueue } from './queue/local.queue';
import { PreferenceService } from './services/preference.service';
import { EmailNotificationProvider } from './providers/email.provider';
import { NotificationChannel } from './types/notification.types';

// Singleton initialization for Notification Engine
const queue = new LocalQueue();
const preferenceService = new PreferenceService();

const providers = new Map();
providers.set(NotificationChannel.EMAIL, new EmailNotificationProvider());

export const notificationService = new NotificationService(queue, providers, preferenceService);
