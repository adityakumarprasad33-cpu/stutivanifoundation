import React from 'react';
import { requirePermission } from '@/lib/auth/server-guards';
import { EventRepository } from '@/features/events/services/event.repository';
import { EventCalendar } from '@/features/events/components/calendar/event-calendar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function EventsPage() {
  await requirePermission('events.view');

  const eventRepo = new EventRepository();
  const { data: events } = await eventRepo.query({ sort: [{ field: 'schedule.startDate', direction: 'asc' }] });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Events</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage organizational events and schedules</p>
        </div>
        <Link href="/dashboard/events/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="bg-white dark:bg-gray-900 p-2 rounded-lg">
          {/* We must handle date parsing for the Calendar since it's a Client Component */}
          <EventCalendar events={events} />
        </TabsContent>

        <TabsContent value="list">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Event</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Start Date</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Capacity</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {event.title}
                      <p className="text-xs text-gray-500">{event.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {event.schedule?.startDate ? new Date(event.schedule.startDate).toLocaleDateString() : 'TBD'}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {event.capacity?.currentRegistrations} / {event.capacity?.maximumCapacity === 0 ? '∞' : event.capacity?.maximumCapacity}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/dashboard/events/${event.slug}`} className="text-blue-600 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
