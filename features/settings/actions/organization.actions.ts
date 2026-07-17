'use server';

import { revalidatePath } from 'next/cache';
import { settingsRepository } from '../services/settings.repository';
import { organizationSettingsSchema, type OrganizationSettings } from '../validation/settings.schemas';
import { requireRole } from '@/lib/auth/server-guards';

export async function updateOrganizationSettings(data: OrganizationSettings) {
  try {
    // Only super_admin can modify organization settings
    await requireRole('super_admin');

    // Validate payload against schema
    const validatedData = organizationSettingsSchema.parse(data);

    // Save to Firestore
    await settingsRepository.updateOrganizationSettings(validatedData);

    // Revalidate paths that might depend on this data
    revalidatePath('/dashboard/settings/organization');
    revalidatePath('/'); // For public site metadata/footers

    return { success: true };
  } catch (error) {
    console.error('Failed to update organization settings:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred while saving.' };
  }
}
