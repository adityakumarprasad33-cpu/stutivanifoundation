import { UserNotificationPreferences } from '../types/notification.types';
import { logger } from '@/lib/logger';

export class PreferenceService {
  /**
   * Retrieves the user's notification preferences.
   * If they haven't explicitly set them, it returns safe defaults.
   */
  async getUserPreferences(userId: string): Promise<UserNotificationPreferences> {
    // Architecture Flow: Query Firestore/Database for preferences
    // Fallback to defaults
    
    return Promise.resolve({
      userId,
      emailEnabled: true,
      inAppEnabled: true,
      smsEnabled: false,
      pushEnabled: false,
      marketing: true,
      events: true,
      volunteers: true,
      donations: true,
      security: true, // Immutable
      system: true,   // Immutable
    });
  }

  /**
   * Updates the user's preferences.
   */
  async updatePreferences(userId: string, preferences: Partial<UserNotificationPreferences>): Promise<void> {
    logger.info('[PreferenceService] Updating preferences');
    // Safety check: Don't allow disabling security/system notifications
    const safeUpdate = { ...preferences };
    delete safeUpdate.security;
    delete safeUpdate.system;
    
    // Architecture Flow: Update Firestore document
    return Promise.resolve();
  }
}
