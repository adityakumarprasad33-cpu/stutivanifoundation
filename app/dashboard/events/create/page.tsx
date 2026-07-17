import React from 'react';
import { requirePermission } from '@/lib/auth/server-guards';
import { EventForm } from '@/features/events/components/event-form';
import { createEvent } from '@/features/events/actions/event.actions';

export default async function CreateEventPage() {
  await requirePermission('events.create');

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Event</h1>
        <p className="text-gray-500 dark:text-gray-400">Plan and schedule a new event</p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <EventForm onSubmitAction={createEvent} />
      </div>
    </div>
  );
}
