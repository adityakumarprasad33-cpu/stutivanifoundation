import React from 'react';
import { PageHeader } from '@/components/dashboard/ui/page-header';
import { ProjectForm } from '@/features/projects/components/project-form';
import { ProjectRepository } from '@/features/projects/services/project.repository';
import type { ProjectFormData } from '@/features/projects/validation/project.schemas';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({
  params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const repository = new ProjectRepository();
  const project = await repository.findBySlug(resolvedParams.slug);

  if (!project) notFound();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader 
        title="Edit Project" 
        description={`Make changes to ${project.name}`}
      />
      
      {/* We pass the existing project data into the form */}
      <ProjectForm 
        mode="edit" 
        projectId={project.id}
        initialData={{
          ...project,
          // Convert complex objects if necessary
          startDate: project.startDate ? new Date(project.startDate as unknown as Date) : null,
          endDate: project.endDate ? new Date(project.endDate as unknown as Date) : null,
          expectedCompletionDate: project.expectedCompletionDate ? new Date(project.expectedCompletionDate as unknown as Date) : null,
        } as unknown as Partial<ProjectFormData>} 
      />
    </div>
  );
}
