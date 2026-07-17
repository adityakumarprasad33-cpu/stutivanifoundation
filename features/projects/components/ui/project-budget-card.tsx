import React from 'react';
import type { ProjectStatisticsSummary } from '../../services/project-statistics.service';
import { IndianRupee } from 'lucide-react';

export const ProjectBudgetCard = ({ stats, compact = false }: { stats: ProjectStatisticsSummary, compact?: boolean }) => {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`${compact ? 'text-sm' : 'text-base'} font-bold text-gray-900 dark:text-white`}>Budget Utilization</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
          stats.budgetUtilizationPercentage > 100 ? 'bg-red-100 text-red-700' :
          stats.budgetUtilizationPercentage > 80 ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>
          {stats.budgetUtilizationPercentage}%
        </span>
      </div>
      
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-4">
        <div 
          className={`h-2 rounded-full ${stats.budgetUtilizationPercentage > 100 ? 'bg-red-500' : 'bg-blue-600'}`} 
          style={{ width: `${Math.min(100, stats.budgetUtilizationPercentage)}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Remaining</span>
        <span className="font-semibold text-gray-900 dark:text-white flex items-center">
          <IndianRupee size={14} className="mr-0.5 text-gray-400"/>
          {stats.remainingBudget.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
