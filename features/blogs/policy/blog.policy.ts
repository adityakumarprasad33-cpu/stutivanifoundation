import type { BlogStatus } from '../types/blog.types';
import type { Role } from '@/constants';

export class BlogPolicy {
  static canCreate(roles: Role[]): boolean {
    return roles.includes('super_admin') || roles.includes('admin');
  }

  static canPublish(roles: Role[]): boolean {
    return roles.includes('super_admin') || roles.includes('admin');
  }

  static canDelete(roles: Role[]): boolean {
    return roles.includes('super_admin');
  }

  static canTransitionStatus(roles: Role[], from: BlogStatus, to: BlogStatus): boolean {
    if (from === to) return true;
    
    // Only admins can move to PUBLISHED, APPROVED, or SCHEDULED
    if (['PUBLISHED', 'APPROVED', 'SCHEDULED'].includes(to)) {
      if (!this.canPublish(roles)) return false;
    }
    
    if (to === 'SOFT_DELETED' || to === 'ARCHIVED') {
      if (!this.canDelete(roles)) return false;
    }
    
    return true;
  }
}
