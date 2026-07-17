import type { Program } from '../types/program.types';
import { ProjectRepository } from '../../projects/services/project.repository';
import { differenceInDays } from 'date-fns';

export interface ProgramStatisticsSummary {
  projectsCount: number;
  totalBeneficiaries: { expected: number; current: number };
  totalBudget: { estimated: number; approved: number; utilized: number };
  completionPercentage: number;
  healthScore: number;
  daysRemaining: number;
  daysElapsed: number;
}

export class ProgramStatisticsService {
  /**
   * Computes statistics dynamically based on child projects and program definitions.
   * Note: In a heavily scaled application, this aggregation should be done
   * via a Cloud Function and persisted on the Program document.
   */
  static async compute(program: Program): Promise<ProgramStatisticsSummary> {
    const projectRepo = new ProjectRepository();
    // Fetch all active/published projects tied to this program
    const { data: projects } = await projectRepo.query({
      filters: [{ field: 'programId', operator: '==', value: program.id }]
    });

    let activeProjectProgressSum = 0;
    
    // Aggregation
    projects.forEach(proj => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      activeProjectProgressSum += (proj as any).progressPercentage || 0;
    });

    const projectsCount = projects.length;
    const averageProjectProgress = projectsCount > 0 ? (activeProjectProgressSum / projectsCount) : 0;

    // Timeline calculation based on Program Dates
    const now = new Date();
    const startDate = program.startDate ? new Date(program.startDate as Date) : null;
    const endDate = program.endDate ? new Date(program.endDate as Date) : null;
    const expectedCompletion = program.expectedCompletionDate ? new Date(program.expectedCompletionDate as Date) : null;

    let daysElapsed = 0;
    let daysRemaining = 0;
    let timelineProgress = 0;

    if (startDate) {
      daysElapsed = Math.max(0, differenceInDays(now, startDate));
      if (endDate) {
        const totalDuration = differenceInDays(endDate, startDate);
        daysRemaining = Math.max(0, differenceInDays(endDate, now));
        timelineProgress = totalDuration > 0 ? (daysElapsed / totalDuration) * 100 : 0;
      } else if (expectedCompletion) {
        const totalExpected = differenceInDays(expectedCompletion, startDate);
        daysRemaining = Math.max(0, differenceInDays(expectedCompletion, now));
        timelineProgress = totalExpected > 0 ? (daysElapsed / totalExpected) * 100 : 0;
      }
    }

    // Blend timeline progress with project progress for an overall score
    const completionPercentage = projectsCount > 0 
      ? Math.round((averageProjectProgress * 0.7) + (Math.min(100, timelineProgress) * 0.3))
      : Math.round(Math.min(100, timelineProgress));

    // Calculate a rough health score based on timeline vs completion mapping
    let healthScore = 100;
    if (timelineProgress > completionPercentage + 20) healthScore -= 20; // Lagging behind schedule
    if (program.financials.fundsUtilized > program.financials.approvedBudget) healthScore -= 30;

    return {
      projectsCount,
      totalBeneficiaries: {
        expected: program.beneficiaries.expected,
        current: program.beneficiaries.current
      },
      totalBudget: {
        estimated: program.financials.estimatedBudget,
        approved: program.financials.approvedBudget,
        utilized: program.financials.fundsUtilized
      },
      completionPercentage: Math.min(100, Math.max(0, completionPercentage)),
      healthScore: Math.min(100, Math.max(0, healthScore)),
      daysElapsed,
      daysRemaining
    };
  }
}
