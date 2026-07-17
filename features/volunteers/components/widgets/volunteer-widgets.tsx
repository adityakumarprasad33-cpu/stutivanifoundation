'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, Activity } from 'lucide-react';
import type { VolunteerStatisticsSummary, VolunteerPerformanceMetrics } from '../../types/volunteer.types';

export function VolunteerStatsWidget({ stats }: { stats: VolunteerStatisticsSummary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Projects</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.projectsContributed}</div>
          <p className="text-xs text-muted-foreground">Projects contributed to</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Events</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.eventsParticipated}</div>
          <p className="text-xs text-muted-foreground">Events participated in</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Hours</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.volunteerHoursCompleted}</div>
          <p className="text-xs text-muted-foreground">Total hours completed</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function VolunteerPerformanceWidget({ performance }: { performance: VolunteerPerformanceMetrics }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-muted-foreground text-xs">Attendance Rate</Label>
          <div className="text-xl font-bold">{performance.attendanceRate.toFixed(1)}%</div>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Reliability Score</Label>
          <div className="text-xl font-bold">{performance.reliabilityScore.toFixed(0)}</div>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Burnout Risk</Label>
          <div className={`text-xl font-bold ${
            performance.futureBurnoutRisk === 'HIGH' ? 'text-red-500' :
            performance.futureBurnoutRisk === 'MEDIUM' ? 'text-amber-500' : 'text-green-500'
          }`}>
            {performance.futureBurnoutRisk}
          </div>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Impact Score</Label>
          <div className="text-xl font-bold">{performance.impactScore.toFixed(0)}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// Minimal stub for Label inside the widget
function Label({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>;
}
