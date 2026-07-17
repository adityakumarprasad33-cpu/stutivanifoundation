import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function PageSkeleton() {
  return (
    <div className="container py-12 md:py-16 space-y-12">
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/3 max-w-md rounded-lg" />
        <Skeleton className="h-6 w-2/3 max-w-2xl rounded-lg" />
      </div>
      
      <div className="space-y-6">
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
