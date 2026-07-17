/* eslint-disable @typescript-eslint/no-explicit-any */
 
'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { FilterType } from '@/config/dashboard-widgets';

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export type PresetRange = 'TODAY' | 'YESTERDAY' | 'THIS_WEEK' | 'LAST_WEEK' | 'THIS_MONTH' | 'LAST_MONTH' | 'THIS_QUARTER' | 'THIS_YEAR' | 'CUSTOM';

export interface AnalyticsFilters {
  dateRange: DateRange;
  preset: PresetRange;
  programs: string[];
  projects: string[];
  campaigns: string[];
  events: string[];
  volunteers: string[];
  categories: string[];
  statuses: string[];
  locations: string[];
}

export interface AnalyticsFilterContextType {
  filters: AnalyticsFilters;
  setFilter: (key: keyof AnalyticsFilters, value: any) => void;
  resetFilters: () => void;
  supportedFilters: FilterType[];
  setSupportedFilters: (filters: FilterType[]) => void;
}

const defaultFilters: AnalyticsFilters = {
  dateRange: { from: undefined, to: undefined },
  preset: 'THIS_MONTH',
  programs: [],
  projects: [],
  campaigns: [],
  events: [],
  volunteers: [],
  categories: [],
  statuses: [],
  locations: [],
};

const AnalyticsFilterContext = createContext<AnalyticsFilterContextType | undefined>(undefined);

export function AnalyticsFilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<AnalyticsFilters>(defaultFilters);
  const [supportedFilters, setSupportedFilters] = useState<FilterType[]>(['DATE_RANGE']);

  const setFilter = (key: keyof AnalyticsFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const value = useMemo(() => ({
    filters,
    setFilter,
    resetFilters,
    supportedFilters,
    setSupportedFilters
  }), [filters, supportedFilters]);

  return (
    <AnalyticsFilterContext.Provider value={value}>
      {children}
    </AnalyticsFilterContext.Provider>
  );
}

export function useAnalyticsFilters() {
  const context = useContext(AnalyticsFilterContext);
  if (context === undefined) {
    throw new Error('useAnalyticsFilters must be used within an AnalyticsFilterProvider');
  }
  return context;
}
