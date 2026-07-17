import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { VolunteerAttendance } from '../types/volunteer.types';
import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

export const volunteerAttendanceConverter: FirestoreDataConverter<VolunteerAttendance> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(attendance: VolunteerAttendance): any {
    const data = { ...attendance };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (data as any).id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toTimestamp = (date: any) => (date instanceof Date ? Timestamp.fromDate(date) : date);

    if (data.createdAt) data.createdAt = toTimestamp(data.createdAt);
    if (data.updatedAt) data.updatedAt = toTimestamp(data.updatedAt);
    if (data.checkInTime) data.checkInTime = toTimestamp(data.checkInTime);
    if (data.checkOutTime) data.checkOutTime = toTimestamp(data.checkOutTime);

    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): VolunteerAttendance {
    const data = snapshot.data(options);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toDate = (timestamp: any) => (timestamp instanceof Timestamp ? timestamp.toDate() : timestamp);

    return {
      ...data,
      id: snapshot.id,
      createdAt: data.createdAt ? toDate(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? toDate(data.updatedAt) : new Date(),
      checkInTime: data.checkInTime ? toDate(data.checkInTime) : undefined,
      checkOutTime: data.checkOutTime ? toDate(data.checkOutTime) : undefined,
    } as VolunteerAttendance;
  }
};

export class VolunteerAttendanceRepository extends FirebaseRepository<VolunteerAttendance> {
  constructor() {
    super('volunteer_attendance');
  }


}
