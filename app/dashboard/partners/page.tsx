import React from 'react';
import { PageHeader } from '@/components/dashboard/ui/page-header';
import { Plus, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/server-guards';
import { partnerRepository } from '@/features/partners/services/partner.repository';
import { PartnersDataTable } from '@/features/partners/components/partners-data-table';

export default async function PartnersOverviewPage() {
  await requireAuth();
  
  const partners = await partnerRepository.getAllPartners();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader 
          title="Partners & Sponsors" 
          description="Manage corporate, NGO, and community partners displayed on the public website."
        />
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/partners/create"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            New Partner
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50 dark:bg-gray-950/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search partners..." 
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        <PartnersDataTable initialData={partners} />
      </div>
    </div>
  );
}
