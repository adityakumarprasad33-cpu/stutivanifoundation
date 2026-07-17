import { z } from 'zod';

const firestoreIdSchema = z.string().min(1, 'ID is required').max(100);

export const eventStatusSchema = z.enum([
  'DRAFT',
  'PENDING_REVIEW',
  'APPROVED',
  'SCHEDULED',
  'REGISTRATION_OPEN',
  'REGISTRATION_CLOSED',
  'ONGOING',
  'COMPLETED',
  'CANCELLED',
  'ARCHIVED',
  'SOFT_DELETED',
]);

export const eventVisibilitySchema = z.enum(['PUBLIC', 'INTERNAL', 'PRIVATE']);
export const eventLocationTypeSchema = z.enum(['ONLINE', 'VENUE', 'HYBRID']);
export const eventRegistrationModeSchema = z.enum(['NONE', 'ONLINE', 'OFFLINE', 'INVITATION', 'HYBRID']);

export const eventSEOSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  focusKeyword: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  noIndex: z.boolean().default(false),
  noFollow: z.boolean().default(false),
  canonicalUrl: z.string().url().optional(),
  openGraph: z.record(z.string(), z.unknown()).optional(),
  twitterCard: z.record(z.string(), z.unknown()).optional(),
});

export const eventAIMetadataSchema = z.object({
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  embeddings: z.array(z.number()).optional(),
  translations: z.record(z.string(), z.string()).optional(), // language code -> text
  futureInsights: z.string().optional(),
});

export const eventRelationsSchema = z.object({
  programId: firestoreIdSchema.optional(),
  projectId: firestoreIdSchema.optional(),
  relatedBlogs: z.array(firestoreIdSchema).default([]),
  galleryReferences: z.array(firestoreIdSchema).default([]),
  futureDonationCampaignId: firestoreIdSchema.optional(),
  futureVolunteerCampaignId: firestoreIdSchema.optional(),
  futureReports: z.array(firestoreIdSchema).default([]),
});

export const eventLocationSchema = z.object({
  locationType: eventLocationTypeSchema.default('VENUE'),
  venueName: z.string().max(200).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
  googleMapsLink: z.string().url().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const eventScheduleSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  registrationStart: z.date().optional(),
  registrationEnd: z.date().optional(),
});

export const eventCapacitySchema = z.object({
  maximumCapacity: z.number().min(0).default(0),
  currentRegistrations: z.number().min(0).default(0),
  expectedAttendance: z.number().min(0).default(0),
  actualAttendance: z.number().min(0).default(0),
});

export const eventRegistrationConfigSchema = z.object({
  registrationMode: eventRegistrationModeSchema.default('NONE'),
  approvalWorkflow: z.boolean().default(false),
  allowWaitlist: z.boolean().default(false),
  requireTickets: z.boolean().default(false),
  requirePayment: z.boolean().default(false),
});

export const eventAnalyticsSchema = z.object({
  views: z.number().default(0),
  shares: z.number().default(0),
});

export const eventBaseSchema = z.object({
  id: firestoreIdSchema,
  title: z.string().min(3, 'Title is too short').max(150, 'Title is too long'),
  slug: z.string().max(150),
  shortDescription: z.string().max(300).optional(),
  detailedDescription: z.string().min(1),
  eventType: z.string().min(1),
  category: z.string().min(1),
  status: eventStatusSchema.default('DRAFT'),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).default('NORMAL'),
  
  featuredImageId: firestoreIdSchema.optional(),
  documents: z.array(firestoreIdSchema).default([]),
  tags: z.array(z.string()).default([]),
  
  visibility: eventVisibilitySchema.default('PUBLIC'),
  featured: z.boolean().default(false),
  
  organizerId: firestoreIdSchema,
  coordinatorIds: z.array(firestoreIdSchema).default([]),
  volunteerIds: z.array(firestoreIdSchema).default([]),
  
  normalizedTitle: z.string(),
  searchVector: z.array(z.string()).default([]),
  
  seo: eventSEOSchema,
  ai: eventAIMetadataSchema,
  relations: eventRelationsSchema,
  location: eventLocationSchema,
  schedule: eventScheduleSchema,
  capacity: eventCapacitySchema,
  registrationConfig: eventRegistrationConfigSchema,
  analytics: eventAnalyticsSchema,
  
  createdBy: firestoreIdSchema,
  updatedBy: firestoreIdSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  archivedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export const eventFormSchema = z.object({
  title: z.string().min(3).max(150),
  slug: z.string().max(150).optional(),
  shortDescription: z.string().max(300).optional(),
  detailedDescription: z.string().min(1),
  eventType: z.string().min(1),
  category: z.string().min(1),
  status: eventStatusSchema,
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']),
  
  featuredImageId: firestoreIdSchema.optional(),
  documents: z.array(firestoreIdSchema),
  tags: z.array(z.string()),
  
  visibility: eventVisibilitySchema,
  featured: z.boolean(),
  
  organizerId: firestoreIdSchema,
  coordinatorIds: z.array(firestoreIdSchema),
  volunteerIds: z.array(firestoreIdSchema),
  
  seo: eventSEOSchema.partial(),
  relations: z.object({
    programId: firestoreIdSchema.optional(),
    projectId: firestoreIdSchema.optional(),
    relatedBlogs: z.array(firestoreIdSchema),
    galleryReferences: z.array(firestoreIdSchema),
    futureDonationCampaignId: firestoreIdSchema.optional(),
    futureVolunteerCampaignId: firestoreIdSchema.optional(),
    futureReports: z.array(firestoreIdSchema),
  }),
  location: z.object({
    locationType: eventLocationTypeSchema,
    venueName: z.string().max(200).optional(),
    address: z.string().max(500).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    country: z.string().max(100).optional(),
    postalCode: z.string().max(20).optional(),
    googleMapsLink: z.string().url().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  schedule: z.object({
    startDate: z.date(),
    endDate: z.date(),
    registrationStart: z.date().optional(),
    registrationEnd: z.date().optional(),
  }),
  capacity: z.object({
    maximumCapacity: z.number().min(0),
    expectedAttendance: z.number().min(0),
  }),
  registrationConfig: z.object({
    registrationMode: eventRegistrationModeSchema,
    approvalWorkflow: z.boolean(),
    allowWaitlist: z.boolean(),
    requireTickets: z.boolean(),
    requirePayment: z.boolean(),
  })
});

export type EventFormData = z.infer<typeof eventFormSchema>;
