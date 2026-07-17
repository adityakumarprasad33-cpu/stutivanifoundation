import React from 'react';
import { EmptyState } from '@/components/dashboard/ui/empty-state';
import { ServerCog } from 'lucide-react';

export default function SystemSettingsPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white font-geist mb-4">System Health</h2>
      <EmptyState 
        icon={ServerCog}
        title="System Diagnostics"
        description="Firebase connection status, Cloudinary limits, and environment health indicators will appear here."
      />
    </div>
  );
}
