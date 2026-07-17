import React from 'react';
import { EmptyState } from '@/components/dashboard/ui/empty-state';
import { ShieldCheck } from 'lucide-react';

export default function SecuritySettingsPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white font-geist mb-4">Security & Sessions</h2>
      <EmptyState 
        icon={ShieldCheck}
        title="Security Settings"
        description="Password policies, 2FA, and active session management will be configurable here."
      />
    </div>
  );
}
