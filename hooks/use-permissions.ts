import { useAuth } from './use-auth';
import { hasRole, hasPermission, canAccess, isSuperAdmin, isAdmin, isVolunteer } from '@/lib/auth/guards';
import type { Role, Permission } from '@/constants';

export const usePermissions = () => {
  const { role } = useAuth();

  return {
    hasRole: (requiredRole: Role) => role ? hasRole(role, requiredRole) : false,
    hasPermission: (permission: Permission) => role ? hasPermission(role, permission) : false,
    canAccess: (permissions: Permission[]) => role ? canAccess(role, permissions) : false,
    isSuperAdmin: () => role ? isSuperAdmin(role) : false,
    isAdmin: () => role ? isAdmin(role) : false,
    isVolunteer: () => role ? isVolunteer(role) : false,
  };
};
