import { ProjectStatus, Project } from '../types/project.types';
import { Role } from '@/constants';
import { hasPermission } from '@/lib/auth/guards';

export class ProjectPolicy {
  /**
   * Defines the valid state transitions for a project.
   */
  private static readonly VALID_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
    DRAFT: ['PENDING_REVIEW', 'SOFT_DELETED'],
    PENDING_REVIEW: ['APPROVED', 'DRAFT', 'CANCELLED', 'SOFT_DELETED'],
    APPROVED: ['PUBLISHED', 'ACTIVE', 'ON_HOLD', 'CANCELLED'],
    PUBLISHED: ['ACTIVE', 'ON_HOLD', 'ARCHIVED'],
    ACTIVE: ['ON_HOLD', 'COMPLETED', 'CANCELLED'],
    ON_HOLD: ['ACTIVE', 'CANCELLED'],
    COMPLETED: ['ARCHIVED'],
    CANCELLED: ['ARCHIVED'],
    ARCHIVED: ['ACTIVE'], // Restore from archive
    SOFT_DELETED: ['DRAFT'], // Restore from trash
  };

  /**
   * Validates if a state transition is allowed.
   */
  static canTransition(currentStatus: ProjectStatus, targetStatus: ProjectStatus): boolean {
    if (currentStatus === targetStatus) return true;
    const allowed = this.VALID_TRANSITIONS[currentStatus];
    return allowed ? allowed.includes(targetStatus) : false;
  }

  /**
   * Enforces that a status transition is valid, throwing an error if not.
   */
  static enforceTransition(currentStatus: ProjectStatus, targetStatus: ProjectStatus): void {
    if (!this.canTransition(currentStatus, targetStatus)) {
      throw new Error(`Invalid project state transition from ${currentStatus} to ${targetStatus}`);
    }
  }

  /**
   * Checks if a user has permission to edit a specific project based on their role and the project's state.
   */
  static canEdit(userRole: Role, projectStatus: ProjectStatus): boolean {
    if (userRole === 'super_admin' || userRole === 'admin') return true;
    
    // Managers cannot modify completed, cancelled, or archived projects
    if ((userRole as string) === 'manager') {
      return !['COMPLETED', 'CANCELLED', 'ARCHIVED', 'SOFT_DELETED'].includes(projectStatus);
    }
    
    return false;
  }

  /**
   * Checks if a user has permission to perform a permanent deletion.
   */
  static canHardDelete(userRole: Role): boolean {
    return userRole === 'super_admin';
  }

  /**
   * Checks if a user can publish a project.
   */
  static canPublish(userRole: Role): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return hasPermission(userRole, 'projects.publish' as any);
  }

  /**
   * Derives calculated financial metrics for a project
   */
  static calculateFinancials(project: Project) {
    const { approvedBudget, fundsRaised, fundsUtilized, estimatedBudget } = project.financials;
    const targetBudget = approvedBudget > 0 ? approvedBudget : estimatedBudget;
    
    return {
      remainingBudget: Math.max(0, targetBudget - fundsUtilized),
      fundraisingProgress: targetBudget > 0 ? (fundsRaised / targetBudget) * 100 : 0,
      utilizationProgress: fundsRaised > 0 ? (fundsUtilized / fundsRaised) * 100 : 0,
    };
  }
}
