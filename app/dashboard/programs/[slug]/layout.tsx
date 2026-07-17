import React from 'react';
import { ProgramRepository } from '@/features/programs/services/program.repository';
import { ProgramHealthService } from '@/features/programs/services/program-health.service';
import { ProgramHeader } from '@/features/programs/components/ui/program-header';
import { requirePermission } from '@/lib/auth/server-guards';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProgramWorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  await requirePermission('programs.view');
  const resolvedParams = await params;
  const repo = new ProgramRepository();
  const program = await repo.findBySlug(resolvedParams.slug);
  
  if (!program) notFound();

  const health = await ProgramHealthService.evaluate(program);

  const tabs = [
    { label: 'Overview', href: `/dashboard/programs/${program.slug}` },
    { label: 'Projects', href: `/dashboard/programs/${program.slug}/projects` },
    { label: 'Timeline', href: `/dashboard/programs/${program.slug}/timeline` },
    { label: 'Gallery', href: `/dashboard/programs/${program.slug}/gallery` },
    { label: 'Documents', href: `/dashboard/programs/${program.slug}/documents` },
    { label: 'Reports', href: `/dashboard/programs/${program.slug}/reports` },
    { label: 'Activity', href: `/dashboard/programs/${program.slug}/activity` },
  ];

  return (
    <div className="min-h-full flex flex-col bg-gray-50 dark:bg-black">
      <ProgramHeader program={program} healthStatus={health.status} />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto flex gap-6">
          {tabs.map(tab => (
            <Link 
              key={tab.label}
              href={tab.href}
              className="whitespace-nowrap py-4 px-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 dark:hover:text-white"
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
