'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useDashboard } from '@/features/dashboard/context/dashboard.context';
import { getAccessibleNavigation } from '@/features/dashboard/utils/navigation';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { BrandLogo, BrandMark } from '@/components/brand';

export const Sidebar = () => {
  const pathname = usePathname();
  const { role, logout } = useAuth();
  const { sidebarState, toggleSidebar } = useDashboard();
  
  const accessibleItems = getAccessibleNavigation(role);
  
  // Group items
  const groupedItems = accessibleItems.reduce((acc, item) => {
    const group = item.group || 'General';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, typeof accessibleItems>);

  const isCollapsed = sidebarState === 'collapsed';
  const isMobileOpen = sidebarState === 'mobile_open';

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 flex flex-col
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          {!isCollapsed && (
            <BrandLogo />
          )}
          {isCollapsed && (
            <div className="mx-auto shrink-0">
              <BrandMark size={28} />
            </div>
          )}
          
          {/* Desktop Toggle Button */}
          <button 
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin">
          {Object.entries(groupedItems).map(([group, items]) => (
            <div key={group} className="mb-6 px-3">
              {!isCollapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {group}
                </h3>
              )}
              {isCollapsed && (
                <div className="flex justify-center mb-2">
                  <div className="w-4 h-px bg-gray-200 dark:bg-gray-800" />
                </div>
              )}
              
              <ul className="space-y-1">
                {items.map(item => {
                  const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href || ''));
                  const Icon = item.icon;
                  
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href || '#'}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative group
                          ${isActive 
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50'
                          }
                          ${isCollapsed ? 'justify-center' : ''}
                        `}
                        title={isCollapsed ? item.title : undefined}
                      >
                        {Icon && (
                          <Icon 
                            size={20} 
                            className={`shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`} 
                          />
                        )}
                        
                        {!isCollapsed && (
                          <span className="truncate flex-1 font-medium text-sm">
                            {item.title}
                          </span>
                        )}

                        {item.badge && !isCollapsed && (
                          <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 py-0.5 px-2 rounded-full text-xs font-medium">
                            {item.badge}
                          </span>
                        )}
                        
                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity whitespace-nowrap z-50">
                            {item.title}
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 shrink-0">
          <button
            onClick={logout}
            className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? "Log out" : undefined}
          >
            <LogOut size={20} className="shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
