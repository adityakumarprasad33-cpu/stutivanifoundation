import { requirePermission } from '@/lib/auth/server-guards';
import { VolunteerRepository } from '@/features/volunteers/services/volunteer.repository';
import { VolunteerStatisticsService } from '@/features/volunteers/services/volunteer-statistics.service';
import { VolunteerPerformanceService } from '@/features/volunteers/services/volunteer-performance.service';
import { VolunteerTimelineService } from '@/features/volunteers/services/volunteer-timeline.service';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VolunteerStatsWidget, VolunteerPerformanceWidget } from '@/features/volunteers/components/widgets/volunteer-widgets';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default async function VolunteerWorkspacePage({
  params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  await requirePermission('volunteers.view');

  const repo = new VolunteerRepository();
  const { data: volunteers } = await repo.query({
    filters: [{ field: 'slug', operator: '==', value: resolvedParams.slug }],
    limit: 1
  });

  const volunteer = volunteers[0];
  if (!volunteer) return notFound();

  const stats = await VolunteerStatisticsService.computeStatistics(volunteer.id);
  const performance = await VolunteerPerformanceService.computePerformance(volunteer.id);
  const timeline = await VolunteerTimelineService.getVolunteerTimeline(volunteer.id);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{volunteer.personalInfo.firstName} {volunteer.personalInfo.lastName}</h1>
          <Badge>{volunteer.volunteerType}</Badge>
          <Badge variant={volunteer.status === 'ACTIVE' ? 'default' : 'secondary'}>{volunteer.status}</Badge>
        </div>
        <p className="text-muted-foreground">{volunteer.volunteerNumber} • {volunteer.personalInfo.email}</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <VolunteerStatsWidget stats={stats} />
          <VolunteerPerformanceWidget performance={performance} />
          
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Phone:</span> {volunteer.personalInfo.phone}
                </div>
                <div>
                  <span className="font-semibold">Blood Group:</span> {volunteer.personalInfo.bloodGroup}
                </div>
                <div>
                  <span className="font-semibold">Occupation:</span> {volunteer.profileDetails.occupation || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Skills:</span> {volunteer.profileDetails.skills.join(', ') || 'N/A'}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {timeline.length > 0 ? (
                <div className="space-y-4">
                  {timeline.map(activity => (
                    <div key={activity.id} className="flex gap-4 border-b pb-4 last:border-0">
                      <div className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(activity.createdAt, 'PPp')}
                      </div>
                      <div>
                        <div className="font-medium">{activity.action}</div>
                        {activity.metadata && (
                          <pre className="text-xs text-muted-foreground bg-muted p-2 mt-1 rounded-md overflow-auto">
                            {JSON.stringify(activity.metadata, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No activity recorded yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Assignment view will be populated dynamically from the Assignments Collection.
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendance">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Attendance records will be displayed here.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Identity and Medical Documents will be rendered securely via DAM references.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
