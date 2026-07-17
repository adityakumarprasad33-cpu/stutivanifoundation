import type { EventStatus } from '../types/event.types';

export class EventPolicy {
  static canCreate(roles: string[]): boolean {
    return roles.includes('super_admin') || roles.includes('admin') || roles.includes('manager');
  }

  static canPublish(roles: string[]): boolean {
    return roles.includes('super_admin') || roles.includes('admin');
  }

  static canEdit(roles: string[], eventStatus: EventStatus): boolean {
    if (roles.includes('super_admin') || roles.includes('admin')) return true;
    if (roles.includes('manager')) {
      // Managers can't edit CANCELLED, ARCHIVED or SOFT_DELETED
      return !['CANCELLED', 'ARCHIVED', 'SOFT_DELETED'].includes(eventStatus);
    }
    return false;
  }

  static canArchive(roles: string[]): boolean {
    return roles.includes('super_admin') || roles.includes('admin');
  }

  static canDelete(roles: string[]): boolean {
    return roles.includes('super_admin');
  }

  static getAvailableTransitions(currentStatus: EventStatus, roles: string[]): EventStatus[] {
    const isAdmin = roles.includes('super_admin') || roles.includes('admin');
    
    switch (currentStatus) {
      case 'DRAFT':
        return isAdmin ? ['PENDING_REVIEW', 'APPROVED', 'SCHEDULED'] : ['PENDING_REVIEW'];
      case 'PENDING_REVIEW':
        return isAdmin ? ['DRAFT', 'APPROVED', 'SCHEDULED'] : [];
      case 'APPROVED':
        return isAdmin ? ['SCHEDULED', 'REGISTRATION_OPEN', 'CANCELLED', 'DRAFT'] : ['SCHEDULED'];
      case 'SCHEDULED':
        return isAdmin ? ['REGISTRATION_OPEN', 'ONGOING', 'CANCELLED'] : ['REGISTRATION_OPEN', 'ONGOING'];
      case 'REGISTRATION_OPEN':
        return isAdmin ? ['REGISTRATION_CLOSED', 'ONGOING', 'CANCELLED'] : ['REGISTRATION_CLOSED', 'ONGOING'];
      case 'REGISTRATION_CLOSED':
        return isAdmin ? ['REGISTRATION_OPEN', 'ONGOING', 'CANCELLED'] : ['ONGOING'];
      case 'ONGOING':
        return isAdmin ? ['COMPLETED', 'CANCELLED'] : ['COMPLETED'];
      case 'COMPLETED':
        return isAdmin ? ['ARCHIVED'] : [];
      case 'CANCELLED':
        return isAdmin ? ['ARCHIVED', 'DRAFT'] : [];
      case 'ARCHIVED':
        return isAdmin ? ['DRAFT'] : [];
      case 'SOFT_DELETED':
        return isAdmin ? ['DRAFT'] : [];
      default:
        return [];
    }
  }
}
