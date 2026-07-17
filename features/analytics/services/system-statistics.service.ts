 
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnalyticsFilters } from '../components/filters/analytics-filter-context';

export class SystemStatisticsService {
  static async getAggregatedMetrics(filters: AnalyticsFilters) {
    return {
      totalUsers: 150,
      activeSessions: 12,
      apiErrorsLast24h: 3,
      uptime: 99.99, // %
      systemLoad: [
        { name: '00:00', cpu: 12, memory: 45 },
        { name: '04:00', cpu: 8, memory: 42 },
        { name: '08:00', cpu: 45, memory: 60 },
        { name: '12:00', cpu: 65, memory: 75 },
        { name: '16:00', cpu: 50, memory: 65 },
        { name: '20:00', cpu: 25, memory: 50 },
      ]
    };
  }
}
