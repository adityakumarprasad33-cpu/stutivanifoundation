import { ActivityRepository } from '@/features/activity/services/activity.repository';
import type { ActivityLog } from '@/features/activity/services/activity.types';

export class VolunteerTimelineService {
  /**
   * Automatically aggregates Activity Logs for a specific volunteer to generate a timeline.
   */
  static async getVolunteerTimeline(volunteerId: string): Promise<ActivityLog[]> {
    const activityRepo = new ActivityRepository();
    
    // Query activities where entityId is the volunteerId
    const { data: activities } = await activityRepo.query({
      filters: [{ field: 'entityId', operator: '==', value: volunteerId }],
      sort: [{ field: 'createdAt', direction: 'desc' }],
      limit: 50
    });

    return activities;
  }
}
