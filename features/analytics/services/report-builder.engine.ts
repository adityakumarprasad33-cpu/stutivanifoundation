/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilterType } from '@/config/dashboard-widgets';

export interface ReportColumn {
  id: string;
  label: string;
  dataType: 'string' | 'number' | 'date' | 'currency' | 'percentage';
  isVisible: boolean;
}

export interface SavedReportDefinition {
  reportId: string;
  title: string;
  description: string;
  module: 'PROGRAMS' | 'PROJECTS' | 'VOLUNTEERS' | 'DONATIONS' | 'EVENTS' | 'COMBINED';
  columns: ReportColumn[];
  filters: Partial<Record<FilterType, any>>;
  sort: { columnId: string; direction: 'asc' | 'desc' }[];
  visibility: 'PRIVATE' | 'INTERNAL' | 'PUBLIC';
  createdBy: string;
}

export class ReportBuilderEngine {
  /**
   * Generates a dynamic query based on the SavedReportDefinition
   */
  static async buildQuery(_definition: SavedReportDefinition): Promise<any> {
    throw new Error('NotImplementedError: Report query builder not yet implemented.');
  }

  /**
   * Executes a saved report and returns tabular data ready for ExportEngine
   */
  static async executeReport(_definition: SavedReportDefinition): Promise<any[]> {
    throw new Error('NotImplementedError: Report execution not yet implemented.');
  }
}
