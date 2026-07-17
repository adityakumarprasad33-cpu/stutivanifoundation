'use client';

import React from 'react';
import { useAnalyticsFilters, PresetRange } from './analytics-filter-context';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FilterX } from 'lucide-react';

export function AnalyticsFilterBar() {
  const { filters, setFilter, resetFilters, supportedFilters } = useAnalyticsFilters();

  if (supportedFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-background border rounded-lg shadow-sm">
      <div className="text-sm font-medium text-muted-foreground mr-2">Filters</div>
      
      {supportedFilters.includes('DATE_RANGE') && (
        <div className="flex items-center gap-2">
          <Select 
            value={filters.preset} 
            onValueChange={(val: string | null) => setFilter('preset', val as PresetRange)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODAY">Today</SelectItem>
              <SelectItem value="THIS_WEEK">This Week</SelectItem>
              <SelectItem value="THIS_MONTH">This Month</SelectItem>
              <SelectItem value="THIS_QUARTER">This Quarter</SelectItem>
              <SelectItem value="THIS_YEAR">This Year</SelectItem>
              <SelectItem value="CUSTOM">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {supportedFilters.includes('STATUS') && (
        <div className="flex items-center gap-2">
          <Select 
            value={filters.statuses[0] || 'ALL'} 
            onValueChange={(val: string | null) => setFilter('statuses', val === 'ALL' || !val ? [] : [val])}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <FilterX className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
