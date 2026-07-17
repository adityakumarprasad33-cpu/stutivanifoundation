import { FirebaseRepository } from '@/lib/firebase/shared';
import { COLLECTIONS } from '@/constants';
import type { ActivityLog, CreateActivityLogDTO } from './activity.types';
import { db } from '@/lib/firebase/client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export class ActivityRepository extends FirebaseRepository<ActivityLog> {
  constructor() {
    super(COLLECTIONS.ACTIVITY_LOGS);
  }

  // Override create to strictly enforce logging without complex converters since it's append-only
  async log(data: CreateActivityLogDTO): Promise<void> {
    try {
      const colRef = collection(db, this.collectionName);
      await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Failed to write activity log', error);
      // We don't throw Activity logs errors up to avoid breaking user flows
    }
  }
}

export const activityRepository = new ActivityRepository();
