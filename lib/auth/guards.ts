import { ROLES, type Role, type Permission } from '@/constants';
import { PERMISSION_MATRIX } from './permission-matrix';

/**
 * Verifies if a role exactly matches the required role.
 */
export const hasRole = (userRole: Role, requiredRole: Role): boolean => {
  return userRole === requiredRole;
};

/**
 * Verifies if a role has a specific permission based on the matrix.
 */
export const hasPermission = (userRole: Role, requiredPermission: Permission): boolean => {
  const permissions = PERMISSION_MATRIX[userRole] || [];
  return permissions.includes(requiredPermission);
};

/**
 * Checks if the user is a super admin.
 */
export const isSuperAdmin = (userRole: Role): boolean => {
  return userRole === ROLES.SUPER_ADMIN;
};

/**
 * Checks if the user is an admin or super admin.
 */
export const isAdmin = (userRole: Role): boolean => {
  return userRole === ROLES.SUPER_ADMIN || userRole === ROLES.ADMIN;
};

/**
 * Checks if the user is a volunteer.
 */
export const isVolunteer = (userRole: Role): boolean => {
  return userRole === ROLES.VOLUNTEER;
};

/**
 * Validates if the user has AT LEAST ONE of the required permissions.
 */
export const canAccess = (userRole: Role, requiredPermissions: Permission[]): boolean => {
  if (isSuperAdmin(userRole)) return true; // Super admins can do everything
  return requiredPermissions.some((permission) => hasPermission(userRole, permission));
};
