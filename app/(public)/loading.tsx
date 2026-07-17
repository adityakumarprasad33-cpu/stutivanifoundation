import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="container flex min-h-[50vh] flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary opacity-50" />
      <p className="mt-4 text-muted-foreground text-sm font-medium animate-pulse">Loading content...</p>
    </div>
  );
}
