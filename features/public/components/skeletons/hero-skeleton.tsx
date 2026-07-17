import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function HeroSkeleton() {
  return (
    <div className="w-full h-[60vh] min-h-[400px] relative overflow-hidden bg-muted flex items-center justify-center">
      <div className="container relative z-10 flex flex-col items-center text-center space-y-6">
        <Skeleton className="h-12 w-3/4 max-w-3xl rounded-lg" />
        <Skeleton className="h-12 w-1/2 max-w-2xl rounded-lg" />
        <Skeleton className="h-6 w-full max-w-xl mt-4 rounded-lg" />
        <Skeleton className="h-6 w-2/3 max-w-lg rounded-lg" />
        <div className="flex gap-4 mt-8">
          <Skeleton className="h-12 w-32 rounded-md" />
          <Skeleton className="h-12 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}
