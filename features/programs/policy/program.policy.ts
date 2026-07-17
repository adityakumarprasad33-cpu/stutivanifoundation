import type { ProgramStatus } from '../types/program.types';
import { Role } from '@/constants';
import { hasPermission } from '@/lib/auth/guards';

export class ProgramPolicy {
  /**
   * Checks if a user can edit a program.
   * Managers can edit unless it's completed, cancelled, or archived.
   * Admins can always edit.
   */
  static canEdit(userRole: Role, programStatus: ProgramStatus): boolean {
    if (userRole === 'super_admin' || userRole === 'admin') return true;
    
    if ((userRole as string) === 'manager') {
      return !['COMPLETED', 'CANCELLED', 'ARCHIVED', 'SOFT_DELETED'].includes(programStatus);
    }
    
    return false;
  }

  /**
   * Checks if a user can publish a program.
   */
  static canPublish(userRole: Role): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return hasPermission(userRole, 'programs.publish' as any);
  }

  /**
   * Evaluates if a state transition is valid for a program.
   */
  static isValidTransition(currentStatus: ProgramStatus, newStatus: ProgramStatus): boolean {
    if (currentStatus === newStatus) return true;

    const allowedTransitions: Record<ProgramStatus, ProgramStatus[]> = {
      DRAFT: ['PENDING_REVIEW', 'SOFT_DELETED'],
      PENDING_REVIEW: ['DRAFT', 'APPROVED', 'SOFT_DELETED'],
      APPROVED: ['PUBLISHED', 'ON_HOLD', 'DRAFT', 'SOFT_DELETED'],
      PUBLISHED: ['ACTIVE', 'ON_HOLD', 'ARCHIVED'],
      ACTIVE: ['ON_HOLD', 'COMPLETED', 'CANCELLED', 'ARCHIVED'],
      ON_HOLD: ['ACTIVE', 'CANCELLED', 'ARCHIVED'],
      COMPLETED: ['ARCHIVED'],
      CANCELLED: ['ARCHIVED'],
      ARCHIVED: ['PUBLISHED', 'SOFT_DELETED'], // Can restore from archive
      SOFT_DELETED: ['DRAFT'] // Can restore from soft delete to draft
    };

    return allowedTransitions[currentStatus]?.includes(newStatus) ?? false;
  }
}
