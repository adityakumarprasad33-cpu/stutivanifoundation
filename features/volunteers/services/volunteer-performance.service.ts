import { VolunteerAttendanceRepository } from './volunteer-attendance.repository';
import { VolunteerStatisticsService } from './volunteer-statistics.service';
import { VolunteerHealthService } from './volunteer-health.service';
import type { VolunteerPerformanceMetrics } from '../types/volunteer.types';

export class VolunteerPerformanceService {
  /**
   * Computes dynamic performance metrics for a volunteer.
   */
  static async computePerformance(volunteerId: string): Promise<VolunteerPerformanceMetrics> {
    const stats = await VolunteerStatisticsService.computeStatistics(volunteerId);
    
    const attendanceRepo = new VolunteerAttendanceRepository();
    const { data: attendances } = await attendanceRepo.query({
      filters: [{ field: 'volunteerId', operator: '==', value: volunteerId }]
    });

    // 1. Attendance Rate
    let attendanceRate = 0;
    const totalExpectedAttendances = attendances.filter(a => ['ASSIGNED', 'ACCEPTED', 'CHECKED_IN', 'CHECKED_OUT', 'LATE', 'HALF_DAY', 'ABSENT', 'EXCUSED'].includes(a.status)).length;
    const totalActualAttendances = attendances.filter(a => ['CHECKED_IN', 'CHECKED_OUT', 'LATE', 'HALF_DAY', 'COMPLETED'].includes(a.status)).length;
    
    if (totalExpectedAttendances > 0) {
      attendanceRate = (totalActualAttendances / totalExpectedAttendances) * 100;
    }

    // 2. Completion Rate
    let completionRate = 0;
    if (stats.volunteerHoursAssigned > 0) {
      completionRate = (stats.volunteerHoursCompleted / stats.volunteerHoursAssigned) * 100;
      // Cap at 100% just in case they worked over-time
      if (completionRate > 100) completionRate = 100;
    }

    // 3. Reliability Score (Basic heuristic)
    let reliabilityScore = 100;
    const noShows = attendances.filter(a => a.status === 'ABSENT').length;
    const late = attendances.filter(a => a.status === 'LATE').length;
    reliabilityScore -= (noShows * 15);
    reliabilityScore -= (late * 5);
    if (reliabilityScore < 0) reliabilityScore = 0;

    // 4. Last Active
    let lastActive: Date | null = null;
    const sortedAttendances = [...attendances].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    if (sortedAttendances.length > 0) {
      lastActive = sortedAttendances[0].createdAt;
    }

    // 5. Activity & Contribution Scores
    const activityScore = this.calculateActivityScore(lastActive, stats.eventsParticipated);
    const contributionScore = (completionRate * 0.4) + (reliabilityScore * 0.4) + (attendanceRate * 0.2);
    
    // 6. Impact Score (Placeholder heuristic, usually would involve qualitative feedback)
    const impactScore = Math.min((stats.volunteerHoursCompleted / 10) * 5 + 50, 100);

    // 7. Future Burnout Risk
    const futureBurnoutRisk = VolunteerHealthService.computeBurnoutRisk(stats.volunteerHoursCompleted, lastActive);

    return {
      attendanceRate,
      completionRate,
      reliabilityScore,
      impactScore,
      activityScore,
      contributionScore,
      lastActive,
      futureBurnoutRisk,
    };
  }

  private static calculateActivityScore(lastActive: Date | null, eventsCount: number): number {
    if (!lastActive) return 0;
    
    const daysSinceLastActive = (new Date().getTime() - lastActive.getTime()) / (1000 * 3600 * 24);
    let score = 100;
    
    // Degrade score by 10 points per month inactive
    score -= Math.floor(daysSinceLastActive / 30) * 10;
    
    // Boost for high event count
    score += Math.min(eventsCount * 2, 20);
    
    return Math.max(0, Math.min(score, 100));
  }
}
