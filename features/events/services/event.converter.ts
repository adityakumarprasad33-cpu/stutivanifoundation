import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';
import type { Event } from '../types/event.types';

export const eventConverter: FirestoreDataConverter<Event> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(event: Event): any {
    const data = { ...event };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (data as any).id; // ID is the document key

    // Convert dates to Timestamps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toTimestamp = (date: any) => (date instanceof Date ? Timestamp.fromDate(date) : date);

    if (data.createdAt) data.createdAt = toTimestamp(data.createdAt);
    if (data.updatedAt) data.updatedAt = toTimestamp(data.updatedAt);
    if (data.archivedAt) data.archivedAt = toTimestamp(data.archivedAt);
    if (data.deletedAt) data.deletedAt = toTimestamp(data.deletedAt);

    if (data.schedule) {
      if (data.schedule.startDate) data.schedule.startDate = toTimestamp(data.schedule.startDate);
      if (data.schedule.endDate) data.schedule.endDate = toTimestamp(data.schedule.endDate);
      if (data.schedule.registrationStart) data.schedule.registrationStart = toTimestamp(data.schedule.registrationStart);
      if (data.schedule.registrationEnd) data.schedule.registrationEnd = toTimestamp(data.schedule.registrationEnd);
    }

    return data;
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Event {
    const data = snapshot.data(options);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toDate = (timestamp: any) => (timestamp instanceof Timestamp ? timestamp.toDate() : timestamp);

    const schedule = data.schedule ? {
      ...data.schedule,
      startDate: toDate(data.schedule.startDate),
      endDate: toDate(data.schedule.endDate),
      registrationStart: toDate(data.schedule.registrationStart),
      registrationEnd: toDate(data.schedule.registrationEnd),
    } : undefined;

    return {
      ...data,
      id: snapshot.id,
      schedule,
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
      archivedAt: data.archivedAt ? toDate(data.archivedAt) : undefined,
      deletedAt: data.deletedAt ? toDate(data.deletedAt) : undefined,
    } as Event;
  },
};
