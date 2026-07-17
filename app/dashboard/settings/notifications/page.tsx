import React from 'react';
import { EmptyState } from '@/components/dashboard/ui/empty-state';
import { Bell } from 'lucide-react';

export default function NotificationSettingsPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white font-geist mb-4">Notification Preferences</h2>
      <EmptyState 
        icon={Bell}
        title="Notifications"
        description="Configure email alerts, push notifications, and system digests."
      />
    </div>
  );
}
