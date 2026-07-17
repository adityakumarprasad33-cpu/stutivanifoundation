/* eslint-disable @typescript-eslint/no-explicit-any */
 
export interface ExportOptions {
  filename: string;
  title: string;
  includeHeaders: boolean;
  filtersApplied: Record<string, any>;
  timestamp: Date;
}

export interface IExportProvider {
  exportToCSV(data: any[], options: ExportOptions): Promise<string>; // Returns URL or string
  exportToExcel(data: any[], options: ExportOptions): Promise<string>;
  exportToPDF(data: any[], options: ExportOptions): Promise<string>;
}

export class ExportEngine {
  private provider: IExportProvider | null = null;

  registerProvider(provider: IExportProvider) {
    this.provider = provider;
  }

  private ensureProvider(): IExportProvider {
    if (!this.provider) throw new Error('ExportProvider is not registered.');
    return this.provider;
  }

  async exportCSV(data: any[], options: ExportOptions) {
    return this.ensureProvider().exportToCSV(data, options);
  }

  async exportExcel(data: any[], options: ExportOptions) {
    return this.ensureProvider().exportToExcel(data, options);
  }

  async exportPDF(data: any[], options: ExportOptions) {
    return this.ensureProvider().exportToPDF(data, options);
  }
}

// Global instance to be used by widgets and tables
export const exportEngine = new ExportEngine();
