import React from 'react';
import { EmptyState } from '@/components/dashboard/ui/empty-state';
import { Palette } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function AppearanceSettingsPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white font-geist mb-4">Appearance</h2>
      
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Theme Preference</h3>
            <p className="text-sm text-gray-500 mt-1">Switch between light and dark mode.</p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <EmptyState 
        icon={Palette}
        title="Advanced Appearance"
        description="Custom branding colors, reduced motion, and UI density settings will be available here."
      />
    </div>
  );
}
