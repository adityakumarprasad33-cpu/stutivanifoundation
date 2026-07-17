'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PORTAL_NAV, PORTAL_BOTTOM_NAV } from '@/config/portal-nav';
import { usePortal } from '../../context/portal-context';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const PortalSidebar = ({ isActive = true }: { isActive?: boolean }) => {
  const { isSidebarOpen, setSidebarOpen } = usePortal();
  const pathname = usePathname();

  if (!isActive) {
    return null;
  }

  const NavLinks = ({ items }: { items: typeof PORTAL_NAV }) => (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors group",
              isActive 
                ? "bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300" 
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            <Icon 
              className={cn(
                "mr-3 h-5 w-5 flex-shrink-0",
                isActive 
                  ? "text-primary-700 dark:text-primary-300" 
                  : "text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300"
              )} 
            />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/80 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar component */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out flex flex-col lg:translate-x-0 lg:static lg:inset-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">SV</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white truncate">Volunteer Portal</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex flex-col flex-1 overflow-y-auto pt-5 pb-4 px-3">
          <NavLinks items={PORTAL_NAV} />
          
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Account</h3>
            <NavLinks items={PORTAL_BOTTOM_NAV} />
          </div>
        </div>
      </div>
    </>
  );
};
