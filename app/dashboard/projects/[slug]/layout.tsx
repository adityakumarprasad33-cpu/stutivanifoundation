import React from 'react';
import { PageContainer } from '@/components/dashboard/ui/page-container';
import { ProjectRepository } from '@/features/projects/services/project.repository';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function ProjectWorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const repository = new ProjectRepository();
  const project = await repository.findBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const tabs = [
    { name: 'Overview', href: `/dashboard/projects/${project.slug}` },
    { name: 'Media', href: `/dashboard/projects/${project.slug}/media` },
    { name: 'Documents', href: `/dashboard/projects/${project.slug}/documents` },
    { name: 'Timeline', href: `/dashboard/projects/${project.slug}/timeline` },
    { name: 'Activity', href: `/dashboard/projects/${project.slug}/activity` },
    { name: 'Volunteers', href: `/dashboard/projects/${project.slug}/volunteers` },
    { name: 'Donations', href: `/dashboard/projects/${project.slug}/donations` },
    { name: 'Reports', href: `/dashboard/projects/${project.slug}/reports` },
  ];

  return (
    <PageContainer maxWidth="full">
      <div className="mb-6">
        <Link href="/dashboard/projects" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
          <ChevronLeft size={16} className="mr-1" />
          Back to Projects
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-geist tracking-tight">
              {project.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {project.shortDescription}
            </p>
          </div>
          <div className="flex items-center gap-3">
             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
               {project.status.replace('_', ' ')}
             </span>
             <Link 
               href={`/dashboard/projects/${project.slug}/edit`}
               className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
             >
               Edit Project
             </Link>
          </div>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
        <nav className="flex space-x-1 sm:space-x-4 min-w-max pb-1">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-colors whitespace-nowrap"
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-6 animate-in fade-in duration-300">
        {children}
      </div>
    </PageContainer>
  );
}
