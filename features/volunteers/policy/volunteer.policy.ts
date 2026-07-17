import type { VolunteerStatus } from '../types/volunteer.types';

export class VolunteerPolicy {
  static canCreate(roles: string[]): boolean {
    return roles.includes('SUPER_ADMIN') || roles.includes('ADMIN') || roles.includes('COORDINATOR');
  }

  static canEdit(roles: string[], currentStatus: VolunteerStatus): boolean {
    if (roles.includes('SUPER_ADMIN') || roles.includes('ADMIN')) return true;
    if (roles.includes('COORDINATOR')) {
      return !['ARCHIVED', 'PERMANENT_DELETE'].includes(currentStatus);
    }
    return false;
  }

  static canDelete(roles: string[]): boolean {
    return roles.includes('SUPER_ADMIN') || roles.includes('ADMIN');
  }

  static canArchive(roles: string[]): boolean {
    return roles.includes('SUPER_ADMIN') || roles.includes('ADMIN') || roles.includes('COORDINATOR');
  }

  static canRestore(roles: string[]): boolean {
    return roles.includes('SUPER_ADMIN') || roles.includes('ADMIN');
  }
  
  static canAssign(roles: string[]): boolean {
    return roles.includes('SUPER_ADMIN') || roles.includes('ADMIN') || roles.includes('COORDINATOR');
  }
}
