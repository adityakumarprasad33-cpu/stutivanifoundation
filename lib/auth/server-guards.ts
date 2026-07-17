import 'server-only';
import { verifySession } from './session.server';
import { UserRepository } from '@/features/auth/services';
import { AuthenticationError, AuthorizationError } from '@/lib/errors';
import { hasRole, hasPermission } from './guards';
import { ROLES, type Role, type Permission } from '@/constants';
import type { UserProfile } from '@/features/auth/services/user.types';

export const requireAuth = async (): Promise<UserProfile> => {
  const claims = await verifySession();
  if (!claims) {
    throw new AuthenticationError('Authentication required');
  }

  const userRepo = new UserRepository();
  const user = await userRepo.getByUid(claims.uid);

  if (!user) {
    throw new AuthenticationError('User profile not found');
  }

  if (user.status !== 'ACTIVE') {
    throw new AuthorizationError('Account is not active');
  }

  return user;
};

export const requireRole = async (requiredRole: Role): Promise<UserProfile> => {
  const user = await requireAuth();
  const userRole = user.lastSelectedRole || user.roles[0] || ROLES.PUBLIC;
  
  if (!hasRole(userRole, requiredRole)) {
    throw new AuthorizationError(`Role ${requiredRole} is required`);
  }

  return user;
};

export const requirePermission = async (permission: Permission): Promise<UserProfile> => {
  const user = await requireAuth();
  const userRole = user.lastSelectedRole || user.roles[0] || ROLES.PUBLIC;
  
  if (!hasPermission(userRole, permission)) {
    throw new AuthorizationError(`Permission ${permission} is required`);
  }

  return user;
};
