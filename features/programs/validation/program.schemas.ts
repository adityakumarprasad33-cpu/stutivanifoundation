import { z } from 'zod';

const cloudinaryAssetSchema = z.object({
  publicId: z.string(),
  secureUrl: z.string().url(),
  resourceType: z.enum(['image', 'video', 'raw']),
  format: z.string(),
  bytes: z.number(),
  originalFilename: z.string(),
});

const programDocumentSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Title is required'),
  type: z.enum(['PROPOSAL', 'BUDGET', 'REPORT', 'APPROVAL', 'OTHER']),
  asset: cloudinaryAssetSchema,
  uploadedAt: z.date().or(z.any()), // Supports Firestore Timestamp at runtime
  uploadedBy: z.string(),
});

export const programSchema = z.object({
  name: z.string().min(5, 'Program name must be at least 5 characters').max(120),
  shortDescription: z.string().min(10).max(300),
  detailedDescription: z.string().optional(),
  categoryId: z.string().min(2, 'Category is required'),
  
  status: z.enum([
    'DRAFT', 'PENDING_REVIEW', 'APPROVED', 'PUBLISHED', 'ACTIVE',
    'ON_HOLD', 'COMPLETED', 'CANCELLED', 'ARCHIVED', 'SOFT_DELETED'
  ]),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  visibility: z.enum(['PUBLIC', 'INTERNAL', 'PRIVATE']),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),

  objectives: z.array(z.string()).default([]),
  expectedOutcomes: z.array(z.string()).default([]),

  location: z.object({
    state: z.string().min(2, 'State is required'),
    district: z.string().min(2, 'District is required'),
    village: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),

  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  expectedCompletionDate: z.date().nullable().optional(),

  coordinatorId: z.string().optional(),
  teamMemberIds: z.array(z.string()).default([]),
  partnerIds: z.array(z.string()).default([]),

  beneficiaries: z.object({
    expected: z.coerce.number().min(0).default(0),
    current: z.coerce.number().min(0).default(0),
    completed: z.coerce.number().min(0).default(0),
  }).default({ expected: 0, current: 0, completed: 0 }),

  financials: z.object({
    estimatedBudget: z.coerce.number().min(0).default(0),
    approvedBudget: z.coerce.number().min(0).default(0),
    fundsUtilized: z.coerce.number().min(0).default(0),
  }).default({ estimatedBudget: 0, approvedBudget: 0, fundsUtilized: 0 }),

  seo: z.object({
    metaTitle: z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),
    canonicalUrl: z.string().url().optional().or(z.literal('')),
    ogImage: z.string().url().optional().or(z.literal('')),
    keywords: z.array(z.string()).default([]),
  }).default({ keywords: [] }),

  coverImage: cloudinaryAssetSchema.optional(),
  galleryImages: z.array(cloudinaryAssetSchema).default([]),
  documents: z.array(programDocumentSchema).default([]),
});

export type ProgramFormData = z.infer<typeof programSchema>;
