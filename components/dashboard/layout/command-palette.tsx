'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '@/features/dashboard/context/dashboard.context';
import { Search, Command as CommandIcon, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { getAccessibleNavigation } from '@/features/dashboard/utils/navigation';
import { useRouter } from 'next/navigation';

export const CommandPalette = () => {
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useDashboard();
  const { role } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    if (isCommandPaletteOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery(''); // Reset on close
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const accessibleItems = getAccessibleNavigation(role);
  
  // Basic filtering for demo. In the future, this hooks into a real search index.
  const filteredItems = query 
    ? accessibleItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    : accessibleItems.slice(0, 5); // Show first 5 as suggestions if empty

  const handleNavigate = (href?: string) => {
    if (href) {
      router.push(href);
      setCommandPaletteOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 sm:px-0">
      <div 
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" 
        onClick={() => setCommandPaletteOpen(false)}
      />
      
      <div 
        role="dialog" 
        aria-modal="true"
        className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center px-4 border-b border-gray-100 dark:border-gray-800">
          <Search size={20} className="text-gray-400" />
          <input
            autoFocus
            type="text"
            className="w-full px-3 py-4 bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 text-lg outline-none"
            placeholder="Search commands, routes, or modules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md transition-colors bg-gray-100 dark:bg-gray-800"
          >
            <kbd className="font-mono text-xs px-1">ESC</kbd>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredItems.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {query ? 'Results' : 'Suggestions'}
              </div>
              {filteredItems.map((item) => {
                const Icon = item.icon || ArrowRight;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.href)}
                    className="w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group focus:bg-blue-50 focus:text-blue-700 dark:focus:bg-blue-900/30 dark:focus:text-blue-400 focus:outline-none"
                  >
                    <div className="p-2 bg-gray-50 dark:bg-gray-950 rounded-md group-hover:bg-white dark:group-hover:bg-gray-900 border border-gray-200 dark:border-gray-800 group-focus:border-blue-200 dark:group-focus:border-blue-800">
                      <Icon size={18} className="text-gray-500 group-focus:text-blue-600 dark:group-focus:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-gray-100 group-focus:text-blue-700 dark:group-focus:text-blue-300">
                        {item.title}
                      </div>
                      {item.description && (
                        <div className="text-xs text-gray-500 mt-0.5">
                          {item.description}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-gray-500 group-focus:text-blue-400 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                      Jump to
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-12 text-center">
              <CommandIcon size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 text-sm">No results found for &quot;{query}&quot;</p>
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">↑↓</kbd> to navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">↵</kbd> to select</span>
          </div>
        </div>
      </div>
    </div>
  );
};
