'use client';

import React from 'react';
import { useDashboard } from '@/features/dashboard/context/dashboard.context';
import { Sidebar } from './sidebar';
import { Header } from './header';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { sidebarState } = useDashboard();
  const isCollapsed = sidebarState === 'collapsed';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300
          ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}
      >
        <Header />

        {/* Main scrollable workspace container */}
        <main 
          id="dashboard-content" 
          className="flex-1 overflow-auto focus:outline-none"
          tabIndex={-1}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
