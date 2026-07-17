import React from 'react';
import { UserManagementTable } from '@/features/settings/components/user-management-table';
import { UserRepository } from '@/features/auth/services/user.repository';
import type { UserProfile } from '@/features/auth/services/user.types';
import { requireAuth } from '@/lib/auth/server-guards';
import { Plus } from 'lucide-react';

export default async function UsersSettingsPage() {
  await requireAuth();

  const userRepository = new UserRepository();
  
  // Note: Using listAll in a real production app should use pagination, 
  // but for the foundation's admin base, this is fine for the MVP.
  let users: UserProfile[] = [];
  try {
    users = await userRepository.listAll();
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white font-geist">Users & Access</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage administrative users, their roles, and system access.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shrink-0">
          <Plus size={16} />
          Invite User
        </button>
      </div>

      <UserManagementTable users={users} />
    </div>
  );
}
