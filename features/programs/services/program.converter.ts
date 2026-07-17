import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, DocumentData, Timestamp } from 'firebase/firestore';
import type { Program } from '../types/program.types';

export const programConverter: FirestoreDataConverter<Program> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(program: any): DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...data } = program;
    
    // Convert Date objects back to Timestamps if needed for storage
    // But since Firestore Client SDK automatically handles Dates if configured,
    // or we explicitly store them as dates, we just ensure no undefined sneaks in.
    
    return {
      ...data,
      startDate: data.startDate ? Timestamp.fromDate(new Date(data.startDate as Date)) : null,
      endDate: data.endDate ? Timestamp.fromDate(new Date(data.endDate as Date)) : null,
      expectedCompletionDate: data.expectedCompletionDate ? Timestamp.fromDate(new Date(data.expectedCompletionDate as Date)) : null,
      createdAt: data.createdAt ? Timestamp.fromDate(new Date(data.createdAt as Date)) : Timestamp.now(),
      updatedAt: data.updatedAt ? Timestamp.fromDate(new Date(data.updatedAt as Date)) : Timestamp.now(),
      archivedAt: data.archivedAt ? Timestamp.fromDate(new Date(data.archivedAt as Date)) : null,
      deletedAt: data.deletedAt ? Timestamp.fromDate(new Date(data.deletedAt as Date)) : null,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Program {
    const data = snapshot.data(options);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convertTimestamp = (ts: any) => {
      if (!ts) return undefined;
      if (ts instanceof Timestamp) return ts.toDate();
      if (ts.toDate) return ts.toDate(); // Handle custom mock timestamps
      return ts;
    };

    return {
      id: snapshot.id,
      ...data,
      startDate: convertTimestamp(data.startDate),
      endDate: convertTimestamp(data.endDate),
      expectedCompletionDate: convertTimestamp(data.expectedCompletionDate),
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: convertTimestamp(data.updatedAt),
      archivedAt: convertTimestamp(data.archivedAt),
      deletedAt: convertTimestamp(data.deletedAt),
    } as Program;
  }
};
