import React from 'react';
import { ProgramRepository } from '@/features/programs/services/program.repository';
import { notFound } from 'next/navigation';
import { ProgramTimeline } from '@/features/programs/components/ui/program-timeline';

export default async function ProgramTimelinePage({
  params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const repo = new ProgramRepository();
  const program = await repo.findBySlug(resolvedParams.slug);
  if (!program) notFound();

  return (
    <div className="max-w-3xl">
      <ProgramTimeline program={program} />
    </div>
  );
}
