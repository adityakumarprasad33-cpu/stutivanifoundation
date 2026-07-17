import { z } from 'zod';

export const organizationSettingsSchema = z.object({
  // Basic Info
  name: z.string().min(2, "Organization Name is required"),
  shortName: z.string().min(2, "Short Name is required"),
  mission: z.string().optional(),
  vision: z.string().optional(),
  description: z.string().optional(),
  
  // Contact
  email: z.string().email("Valid email required").optional(),
  phone: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional(),
  
  // Address
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  googleMapsLink: z.string().url("Must be a valid URL").optional(),
  
  // Social Links
  socialLinks: z.object({
    facebook: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    youtube: z.string().url().optional().or(z.literal('')),
  }).optional(),
  
  // Legal
  registrationNumber: z.string().optional(),
  panNumber: z.string().optional(),
  eightyGNumber: z.string().optional(),
  twelveANumber: z.string().optional(),
  csrRegistrationNumber: z.string().optional(),
  fcraNumber: z.string().optional(),
  
  // Localization
  timezone: z.string().default('Asia/Kolkata'),
  defaultLanguage: z.string().default('en-IN'),
  defaultCurrency: z.string().default('INR'),
  dateFormat: z.string().default('DD/MM/YYYY'),
  timeFormat: z.string().default('12h'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']).default('ACTIVE'),
});

export type OrganizationSettings = z.infer<typeof organizationSettingsSchema>;

export const securitySettingsSchema = z.object({
  requireMfa: z.boolean().default(false),
  passwordPolicy: z.enum(['standard', 'strict']).default('standard'),
  sessionDurationDays: z.number().min(1).max(30).default(5),
  lockoutThreshold: z.number().min(3).max(10).default(5),
});

export type SecuritySettings = z.infer<typeof securitySettingsSchema>;

export const appearanceSettingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  reducedMotion: z.boolean().default(false),
});

export type AppearanceSettings = z.infer<typeof appearanceSettingsSchema>;
