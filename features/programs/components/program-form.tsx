'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { programSchema, type ProgramFormData } from '../validation/program.schemas';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProgramForm = ({ initialData, onSubmit }: { initialData?: Partial<ProgramFormData>, onSubmit?: (data: any) => Promise<void> }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit: hookHandleSubmit, formState: { errors, isSubmitting } } = useForm<any>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(programSchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      shortDescription: initialData?.shortDescription || '',
      detailedDescription: initialData?.detailedDescription || '',
      categoryId: initialData?.categoryId || '',
      priority: initialData?.priority || 'MEDIUM',
      visibility: initialData?.visibility || 'PUBLIC',
      status: initialData?.status || 'DRAFT',
      location: {
        state: initialData?.location?.state || '',
        district: initialData?.location?.district || '',
        village: initialData?.location?.village || '',
      }
    }
  });

  return (
    <form onSubmit={hookHandleSubmit(onSubmit || (async () => {}))} className="space-y-8 bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">Basic Information</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Name *</label>
            <input 
              {...register('name')} 
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="E.g., Women Empowerment Initiative"
            />
            {errors.name?.message && <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description *</label>
            <textarea 
              {...register('shortDescription')} 
              rows={2}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" 
            />
            {errors.shortDescription?.message && <p className="text-red-500 text-xs mt-1">{String(errors.shortDescription.message)}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category ID *</label>
              <input 
                {...register('categoryId')} 
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select {...register('priority')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visibility</label>
              <select {...register('visibility')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <option value="PUBLIC">Public</option>
                <option value="INTERNAL">Internal</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State *</label>
            <input {...register('location.state')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg" />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(errors.location as any)?.state?.message && <p className="text-red-500 text-xs mt-1">{String((errors.location as any).state.message)}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">District *</label>
            <input {...register('location.district')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg" />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(errors.location as any)?.district?.message && <p className="text-red-500 text-xs mt-1">{String((errors.location as any).district.message)}</p>}
          </div>
        </div>
      </div>

      {/* Other fields like Dates, Budget, Beneficiaries would be expanded here similarly to Projects */}

      <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3">
        <button type="button" className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center">
          {isSubmitting ? 'Saving...' : 'Save Program'}
        </button>
      </div>
    </form>
  );
};
