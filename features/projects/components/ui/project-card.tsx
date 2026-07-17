import React from 'react';
import type { Project } from '../../types/project.types';
import { ProjectStatusBadge } from './project-status-badge';
import { ProjectStatisticsService } from '../../services/project-statistics.service';
import { MapPin, Users } from 'lucide-react';

export const ProjectCard = ({ project }: { project: Project }) => {
  const stats = ProjectStatisticsService.compute(project);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Cover Image */}
      <div className="h-40 bg-gray-100 dark:bg-gray-800 relative">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.coverImage.secureUrl} alt={project.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Cover Image</div>
        )}
        <div className="absolute top-3 right-3">
          <ProjectStatusBadge status={project.status} />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide">
          {project.phase}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{project.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
          {project.shortDescription}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">{stats.progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${stats.progressPercentage}%` }}></div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div className="flex items-center">
            <MapPin size={12} className="mr-1" />
            <span className="line-clamp-1">{project.location.district}, {project.location.state}</span>
          </div>
          <div className="flex items-center justify-end">
            <Users size={12} className="mr-1" />
            <span>{project.beneficiaries.current.toLocaleString()} / {project.beneficiaries.expected.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
