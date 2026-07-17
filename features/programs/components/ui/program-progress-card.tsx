import React from 'react';
import type { ProgramStatisticsSummary } from '../../services/program-statistics.service';
import { Calendar } from 'lucide-react';

export const ProgramProgressCard = ({ stats, expectedCompletion }: { stats: ProgramStatisticsSummary, expectedCompletion?: Date }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Overall Progress</h3>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{stats.completionPercentage}%</span>
      </div>
      
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-6">
        <div 
          className="h-2 rounded-full bg-blue-600" 
          style={{ width: `${stats.completionPercentage}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-auto">
        <div>
          <p className="text-xs text-gray-500 mb-1">Days Elapsed</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.daysElapsed}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Days Remaining</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.daysRemaining}</p>
        </div>
      </div>
      
      {expectedCompletion && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center text-xs text-gray-500">
          <Calendar size={14} className="mr-1.5" />
          Est. Completion: <span className="font-medium text-gray-900 dark:text-white ml-1">{new Date(expectedCompletion).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
};
