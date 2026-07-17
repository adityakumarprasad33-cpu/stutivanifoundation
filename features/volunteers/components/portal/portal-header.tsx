'use client';

import React from 'react';
import { usePortal } from '../../context/portal-context';
import { Button, buttonVariants } from '@/components/ui/button';
import { Menu, Bell, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { authService } from '@/features/auth/services/auth.service';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { RoleSelectionModal } from '@/features/auth/components/role-selection-modal';

export const PortalHeader = ({ isActive = true }: { isActive?: boolean }) => {
  const { toggleSidebar } = usePortal();
  const router = useRouter();
  const { user } = useAuth();
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sm:px-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="lg:hidden mr-4" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        {isActive && (
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="relative outline-none" />}>
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto p-4 text-sm text-center text-muted-foreground">
                No new notifications.
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full text-center text-primary cursor-pointer" onClick={() => router.push('/portal/notifications')}>
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-8 w-8 rounded-full p-0 outline-none" />}>
            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100">
              <User className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {isActive && (
              <>
                <DropdownMenuItem onClick={() => router.push('/portal/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/portal/settings')}>Settings</DropdownMenuItem>
                
                {user?.roles && user.roles.length > 1 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setRoleModalOpen(true)}>
                      Switch Role
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />
              </>
            )}
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
