'use client';

import React from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { generateBreadcrumbs } from '@/features/dashboard/utils/navigation';
import { useDashboard } from '@/features/dashboard/context/dashboard.context';
import { useAuth } from '@/hooks/use-auth';
import { authService } from '@/features/auth/services/auth.service';
import { Menu, Search, Bell, ChevronRight, Command } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle'; 
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { RoleSelectionModal } from '@/features/auth/components/role-selection-modal';

export const Header = () => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);
  const { toggleSidebar, setCommandPaletteOpen, setNotificationDrawerOpen } = useDashboard();
  const { user } = useAuth();
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <nav aria-label="Breadcrumb" className="hidden sm:flex">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center">
                {idx > 0 && <ChevronRight size={14} className="mx-2 text-gray-400" />}
                {crumb.href ? (
                  <Link 
                    href={crumb.href} 
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {crumb.title}
                  </Link>
                ) : (
                  <span className="font-medium text-gray-900 dark:text-white">
                    {crumb.title}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Global Search / Command Palette Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors border border-transparent dark:border-gray-700"
        >
          <Search size={16} />
          <span>Search...</span>
          <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 font-mono text-[10px] font-medium text-gray-500 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded">
            <Command size={10} /> K
          </kbd>
        </button>
        
        {/* Mobile Search Icon */}
        <button 
          onClick={() => setCommandPaletteOpen(true)}
          className="sm:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1" />

        <ThemeToggle />

        <button 
          onClick={() => setNotificationDrawerOpen(true)}
          className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {/* Notification Badge Placeholder */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white dark:border-gray-950" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors outline-none cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-200 dark:border-blue-800">
              {user?.displayName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden md:flex flex-col items-start mr-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white leading-none">
                {user?.displayName?.split(' ')[0] || 'User'}
              </span>
              <span className="text-xs text-gray-500 capitalize leading-none mt-1">
                {user?.lastSelectedRole || user?.roles?.[0] || 'Staff'}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            
            {user?.roles && user.roles.length > 1 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setRoleModalOpen(true)}>
                  Switch Role
                </DropdownMenuItem>
              </>
            )}
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => authService.logout().then(() => window.location.href = '/login')}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <RoleSelectionModal 
          isOpen={isRoleModalOpen}
          onOpenChange={setRoleModalOpen}
          roles={user?.roles || []}
          lastSelectedRole={user?.lastSelectedRole}
        />
      </div>
    </header>
  );
};
