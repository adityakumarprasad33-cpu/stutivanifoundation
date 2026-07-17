'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, type ProjectFormData } from '../validation/project.schemas';
import { createProject, updateProject } from '../actions/project.actions';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';

interface ProjectFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<ProjectFormData>;
  projectId?: string;
}

export const ProjectForm = ({ mode, initialData, projectId }: ProjectFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(projectSchema) as any,
    defaultValues: {
      status: 'DRAFT',
      phase: 'PLANNING',
      priority: 'MEDIUM',
      visibility: 'INTERNAL',
      tags: [],
      ...initialData,
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    setError(null);
    startTransition(async () => {
      let result;
      if (mode === 'create') {
        result = await createProject(data);
      } else if (projectId) {
        result = await updateProject(projectId, data);
      }

      if (result?.success) {
        router.push(`/dashboard/projects/${result.slug}`);
      } else {
        setError(result?.error || 'An error occurred while saving the project.');
      }
    });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
      )}

      {/* Basic Info Section */}
      <div className="bg-card border border-border/50 rounded-3xl shadow-sm p-8">
        <h3 className="text-xl font-bold text-foreground mb-6 border-b border-border/50 pb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name *</label>
            <input
              {...register('name')}
              type="text"
              className="w-full h-12 px-4 border-transparent rounded-xl bg-muted/50 text-sm focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none hover:bg-muted"
              placeholder="E.g., Empowering Rural Women 2026"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description *</label>
            <textarea
              {...register('shortDescription')}
              rows={3}
              className="w-full px-4 py-3 border-transparent rounded-xl bg-muted/50 text-sm focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none hover:bg-muted resize-none"
              placeholder="Brief summary of the project goals..."
            />
            {errors.shortDescription && <p className="text-red-500 text-xs mt-1">{errors.shortDescription.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
            <select
              {...register('categoryId')}
              className="w-full h-12 px-4 border-transparent rounded-xl bg-muted/50 text-sm focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none hover:bg-muted appearance-none"
            >
              <option value="">Select Category</option>
              <option value="cat_education">Education</option>
              <option value="cat_health">Healthcare</option>
              <option value="cat_empowerment">Women Empowerment</option>
            </select>
            {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
            <select
              {...register('priority')}
              className="w-full h-12 px-4 border-transparent rounded-xl bg-muted/50 text-sm focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none hover:bg-muted appearance-none"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-card border border-border/50 rounded-3xl shadow-sm p-8">
        <h3 className="text-xl font-bold text-foreground mb-6 border-b border-border/50 pb-4">Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State *</label>
            <input
              {...register('location.state')}
              type="text"
              className="w-full h-12 px-4 border-transparent rounded-xl bg-muted/50 text-sm focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none hover:bg-muted"
            />
            {errors.location?.state && <p className="text-red-500 text-xs mt-1">{errors.location.state.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">District *</label>
            <input
              {...register('location.district')}
              type="text"
              className="w-full h-12 px-4 border-transparent rounded-xl bg-muted/50 text-sm focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none hover:bg-muted"
            />
            {errors.location?.district && <p className="text-red-500 text-xs mt-1">{errors.location.district.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-8 border-t border-border/50">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 h-12 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-xl transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-8 h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow-md disabled:opacity-70"
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {mode === 'create' ? 'Create Project' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};
