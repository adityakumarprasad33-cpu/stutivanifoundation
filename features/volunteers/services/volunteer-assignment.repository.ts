import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { VolunteerAssignment } from '../types/volunteer.types';
import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

export const volunteerAssignmentConverter: FirestoreDataConverter<VolunteerAssignment> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(assignment: VolunteerAssignment): any {
    const data = { ...assignment };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (data as any).id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toTimestamp = (date: any) => (date instanceof Date ? Timestamp.fromDate(date) : date);

    if (data.createdAt) data.createdAt = toTimestamp(data.createdAt);
    if (data.updatedAt) data.updatedAt = toTimestamp(data.updatedAt);
    if (data.startDate) data.startDate = toTimestamp(data.startDate);
    if (data.endDate) data.endDate = toTimestamp(data.endDate);
    if (data.assignedAt) data.assignedAt = toTimestamp(data.assignedAt);

    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): VolunteerAssignment {
    const data = snapshot.data(options);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toDate = (timestamp: any) => (timestamp instanceof Timestamp ? timestamp.toDate() : timestamp);

    return {
      ...data,
      id: snapshot.id,
      createdAt: data.createdAt ? toDate(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? toDate(data.updatedAt) : new Date(),
      startDate: data.startDate ? toDate(data.startDate) : undefined,
      endDate: data.endDate ? toDate(data.endDate) : undefined,
      assignedAt: data.assignedAt ? toDate(data.assignedAt) : new Date(),
    } as VolunteerAssignment;
  }
};

export class VolunteerAssignmentRepository extends FirebaseRepository<VolunteerAssignment> {
  constructor() {
    super('volunteer_assignments');
  }


}
