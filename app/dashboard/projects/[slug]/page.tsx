import React from 'react';
import { ProjectRepository } from '@/features/projects/services/project.repository';
import { notFound } from 'next/navigation';
import { ProjectPolicy } from '@/features/projects/policy/project.policy';
import { MapPin, Calendar, Users, IndianRupee } from 'lucide-react';
import { format } from 'date-fns';

export default async function ProjectOverviewPage({
  params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const repository = new ProjectRepository();
  const project = await repository.findBySlug(resolvedParams.slug);

  if (!project) notFound();

  const financials = ProjectPolicy.calculateFinancials(project);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Main Content Area */}
      <div className="xl:col-span-2 space-y-6">
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About this Project</h2>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {project.detailedDescription ? (
              <div dangerouslySetInnerHTML={{ __html: project.detailedDescription }} />
            ) : (
              <p className="text-gray-500 italic">No detailed description provided.</p>
            )}
          </div>
        </div>

        {/* Goals & Metrics */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Financial Progress</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-950/50 rounded-lg border border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Target</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <IndianRupee size={16} className="mr-1 text-gray-400" />
                {(project.financials.approvedBudget || project.financials.estimatedBudget).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-950/50 rounded-lg border border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Raised</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400 flex items-center">
                <IndianRupee size={16} className="mr-1" />
                {project.financials.fundsRaised.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-950/50 rounded-lg border border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Utilized</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center">
                <IndianRupee size={16} className="mr-1" />
                {project.financials.fundsUtilized.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-950/50 rounded-lg border border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Remaining</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <IndianRupee size={16} className="mr-1 text-gray-400" />
                {financials.remainingBudget.toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">Fundraising Progress</span>
              <span className="font-medium text-gray-900 dark:text-white">{Math.round(financials.fundraisingProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(100, financials.fundraisingProgress)}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Details */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
          {project.coverImage ? (
            <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.coverImage.secureUrl} alt={project.name} className="object-cover w-full h-full" />
            </div>
          ) : (
            <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
               <span className="text-sm text-gray-400">No cover image</span>
            </div>
          )}
          
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="text-gray-400 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{project.location.district}, {project.location.state}</p>
                {project.location.village && <p className="text-xs text-gray-500 mt-0.5">{project.location.village}</p>}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-gray-400 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Timeline</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {project.startDate ? format(project.startDate as Date, 'MMM d, yyyy') : 'TBD'} 
                  {' - '} 
                  {project.expectedCompletionDate ? format(project.expectedCompletionDate as Date, 'MMM d, yyyy') : 'TBD'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="text-gray-400 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Beneficiaries</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {project.beneficiaries.current.toLocaleString()} / {project.beneficiaries.expected.toLocaleString()} reached
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tags & Categories */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.length > 0 ? project.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                {tag}
              </span>
            )) : <span className="text-xs text-gray-400">No tags assigned</span>}
          </div>
        </div>
      </div>

    </div>
  );
}
