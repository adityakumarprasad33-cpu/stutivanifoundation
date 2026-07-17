import React from 'react';
import type { ProjectStatisticsSummary } from '../../services/project-statistics.service';
import { Image, FileText, HeartHandshake, IndianRupee } from 'lucide-react';

export const ProjectStatisticsCard = ({ stats }: { stats: ProjectStatisticsSummary }) => {
  const items = [
    { label: 'Gallery Images', value: stats.galleryImageCount, icon: Image, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { label: 'Documents', value: stats.documentCount, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Volunteers', value: stats.volunteerCount, icon: HeartHandshake, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Partners', value: stats.partnerCount, icon: IndianRupee, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bg}`}>
            <item.icon size={20} className={item.color} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white leading-none mb-1">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
