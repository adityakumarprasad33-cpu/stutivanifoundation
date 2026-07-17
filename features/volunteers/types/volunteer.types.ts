import { z } from 'zod';
import {
  volunteerProfileSchema,
  volunteerAssignmentSchema,
  volunteerAttendanceSchema,
  volunteerStatusSchema,
  verificationStatusSchema,
  volunteerTypeSchema,
  assignmentStatusSchema,
  attendanceStatusSchema,
} from '../validation/volunteer.schemas';

export type VolunteerProfile = z.infer<typeof volunteerProfileSchema>;
export type VolunteerAssignment = z.infer<typeof volunteerAssignmentSchema>;
export type VolunteerAttendance = z.infer<typeof volunteerAttendanceSchema>;

export type VolunteerStatus = z.infer<typeof volunteerStatusSchema>;
export type VerificationStatus = z.infer<typeof verificationStatusSchema>;
export type VolunteerType = z.infer<typeof volunteerTypeSchema>;
export type AssignmentStatus = z.infer<typeof assignmentStatusSchema>;
export type AttendanceStatus = z.infer<typeof attendanceStatusSchema>;

export type CreateVolunteerProfileDTO = Omit<VolunteerProfile, 'id' | 'createdAt' | 'updatedAt' | 'metrics'>;
export type UpdateVolunteerProfileDTO = Partial<CreateVolunteerProfileDTO>;

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
