import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { Event } from '../types/event.types';
import type { PaginationResult } from '@/lib/repository/IRepository';
import { db } from '@/lib/firebase/client';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { eventConverter } from './event.converter';

export class EventRepository extends FirebaseRepository<Event> {
  constructor() {
    super('events');
  }

  // Override getById to use converter if we want or just manually map dates (FirebaseRepository doesn't natively use our nested converter for getById)
  // Actually, we can just use this.query since it's already there, but let's provide custom methods for UI.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getUpcomingEvents(options?: any): Promise<PaginationResult<Event>> {
    return this.query({
      ...options,
      filters: [
        ...(options?.filters || []),
        { field: 'status', operator: 'in', value: ['APPROVED', 'SCHEDULED', 'REGISTRATION_OPEN', 'ONGOING'] },
        { field: 'visibility', operator: '==', value: 'PUBLIC' }
      ],
      sort: [
        { field: 'schedule.startDate', direction: 'asc' }
      ]
    });
  }

  async getEventsByDateRange(start: Date, end: Date): Promise<Event[]> {
    const eventsRef = collection(db, this.collectionName).withConverter(eventConverter);
    const q = query(
      eventsRef,
      where('schedule.startDate', '>=', start),
      where('schedule.startDate', '<=', end),
      where('deletedAt', '==', null),
      orderBy('schedule.startDate', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async queryWithConverter(options?: any): Promise<PaginationResult<Event>> {
    // Basic fallback to parent query for now, but we handle dates mostly via mapping or the generic Repository
    const res = await this.query(options);
    
    // Convert nested dates for schedule since generic FirebaseRepository only handles top-level timestamps.
  
    const mappedData = res.data.map(event => {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       const sched = event.schedule as any;
       if (sched) {
         if (sched.startDate && sched.startDate.toDate) sched.startDate = sched.startDate.toDate();
         if (sched.endDate && sched.endDate.toDate) sched.endDate = sched.endDate.toDate();
         if (sched.registrationStart && sched.registrationStart.toDate) sched.registrationStart = sched.registrationStart.toDate();
         if (sched.registrationEnd && sched.registrationEnd.toDate) sched.registrationEnd = sched.registrationEnd.toDate();
       }
       return event;
    });

    return { ...res, data: mappedData };
  }
}
