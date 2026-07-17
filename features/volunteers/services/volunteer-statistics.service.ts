import { VolunteerAssignmentRepository } from './volunteer-assignment.repository';
import { VolunteerAttendanceRepository } from './volunteer-attendance.repository';
import type { VolunteerStatisticsSummary } from '../types/volunteer.types';

export class VolunteerStatisticsService {
  /**
   * Computes dynamic statistics for a volunteer based on their assignments and attendance.
   * This is never persisted in Firestore.
   */
  static async computeStatistics(volunteerId: string): Promise<VolunteerStatisticsSummary> {
    const assignmentRepo = new VolunteerAssignmentRepository();
    const attendanceRepo = new VolunteerAttendanceRepository();

    const { data: assignments } = await assignmentRepo.query({
      filters: [{ field: 'volunteerId', operator: '==', value: volunteerId }]
    });

    const { data: attendances } = await attendanceRepo.query({
      filters: [{ field: 'volunteerId', operator: '==', value: volunteerId }]
    });

    // Compute unique projects, programs, events
    const uniqueProjects = new Set<string>();
    const uniquePrograms = new Set<string>();
    const uniqueEvents = new Set<string>();

    let totalHoursAssigned = 0;
    let totalHoursCompleted = 0;

    assignments.forEach(assignment => {
      if (assignment.projectId) uniqueProjects.add(assignment.projectId);
      if (assignment.programId) uniquePrograms.add(assignment.programId);
      if (assignment.eventId) uniqueEvents.add(assignment.eventId);
      
      totalHoursAssigned += (assignment.hoursAssigned || 0);
      totalHoursCompleted += (assignment.hoursCompleted || 0);
    });

    attendances.forEach(attendance => {
      if (attendance.eventId) uniqueEvents.add(attendance.eventId);
    });

    return {
      projectsContributed: uniqueProjects.size,
      programsContributed: uniquePrograms.size,
      eventsParticipated: uniqueEvents.size,
      volunteerHoursAssigned: totalHoursAssigned,
      volunteerHoursCompleted: totalHoursCompleted,
    };
  }
}
