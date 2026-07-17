import React from 'react';
import type { MediaStatus } from '../../types/media.types';

export const MediaStatusBadge = ({ status }: { status: MediaStatus }) => {
  const styles: Record<MediaStatus, string> = {
    TEMP_UPLOAD: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    UPLOADED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    PROCESSING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    READY: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    ARCHIVED: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    SOFT_DELETED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    BROKEN_REFERENCE: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-500',
    MISSING_ASSET: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-500',
  };

  const labels: Record<MediaStatus, string> = {
    TEMP_UPLOAD: 'Temp',
    UPLOADED: 'Uploaded',
    PROCESSING: 'Processing',
    READY: 'Ready',
    ARCHIVED: 'Archived',
    SOFT_DELETED: 'Deleted',
    BROKEN_REFERENCE: 'Broken',
    MISSING_ASSET: 'Missing',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};
