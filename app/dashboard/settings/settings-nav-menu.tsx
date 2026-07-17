'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SettingsNavigationItem } from '@/config/settings-nav';
import { useAuth } from '@/hooks/use-auth';
import { hasPermission } from '@/lib/auth/guards';

export function SettingsNavMenu({ items }: { items: SettingsNavigationItem[] }) {
  const pathname = usePathname();
  const { role } = useAuth();
  
  if (!role) return null;

  // Filter accessible items
  const accessibleItems = items.filter(item => {
    if (item.roles && !item.roles.includes(role)) return false;
    if (item.permission && !hasPermission(role, item.permission)) return false;
    return true;
  });

  return (
    <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none">
      {accessibleItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        const Icon = item.icon;
        
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal
              ${isActive 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }
            `}
          >
            <Icon size={18} className="shrink-0" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
