import { FirebaseRepository } from '@/lib/firebase/shared';
import { COLLECTIONS } from '@/constants';
import type { UserProfile } from './user.types';
import { userConverter } from './user.converter';
import { db } from '@/lib/firebase/client';
import { collection, doc, getDoc } from 'firebase/firestore';
import { DatabaseError } from '@/lib/errors';

export class UserRepository extends FirebaseRepository<UserProfile> {
  constructor() {
    super(COLLECTIONS.USERS);
  }

  private getCollection() {
    return collection(db, this.collectionName).withConverter(userConverter);
  }

  private getDocRef(id: string) {
    return doc(db, this.collectionName, id).withConverter(userConverter);
  }

  async getById(id: string): Promise<UserProfile | null> {
    try {
      const snapshot = await getDoc(this.getDocRef(id));
      if (!snapshot.exists()) return null;
      return snapshot.data();
    } catch (error) {
      throw new DatabaseError(`Failed to fetch user ${id}`, error as Error);
    }
  }

  async getByUid(uid: string): Promise<UserProfile | null> {
     return this.getById(uid);
  }

  async listAll(): Promise<UserProfile[]> {
    const { data } = await this.query({
      limit: 100, // Reasonable default for admin view
    });
    return data;
  }
}
