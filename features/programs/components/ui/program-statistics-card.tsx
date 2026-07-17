import React from 'react';
import type { ProgramStatisticsSummary } from '../../services/program-statistics.service';
import { Target, Users, IndianRupee, LayoutDashboard } from 'lucide-react';

export const ProgramStatisticsCard = ({ stats }: { stats: ProgramStatisticsSummary }) => {
  const items = [
    { label: 'Active Projects', value: stats.projectsCount, icon: LayoutDashboard, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { label: 'Total Beneficiaries', value: stats.totalBeneficiaries.current.toLocaleString(), icon: Users, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Funds Utilized', value: `₹${stats.totalBudget.utilized.toLocaleString()}`, icon: IndianRupee, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Health Score', value: `${stats.healthScore}/100`, icon: Target, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bg} shrink-0`}>
            <item.icon size={20} className={item.color} />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight truncate">{item.value}</p>
            <p className="text-xs text-gray-500 truncate">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
