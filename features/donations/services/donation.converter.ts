import { QueryDocumentSnapshot, SnapshotOptions, Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { Donation } from '../types/donation.types';

export const donationConverter: FirestoreDataConverter<Donation> = {
  toFirestore(donation: Donation) {
    return {
      ...donation,
      donationDate: donation.donationDate ? Timestamp.fromDate(donation.donationDate) : null,
      createdAt: donation.createdAt ? Timestamp.fromDate(donation.createdAt) : Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Donation {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = snapshot.data(options) as Record<string, any>;
    return {
      id: snapshot.id,
      ...data,
      donationDate: data.donationDate instanceof Timestamp ? data.donationDate.toDate() : new Date(data.donationDate),
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
      updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
    } as Donation;
  }
};
