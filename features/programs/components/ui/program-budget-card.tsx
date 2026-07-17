import React from 'react';
import type { ProgramStatisticsSummary } from '../../services/program-statistics.service';
import { IndianRupee } from 'lucide-react';

export const ProgramBudgetCard = ({ stats }: { stats: ProgramStatisticsSummary }) => {
  const utilization = stats.totalBudget.approved > 0 ? (stats.totalBudget.utilized / stats.totalBudget.approved) * 100 : 0;
  const remaining = Math.max(0, stats.totalBudget.approved - stats.totalBudget.utilized);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Budget Allocation</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
          utilization > 100 ? 'bg-red-100 text-red-700' :
          utilization > 80 ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>
          {Math.round(utilization)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-4">
        <div 
          className={`h-2 rounded-full ${utilization > 100 ? 'bg-red-500' : 'bg-blue-600'}`} 
          style={{ width: `${Math.min(100, utilization)}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-sm mt-auto">
        <span className="text-gray-500">Remaining</span>
        <span className="font-semibold text-gray-900 dark:text-white flex items-center">
          <IndianRupee size={14} className="mr-0.5 text-gray-400"/>
          {remaining.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
