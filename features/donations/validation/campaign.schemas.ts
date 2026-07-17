import { z } from 'zod';
import { firestoreIdSchema } from '@/lib/validation';

export const campaignFormSchema = z.object({
  title: z.string().min(5, "Title is required"),
  description: z.string().min(10, "Description is required"),
  
  goalAmount: z.number().min(1, "Goal amount must be greater than 0"),
  
  startDate: z.date(),
  endDate: z.date().optional(),
  
  status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED']).default('DRAFT'),
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'UNLISTED']).default('PUBLIC'),
  featured: z.boolean().default(false),
  
  targetBeneficiaries: z.string().optional(),
  
  // Relations & Media
  bannerId: firestoreIdSchema.optional(),
  galleryIds: z.array(firestoreIdSchema).default([]),
  programIds: z.array(firestoreIdSchema).default([]),
  projectIds: z.array(firestoreIdSchema).default([]),
  
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).default([]),
  }).optional(),
});

export const campaignSchema = campaignFormSchema.extend({
  id: firestoreIdSchema,
  slug: z.string(),
  
  // Computed values
  raisedAmount: z.number().default(0),
  donorCount: z.number().default(0),

  // AI Prep
  ai: z.object({
    predictedCompletionDate: z.date().optional(),
    recommendedDonors: z.array(firestoreIdSchema).default([]),
  }).optional(),

  createdBy: firestoreIdSchema,
  updatedBy: firestoreIdSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CampaignFormData = z.infer<typeof campaignFormSchema>;
