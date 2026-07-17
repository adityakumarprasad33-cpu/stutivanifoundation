import React from 'react';
import { OrganizationForm } from '@/features/settings/components/organization-form';
import { settingsRepository } from '@/features/settings/services/settings.repository';
import { requireAuth } from '@/lib/auth/server-guards';

export default async function OrganizationSettingsPage() {
  // Ensure the user is authenticated (layout guards this too, but double check)
  await requireAuth();

  // Fetch the singleton settings document
  // The repository is built to be idempotent: if the document doesn't exist yet, 
  // it immediately returns a correctly populated default schema based on our branding constants.
  const settings = await settingsRepository.getOrganizationSettings();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white font-geist">Organization Profile</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage the foundation&apos;s public identity, contact information, and legal registrations.
        </p>
      </div>

      <OrganizationForm initialData={settings} />
    </div>
  );
}
