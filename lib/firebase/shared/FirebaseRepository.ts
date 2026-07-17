import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  type QueryConstraint,
} from 'firebase/firestore';
import { db } from '../client';
import { IRepository, QueryOptions, PaginationResult } from '../../repository/IRepository';
import { DatabaseError, NotFoundError } from '../../errors';

export class FirebaseRepository<T extends { id: string }> implements IRepository<T> {
  constructor(protected collectionName: string) {}

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    try {
      const colRef = collection(db, this.collectionName);
      const docData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: (data as Record<string, unknown>).status || 'active', // default per schema guidelines
      };
      const docRef = await addDoc(colRef, docData);
      return this.getById(docRef.id) as Promise<T>;
    } catch (error) {
      throw new DatabaseError(`Failed to create document in ${this.collectionName}`, error as Error);
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      
      const data = snapshot.data();
      return {
        id: snapshot.id,
        ...data,
        // Convert Firestore timestamps to Dates if needed (done generally at converter level, but keeping types safe here)
      } as unknown as T;
    } catch (error) {
      throw new DatabaseError(`Failed to fetch document ${id} from ${this.collectionName}`, error as Error);
    }
  }

  async update(id: string, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) {
        throw new NotFoundError(`Document ${id} not found in ${this.collectionName}`);
      }

      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });

      return this.getById(id) as Promise<T>;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(`Failed to update document ${id} in ${this.collectionName}`, error as Error);
    }
  }

  async delete(id: string, soft = true): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      
      if (soft) {
        await updateDoc(docRef, {
          status: 'archived',
          updatedAt: serverTimestamp(),
        });
      } else {
        await deleteDoc(docRef);
      }
    } catch (error) {
      throw new DatabaseError(`Failed to delete document ${id} in ${this.collectionName}`, error as Error);
    }
  }

  async query(options?: QueryOptions): Promise<PaginationResult<T>> {
    try {
      const colRef = collection(db, this.collectionName);
      const constraints: QueryConstraint[] = [];

      // Filters
      if (options?.filters) {
        options.filters.forEach((f) => {
          constraints.push(where(f.field, f.operator as import('firebase/firestore').WhereFilterOp, f.value));
        });
      }

      // Default active status filter if soft delete is used globally, unless overriden
      const hasStatusFilter = options?.filters?.some(f => f.field === 'status');
      if (!hasStatusFilter && !options?.skipStatusFilter) {
         constraints.push(where('status', '!=', 'archived'));
      }

      // Sort
      if (options?.sort) {
        options.sort.forEach((s) => {
          constraints.push(orderBy(s.field, s.direction));
        });
      }

      // Pagination setup
      if (options?.limit) {
        constraints.push(limit(options.limit));
      } else {
        constraints.push(limit(20)); // Default limit
      }

      if (options?.cursor) {
        const cursorDoc = await getDoc(doc(db, this.collectionName, options.cursor));
        if (cursorDoc.exists()) {
          constraints.push(startAfter(cursorDoc));
        }
      }

      const finalQuery = query(colRef, ...constraints);
      const snapshot = await getDocs(finalQuery);
      
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as unknown as T[];

      const lastCursor = snapshot.docs[snapshot.docs.length - 1]?.id;

      return {
        data,
        hasMore: data.length === (options?.limit || 20),
        lastCursor,
      };

    } catch (error) {
      throw new DatabaseError(`Failed to query ${this.collectionName}`, error as Error);
    }
  }
}
