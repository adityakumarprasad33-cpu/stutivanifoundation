export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  STAFF: 'staff',
  VOLUNTEER: 'volunteer',
  DONOR: 'donor',
  PUBLIC: 'public',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
