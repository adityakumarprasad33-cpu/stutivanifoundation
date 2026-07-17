import { z } from 'zod';
import { slugSchema, currencySchema } from '@/lib/validation';
import type { CloudinaryUploadResponse } from '@/lib/cloudinary';

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(5).max(100),
  slug: slugSchema,
  shortDescription: z.string().min(10).max(300),
  description: z.string().min(50),
  coverImage: z.custom<CloudinaryUploadResponse>(),
  gallery: z.array(z.custom<CloudinaryUploadResponse>()).default([]),
  category: z.string(),
  status: z.enum(['active', 'completed', 'draft', 'archived']).default('draft'),
  goalAmount: currencySchema,
  raisedAmount: currencySchema.default(0),
  currency: z.string().default('INR'),
  beneficiaries: z.number().int().positive().optional(),
  location: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  featured: z.boolean().default(false),
  createdBy: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Project = z.infer<typeof projectSchema>;
export type CreateProjectDTO = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProjectDTO = Partial<CreateProjectDTO>;
