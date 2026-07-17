import { z } from 'zod';
import { firestoreIdSchema } from '@/lib/validation';

export const donorProfileSchema = z.object({
  id: firestoreIdSchema,
  userId: z.string(), // Foreign key to users
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").optional().or(z.literal('')),
  occupation: z.string().optional(),
  organization: z.string().optional(),
  
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pinCode: z.string().optional(),
    country: z.string().default('India'),
  }),

  preferences: z.object({
    preferredCommunication: z.enum(['EMAIL', 'SMS', 'WHATSAPP', 'PHONE', 'NONE']).default('EMAIL'),
    taxPreference: z.boolean().default(true),
    eligible80G: z.boolean().default(true),
    anonymousDonation: z.boolean().default(false),
    preferredPaymentMethod: z.enum(['UPI', 'CARD', 'NETBANKING', 'CASH', 'UNKNOWN']).default('UNKNOWN'),
  }),

  stats: z.object({
    lifetimeDonations: z.number().default(0),
    recurringDonations: z.number().default(0),
    savedCampaigns: z.array(z.string()).default([]),
  }),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type DonorProfile = z.infer<typeof donorProfileSchema>;
export type CreateDonorProfileDTO = Omit<DonorProfile, 'id' | 'createdAt' | 'updatedAt' | 'stats'>;
export type UpdateDonorProfileDTO = Partial<CreateDonorProfileDTO>;

// Legacy schemas to satisfy compiler during migration
export const donorFormSchema = z.object({
  donorType: z.enum(['INDIVIDUAL', 'ORGANIZATION', 'CORPORATE', 'NGO', 'TRUST']),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  organizationName: z.string().optional().or(z.literal('')),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  taxDetails: z.object({
    panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format').optional().or(z.literal('')),
    eligible80G: z.boolean().default(true),
  }).optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().default('India'),
    pinCode: z.string().optional(),
  }).optional(),
  preferences: z.object({
    anonymousDonation: z.boolean().default(false),
    newsletterOptIn: z.boolean().default(true),
    preferredCommunication: z.enum(['EMAIL', 'SMS', 'WHATSAPP', 'PHONE', 'NONE']).default('EMAIL'),
  }),
  notes: z.string().optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
});

export type DonorFormData = z.infer<typeof donorFormSchema>;
