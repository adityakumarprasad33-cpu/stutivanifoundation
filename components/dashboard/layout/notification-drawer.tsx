'use client';

import React, { useEffect } from 'react';
import { useDashboard } from '@/features/dashboard/context/dashboard.context';
import { X, Bell, BellOff } from 'lucide-react';

export const NotificationDrawer = () => {
  const { isNotificationDrawerOpen, setNotificationDrawerOpen } = useDashboard();

  // Lock body scroll when open on mobile (optional, but good for focus)
  useEffect(() => {
    if (isNotificationDrawerOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isNotificationDrawerOpen]);

  return (
    <>
      {/* Backdrop */}
      {isNotificationDrawerOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-sm"
          onClick={() => setNotificationDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 z-50 h-screen w-full max-w-sm bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col
          ${isNotificationDrawerOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-geist">Notifications</h2>
          </div>
          <button 
            onClick={() => setNotificationDrawerOpen(false)}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
          {/* Placeholder for empty state */}
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4">
            <BellOff size={24} className="text-gray-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">No notifications yet</h3>
          <p className="text-sm text-gray-500">
            When you receive alerts, approvals, or system messages, they will appear here.
          </p>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          <button className="w-full py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Notification Settings
          </button>
        </div>
      </div>
    </>
  );
};
