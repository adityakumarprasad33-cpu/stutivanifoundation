import { z } from 'zod';
import { firestoreIdSchema, urlSchema } from '@/lib/validation';

export const PARTNER_TYPES = [
  'Corporate',
  'NGO',
  'Government',
  'Educational',
  'Healthcare',
  'Technology',
  'Community',
  'Other',
] as const;

export const partnerSchema = z.object({
  id: firestoreIdSchema,
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100),
  logoMediaId: z.string().min(1, 'Logo is required'),
  websiteUrl: urlSchema.optional().or(z.literal('')),
  description: z.string().optional(),
  partnerType: z.enum(PARTNER_TYPES).default('Corporate'),
  displayOrder: z.number().int().default(0),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Partner = z.infer<typeof partnerSchema>;
export type CreatePartnerDTO = Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePartnerDTO = Partial<CreatePartnerDTO>;
