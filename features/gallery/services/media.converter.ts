import { DocumentData, FirestoreDataConverter, SnapshotOptions, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import type { MediaAsset } from '../types/media.types';

export const mediaConverter: FirestoreDataConverter<MediaAsset> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(media: any): DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...data } = media;
    return {
      ...data,
      createdAt: data.createdAt instanceof Date ? Timestamp.fromDate(data.createdAt) : data.createdAt,
      updatedAt: data.updatedAt instanceof Date ? Timestamp.fromDate(data.updatedAt) : data.updatedAt,
      archivedAt: data.archivedAt instanceof Date ? Timestamp.fromDate(data.archivedAt) : data.archivedAt,
      deletedAt: data.deletedAt instanceof Date ? Timestamp.fromDate(data.deletedAt) : data.deletedAt,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): MediaAsset {
    const data = snapshot.data(options);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convertTimestamp = (ts: any) => {
      if (!ts) return undefined;
      if (ts instanceof Timestamp) return ts.toDate();
      return ts;
    };

    return {
      id: snapshot.id,
      ...data,
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: convertTimestamp(data.updatedAt),
      archivedAt: convertTimestamp(data.archivedAt),
      deletedAt: convertTimestamp(data.deletedAt),
    } as MediaAsset;
  }
};
