import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  FirestoreDataConverter,
  DocumentData,
  Timestamp,
} from 'firebase/firestore';
import type { Project } from '../types/project.types';

export const projectConverter: FirestoreDataConverter<Project> = {
  toFirestore(project: Project): DocumentData {
    // Exclude the ID when saving to Firestore as it is the document key
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = project;
    
    // Ensure dates are converted to Firestore Timestamps if they are JS Dates
    return {
      ...data,
      startDate: data.startDate instanceof Date ? Timestamp.fromDate(data.startDate) : data.startDate,
      endDate: data.endDate instanceof Date ? Timestamp.fromDate(data.endDate) : data.endDate,
      expectedCompletionDate: data.expectedCompletionDate instanceof Date ? Timestamp.fromDate(data.expectedCompletionDate) : data.expectedCompletionDate,
      createdAt: data.createdAt instanceof Date ? Timestamp.fromDate(data.createdAt) : data.createdAt,
      updatedAt: data.updatedAt instanceof Date ? Timestamp.fromDate(data.updatedAt) : data.updatedAt,
      archivedAt: data.archivedAt instanceof Date ? Timestamp.fromDate(data.archivedAt) : data.archivedAt,
      deletedAt: data.deletedAt instanceof Date ? Timestamp.fromDate(data.deletedAt) : data.deletedAt,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Project {
    const data = snapshot.data(options);
    
    // Convert Firestore Timestamps back to JS Dates for the application layer
    return {
      id: snapshot.id,
      ...data,
      startDate: data.startDate instanceof Timestamp ? data.startDate.toDate() : data.startDate,
      endDate: data.endDate instanceof Timestamp ? data.endDate.toDate() : data.endDate,
      expectedCompletionDate: data.expectedCompletionDate instanceof Timestamp ? data.expectedCompletionDate.toDate() : data.expectedCompletionDate,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt,
      updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : data.updatedAt,
      archivedAt: data.archivedAt instanceof Timestamp ? data.archivedAt.toDate() : data.archivedAt,
      deletedAt: data.deletedAt instanceof Timestamp ? data.deletedAt.toDate() : data.deletedAt,
    } as Project;
  }
};
