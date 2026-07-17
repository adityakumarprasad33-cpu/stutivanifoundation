import { z } from 'zod';
import {
  eventBaseSchema,
  eventStatusSchema,
  eventVisibilitySchema,
  eventLocationTypeSchema,
  eventRegistrationModeSchema,
  eventSEOSchema,
  eventAIMetadataSchema,
  eventRelationsSchema,
  eventLocationSchema,
  eventScheduleSchema,
  eventCapacitySchema,
  eventRegistrationConfigSchema,
  eventAnalyticsSchema,
} from '../validation/event.schemas';

export type Event = z.infer<typeof eventBaseSchema>;
export type EventStatus = z.infer<typeof eventStatusSchema>;
export type EventVisibility = z.infer<typeof eventVisibilitySchema>;
export type EventLocationType = z.infer<typeof eventLocationTypeSchema>;
export type EventRegistrationMode = z.infer<typeof eventRegistrationModeSchema>;

export type EventSEO = z.infer<typeof eventSEOSchema>;
export type EventAIMetadata = z.infer<typeof eventAIMetadataSchema>;
export type EventRelations = z.infer<typeof eventRelationsSchema>;
export type EventLocation = z.infer<typeof eventLocationSchema>;
export type EventSchedule = z.infer<typeof eventScheduleSchema>;
export type EventCapacity = z.infer<typeof eventCapacitySchema>;
export type EventRegistrationConfig = z.infer<typeof eventRegistrationConfigSchema>;
export type EventAnalytics = z.infer<typeof eventAnalyticsSchema>;

export type CreateEventDTO = Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'archivedAt' | 'deletedAt'>;
export type UpdateEventDTO = Partial<CreateEventDTO>;

export type EventAttendanceStatus =
  | 'REGISTERED'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'NO_SHOW'
  | 'CANCELLED'
  | 'VOLUNTEER'
  | 'ORGANIZER'
  | 'SPEAKER'
  | 'GUEST';

export type EventHealthState = 'EXCELLENT' | 'GOOD' | 'WARNING' | 'CRITICAL';

export interface EventStatisticsSummary {
  registrationPercentage: number;
  capacityUtilization: number;
  attendanceRate: number;
  remainingCapacity: number;
  completionPercentage: number;
}
