import { z } from 'zod';
import {
  volunteerFormSchema,
  volunteerAssignmentSchema,
  volunteerAttendanceSchema,
  volunteerStatusSchema,
  verificationStatusSchema,
  volunteerTypeSchema,
  assignmentStatusSchema,
  attendanceStatusSchema,
} from '../validation/volunteer.schemas';

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;

export interface Volunteer extends VolunteerFormData {
  id: string;
  volunteerNumber: string;
  slug: string;
  normalizedName: string;
  normalizedEmail: string;
  normalizedPhone: string;
  keywords: string[];
  searchVector: string[];
  analytics: Record<string, any>;
  ai: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  archivedAt?: Date;
  deletedAt?: Date;
  leaveDate?: Date;
  metrics?: {
    totalHours?: number;
    reliabilityScore?: number;
    assignmentsCompleted?: number;
  };
}

export type CreateVolunteerDTO = Omit<Volunteer, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateVolunteerDTO = Partial<CreateVolunteerDTO>;

export type VolunteerAssignment = z.infer<typeof volunteerAssignmentSchema>;
export type VolunteerAttendance = z.infer<typeof volunteerAttendanceSchema>;

export type VolunteerStatus = z.infer<typeof volunteerStatusSchema>;
export type VerificationStatus = z.infer<typeof verificationStatusSchema>;
export type VolunteerType = z.infer<typeof volunteerTypeSchema>;
export type AssignmentStatus = z.infer<typeof assignmentStatusSchema>;
export type AttendanceStatus = z.infer<typeof attendanceStatusSchema>;

export type CreateAssignmentDTO = Omit<VolunteerAssignment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAssignmentDTO = Partial<CreateAssignmentDTO>;

export type CreateAttendanceDTO = Omit<VolunteerAttendance, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAttendanceDTO = Partial<CreateAttendanceDTO>;

// Dynamic Computation Interfaces
export interface VolunteerStatisticsSummary {
  projectsContributed: number;
  programsContributed: number;
  eventsParticipated: number;
  volunteerHoursAssigned: number;
  volunteerHoursCompleted: number;
}

export interface VolunteerPerformanceMetrics {
  attendanceRate: number;      // % of attended vs assigned events
  completionRate: number;      // % of completed vs assigned hours
  reliabilityScore: number;    // Aggregate score out of 100 based on punctuality, no-shows
  impactScore: number;         // Aggregate score out of 100 based on feedback/hours
  activityScore: number;       // Aggregate score based on recent frequency
  contributionScore: number;   // All-time engagement score
  lastActive: Date | null;
  futureBurnoutRisk: 'LOW' | 'MEDIUM' | 'HIGH';
}
