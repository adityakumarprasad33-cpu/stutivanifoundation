import React from 'react';
import type { Project } from '../../types/project.types';
import { ProjectHealthBadge } from './project-health-badge';
import { ProjectHealthService } from '../../services/project-health.service';
import { Calendar } from 'lucide-react';

export const ProjectHeader = ({ project }: { project: Project }) => {
  const health = ProjectHealthService.evaluate(project);
  
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {project.phase.replace('_', ' ')}
            </span>
            <ProjectHealthBadge status={health.status} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {project.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            {project.shortDescription}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <Calendar size={12} className="mr-1" /> Target Date
            </div>
            <div className="font-semibold text-gray-900 dark:text-white text-sm">
              {project.expectedCompletionDate 
                ? new Date(project.expectedCompletionDate as Date).toLocaleDateString()
                : 'Not Set'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
