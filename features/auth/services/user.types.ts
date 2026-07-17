import { z } from 'zod';
import { emailSchema, phoneSchema, urlSchema, firestoreIdSchema } from '@/lib/validation';
import { ROLES } from '@/constants';

export const userSchema = z.object({
  id: firestoreIdSchema,
  uid: z.string().min(1),
  displayName: z.string().min(2).max(100),
  email: emailSchema,
  phoneNumber: z.union([phoneSchema, z.literal('')]).optional().nullable(),
  photoURL: urlSchema.optional(),
  roles: z.array(z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.STAFF, ROLES.VOLUNTEER, ROLES.DONOR, ROLES.PUBLIC])).default([ROLES.PUBLIC]),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING', 'REJECTED', 'SUSPENDED', 'ARCHIVED']).default('PENDING'),
  lastSelectedRole: z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.STAFF, ROLES.VOLUNTEER, ROLES.DONOR, ROLES.PUBLIC]).optional(),
  language: z.string().default('en'),
  timezone: z.string().default('Asia/Kolkata'),
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  notificationPreferences: z.record(z.string(), z.boolean()).optional(),
  emailVerified: z.boolean().default(false),
  phoneVerified: z.boolean().default(false),
  lastLogin: z.date().optional(),
  deleted: z.boolean().default(false),
  deletedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserProfile = z.infer<typeof userSchema>;
export type CreateUserDTO = Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt' | 'lastLogin' | 'deleted' | 'deletedAt'>;
export type UpdateUserDTO = Partial<CreateUserDTO>;
