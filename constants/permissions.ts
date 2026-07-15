import { ROLES, UserRole } from './roles';

export const PERMISSIONS = {
  MANAGE_USERS: [ROLES.SUPER_ADMIN],
  MANAGE_PROJECTS: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  MANAGE_BLOGS: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  VIEW_DASHBOARD: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.VOLUNTEER],
} as const;

export const hasPermission = (userRole: UserRole, allowedRoles: readonly UserRole[]) => {
  return allowedRoles.includes(userRole);
};
