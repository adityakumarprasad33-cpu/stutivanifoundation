import React from 'react';
import type { ProgramHealthStatus } from '../../services/program-health.service';
import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const ProgramHealthBadge = ({ status }: { status: ProgramHealthStatus }) => {
  const getStyles = (s: ProgramHealthStatus) => {
    switch (s) {
      case 'EXCELLENT': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'GOOD': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'CRITICAL': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'UNKNOWN':
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const Icon = () => {
    switch(status) {
      case 'EXCELLENT': return <CheckCircle size={12} className="mr-1" />;
      case 'GOOD': return <Activity size={12} className="mr-1" />;
      case 'WARNING': return <AlertTriangle size={12} className="mr-1" />;
      case 'CRITICAL': return <XCircle size={12} className="mr-1" />;
      default: return null;
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStyles(status)}`}>
      <Icon />
      Health: {status}
    </span>
  );
};
