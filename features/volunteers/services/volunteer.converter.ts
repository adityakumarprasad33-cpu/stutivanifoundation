import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';
import type { Volunteer } from '../types/volunteer.types';

export const volunteerConverter: FirestoreDataConverter<Volunteer> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(volunteer: Volunteer): any {
    const data = { ...volunteer };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (data as any).id; // ID is the document key

    // Convert dates to Timestamps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toTimestamp = (date: any) => (date instanceof Date ? Timestamp.fromDate(date) : date);

    if (data.createdAt) data.createdAt = toTimestamp(data.createdAt);
    if (data.updatedAt) data.updatedAt = toTimestamp(data.updatedAt);
    if (data.archivedAt) data.archivedAt = toTimestamp(data.archivedAt);
    if (data.deletedAt) data.deletedAt = toTimestamp(data.deletedAt);
    if (data.joinDate) data.joinDate = toTimestamp(data.joinDate);
    if (data.leaveDate) data.leaveDate = toTimestamp(data.leaveDate);

    // Deep Date Conversion for Personal Info
    if (data.personalInfo?.dateOfBirth) {
      data.personalInfo.dateOfBirth = toTimestamp(data.personalInfo.dateOfBirth);
    }

    return data;
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Volunteer {
    const data = snapshot.data(options);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toDate = (timestamp: any) => (timestamp instanceof Timestamp ? timestamp.toDate() : timestamp);

    const personalInfo = data.personalInfo ? {
      ...data.personalInfo,
      dateOfBirth: data.personalInfo.dateOfBirth ? toDate(data.personalInfo.dateOfBirth) : undefined,
    } : data.personalInfo;

    return {
      ...data,
      id: snapshot.id,
      createdAt: data.createdAt ? toDate(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? toDate(data.updatedAt) : new Date(),
      archivedAt: data.archivedAt ? toDate(data.archivedAt) : undefined,
      deletedAt: data.deletedAt ? toDate(data.deletedAt) : undefined,
      joinDate: data.joinDate ? toDate(data.joinDate) : undefined,
      leaveDate: data.leaveDate ? toDate(data.leaveDate) : undefined,
      personalInfo,
    } as Volunteer;
  }
};
