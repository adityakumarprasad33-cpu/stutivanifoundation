import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { EmptyState } from '@/components/dashboard/ui/empty-state';
import { CalendarDays, Megaphone } from 'lucide-react';
import { requireAuth } from '@/lib/auth/server-guards';
import { VolunteerRepository } from '@/features/volunteers/services/volunteer.repository';

export const metadata = {
  title: 'Dashboard | Volunteer Portal',
  description: 'Welcome to your Volunteer Dashboard.',
};

export default async function PortalDashboardPage() {
  const user = await requireAuth();
  const repo = new VolunteerRepository();
  const { data: volunteers } = await repo.query({ 
    filters: [{ field: 'linkedUserId', operator: '==', value: user.uid }],
    skipStatusFilter: true
  });
  
  const volunteer = volunteers.length > 0 ? volunteers[0] : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, {user.displayName?.split(' ')[0] || 'Volunteer'}! Here is a summary of your volunteer engagement.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{volunteer?.metrics?.totalHours || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reliability Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{volunteer?.metrics?.reliabilityScore || 0}%</div>
            <Progress value={volunteer?.metrics?.reliabilityScore || 0} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{volunteer?.metrics?.assignmentsCompleted || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Contribution Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">Good</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events you are scheduled to attend.</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState 
              icon={CalendarDays}
              title="No upcoming events"
              description="You do not have any assignments scheduled at this time."
            />
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Organization Announcements</CardTitle>
            <CardDescription>Important updates from Stuti-Vani Foundation.</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState 
              icon={Megaphone}
              title="No announcements"
              description="There are no new announcements from the foundation right now."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
