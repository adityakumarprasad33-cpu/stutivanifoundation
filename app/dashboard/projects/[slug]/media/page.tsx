import React from 'react';

export default function ProjectMediaPlaceholderPage() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Media Gallery</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-md">
        This section will manage project images and videos. The Gallery integration is planned for a future phase.
      </p>
    </div>
  );
}
