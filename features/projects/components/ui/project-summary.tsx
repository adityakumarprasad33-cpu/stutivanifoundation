import React from 'react';
import type { Project } from '../../types/project.types';

export const ProjectSummary = ({ project }: { project: Project }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
        Project Details
      </h3>
      
      <dl className="space-y-4 text-sm">
        <div className="grid grid-cols-3 gap-4">
          <dt className="text-gray-500 font-medium">Category</dt>
          <dd className="col-span-2 text-gray-900 dark:text-white">{project.categoryId}</dd>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <dt className="text-gray-500 font-medium">Priority</dt>
          <dd className="col-span-2 text-gray-900 dark:text-white">{project.priority}</dd>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <dt className="text-gray-500 font-medium">Visibility</dt>
          <dd className="col-span-2 text-gray-900 dark:text-white">{project.visibility}</dd>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <dt className="text-gray-500 font-medium">Location</dt>
          <dd className="col-span-2 text-gray-900 dark:text-white">
            {project.location.village ? `${project.location.village}, ` : ''}
            {project.location.district}, {project.location.state}
          </dd>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <dt className="text-gray-500 font-medium">Tags</dt>
          <dd className="col-span-2 flex flex-wrap gap-1">
            {project.tags.length > 0 ? project.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                {tag}
              </span>
            )) : <span className="text-gray-400">None</span>}
          </dd>
        </div>
      </dl>
    </div>
  );
};
