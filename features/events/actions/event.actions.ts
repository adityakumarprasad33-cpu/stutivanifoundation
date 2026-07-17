'use server';

import { revalidatePath } from 'next/cache';
import { requirePermission, requireAuth } from '@/lib/auth/server-guards';
import { EventRepository } from '../services/event.repository';
import { eventFormSchema } from '../validation/event.schemas';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
import { EventService } from '../services/event.service';
import type { CreateEventDTO, UpdateEventDTO } from '../types/event.types';

export async function createEvent(data: unknown) {
  try {
    const user = await requireAuth();
    await requirePermission('events.create');

    const validated = eventFormSchema.parse(data);
    
    // Additional domain logic validation
    if (!EventService.validateSchedule(validated.schedule)) {
      throw new Error('Invalid schedule dates');
    }
    
    const eventRepo = new EventRepository();
    const activityRepo = new ActivityRepository();

    const slug = validated.slug || EventService.generateSlug(validated.title);

    const eventObj: CreateEventDTO = {
      ...validated,
      slug,
      normalizedTitle: validated.title.toLowerCase(),
      searchVector: EventService.generateSearchVector(validated.title, validated.tags),
      capacity: {
        maximumCapacity: validated.capacity.maximumCapacity,
        expectedAttendance: validated.capacity.expectedAttendance,
        currentRegistrations: 0,
        actualAttendance: 0
      },
      analytics: {
        views: 0,
        shares: 0,
      },
      ai: {},
      seo: {
        metaTitle: validated.seo?.metaTitle || '',
        metaDescription: validated.seo?.metaDescription || '',
        focusKeyword: validated.seo?.focusKeyword || '',
        keywords: validated.seo?.keywords || [],
        noIndex: validated.seo?.noIndex || false,
        noFollow: validated.seo?.noFollow || false,
      },
      createdBy: user.id,
      updatedBy: user.id,
    };

    const created = await eventRepo.create(eventObj);

    await activityRepo.log({
      action: 'EVENT_CREATED',
      module: 'EVENTS',
      userId: user.id,
      description: `Created event: ${validated.title}`,
      metadata: { entityId: created.id, title: validated.title }
    });

    revalidatePath('/dashboard/events');
    return { success: true, slug: created.slug };
  } catch (error: unknown) {
    console.error('Error creating event:', error);
    return { success: false, error: (error as Error).message || 'Failed to create event' };
  }
}

export async function updateEvent(id: string, data: unknown) {
  try {
    const user = await requireAuth();
    await requirePermission('events.edit');

    const validated = eventFormSchema.parse(data);
    const eventRepo = new EventRepository();
    const activityRepo = new ActivityRepository();

    const existing = await eventRepo.getById(id);
    if (!existing) throw new Error('Event not found');

    const updateObj: UpdateEventDTO = {
      ...validated,
      normalizedTitle: validated.title.toLowerCase(),
      searchVector: EventService.generateSearchVector(validated.title, validated.tags),
      capacity: {
        ...existing.capacity,
        maximumCapacity: validated.capacity.maximumCapacity,
        expectedAttendance: validated.capacity.expectedAttendance,
      },
      seo: {
        metaTitle: validated.seo?.metaTitle || '',
        metaDescription: validated.seo?.metaDescription || '',
        focusKeyword: validated.seo?.focusKeyword || '',
        keywords: validated.seo?.keywords || [],
        noIndex: validated.seo?.noIndex || false,
        noFollow: validated.seo?.noFollow || false,
      },
      updatedBy: user.id,
    };

    await eventRepo.update(id, updateObj);

    await activityRepo.log({
      action: 'EVENT_UPDATED',
      module: 'EVENTS',
      userId: user.id,
      description: `Updated event: ${validated.title}`,
      metadata: { entityId: existing.id, title: validated.title }
    });

    revalidatePath(`/dashboard/events/${existing.slug}`);
    revalidatePath('/dashboard/events');
    return { success: true };
  } catch (error: unknown) {
    console.error('Error updating event:', error);
    return { success: false, error: (error as Error).message || 'Failed to update event' };
  }
}

export async function deleteEvent(id: string) {
  try {
    const user = await requireAuth();
    await requirePermission('events.delete');

    const eventRepo = new EventRepository();
    const activityRepo = new ActivityRepository();
    
    const existing = await eventRepo.getById(id);
    if (!existing) throw new Error('Event not found');

    await eventRepo.delete(id);

    await activityRepo.log({
      action: 'EVENT_DELETED',
      module: 'EVENTS',
      userId: user.id,
      description: `Deleted event: ${existing.title}`,
      metadata: { entityId: id, title: existing.title }
    });

    revalidatePath('/dashboard/events');
    return { success: true };
  } catch (error: unknown) {
    console.error('Error deleting event:', error);
    return { success: false, error: (error as Error).message || 'Failed to delete event' };
  }
}
