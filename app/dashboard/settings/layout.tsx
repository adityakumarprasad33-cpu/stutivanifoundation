import React from 'react';
import { PageContainer } from '@/components/dashboard/ui/page-container';
import { PageHeader } from '@/components/dashboard/ui/page-header';
import { SETTINGS_NAVIGATION } from '@/config/settings-nav';
import { SettingsNavMenu } from './settings-nav-menu'; // Client component for active state

export const metadata = {
  title: 'Settings',
  description: 'Manage platform settings and configurations',
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer maxWidth="lg">
      <PageHeader 
        title="Settings" 
        description="Manage your organization's configurations and preferences."
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <SettingsNavMenu items={SETTINGS_NAVIGATION} />
        </aside>
        
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </PageContainer>
  );
}
