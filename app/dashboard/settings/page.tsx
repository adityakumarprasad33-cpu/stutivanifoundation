import { redirect } from 'next/navigation';

export default function SettingsIndexPage() {
  // Automatically redirect to the first sub-module (Organization settings)
  redirect('/dashboard/settings/organization');
}
