import React from 'react';
import type { Program } from '../../types/program.types';
import { ProgramStatusBadge } from './program-status-badge';
import { ProgramHealthBadge } from './program-health-badge';
import { MapPin, Target } from 'lucide-react';
import type { ProgramHealthStatus } from '../../services/program-health.service';

export const ProgramCard = ({ program, healthStatus }: { program: Program, healthStatus?: ProgramHealthStatus }) => {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col h-full">
      {/* Cover Image */}
      <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
        {program.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={program.coverImage.secureUrl} 
            alt={program.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Target size={32} className="text-gray-300 dark:text-gray-700" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <ProgramStatusBadge status={program.status} />
          {healthStatus && <ProgramHealthBadge status={healthStatus} />}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-1">
          {program.name}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
          {program.shortDescription}
        </p>

        {/* Footer Meta */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            <span className="truncate max-w-[120px]">{program.location.district}, {program.location.state}</span>
          </div>
          <div className="flex items-center font-medium">
            Progress: {program.progressPercentage || 0}%
          </div>
        </div>
      </div>
    </div>
  );
};
