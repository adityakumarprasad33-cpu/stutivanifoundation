import React from 'react';
import { PageHeader } from '@/components/dashboard/ui/page-header';
import { Plus, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/server-guards';
import { ProjectRepository } from '@/features/projects/services/project.repository';
import { ProjectsDataTable } from '@/features/projects/components/projects-data-table';

export default async function ProjectsOverviewPage() {
  await requireAuth();
  
  const projectRepository = new ProjectRepository();
  const { data: projects } = await projectRepository.query({
    limit: 50
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader 
          title="Projects" 
          description="Manage foundation initiatives, programs, and their lifecycles."
        />
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/projects/create"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            New Project
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50 dark:bg-gray-950/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Data Table */}
        <ProjectsDataTable projects={projects} />
      </div>
    </div>
  );
}
