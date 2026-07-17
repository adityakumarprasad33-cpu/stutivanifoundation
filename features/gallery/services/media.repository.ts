import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { MediaAsset, AssetType } from '../types/media.types';
import { db } from '@/lib/firebase/client';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { DatabaseError } from '@/lib/errors';

export class MediaRepository extends FirebaseRepository<MediaAsset> {
  constructor() {
    super('media');
  }

  async getRecentAssets(limitCount = 20, types?: AssetType[]): Promise<MediaAsset[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filters: { field: string, operator: string, value: any }[] = [];
      filters.push({ field: 'status', operator: '==', value: 'READY' });
      filters.push({ field: 'visibility', operator: 'in', value: ['PUBLIC', 'INTERNAL'] });
      
      if (types && types.length > 0) {
        filters.push({ field: 'assetType', operator: 'in', value: types });
      }

      const { data } = await this.query({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filters: filters as any,
        sort: [{ field: 'createdAt', direction: 'desc' }],
        limit: limitCount
      });
      return data;
    } catch (error) {
      throw new DatabaseError('Failed to fetch recent media assets', error instanceof Error ? error : undefined);
    }
  }

  async searchAssets(searchTerm: string): Promise<MediaAsset[]> {
    const normalized = searchTerm.toLowerCase().trim();
    const q = query(
      collection(db, this.collectionName),
      where('normalizedTitle', '>=', normalized),
      where('normalizedTitle', '<=', normalized + '\uf8ff'),
      limit(20)
    );
    
    try {
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as unknown as MediaAsset[];
    } catch {
      return [];
    }
  }
}
