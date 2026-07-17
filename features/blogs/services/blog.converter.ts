import { FirestoreDataConverter, DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import type { Blog } from '../types/blog.types';

export const blogConverter: FirestoreDataConverter<Blog> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(blog: any): DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...data } = blog;
    
    // Deep convert aiMetadata.lastAnalyzedAt if present
    if (data.aiMetadata?.lastAnalyzedAt instanceof Date) {
      data.aiMetadata.lastAnalyzedAt = Timestamp.fromDate(data.aiMetadata.lastAnalyzedAt);
    }
    
    return {
      ...data,
      publishDate: data.publishDate instanceof Date ? Timestamp.fromDate(data.publishDate) : data.publishDate,
      scheduledPublishDate: data.scheduledPublishDate instanceof Date ? Timestamp.fromDate(data.scheduledPublishDate) : data.scheduledPublishDate,
      createdAt: data.createdAt instanceof Date ? Timestamp.fromDate(data.createdAt) : data.createdAt,
      updatedAt: data.updatedAt instanceof Date ? Timestamp.fromDate(data.updatedAt) : data.updatedAt,
      archivedAt: data.archivedAt instanceof Date ? Timestamp.fromDate(data.archivedAt) : data.archivedAt,
      deletedAt: data.deletedAt instanceof Date ? Timestamp.fromDate(data.deletedAt) : data.deletedAt,
    };
  },
  
  fromFirestore(snapshot: QueryDocumentSnapshot): Blog {
    const data = snapshot.data();
    
    if (data.aiMetadata?.lastAnalyzedAt instanceof Timestamp) {
      data.aiMetadata.lastAnalyzedAt = data.aiMetadata.lastAnalyzedAt.toDate();
    }
    
    return {
      id: snapshot.id,
      ...data,
      publishDate: data.publishDate instanceof Timestamp ? data.publishDate.toDate() : data.publishDate,
      scheduledPublishDate: data.scheduledPublishDate instanceof Timestamp ? data.scheduledPublishDate.toDate() : data.scheduledPublishDate,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt,
      updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : data.updatedAt,
      archivedAt: data.archivedAt instanceof Timestamp ? data.archivedAt.toDate() : data.archivedAt,
      deletedAt: data.deletedAt instanceof Timestamp ? data.deletedAt.toDate() : data.deletedAt,
    } as Blog;
  }
};
