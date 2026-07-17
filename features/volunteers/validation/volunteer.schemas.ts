import { z } from 'zod';

const firestoreIdSchema = z.string().min(1, 'ID is required').max(100);

// Core Enums
export const volunteerStatusSchema = z.enum([
  'DRAFT',
  'APPLIED',
  'PENDING_VERIFICATION',
  'VERIFIED',
  'ACTIVE',
  'INACTIVE',
  'SUSPENDED',
  'ARCHIVED',
  'SOFT_DELETED',
]);

export const verificationStatusSchema = z.enum([
  'PENDING',
  'VERIFIED',
  'REJECTED',
  'EXPIRED',
]);

export const volunteerTypeSchema = z.enum([
  'GENERAL',
  'CORE_TEAM',
  'COORDINATOR',
  'MEDICAL',
  'TEACHER',
  'INTERN',
  'CSR',
  'CAMPAIGN',
  'GUEST',
]);

export const assignmentStatusSchema = z.enum([
  'PLANNED',
  'ACTIVE',
  'COMPLETED',
  'CANCELLED',
]);

export const attendanceStatusSchema = z.enum([
  'ASSIGNED',
  'INVITED',
  'ACCEPTED',
  'REJECTED',
  'CHECKED_IN',
  'CHECKED_OUT',
  'LATE',
  'HALF_DAY',
  'ABSENT',
  'EXCUSED',
  'COMPLETED',
  'CANCELLED',
]);

// Personal Info
export const personalInfoSchema = z.object({
  firstName: z.string().min(1).max(50),
  middleName: z.string().max(50).optional(),
  lastName: z.union([z.string().min(1).max(50), z.literal('')]),
  email: z.string().email(),
  phone: z.union([z.string().min(5).max(20), z.literal('')]),
  alternatePhone: z.string().max(20).optional(),
  dateOfBirth: z.date().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'UNKNOWN']).default('UNKNOWN'),
  nationality: z.string().max(100).optional(),
});

export const emergencyContactSchema = z.object({
  name: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  relationship: z.string().max(50).optional(),
});

export const addressSchema = z.object({
  street: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
});

// Professional / Skills
export const profileDetailsSchema = z.object({
  occupation: z.string().max(100).optional(),
  education: z.string().max(100).optional(),
  experience: z.string().max(500).optional(),
  languages: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  availability: z.string().max(300).optional(),
  bio: z.string().max(1000).optional(),
  notes: z.string().max(1000).optional(),
  tags: z.array(z.string()).default([]),
});

// Media
export const volunteerMediaSchema = z.object({
  profilePhotoId: firestoreIdSchema.optional(),
  identityDocumentIds: z.array(firestoreIdSchema).default([]),
  medicalDocumentIds: z.array(firestoreIdSchema).default([]),
  policeVerificationIds: z.array(firestoreIdSchema).default([]),
  certificateIds: z.array(firestoreIdSchema).default([]),
  otherDocumentIds: z.array(firestoreIdSchema).default([]),
});

// Relations
export const volunteerRelationsSchema = z.object({
  programs: z.array(firestoreIdSchema).default([]),
  projects: z.array(firestoreIdSchema).default([]),
  events: z.array(firestoreIdSchema).default([]),
  gallery: z.array(firestoreIdSchema).default([]),
  blogs: z.array(firestoreIdSchema).default([]),
  reports: z.array(firestoreIdSchema).default([]),
  futureDonationCampaigns: z.array(firestoreIdSchema).default([]),
});

// AI & Search
export const volunteerAISchema = z.object({
  summary: z.string().optional(),
  strengths: z.array(z.string()).optional(),
  weaknesses: z.array(z.string()).optional(),
  recommendedPrograms: z.array(firestoreIdSchema).optional(),
  recommendedProjects: z.array(firestoreIdSchema).optional(),
  recommendedEvents: z.array(firestoreIdSchema).optional(),
  recommendedRoles: z.array(z.string()).optional(),
  recommendedTraining: z.array(z.string()).optional(),
  availabilityPrediction: z.string().optional(),
  burnoutRisk: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  futureInsights: z.string().optional(),
});

