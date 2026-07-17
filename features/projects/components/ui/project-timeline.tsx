import React from 'react';
import type { Project } from '../../types/project.types';
import { format } from 'date-fns';

export const ProjectTimeline = ({ project }: { project: Project }) => {
  const phases = [
    { phase: 'PLANNING', label: 'Planning', active: ['PLANNING'].includes(project.phase), past: ['EXECUTION', 'MONITORING', 'CLOSURE'].includes(project.phase) },
    { phase: 'EXECUTION', label: 'Execution', active: ['EXECUTION'].includes(project.phase), past: ['MONITORING', 'CLOSURE'].includes(project.phase) },
    { phase: 'MONITORING', label: 'Monitoring', active: ['MONITORING'].includes(project.phase), past: ['CLOSURE'].includes(project.phase) },
    { phase: 'CLOSURE', label: 'Closure', active: ['CLOSURE'].includes(project.phase), past: [] },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6">Phase Timeline</h3>
      
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 dark:bg-gray-800 -z-10"></div>
        
        <div className="flex justify-between">
          {phases.map((p, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 transition-colors ${
                p.active 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : p.past 
                    ? 'bg-white dark:bg-gray-900 border-blue-600 text-blue-600'
                    : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400'
              }`}>
                {p.past ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs font-bold">{idx + 1}</span>
                )}
              </div>
              <span className={`text-xs font-medium ${p.active || p.past ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div>
          <span className="block text-xs text-gray-500 mb-1">Start Date</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {project.startDate ? format(new Date(project.startDate as Date), 'MMM d, yyyy') : 'Not Set'}
          </span>
        </div>
        <div>
          <span className="block text-xs text-gray-500 mb-1">End Date</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {project.endDate ? format(new Date(project.endDate as Date), 'MMM d, yyyy') : 'Not Set'}
          </span>
        </div>
      </div>
    </div>
  );
};
