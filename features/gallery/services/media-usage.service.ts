import { MediaRepository } from './media.repository';
import { DatabaseError } from '@/lib/errors';

export class MediaUsageService {
  private repo = new MediaRepository();

  async registerUsage(
    mediaId: string, 
    module: string, 
    entityType: string, 
    entityId: string, 
    fieldName: string
  ): Promise<void> {
    const media = await this.repo.getById(mediaId);
    if (!media) throw new DatabaseError(`Media ${mediaId} not found`);

    const existingUsageIndex = media.usages?.findIndex(
      u => u.module === module && u.entityId === entityId && u.fieldName === fieldName
    );

    const usages = media.usages || [];
    
    if (existingUsageIndex !== undefined && existingUsageIndex >= 0) {
      usages[existingUsageIndex].lastUsedAt = new Date();
    } else {
      usages.push({
        module,
        entityType,
        entityId,
        fieldName,
        lastUsedAt: new Date()
      });
    }

    await this.repo.update(mediaId, {
      usages,
      referenceCount: usages.length,

    });
  }

  async removeUsage(
    mediaId: string, 
    module: string, 
    entityId: string, 
    fieldName: string
  ): Promise<void> {
    const media = await this.repo.getById(mediaId);
    if (!media) return;

    const usages = (media.usages || []).filter(
      u => !(u.module === module && u.entityId === entityId && u.fieldName === fieldName)
    );

    await this.repo.update(mediaId, {
      usages,
      referenceCount: usages.length,

    });
  }

  async isAssetUsed(mediaId: string): Promise<boolean> {
    const media = await this.repo.getById(mediaId);
    if (!media) return false;
    return media.referenceCount > 0;
  }
}
