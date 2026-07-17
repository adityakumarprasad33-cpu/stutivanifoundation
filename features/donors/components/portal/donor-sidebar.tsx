'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDonor } from '../../context/donor-context';
import { Heart, LayoutDashboard, History, FileText, Bookmark, CalendarDays, Settings, LifeBuoy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { title: 'Dashboard', href: '/donor', icon: LayoutDashboard },
  { title: 'Donation History', href: '/donor/history', icon: History },
  { title: 'Tax Receipts', href: '/donor/receipts', icon: FileText },
  { title: 'Saved Campaigns', href: '/donor/saved', icon: Bookmark },
  { title: 'Upcoming Events', href: '/donor/events', icon: CalendarDays },
];

export const DonorSidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, setSidebarOpen } = useDonor();

  const NavLinks = () => (
    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/donor');
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
              isActive 
                ? "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" 
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            <Icon 
              className={cn(
                "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                isActive 
                  ? "text-rose-600 dark:text-rose-400" 
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
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 shadow-2xl lg:shadow-none",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo area */}
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-100 dark:border-gray-800/50">
          <Link href="/donor" className="flex items-center gap-2 outline-none group">
            <div className="bg-rose-100 dark:bg-rose-900/50 p-2 rounded-lg group-hover:bg-rose-200 dark:group-hover:bg-rose-800/50 transition-colors">
              <Heart className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Donor Portal
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex flex-1 flex-col overflow-y-auto pt-6 px-4 pb-4 no-scrollbar">
          <div className="space-y-6">
            <div>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</h3>
              <NavLinks />
            </div>

            <div>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Preferences</h3>
              <nav className="space-y-1">
                <Link
                  href="/donor/settings"
                  className={cn(
                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                    pathname.startsWith('/donor/settings') 
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <Settings className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                    pathname.startsWith('/donor/settings') ? "text-rose-600 dark:text-rose-400" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300"
                  )} />
                  Account Settings
                </Link>
              </nav>
            </div>
          </div>
          
          <div className="mt-auto pt-6">
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/20 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/30">
              <div className="flex items-center gap-3 mb-2">
                <LifeBuoy className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Need Help?</h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                Our support team is ready to assist you with your donations.
              </p>
              <Button size="sm" variant="outline" className="w-full bg-white dark:bg-gray-900 border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/50">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
