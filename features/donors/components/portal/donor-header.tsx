'use client';

import React, { useState } from 'react';
import { useDonor } from '../../context/donor-context';
import { Button } from '@/components/ui/button';
import { Menu, Bell } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { authService } from '@/features/auth/services/auth.service';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks/use-auth';
import { RoleSelectionModal } from '@/features/auth/components/role-selection-modal';

export const DonorHeader = () => {
  const { toggleSidebar } = useDonor();
  const router = useRouter();
  const { user } = useAuth();
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sm:px-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="lg:hidden mr-4" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-rose-600 ring-2 ring-white dark:ring-gray-950" />
        </Button>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-800" />

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors outline-none cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-sm shrink-0 border border-rose-200 dark:border-rose-800/50">
              {user?.displayName?.charAt(0).toUpperCase() || 'D'}
            </div>
            <div className="hidden md:flex flex-col items-start mr-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white leading-none">
                {user?.displayName?.split(' ')[0] || 'Donor'}
              </span>
              <span className="text-xs text-gray-500 capitalize leading-none mt-1">
                Donor Portal
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/donor/settings')}>Settings</DropdownMenuItem>
            
            {user?.roles && user.roles.length > 1 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setRoleModalOpen(true)}>
                  Switch Role
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
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
