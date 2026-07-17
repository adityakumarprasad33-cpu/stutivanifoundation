export type ScheduleFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

export interface ReportSchedule {
  scheduleId: string;
  reportId: string; // References a saved custom report
  frequency: ScheduleFrequency;
  recipients: string[]; // User IDs or emails
  lastRunAt?: Date;
  nextRunAt: Date;
  isActive: boolean;
  createdBy: string;
}

export interface ScheduledReportLog {
  logId: string;
  scheduleId: string;
  runAt: Date;
  status: 'SUCCESS' | 'FAILED';
  error?: string;
  deliveredTo: string[];
}
