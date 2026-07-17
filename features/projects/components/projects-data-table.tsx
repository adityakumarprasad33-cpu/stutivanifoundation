'use client';

import React from 'react';
import type { Project } from '../types/project.types';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, Calendar, MapPin, IndianRupee, FolderKanban, Plus } from 'lucide-react';

export const ProjectsDataTable = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="overflow-x-auto bg-card border border-border/50 rounded-3xl shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border/50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium">Project Details</th>
            <th scope="col" className="px-6 py-4 font-medium">Status & Phase</th>
            <th scope="col" className="px-6 py-4 font-medium hidden md:table-cell">Location</th>
            <th scope="col" className="px-6 py-4 font-medium hidden lg:table-cell">Budget</th>
            <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-muted/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <Link href={`/dashboard/projects/${project.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                    {project.name}
                  </Link>
                  <span className="text-xs text-gray-500 mt-1 line-clamp-1">{project.shortDescription}</span>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={12}/> Updated {formatDistanceToNow(project.updatedAt as Date, { addSuffix: true })}</span>
                  </div>
                </div>
              </td>
              
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2 items-start">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {project.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {project.phase}
                  </span>
                </div>
              </td>
              
              <td className="px-6 py-4 hidden md:table-cell">
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <MapPin size={14} className="opacity-70" />
                  {project.location.district}, {project.location.state}
                </div>
              </td>
              
              <td className="px-6 py-4 hidden lg:table-cell">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground flex items-center gap-1">
                    <IndianRupee size={12} className="opacity-70"/>
                    {(project.financials.fundsUtilized || 0).toLocaleString()} utilized
                  </span>
                  <span className="text-xs text-gray-500">
                    of {(project.financials.approvedBudget || project.financials.estimatedBudget || 0).toLocaleString()}
                  </span>
                </div>
              </td>
              
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link 
                    href={`/dashboard/projects/${project.slug}/edit`}
                    className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    Edit
                  </Link>
                  <button 
                    className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                    aria-label="Project actions"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          
          {projects.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center bg-card rounded-b-3xl">
                <FolderKanban size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-bold text-foreground">No projects found</h3>
                <p className="text-sm text-muted-foreground mt-1">Get started by creating your first project.</p>
                <Link 
                  href="/dashboard/projects/create"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
                >
                  <Plus size={16} />
                  Create Project
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Pagination Footer */}
      {projects.length > 0 && (
        <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground bg-muted/30">
          <div>Showing {projects.length} results</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl border border-border/50 hover:bg-muted disabled:opacity-50 transition-colors font-medium text-foreground" disabled>Previous</button>
            <button className="px-4 py-2 rounded-xl border border-border/50 hover:bg-muted disabled:opacity-50 transition-colors font-medium text-foreground" disabled>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};
