export type KPIDefinition = {
  id: string;
  title: string;
  description: string;
  format: 'number' | 'currency' | 'percentage';
  trendMode: 'higher_is_better' | 'lower_is_better';
};

export const ANALYTICS_KPIS: Record<string, KPIDefinition> = {
  TOTAL_DONATIONS: {
    id: 'TOTAL_DONATIONS',
    title: 'Total Donations',
    description: 'Sum of all completed donations',
    format: 'currency',
    trendMode: 'higher_is_better'
  },
  ACTIVE_VOLUNTEERS: {
    id: 'ACTIVE_VOLUNTEERS',
    title: 'Active Volunteers',
    description: 'Volunteers active in the past 30 days',
    format: 'number',
    trendMode: 'higher_is_better'
  },
  TOTAL_PROJECTS: {
    id: 'TOTAL_PROJECTS',
    title: 'Total Projects',
    description: 'Total ongoing and completed projects',
    format: 'number',
    trendMode: 'higher_is_better'
  },
  PROGRAM_COMPLETION: {
    id: 'PROGRAM_COMPLETION',
    title: 'Program Completion',
    description: 'Percentage of successful programs',
    format: 'percentage',
    trendMode: 'higher_is_better'
  },
  ATTENDANCE_RATE: {
    id: 'ATTENDANCE_RATE',
    title: 'Attendance Rate',
    description: 'Average attendance across all events',
    format: 'percentage',
    trendMode: 'higher_is_better'
  },
  REVENUE_GROWTH: {
    id: 'REVENUE_GROWTH',
    title: 'Revenue Growth',
    description: 'Month-over-month revenue growth',
    format: 'percentage',
    trendMode: 'higher_is_better'
  },
  ORGANIZATION_HEALTH: {
    id: 'ORGANIZATION_HEALTH',
    title: 'Organization Health',
    description: 'Composite score of platform metrics',
    format: 'percentage',
    trendMode: 'higher_is_better'
  },
  CAMPAIGN_SUCCESS: {
    id: 'CAMPAIGN_SUCCESS',
    title: 'Campaign Success',
    description: 'Percentage of campaigns reaching their goals',
    format: 'percentage',
    trendMode: 'higher_is_better'
  }
};
