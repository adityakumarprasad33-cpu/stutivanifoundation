import React from 'react';
import { EmptyState } from '@/components/dashboard/ui/empty-state';
import { Activity } from 'lucide-react';

export default function ActivityLogsPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white font-geist mb-4">Audit Logs</h2>
      <EmptyState 
        icon={Activity}
        title="System Audit Trail"
        description="A paginated data table of all system events (logins, setting changes) powered by the ActivityRepository will appear here."
      />
    </div>
  );
}
