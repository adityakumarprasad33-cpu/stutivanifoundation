import { FirestoreDataConverter, DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import type { Partner } from '../types/partner.types';
import { Timestamp } from 'firebase/firestore';

export const partnerConverter: FirestoreDataConverter<Partner> = {
  toFirestore(partner: Partner): DocumentData {
    return {
      ...partner,
      startDate: partner.startDate ? Timestamp.fromDate(partner.startDate) : null,
      endDate: partner.endDate ? Timestamp.fromDate(partner.endDate) : null,
      createdAt: Timestamp.fromDate(partner.createdAt),
      updatedAt: Timestamp.fromDate(partner.updatedAt),
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions
  ): Partner {
    const data = snapshot.data(options);
    
    return {
      id: snapshot.id,
      name: data.name,
      slug: data.slug,
      logoMediaId: data.logoMediaId,
      websiteUrl: data.websiteUrl,
      description: data.description,
      partnerType: data.partnerType,
      displayOrder: data.displayOrder || 0,
      featured: data.featured || false,
      active: data.active ?? true,
      startDate: data.startDate ? data.startDate.toDate() : null,
      endDate: data.endDate ? data.endDate.toDate() : null,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  },
};
