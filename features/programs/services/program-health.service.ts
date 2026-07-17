import type { Program, ProgramStatus } from '../types/program.types';
import { ProgramStatisticsService } from './program-statistics.service';

export type ProgramHealthStatus = 'EXCELLENT' | 'GOOD' | 'WARNING' | 'CRITICAL' | 'UNKNOWN';

export interface ProgramHealthDetails {
  status: ProgramHealthStatus;
  reasons: string[];
}

export class ProgramHealthService {
  /**
   * Evaluates program health based on the aggregated statistics score and direct program variables.
   */
  static async evaluate(program: Program): Promise<ProgramHealthDetails> {
    const nonComputableStates: ProgramStatus[] = ['DRAFT', 'PENDING_REVIEW', 'ARCHIVED', 'SOFT_DELETED', 'CANCELLED'];
    if (nonComputableStates.includes(program.status)) {
      return { status: 'UNKNOWN', reasons: ['Program is not currently active.'] };
    }

    const stats = await ProgramStatisticsService.compute(program);
    const reasons: string[] = [];

    // Financial Analysis
    if (stats.totalBudget.utilized > stats.totalBudget.approved && stats.totalBudget.approved > 0) {
      reasons.push('Program has exceeded its approved budget.');
    } else if (stats.totalBudget.utilized === 0 && stats.completionPercentage > 10) {
      reasons.push('Progress is reported but no funds have been utilized.');
    }

    // Impact Analysis
    const expected = stats.totalBeneficiaries.expected;
    const current = stats.totalBeneficiaries.current;
    if (expected > 0 && stats.completionPercentage > 80 && (current / expected) < 0.5) {
      reasons.push('Program is nearing completion but beneficiary target is less than 50% met.');
    }

    // Timeline Analysis
    if (stats.daysRemaining === 0 && !['COMPLETED', 'CANCELLED'].includes(program.status)) {
      reasons.push('Program has passed its expected end date but is still marked active.');
    }

    // Determine Final Status
    let status: ProgramHealthStatus = 'EXCELLENT';
    if (stats.healthScore < 50) {
      status = 'CRITICAL';
    } else if (stats.healthScore < 80) {
      status = 'WARNING';
    } else if (stats.healthScore < 95) {
      status = 'GOOD';
    }

    if (status === 'EXCELLENT' && reasons.length === 0) {
      reasons.push('Program is operating efficiently within budget and timeline.');
    }

    return { status, reasons };
  }
}
