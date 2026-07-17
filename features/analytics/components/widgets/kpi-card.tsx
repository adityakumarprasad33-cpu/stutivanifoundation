import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ANALYTICS_KPIS } from '@/config/analytics-kpis';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  kpiId: keyof typeof ANALYTICS_KPIS;
  value: number;
  previousValue?: number;
  className?: string;
}

export function KPICard({ kpiId, value, previousValue, className }: KPICardProps) {
  const kpi = ANALYTICS_KPIS[kpiId];
  if (!kpi) return null;

  let trend = 0;
  if (previousValue && previousValue !== 0) {
    trend = ((value - previousValue) / previousValue) * 100;
  }

  const isPositiveTrend = trend > 0;
  const isGood = kpi.trendMode === 'higher_is_better' ? isPositiveTrend : !isPositiveTrend;

  const formatValue = (val: number) => {
    if (kpi.format === 'currency') {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    }
    if (kpi.format === 'percentage') {
      return `${val}%`;
    }
    return new Intl.NumberFormat('en-IN').format(val);
  };

  return (
    <Card className={cn('', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {kpi.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        {previousValue !== undefined && (
          <p className="text-xs flex items-center mt-1">
            <span className={cn('flex items-center font-medium', isGood ? 'text-green-600' : 'text-red-600')}>
              {isPositiveTrend ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
              {Math.abs(trend).toFixed(1)}%
            </span>
            <span className="text-muted-foreground ml-1">from last period</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
