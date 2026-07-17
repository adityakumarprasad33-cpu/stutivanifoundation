/* eslint-disable @typescript-eslint/no-explicit-any */
 
'use client';

import React, { useEffect, useState } from 'react';
import { useAnalyticsFilters } from '../filters/analytics-filter-context';
import { FinancialStatisticsService } from '../../services/financial-statistics.service';
import { KPICard } from '../widgets/kpi-card';
import { AreaChart } from '../charts/area-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FinancialDashboard() {
  const { filters, setSupportedFilters } = useAnalyticsFilters();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setSupportedFilters(['DATE_RANGE', 'CAMPAIGN']);
  }, [setSupportedFilters]);

  useEffect(() => {
    async function load() {
      const stats = await FinancialStatisticsService.getAggregatedMetrics(filters);
      setData(stats);
    }
    load();
  }, [filters]);

  if (!data) return <div>Loading Financial Data...</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard kpiId="TOTAL_DONATIONS" value={data.totalDonations} previousValue={400000} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <AreaChart 
            data={data.trends} 
            xAxisKey="name" 
            areas={[
              { key: 'value', color: '#22c55e', name: 'Revenue (INR)' }
            ]} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
