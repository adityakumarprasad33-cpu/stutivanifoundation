import React from 'react';
import { ProgramsDataTable } from '@/features/programs/components/programs-data-table';
import { ProgramRepository } from '@/features/programs/services/program.repository';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { requirePermission } from '@/lib/auth/server-guards';

export const metadata = { title: 'Programs | Dashboard' };

export default async function ProgramsPage() {
  await requirePermission('programs.view');
  
  const repo = new ProgramRepository();
  const programs = await repo.getLatestPrograms(50); // initial load
  
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Programs</h1>
          <p className="text-sm text-gray-500">Manage organizational initiatives and portfolios.</p>
        </div>
        
        <Link 
          href="/dashboard/programs/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} className="mr-2" />
          New Program
        </Link>
      </div>

      <ProgramsDataTable programs={programs} />
    </div>
  );
}
