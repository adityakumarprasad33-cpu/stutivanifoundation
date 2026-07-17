/* eslint-disable @typescript-eslint/no-explicit-any */
 
export interface DashboardSnapshot {
  snapshotId: string;
  dashboardId: string;
  generatedAt: Date;
  generatedBy: string; // User ID
  generatedFor?: string; // Optional target (e.g., 'Board of Directors')
  filters: Record<string, any>;
  widgets: any[]; // The state of widgets at the time
  totals: Record<string, number>;
}
