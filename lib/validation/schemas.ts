import { z } from 'zod';

export const emailSchema = z.string().trim().email('Invalid email address').max(255);
export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .max(128)
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[\W_]/, 'Password must contain at least one special character');

export const phoneSchema = z.string().trim().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');
export const urlSchema = z.string().trim().url('Invalid URL format');
export const slugSchema = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric and can contain hyphens');
export const uuidSchema = z.string().uuid('Invalid UUID format');
export const firestoreIdSchema = z.string().trim().min(20).max(28).regex(/^[a-zA-Z0-9_-]+$/, 'Invalid Firestore ID');

export const dateSchema = z.date();
export const dateRangeSchema = z.object({
  start: z.date(),
  end: z.date(),
}).refine(data => data.start <= data.end, {
  message: "End date must be after start date",
  path: ["end"],
});

export const currencySchema = z.number().positive('Amount must be positive').multipleOf(0.01, 'Maximum 2 decimal places allowed');

export const nameSchema = z.string().trim().min(2, 'Name must be at least 2 characters').max(100);
export const descriptionSchema = z.string().trim().max(1000, 'Description is too long');
export const richTextSchema = z.string().trim().max(50000, 'Content is too long');

export const addressSchema = z.object({
  street: z.string().trim().min(5).max(100),
  city: z.string().trim().min(2).max(50),
  state: z.string().trim().min(2).max(50),
  postalCode: z.string().trim().min(4).max(20),
  country: z.string().trim().min(2).max(50),
});

export const cloudinaryMetadataSchema = z.object({
  publicId: z.string().min(1),
  secureUrl: urlSchema,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  format: z.string().optional(),
  resourceType: z.enum(['image', 'video', 'raw']).optional(),
});

export const fileMetadataSchema = z.object({
  fileName: z.string().min(1),
  sizeBytes: z.number().int().positive(),
  mimeType: z.string().min(1),
  url: urlSchema,
});

export const geoLocationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const paginationMetadataSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export const searchMetadataSchema = z.object({
  query: z.string().trim().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
