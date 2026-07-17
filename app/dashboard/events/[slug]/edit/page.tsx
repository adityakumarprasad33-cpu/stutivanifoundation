import React from 'react';
import { requirePermission } from '@/lib/auth/server-guards';
import { EventRepository } from '@/features/events/services/event.repository';
import { EventForm } from '@/features/events/components/event-form';
import { updateEvent } from '@/features/events/actions/event.actions';
import { notFound } from 'next/navigation';

export default async function EditEventPage({
  params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  await requirePermission('events.edit');

  const eventRepo = new EventRepository();
  const { data: events } = await eventRepo.query({
    filters: [{ field: 'slug', operator: '==', value: resolvedParams.slug }]
  });

  const event = events[0];
  if (!event) return notFound();

  // Create a closure that binds the event ID to the update action
  const handleUpdate = async (data: unknown) => {
    'use server';
    return updateEvent(event.id, data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Event</h1>
        <p className="text-gray-500 dark:text-gray-400">Update event details for {event.title}</p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <EventForm initialData={event} onSubmitAction={handleUpdate} />
      </div>
    </div>
  );
}