// Main Volunteer Profile Schema
export const volunteerProfileSchema = z.object({
  id: firestoreIdSchema,
  userId: z.string(), // Foreign key to users
  volunteerNumber: z.string().max(50).optional(),
  applicationStatus: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED']).default('PENDING'),
  verificationStatus: verificationStatusSchema.default('PENDING'),
  
  personal: z.object({
    dateOfBirth: z.date().optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'UNKNOWN']).default('UNKNOWN'),
  }),

  address: addressSchema,
  emergencyContact: emergencyContactSchema,

  education: z.object({
    highestQualification: z.string().optional(),
    university: z.string().optional(),
    course: z.string().optional(),
    branch: z.string().optional(),
    passingYear: z.string().optional(),
    currentYear: z.string().optional(),
  }),

  professional: z.object({
    occupation: z.string().optional(),
    experience: z.string().optional(),
    currentStatus: z.enum(['Student', 'Working Professional', 'Self Employed', 'Freelancer', 'Retired', 'Other', '']).default(''),
    company: z.string().optional(),
  }),

  preferences: z.object({
    interests: z.array(z.string()).default([]),
    availability: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    languages: z.array(z.string()).default([]),
  }),

  documents: z.object({
    resumeId: firestoreIdSchema.optional(),
    idProofId: firestoreIdSchema.optional(),
    studentIdProofId: firestoreIdSchema.optional(),
    medicalCertificateId: firestoreIdSchema.optional(),
    backgroundVerificationId: firestoreIdSchema.optional(),
  }),

  management: z.object({
    assignedTeam: z.string().optional(),
    assignedDepartment: z.string().optional(),
    assignedMentorId: firestoreIdSchema.optional(),
  }),

  metrics: z.object({
    volunteerHours: z.number().default(0),
    performanceScore: z.number().default(0),
    attendanceRate: z.number().default(0),
  }),

  certificates: z.array(firestoreIdSchema).default([]),
  attendance: z.array(firestoreIdSchema).default([]),
  assignments: z.array(firestoreIdSchema).default([]),

  createdAt: z.date(),
  updatedAt: z.date(),
});

// Assignment Schema
export const volunteerAssignmentSchema = z.object({
  id: firestoreIdSchema,
  volunteerId: firestoreIdSchema,
  programId: firestoreIdSchema.optional(),
  projectId: firestoreIdSchema.optional(),
  eventId: firestoreIdSchema.optional(),
  
  role: z.string().max(100),
  responsibilities: z.string().max(500).optional(),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).default('NORMAL'),
  status: assignmentStatusSchema.default('PLANNED'),
  
  hoursAssigned: z.number().min(0).default(0),
  hoursCompleted: z.number().min(0).default(0),
  
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  notes: z.string().max(1000).optional(),
  
  assignedBy: firestoreIdSchema,
  assignedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Attendance Schema
export const volunteerAttendanceSchema = z.object({
  id: firestoreIdSchema,
  volunteerId: firestoreIdSchema,
  eventId: firestoreIdSchema,
  assignmentId: firestoreIdSchema.optional(),
  
  status: attendanceStatusSchema.default('ASSIGNED'),
  checkInTime: z.date().optional(),
  checkOutTime: z.date().optional(),
  hoursWorked: z.number().min(0).default(0),
  attendanceNotes: z.string().max(500).optional(),
  
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Form Schemas
export const volunteerFormSchema = z.object({
  volunteerType: volunteerTypeSchema,
  
  personalInfo: personalInfoSchema,
  emergencyContact: emergencyContactSchema,
  address: addressSchema,
  profileDetails: profileDetailsSchema,
  media: volunteerMediaSchema,
  relations: volunteerRelationsSchema,
  
  status: volunteerStatusSchema,
  verificationStatus: verificationStatusSchema,
  profileVisibility: z.enum(['PUBLIC', 'INTERNAL', 'PRIVATE']),
  
  joinDate: z.date().optional(),
  linkedUserId: firestoreIdSchema.optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;
