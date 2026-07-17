import { MediaAsset, MediaStatus } from '../types/media.types';
import type { Role } from '@/constants';

export class MediaPolicy {
  static canUpload(roles: Role[]): boolean {
    return roles.includes('super_admin') || roles.includes('admin');
  }

  static canDelete(roles: Role[]): boolean {
    return roles.includes('super_admin');
  }

  static canArchive(roles: Role[]): boolean {
    return roles.includes('super_admin') || roles.includes('admin');
  }
  
  static canEdit(roles: Role[]): boolean {
    return roles.includes('super_admin') || roles.includes('admin');
  }

  static isSafeToDelete(media: MediaAsset): boolean {
    return media.referenceCount === 0;
  }

  static canTransitionStatus(currentStatus: MediaStatus, newStatus: MediaStatus): boolean {
    const validTransitions: Record<MediaStatus, MediaStatus[]> = {
      TEMP_UPLOAD: ['UPLOADED', 'BROKEN_REFERENCE'],
      UPLOADED: ['PROCESSING', 'READY', 'SOFT_DELETED'],
      PROCESSING: ['READY', 'BROKEN_REFERENCE'],
      READY: ['ARCHIVED', 'SOFT_DELETED'],
      ARCHIVED: ['READY', 'SOFT_DELETED'],
      SOFT_DELETED: ['READY', 'ARCHIVED'],
      BROKEN_REFERENCE: ['READY', 'SOFT_DELETED', 'MISSING_ASSET'],
      MISSING_ASSET: ['SOFT_DELETED']
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
  }
}
