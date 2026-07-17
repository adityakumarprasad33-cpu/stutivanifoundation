 
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnalyticsFilters } from '../components/filters/analytics-filter-context';

export class MediaStatisticsAggregator {
  static async getAggregatedMetrics(filters: AnalyticsFilters) {
    return {
      totalAssets: 1250,
      storageUsedGB: 45.5,
      imagesCount: 1100,
      documentsCount: 150,
      trends: [
        { name: 'Jan', uploaded: 50 },
        { name: 'Feb', uploaded: 120 },
        { name: 'Mar', uploaded: 80 },
      ]
    };
  }
}
