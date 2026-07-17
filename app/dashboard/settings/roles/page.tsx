import React from 'react';
import { EmptyState } from '@/components/dashboard/ui/empty-state';
import { KeyRound } from 'lucide-react';

export default function RolesSettingsPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white font-geist mb-4">Roles & Permissions Matrix</h2>
      <EmptyState 
        icon={KeyRound}
        title="Access Control Matrix"
        description="A read-only viewer for role and permission assignments will be rendered here."
      />
    </div>
  );
}
