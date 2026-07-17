import React from 'react';
import type { ProjectStatisticsSummary } from '../../services/project-statistics.service';
import { Users } from 'lucide-react';

export const ProjectBeneficiaryCard = ({ stats, expected, current }: { stats: ProjectStatisticsSummary, expected: number, current: number }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Users size={16} className="mr-2 text-blue-500" />
          Beneficiaries
        </h3>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{stats.beneficiaryCompletionPercentage}%</span>
      </div>
      
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-6">
        <div 
          className="h-2 rounded-full bg-blue-500" 
          style={{ width: `${Math.min(100, stats.beneficiaryCompletionPercentage)}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Impacted</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{current.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Target</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{expected.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
