import { z } from 'zod';
import { firestoreIdSchema } from '@/lib/validation';

export const blogStatusSchema = z.enum([
  'DRAFT', 
  'PENDING_REVIEW', 
  'APPROVED', 
  'SCHEDULED', 
  'PUBLISHED', 
  'ARCHIVED', 
  'SOFT_DELETED'
]);

export const blogVisibilitySchema = z.enum(['PUBLIC', 'INTERNAL', 'PRIVATE']);

export const blogAuthorSchema = z.object({
  authorId: z.string(), // Must reference a registered User ID
  coAuthorIds: z.array(z.string()).default([]),
});

export const blogSEOSchema = z.object({
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  focusKeyword: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  canonicalUrl: z.string().url().optional(),
  openGraph: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().url().optional(),
  }).optional(),
  twitterCard: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().url().optional(),
  }).optional(),
  noIndex: z.boolean().default(false),
  noFollow: z.boolean().default(false),
});

export const blogAIMetadataSchema = z.object({
  summary: z.string().optional(),
  seoSuggestions: z.array(z.string()).optional(),
  suggestedTags: z.array(z.string()).optional(),
  readabilityScore: z.number().optional(),
  contentClassification: z.string().optional(),
  translationStatus: z.record(z.string(), z.boolean()).optional(), // e.g., { 'hi': true }
  lastAnalyzedAt: z.date().optional(),
});

export const blogVersionHistorySchema = z.object({
  revisionNumber: z.number().default(1),
  revisionNotes: z.string().optional(),
  createdBy: z.string(), // User ID
  createdAt: z.date(),
});

export const blogAnalyticsSchema = z.object({
  views: z.number().default(0),
  uniqueViews: z.number().default(0),
  readingTimeMinutes: z.number().default(0),
  wordCount: z.number().default(0),
  shares: z.number().default(0),
  downloads: z.number().default(0),
  bookmarks: z.number().default(0),
});

export const blogRelationsSchema = z.object({
  relatedBlogs: z.array(firestoreIdSchema).default([]),
  relatedPrograms: z.array(firestoreIdSchema).default([]),
  relatedProjects: z.array(firestoreIdSchema).default([]),
  relatedGalleryAssets: z.array(firestoreIdSchema).default([]),
  relatedReports: z.array(firestoreIdSchema).default([]),
});

export const blogBaseSchema = z.object({
  title: z.string().min(3).max(150),
  slug: z.string().min(3).max(150),
  excerpt: z.string().max(500).optional(),
  content: z.string(), // TipTap HTML
  featuredImageId: firestoreIdSchema.optional(), // Reference to Media Library
  
  category: z.string(),
  tags: z.array(z.string()).default([]),
  
  status: blogStatusSchema.default('DRAFT'),
  visibility: blogVisibilitySchema.default('PUBLIC'),
  featured: z.boolean().default(false),
  allowComments: z.boolean().default(false),
  
  publishDate: z.date().optional(),
  scheduledPublishDate: z.date().optional(),
  
  // Embedded nested schemas
  author: blogAuthorSchema,
  seo: blogSEOSchema.default({ keywords: [], noIndex: false, noFollow: false }),
  aiMetadata: blogAIMetadataSchema.default({}),
  relations: blogRelationsSchema.default({ relatedBlogs: [], relatedPrograms: [], relatedProjects: [], relatedGalleryAssets: [], relatedReports: [] }),
  analytics: blogAnalyticsSchema.default({ views: 0, uniqueViews: 0, readingTimeMinutes: 0, wordCount: 0, shares: 0, downloads: 0, bookmarks: 0 }),
  
  // Search preparation
  normalizedTitle: z.string().optional(),
  normalizedContent: z.string().optional(),
  
  latestRevisionNumber: z.number().default(1),
  
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string(), // User ID
  updatedBy: z.string(), // User ID
  archivedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export const blogSchema = blogBaseSchema.extend({
  id: firestoreIdSchema,
});

export const blogFormSchema = z.object({
  title: z.string().min(3).max(150),
  slug: z.string().max(150).optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1),
  featuredImageId: firestoreIdSchema.optional(),
  category: z.string().min(1),
  tags: z.array(z.string()),
  status: blogStatusSchema,
  visibility: blogVisibilitySchema,
  featured: z.boolean(),
  scheduledPublishDate: z.date().optional(),
  
  author: z.object({
    authorId: z.string(),
    coAuthorIds: z.array(z.string())
  }),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
    keywords: z.array(z.string()),
    noIndex: z.boolean(),
    noFollow: z.boolean(),
  }),
  relations: z.object({
    relatedBlogs: z.array(z.string()),
    relatedPrograms: z.array(z.string()),
    relatedProjects: z.array(z.string()),
    relatedGalleryAssets: z.array(z.string()),
    relatedReports: z.array(z.string())
  })
});

export type BlogFormData = z.infer<typeof blogFormSchema>;
