import type { Event, EventStatisticsSummary } from '../types/event.types';

export class EventStatisticsService {
  /**
   * Computes dynamic metrics for an event.
   * Does NOT persist to Firestore.
   */
  static compute(event: Event): EventStatisticsSummary {
    const { capacity, schedule } = event;
    const now = new Date();

    const currentRegistrations = capacity?.currentRegistrations || 0;
    const maximumCapacity = capacity?.maximumCapacity || 0;
    const actualAttendance = capacity?.actualAttendance || 0;

    let registrationPercentage = 0;
    let capacityUtilization = 0;
    let remainingCapacity = maximumCapacity;

    if (maximumCapacity > 0) {
      registrationPercentage = Math.min(100, Math.round((currentRegistrations / maximumCapacity) * 100));
      capacityUtilization = registrationPercentage;
      remainingCapacity = Math.max(0, maximumCapacity - currentRegistrations);
    } else {
      // If unlimited capacity
      registrationPercentage = 100;
      capacityUtilization = 0;
      remainingCapacity = -1; // Unlimited
    }

    let attendanceRate = 0;
    if (currentRegistrations > 0) {
      attendanceRate = Math.min(100, Math.round((actualAttendance / currentRegistrations) * 100));
    }

    let completionPercentage = 0;
    if (schedule) {
      const start = schedule.startDate.getTime();
      const end = schedule.endDate.getTime();
      const current = now.getTime();

      if (current < start) {
        completionPercentage = 0;
      } else if (current > end) {
        completionPercentage = 100;
      } else {
        completionPercentage = Math.round(((current - start) / (end - start)) * 100);
      }
    }

    return {
      registrationPercentage,
      capacityUtilization,
      attendanceRate,
      remainingCapacity,
      completionPercentage,
    };
  }
}
