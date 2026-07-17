import type { Project, ProjectStatus } from '../types/project.types';
import { ProjectStatisticsService } from './project-statistics.service';

export type ProjectHealthStatus = 'EXCELLENT' | 'GOOD' | 'WARNING' | 'CRITICAL' | 'UNKNOWN';

export interface ProjectHealthDetails {
  status: ProjectHealthStatus;
  reasons: string[];
}

export class ProjectHealthService {
  /**
   * Evaluates the overall health of the project based on statistics, budget, and timelines.
   */
  static evaluate(project: Project): ProjectHealthDetails {
    // Non-active projects don't have a computable health in the same way
    const nonComputableStates: ProjectStatus[] = ['DRAFT', 'PENDING_REVIEW', 'ARCHIVED', 'SOFT_DELETED', 'CANCELLED'];
    if (nonComputableStates.includes(project.status)) {
      return { status: 'UNKNOWN', reasons: ['Project is not currently active or published.'] };
    }

    const stats = ProjectStatisticsService.compute(project);
    const reasons: string[] = [];
    let score = 100;

    // Timeline Evaluation
    if (stats.progressPercentage > 90 && stats.beneficiaryCompletionPercentage < 50) {
      score -= 30;
      reasons.push('Timeline is almost complete but beneficiary targets are far behind.');
    } else if (stats.daysRemaining === 0 && !['COMPLETED', 'CANCELLED'].includes(project.status)) {
      score -= 40;
      reasons.push('Project has passed its expected end date but is not marked completed.');
    }

    // Budget Evaluation
    if (stats.budgetUtilizationPercentage > 100) {
      score -= 50;
      reasons.push('Budget is over-utilized.');
    } else if (stats.budgetUtilizationPercentage > 90 && stats.progressPercentage < 70) {
      score -= 25;
      reasons.push('Budget is almost depleted but project progress is lagging.');
    } else if (stats.budgetUtilizationPercentage === 0 && stats.progressPercentage > 20) {
      score -= 10;
      reasons.push('Significant progress reported with zero budget utilization recorded.');
    }

    // Beneficiary Evaluation
    if (stats.beneficiaryCompletionPercentage > 100) {
      reasons.push('Beneficiary targets exceeded.'); // This is positive, doesn't decrease score
    } else if (stats.progressPercentage > 75 && stats.beneficiaryCompletionPercentage < 25) {
      score -= 20;
      reasons.push('Beneficiary impact is significantly lower than project phase suggests.');
    }

    // Determine Final Status
    let status: ProjectHealthStatus = 'EXCELLENT';
    if (score < 50) {
      status = 'CRITICAL';
    } else if (score < 80) {
      status = 'WARNING';
    } else if (score < 95) {
      status = 'GOOD';
    }

    if (status === 'EXCELLENT' && reasons.length === 0) {
      reasons.push('Project is tracking well against timelines, budget, and impact goals.');
    }

    return { status, reasons };
  }
}
