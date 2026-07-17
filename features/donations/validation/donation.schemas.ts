import { z } from 'zod';
import { firestoreIdSchema } from '@/lib/validation';

export const donationFormSchema = z.object({
  donorId: firestoreIdSchema,
  amount: z.number().min(1, "Amount must be greater than 0"),
  currency: z.string().default('INR'),
  
  paymentMethod: z.enum(['CASH', 'CHEQUE', 'BANK_TRANSFER', 'UPI', 'CARD', 'NET_BANKING', 'GATEWAY']),
  donationStatus: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']),
  donationDate: z.date(),
  
  // Relations
  campaignId: firestoreIdSchema.optional(),
  programId: firestoreIdSchema.optional(),
  projectId: firestoreIdSchema.optional(),
  eventId: firestoreIdSchema.optional(),
  volunteerId: firestoreIdSchema.optional(),

  purpose: z.string().min(2, "Purpose is required"),
  remarks: z.string().optional(),
  referenceNumber: z.string().optional(),
  anonymous: z.boolean().default(false),
});

export const donationSchema = donationFormSchema.extend({
  id: firestoreIdSchema,
  donationNumber: z.string(),
  
  receiptNumber: z.string().optional(),
  receiptStatus: z.enum(['PENDING', 'GENERATED', 'SENT', 'FAILED']).default('PENDING'),
  reconciliationStatus: z.enum(['PENDING', 'MATCHED', 'FAILED']).default('PENDING'),
  
  // AI Prep
  ai: z.object({
    fraudDetectionScore: z.number().optional(),
    recurringProbability: z.number().optional(),
  }).optional(),

  createdBy: firestoreIdSchema,
  updatedBy: firestoreIdSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type DonationFormData = z.infer<typeof donationFormSchema>;
