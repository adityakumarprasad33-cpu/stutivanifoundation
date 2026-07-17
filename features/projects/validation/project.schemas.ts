import { z } from 'zod';

const cloudinaryAssetSchema = z.object({
  publicId: z.string(),
  secureUrl: z.string().url(),
  resourceType: z.enum(['image', 'raw', 'video']),
  format: z.string().optional(),
  bytes: z.number().optional(),
  originalFilename: z.string().optional(),
});

export const projectDocumentSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Document title is required"),
  type: z.enum(['PROPOSAL', 'BUDGET', 'APPROVAL', 'REPORT', 'OTHER']),
  asset: cloudinaryAssetSchema,
  uploadedAt: z.date(),
});

export const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters").max(100),
  slug: z.string().optional(), // Server generated if empty
  shortDescription: z.string().min(10, "Short description is required").max(300),
  detailedDescription: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  
  status: z.enum(['DRAFT', 'PENDING_REVIEW', 'APPROVED', 'PUBLISHED', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED', 'ARCHIVED', 'SOFT_DELETED']).default('DRAFT'),
  phase: z.enum(['PLANNING', 'APPROVAL', 'EXECUTION', 'MONITORING', 'COMPLETED']).default('PLANNING'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).default('MEDIUM'),
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'INTERNAL']).default('INTERNAL'),
  isFeatured: z.boolean().default(false),

  location: z.object({
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    village: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),

  financials: z.object({
    estimatedBudget: z.coerce.number().min(0).default(0),
    approvedBudget: z.coerce.number().min(0).default(0),
    fundsRaised: z.coerce.number().min(0).default(0),
    fundsUtilized: z.coerce.number().min(0).default(0),
  }).default({ estimatedBudget: 0, approvedBudget: 0, fundsRaised: 0, fundsUtilized: 0 }),

  beneficiaries: z.object({
    expected: z.coerce.number().min(0).default(0),
    current: z.coerce.number().min(0).default(0),
    completed: z.coerce.number().min(0).default(0),
  }).default({ expected: 0, current: 0, completed: 0 }),

  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
  expectedCompletionDate: z.date().optional().nullable(),

  managerId: z.string().optional(),
  volunteerIds: z.array(z.string()).default([]),
  partnerIds: z.array(z.string()).default([]),
  programId: z.string().optional(),

  tags: z.array(z.string()).default([]),
  
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    canonicalUrl: z.string().url().optional().or(z.literal('')),
    ogImage: z.string().url().optional().or(z.literal('')),
    keywords: z.array(z.string()).default([]),
  }).default({ keywords: [] }),

  coverImage: cloudinaryAssetSchema.optional(),
  galleryImages: z.array(cloudinaryAssetSchema).default([]),
  documents: z.array(projectDocumentSchema).default([]),

  // Optional Architectural Fields (usually not set from the main form directly, but typed for safety)
  parentProjectId: z.string().optional(),
  childProjectIds: z.array(z.string()).default([]),
  relatedProjectIds: z.array(z.string()).default([]),
  dependencyIds: z.array(z.string()).default([]),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
