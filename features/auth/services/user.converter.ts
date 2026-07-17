import type { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import type { UserProfile } from './user.types';
import { userSchema } from './user.types';
import { ValidationError } from '@/lib/errors';
import { phoneSchema } from '@/lib/validation';

export const userConverter = {
  toFirestore(user: UserProfile): DocumentData {
    const data = { ...user } as Record<string, unknown>;
    delete data.id;
    return data;
  },
  
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): UserProfile {
    const data = snapshot.data(options);
    
    // Sanitize legacy phone numbers
    if (data.phoneNumber) {
      const phoneCheck = phoneSchema.safeParse(data.phoneNumber);
      if (!phoneCheck.success) {
        delete data.phoneNumber;
      }
    }

    const parseDate = (val: any) => {
      if (!val) return undefined;
      if (typeof val.toDate === 'function') return val.toDate();
      if (typeof val === 'string' || typeof val === 'number') return new Date(val);
      return val;
    };

    const rawData = {
      ...data,
      id: snapshot.id,
      roles: data.roles || (data.role ? [data.role] : ['public']),
      lastSelectedRole: data.lastSelectedRole || data.role || 'public',
      status: data.status || 'PENDING',
      language: data.language || 'en',
      timezone: data.timezone || 'Asia/Kolkata',
      theme: data.theme || 'system',
      notificationPreferences: data.notificationPreferences || {},
      emailVerified: data.emailVerified || false,
      phoneVerified: data.phoneVerified || false,
      deleted: data.deleted || false,
      deletedAt: parseDate(data.deletedAt),
      lastLogin: parseDate(data.lastLogin),
      createdAt: parseDate(data.createdAt) || new Date(),
      updatedAt: parseDate(data.updatedAt) || new Date(),
    };

    const parsed = userSchema.safeParse(rawData);
    if (!parsed.success) {
      console.error(`Invalid User Document [${snapshot.id}]:`, JSON.stringify(parsed.error.format(), null, 2));
      throw new ValidationError(`Failed to parse User [${snapshot.id}]`, parsed.error.format());
    }
    
    return parsed.data;
  }
};
