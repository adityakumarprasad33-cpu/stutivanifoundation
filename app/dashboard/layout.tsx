import { ReactNode } from 'react';
import { DashboardProvider } from '@/features/dashboard/context/dashboard.context';
import { DashboardLayout } from '@/components/dashboard/layout/dashboard-layout';
import { CommandPalette } from '@/components/dashboard/layout/command-palette';
import { NotificationDrawer } from '@/components/dashboard/layout/notification-drawer';

export const metadata = {
  title: 'Dashboard | Stuti-Vani Foundation',
  description: 'Administrative workspace for Stuti-Vani Foundation',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default function RootDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProvider>
      <div className="relative">
        <a 
          href="#dashboard-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg outline-none ring-2 ring-blue-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-950 font-medium"
        >
          Skip to content
        </a>
        
        <DashboardLayout>
          {children}
        </DashboardLayout>
        
        <CommandPalette />
        <NotificationDrawer />
      </div>
    </DashboardProvider>
  );
}
