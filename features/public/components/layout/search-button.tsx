'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Note: In Part 3 we will build search-overlay.tsx and integrate it here.

export function SearchButton() {
  return (
    <Button variant="ghost" size="icon" aria-label="Search">
      <Search className="h-5 w-5" />
    </Button>
  );
}
