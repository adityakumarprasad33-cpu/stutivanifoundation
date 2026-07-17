'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import type { Event as DomainEvent } from '../../types/event.types';
import { useRouter } from 'next/navigation';

interface EventCalendarProps {
  events: DomainEvent[];
}

export function EventCalendar({ events }: EventCalendarProps) {
  const router = useRouter();

  // Map domain events to FullCalendar event format
  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.schedule.startDate,
    end: event.schedule.endDate,
    url: `/dashboard/events/${event.slug}`, // Navigate on click
    backgroundColor: getEventColor(event.status),
    borderColor: getEventColor(event.status),
    extendedProps: {
      status: event.status,
      visibility: event.visibility,
    }
  }));

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        events={calendarEvents}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          if (info.event.url) {
            router.push(info.event.url);
          }
        }}
        height="auto"
        aspectRatio={1.35}
        dayMaxEvents={true} // Allow "more" link when too many events
      />
    </div>
  );
}

// Helper for coloring events based on status
function getEventColor(status: string) {
  switch (status) {
    case 'SCHEDULED': return '#3b82f6'; // blue
    case 'REGISTRATION_OPEN': return '#10b981'; // green
    case 'ONGOING': return '#f59e0b'; // amber
    case 'COMPLETED': return '#6b7280'; // gray
    case 'CANCELLED': return '#ef4444'; // red
    case 'DRAFT':
    case 'PENDING_REVIEW': return '#8b5cf6'; // purple
    default: return '#3b82f6';
  }
}
