import { db } from '@/lib/firebase/client';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { OrganizationSettings, SecuritySettings, AppearanceSettings } from '../validation/settings.schemas';
import { BRANDING } from '@/constants/branding';
import { DatabaseError } from '@/lib/errors';

// Singleton documents exist in the 'settings' collection
const SETTINGS_COLLECTION = 'settings';
const ORG_DOC_ID = 'organization';
const SECURITY_DOC_ID = 'security';
const APPEARANCE_DOC_ID = 'appearance';

export class SettingsRepository {
  /**
   * Retrieves the organization settings singleton.
   * If it does not exist, it automatically returns a structured default.
   */
  async getOrganizationSettings(): Promise<OrganizationSettings> {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, ORG_DOC_ID);
      const snapshot = await getDoc(docRef);
      
      if (!snapshot.exists()) {
        return this.getDefaultOrganizationSettings();
      }
      
        return snapshot.data() as OrganizationSettings;
    } catch (error) {
      console.error('Failed to get Organization Settings:', error);
      throw new DatabaseError('Failed to fetch organization configuration.', error instanceof Error ? error : undefined);
    }
  }

  /**
   * Upserts the organization settings. 
   * Idempotent initialization happens here naturally.
   */
  async updateOrganizationSettings(data: Partial<OrganizationSettings>): Promise<void> {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, ORG_DOC_ID);
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.error('Failed to update Organization Settings:', error);
      throw new DatabaseError('Failed to update organization configuration.', error instanceof Error ? error : undefined);
    }
  }

  async getSecuritySettings(): Promise<SecuritySettings> {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, SECURITY_DOC_ID);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) {
        return {
          requireMfa: false,
          passwordPolicy: 'standard',
          sessionDurationDays: 5,
          lockoutThreshold: 5,
        };
      }
      return snapshot.data() as SecuritySettings;
    } catch (error) {
      throw new DatabaseError('Failed to fetch security settings.', error instanceof Error ? error : undefined);
    }
  }

  async getAppearanceSettings(): Promise<AppearanceSettings> {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, APPEARANCE_DOC_ID);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) {
        return {
          theme: 'system',
          reducedMotion: false,
        };
      }
      return snapshot.data() as AppearanceSettings;
    } catch (error) {
      throw new DatabaseError('Failed to fetch appearance settings.', error instanceof Error ? error : undefined);
    }
  }

  private getDefaultOrganizationSettings(): OrganizationSettings {
    return {
      name: BRANDING.ORGANIZATION.NAME,
      shortName: BRANDING.ORGANIZATION.SHORT_NAME,
      timezone: BRANDING.DEFAULTS.TIMEZONE,
      defaultLanguage: BRANDING.DEFAULTS.LANGUAGE,
      defaultCurrency: BRANDING.DEFAULTS.CURRENCY,
      dateFormat: BRANDING.DEFAULTS.DATE_FORMAT,
      timeFormat: BRANDING.DEFAULTS.TIME_FORMAT,
      status: 'ACTIVE',
    };
  }
}

// Export singleton instance
export const settingsRepository = new SettingsRepository();
