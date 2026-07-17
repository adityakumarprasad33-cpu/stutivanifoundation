import { Role } from '@/constants';
import { hasPermission } from '@/lib/auth/guards';

export class PartnerPolicy {
  /**
   * Checks if a user has permission to manage (create, edit, delete, activate) partners.
   */
  static canManage(userRole: Role): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return hasPermission(userRole, 'partners.manage' as any) || userRole === 'super_admin';
  }

  /**
   * Checks if a user can create partners
   */
  static canCreate(userRole: Role): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return hasPermission(userRole, 'partners.create' as any) || this.canManage(userRole);
  }

  /**
   * Checks if a user can edit partners
   */
  static canEdit(userRole: Role): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return hasPermission(userRole, 'partners.edit' as any) || this.canManage(userRole);
  }

  /**
   * Checks if a user can delete partners
   */
  static canDelete(userRole: Role): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return hasPermission(userRole, 'partners.delete' as any) || userRole === 'super_admin';
  }
}
