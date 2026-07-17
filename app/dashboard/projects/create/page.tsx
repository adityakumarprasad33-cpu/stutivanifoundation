import React from 'react';
import { PageHeader } from '@/components/dashboard/ui/page-header';
import { ProjectForm } from '@/features/projects/components/project-form';

export const metadata = {
  title: 'Create Project | Dashboard',
};

export default function CreateProjectPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader 
        title="Create Project" 
        description="Initialize a new project. You can save it as a draft and edit details later."
      />
      <ProjectForm mode="create" />
    </div>
  );
}
