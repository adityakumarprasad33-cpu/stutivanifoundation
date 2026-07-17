import React from 'react';

export default function ProjectTimelinePlaceholderPage() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Project Timeline</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-md">
        This section will manage the project schedule, milestones, and phase transitions.
      </p>
    </div>
  );
}
