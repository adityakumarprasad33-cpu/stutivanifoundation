'use client';

import React from 'react';
import type { UserProfile } from '@/features/auth/services/user.types';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  users: UserProfile[];
}

export const UserManagementTable = ({ users }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm animate-in fade-in duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-950/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">User</th>
              <th scope="col" className="px-6 py-4 font-medium">Role</th>
              <th scope="col" className="px-6 py-4 font-medium">Status</th>
              <th scope="col" className="px-6 py-4 font-medium">Last Activity</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold shrink-0 text-xs">
                      {user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white flex items-center gap-1.5">
                        {user.displayName}
                        {user.emailVerified && (
                          <span title="Email Verified">
                            <CheckCircle2 size={12} className="text-green-500" />
                          </span>
                        )}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">{user.email}</div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {(user.roles || [user.role]).map((r) => (
                      <span key={r} className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                        r === 'admin' ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                        r === 'donor' ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" :
                        r === 'volunteer' ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                      )}>
                        {r?.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.status === 'ACTIVE' && <span className="flex w-2 h-2 rounded-full bg-green-500" />}
                    {user.status === 'SUSPENDED' && <span className="flex w-2 h-2 rounded-full bg-red-500" />}
                    {user.status === 'PENDING' && <span className="flex w-2 h-2 rounded-full bg-yellow-500" />}
                    {user.status === 'INACTIVE' && <span className="flex w-2 h-2 rounded-full bg-gray-500" />}
                    <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">{user.status}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-700 dark:text-gray-300 text-xs flex items-center gap-1.5">
                      <Clock size={12} className="text-gray-400" />
                      {user.lastActivity ? formatDistanceToNow(user.lastActivity as unknown as Date, { addSuffix: true }) : 'Never'}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4 text-right">
                  <button 
                    className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    aria-label="User actions"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
            
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                  No users found matching the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer Placeholder */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50 dark:bg-gray-950/50">
        <div>Showing {users.length} users</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50">Previous</button>
          <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};
