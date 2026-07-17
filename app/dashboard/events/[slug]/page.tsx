import React from 'react';
import { requirePermission } from '@/lib/auth/server-guards';
import { EventRepository } from '@/features/events/services/event.repository';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit, Users, Image as ImageIcon, MapPin, Calendar, Activity } from 'lucide-react';
import { EventStatisticsService } from '@/features/events/services/event-statistics.service';
import { EventRegistrationWidget } from '@/features/events/components/widgets/event-widgets';

export default async function EventWorkspacePage({
  params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  await requirePermission('events.view');

  const eventRepo = new EventRepository();
  const { data: events } = await eventRepo.query({
    filters: [{ field: 'slug', operator: '==', value: resolvedParams.slug }]
  });

  const event = events[0];
  if (!event) return notFound();

  const stats = EventStatisticsService.compute(event);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{event.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> {event.schedule?.startDate ? new Date(event.schedule.startDate).toLocaleDateString() : 'TBD'}</span>
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1"/> {event.location?.locationType}</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30">{event.status}</span>
          </div>
        </div>
        <Link href={`/dashboard/events/${event.slug}/edit`}>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Event
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 flex flex-wrap gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                <p className="text-gray-600 dark:text-gray-300">{event.detailedDescription}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="block text-gray-900 dark:text-gray-100">Category</strong>
                    <span className="text-gray-500">{event.category}</span>
                  </div>
                  <div>
                    <strong className="block text-gray-900 dark:text-gray-100">Event Type</strong>
                    <span className="text-gray-500">{event.eventType}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <EventRegistrationWidget stats={stats} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Schedule & Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <strong className="block text-gray-900 dark:text-gray-100 mb-2">Timings</strong>
                <p className="text-gray-500">Start: {event.schedule?.startDate ? new Date(event.schedule.startDate).toLocaleString() : 'N/A'}</p>
                <p className="text-gray-500">End: {event.schedule?.endDate ? new Date(event.schedule.endDate).toLocaleString() : 'N/A'}</p>
              </div>
              <div>
                <strong className="block text-gray-900 dark:text-gray-100 mb-2">Venue</strong>
                <p className="text-gray-500">{event.location?.venueName || 'No venue specified'}</p>
                <p className="text-gray-500">{event.location?.address}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="registration">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[200px]">
             <div className="text-center text-gray-500">
               <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
               <p>Registration engine preparation complete.</p>
               <p className="text-xs mt-1">Full registration UI to be implemented in a future phase.</p>
             </div>
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[200px]">
             <div className="text-center text-gray-500">
               <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
               <p>Attendance tracking preparation complete.</p>
               <p className="text-xs mt-1">QR scanning and check-in UI to be implemented in a future phase.</p>
             </div>
          </div>
        </TabsContent>

        <TabsContent value="media">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[200px]">
             <div className="text-center text-gray-500">
               <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
               <p>Media Library Integration Active</p>
               <p className="text-xs mt-1">Manage event media through the Edit Event form using the unified DAM selector.</p>
             </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
