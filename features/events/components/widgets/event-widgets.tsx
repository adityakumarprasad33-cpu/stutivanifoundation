import React from 'react';
import type { EventStatisticsSummary } from '../../types/event.types';

export function EventRegistrationWidget({ stats }: { stats: EventStatisticsSummary }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4">Registration Overview</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Capacity Utilized</span>
            <span className="font-medium">{stats.capacityUtilization}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${stats.capacityUtilization}%` }}></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
            <p className="text-xs text-gray-500">Remaining Spots</p>
            <p className="text-xl font-bold">{stats.remainingCapacity === -1 ? 'Unlimited' : stats.remainingCapacity}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
            <p className="text-xs text-gray-500">Attendance Rate</p>
            <p className="text-xl font-bold">{stats.attendanceRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
