import React from 'react';
import type { Program } from '../../types/program.types';
import { ProgramStatusBadge } from './program-status-badge';
import { ProgramHealthBadge } from './program-health-badge';
import type { ProgramHealthStatus } from '../../services/program-health.service';
import { MapPin, Target } from 'lucide-react';

export const ProgramHeader = ({ program, healthStatus }: { program: Program, healthStatus?: ProgramHealthStatus }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-6">
        
        <div className="flex gap-6 items-start">
          <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-hidden">
             {program.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={program.coverImage.secureUrl} 
                  alt={program.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Target size={32} className="text-gray-300 dark:text-gray-600" />
                </div>
              )}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {program.name}
              </h1>
              <ProgramStatusBadge status={program.status} />
              {healthStatus && <ProgramHealthBadge status={healthStatus} />}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl">
              {program.shortDescription}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1.5 text-gray-400" />
                {program.location.district}, {program.location.state}
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-1.5 text-gray-400">Category:</span>
                {program.categoryId}
              </div>
            </div>
          </div>
        </div>

        {/* Action area placeholder for page injection */}
      </div>
    </div>
  );
};
