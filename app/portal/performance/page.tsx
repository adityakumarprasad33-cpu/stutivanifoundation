import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const metadata = {
  title: 'Performance | Volunteer Portal',
  description: 'View your performance metrics.',
};

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance</h1>
        <p className="text-muted-foreground mt-2">Metrics calculated by the Volunteer Performance Service.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reliability Score</CardTitle>
            <CardDescription>Based on your attendance and punctuality.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="text-5xl font-bold text-primary-600">95%</div>
            <p className="text-muted-foreground mt-2">Outstanding</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contribution Score</CardTitle>
            <CardDescription>Based on total hours and impact.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="text-5xl font-bold text-green-600">9.2/10</div>
            <p className="text-muted-foreground mt-2">High Impact</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Volunteer Health</CardTitle>
          <CardDescription>Overall assessment of your engagement level.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Engagement Level</span>
              <span className="text-muted-foreground">Highly Active</span>
            </div>
            <Progress value={90} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Burnout Risk</span>
              <span className="text-muted-foreground">Low</span>
            </div>
            <Progress value={20} className="h-2 [&>div]:bg-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
