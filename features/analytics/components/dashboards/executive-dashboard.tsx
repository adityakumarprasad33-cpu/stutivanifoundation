/* eslint-disable @typescript-eslint/no-explicit-any */
 
'use client';

import React, { useEffect, useState } from 'react';
import { useAnalyticsFilters } from '../filters/analytics-filter-context';
import { OrganizationStatisticsService } from '../../services/organization-statistics.service';
import { KPICard } from '../widgets/kpi-card';
import { LineChart } from '../charts/line-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ExecutiveDashboard() {
  const { filters, setSupportedFilters } = useAnalyticsFilters();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setSupportedFilters(['DATE_RANGE']);
  }, [setSupportedFilters]);

  useEffect(() => {
    async function load() {
      const stats = await OrganizationStatisticsService.getExecutiveSummary(filters);
      setData(stats);
    }
    load();
  }, [filters]);

  if (!data) return <div>Loading Executive Summary...</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard kpiId="ORGANIZATION_HEALTH" value={data.organizationHealthScore} previousValue={88} />
        <KPICard kpiId="TOTAL_PROJECTS" value={data.totalActiveProjects} previousValue={12} />
        <KPICard kpiId="ACTIVE_VOLUNTEERS" value={data.totalActiveVolunteers} previousValue={110} />
        <KPICard kpiId="REVENUE_GROWTH" value={15.4} previousValue={12.5} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organization Activity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart 
              data={data.activityTrend} 
              xAxisKey="name" 
              lines={[
                { key: 'volunteers', color: '#8884d8', name: 'Volunteers' },
                { key: 'events', color: '#82ca9d', name: 'Events' }
              ]} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
