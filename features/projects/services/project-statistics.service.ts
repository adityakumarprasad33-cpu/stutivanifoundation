import type { Project } from '../types/project.types';
import { differenceInDays } from 'date-fns';

export interface ProjectStatisticsSummary {
  progressPercentage: number;
  daysRemaining: number;
  daysElapsed: number;
  estimatedCompletion: Date | null;
  budgetUtilizationPercentage: number;
  remainingBudget: number;
  beneficiaryCompletionPercentage: number;
  galleryImageCount: number;
  documentCount: number;
  volunteerCount: number;
  partnerCount: number;
}

export class ProjectStatisticsService {
  /**
   * Computes comprehensive statistics for a given project.
   */
  static compute(project: Project): ProjectStatisticsSummary {
    const now = new Date();
    
    // Dates
    const startDate = project.startDate ? new Date(project.startDate as Date) : null;
    const endDate = project.endDate ? new Date(project.endDate as Date) : null;
    const expectedCompletion = project.expectedCompletionDate ? new Date(project.expectedCompletionDate as Date) : null;

    let daysElapsed = 0;
    let daysRemaining = 0;
    let progressPercentage = 0;

    if (startDate) {
      daysElapsed = Math.max(0, differenceInDays(now, startDate));
      
      if (endDate) {
        const totalDuration = differenceInDays(endDate, startDate);
        daysRemaining = Math.max(0, differenceInDays(endDate, now));
        progressPercentage = totalDuration > 0 
          ? Math.min(100, (daysElapsed / totalDuration) * 100) 
          : 0;
      } else if (expectedCompletion) {
        const totalExpected = differenceInDays(expectedCompletion, startDate);
        daysRemaining = Math.max(0, differenceInDays(expectedCompletion, now));
        progressPercentage = totalExpected > 0
          ? Math.min(100, (daysElapsed / totalExpected) * 100)
          : 0;
      }
    }

    // Financials
    const { approvedBudget, estimatedBudget, fundsUtilized } = project.financials;
    const targetBudget = approvedBudget > 0 ? approvedBudget : estimatedBudget;
    const budgetUtilizationPercentage = targetBudget > 0 ? (fundsUtilized / targetBudget) * 100 : 0;
    const remainingBudget = Math.max(0, targetBudget - fundsUtilized);

    // Beneficiaries
    const { expected, current } = project.beneficiaries;
    const beneficiaryCompletionPercentage = expected > 0 ? (current / expected) * 100 : 0;

    return {
      progressPercentage: Math.round(progressPercentage),
      daysRemaining,
      daysElapsed,
      estimatedCompletion: expectedCompletion || endDate || null,
      budgetUtilizationPercentage: Math.round(budgetUtilizationPercentage),
      remainingBudget,
      beneficiaryCompletionPercentage: Math.round(beneficiaryCompletionPercentage),
      galleryImageCount: project.galleryImages.length,
      documentCount: project.documents.length,
      volunteerCount: project.volunteerIds.length,
      partnerCount: project.partnerIds.length,
    };
  }
}
