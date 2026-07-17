import type { Event, EventHealthState } from '../types/event.types';
import { EventStatisticsService } from './event-statistics.service';

export class EventHealthService {
  /**
   * Calculates the overall health state of an event dynamically.
   */
  static computeHealth(event: Event): EventHealthState {
    const stats = EventStatisticsService.compute(event);
    const now = new Date();
    
    // Check if event is cancelled
    if (['CANCELLED', 'ARCHIVED', 'SOFT_DELETED'].includes(event.status)) {
      return 'CRITICAL'; // or just standard representation for inactive
    }

    // Past Events
    if (event.schedule && now > event.schedule.endDate) {
      if (stats.attendanceRate >= 80) return 'EXCELLENT';
      if (stats.attendanceRate >= 50) return 'GOOD';
      if (stats.attendanceRate >= 20) return 'WARNING';
      return 'CRITICAL';
    }

    // Upcoming Events
    if (event.schedule && now < event.schedule.startDate) {
      const daysUntil = (event.schedule.startDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
      
      // If event is less than 3 days away and registrations are very low
      if (daysUntil <= 3 && stats.registrationPercentage < 20 && stats.remainingCapacity !== -1) {
        return 'CRITICAL';
      }
      
      if (daysUntil <= 7 && stats.registrationPercentage < 50 && stats.remainingCapacity !== -1) {
        return 'WARNING';
      }

      if (stats.registrationPercentage >= 80) return 'EXCELLENT';
      
      return 'GOOD';
    }

    // Ongoing Events
    return 'GOOD';
  }
}
