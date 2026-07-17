import React from 'react';
import { ProgramRepository } from '@/features/programs/services/program.repository';
import { ProgramStatisticsService } from '@/features/programs/services/program-statistics.service';
import { notFound } from 'next/navigation';
import { ProgramSummary } from '@/features/programs/components/ui/program-summary';
import { ProgramStatisticsCard } from '@/features/programs/components/ui/program-statistics-card';
import { ProgramBudgetCard } from '@/features/programs/components/ui/program-budget-card';
import { ProgramBeneficiaryCard } from '@/features/programs/components/ui/program-beneficiary-card';
import { ProgramProgressCard } from '@/features/programs/components/ui/program-progress-card';

export default async function ProgramOverviewPage({
  params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const repo = new ProgramRepository();
  const program = await repo.findBySlug(resolvedParams.slug);
  if (!program) notFound();

  const stats = await ProgramStatisticsService.compute(program);

  return (
    <div className="space-y-6">
      <ProgramStatisticsCard stats={stats} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProgramSummary program={program} />
        </div>
        
        <div className="space-y-6">
          <ProgramProgressCard stats={stats} expectedCompletion={program.expectedCompletionDate as Date} />
          <ProgramBudgetCard stats={stats} />
          <ProgramBeneficiaryCard 
            expected={program.beneficiaries.expected} 
            current={program.beneficiaries.current} 
          />
        </div>
      </div>
    </div>
  );
}
