export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  VOLUNTEER: 'volunteer',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];
