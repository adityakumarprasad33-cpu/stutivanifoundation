import React from 'react';
import type { Program } from '../../types/program.types';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

export const ProgramTimeline = ({ program }: { program: Program }) => {
  const events = [
    {
      title: 'Program Created',
      date: program.createdAt ? new Date(program.createdAt as Date).toLocaleDateString() : 'N/A',
      icon: Clock,
      status: 'completed'
    },
    {
      title: 'Expected Start',
      date: program.startDate ? new Date(program.startDate as Date).toLocaleDateString() : 'Pending',
      icon: Calendar,
      status: program.startDate && new Date(program.startDate as Date) <= new Date() ? 'completed' : 'pending'
    },
    {
      title: 'Expected Completion',
      date: program.expectedCompletionDate ? new Date(program.expectedCompletionDate as Date).toLocaleDateString() : 'Pending',
      icon: CheckCircle,
      status: program.status === 'COMPLETED' ? 'completed' : 'pending'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6">Program Timeline</h3>
      
      <div className="relative border-l-2 border-gray-100 dark:border-gray-800 ml-3 space-y-8">
        {events.map((event, idx) => (
          <div key={idx} className="relative pl-6">
            <span className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-900 ${
              event.status === 'completed' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              <event.icon size={10} className="text-white" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{event.title}</span>
              <span className="text-xs text-gray-500 mt-1">{event.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
