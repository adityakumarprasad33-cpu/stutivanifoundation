'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between text-sm">
      <div className="flex-1 text-center font-medium">
        Support our latest Winter Relief Campaign. Every contribution matters.
        <a href="/donate" className="ml-2 underline underline-offset-4 font-bold hover:text-primary-foreground/80">Donate Now</a>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
