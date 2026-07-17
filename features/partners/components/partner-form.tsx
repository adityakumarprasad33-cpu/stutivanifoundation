'use client';

import React, { useTransition, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { partnerSchema, type CreatePartnerDTO, type Partner, PARTNER_TYPES } from '../types/partner.types';
import { createPartner, updatePartner } from '../actions/partner.actions';
import { useRouter } from 'next/navigation';
import { Loader2, Save, Image as ImageIcon, X } from 'lucide-react';
import { MediaSelectorDialog } from '@/features/gallery/components/selector/media-selector-dialog';
import type { MediaAsset } from '@/features/gallery/types/media.types';

interface PartnerFormProps {
  mode: 'create' | 'edit';
  initialData?: Partner;
}

export const PartnerForm = ({ mode, initialData }: PartnerFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<string>(initialData?.logoMediaId || '');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePartnerDTO>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(partnerSchema.omit({ id: true, createdAt: true, updatedAt: true })) as any,
    defaultValues: {
      partnerType: 'Corporate',
      displayOrder: 0,
      featured: false,
      active: true,
      ...initialData,
    },
  });

  useEffect(() => {
    setValue('logoMediaId', selectedMediaId, { shouldValidate: true });
  }, [selectedMediaId, setValue]);

  const handleMediaSelect = (assets: MediaAsset[]) => {
    if (assets.length > 0) {
      setSelectedMediaId(assets[0].id);
      setIsMediaSelectorOpen(false);
    }
  };

  const onSubmit = (data: CreatePartnerDTO) => {
    setError(null);
    startTransition(async () => {
      const result = mode === 'create'
        ? await createPartner(data)
        : await updatePartner(initialData!.id, data);

      if (result.success) {
        router.push('/dashboard/partners');
      } else {
        setError(result.error || 'Failed to save partner');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
      )}

      {/* Basic Info */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
          Partner Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Partner Name *</label>
            <input
              {...register('name')}
              type="text"
              className="w-full h-11 px-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              placeholder="e.g. Microsoft Philanthropies"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Partner Type *</label>
            <select
              {...register('partnerType')}
              className="w-full h-11 px-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            >
              {PARTNER_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website URL</label>
            <input
              {...register('websiteUrl')}
              type="url"
              className="w-full h-11 px-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              placeholder="https://example.com"
            />
            {errors.websiteUrl && <p className="text-red-500 text-xs mt-1">{errors.websiteUrl.message}</p>}
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
              placeholder="Brief description of the partnership..."
            />
          </div>
        </div>
      </div>

      {/* Logo & Media */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
          Partner Logo
        </h3>
        
        <div className="flex flex-col gap-4">
          <input type="hidden" {...register('logoMediaId')} />
          
          <div className="flex items-start gap-6">
            <div className="w-40 h-40 shrink-0 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
              {selectedMediaId ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <ImageIcon size={32} className="text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500 font-medium">Logo Selected</span>
                  <button 
                    type="button"
                    onClick={() => setSelectedMediaId('')}
                    className="absolute top-2 right-2 p-1 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black rounded-full shadow-sm text-gray-600 dark:text-gray-300 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <ImageIcon size={32} className="text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500 font-medium px-4 text-center">No logo selected</span>
                </>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Logos are managed through the centralized Digital Asset Management (DAM) system. Select an existing transparent PNG or SVG logo, or upload a new one to the DAM.
                </p>
                {errors.logoMediaId && <p className="text-red-500 text-xs mt-2">{errors.logoMediaId.message}</p>}
              </div>
              <button
                type="button"
                onClick={() => setIsMediaSelectorOpen(true)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
              >
                {selectedMediaId ? 'Change Logo' : 'Select from DAM'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visibility & Sorting */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
          Visibility & Sorting
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-start pt-0.5">
                <input
                  type="checkbox"
                  {...register('active')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                  Active Partner
                </span>
                <span className="block text-sm text-gray-500">
                  Visible on the public website (if within dates)
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-start pt-0.5">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-amber-600 transition-colors">
                  Featured Partner
                </span>
                <span className="block text-sm text-gray-500">
                  Prioritized in sorting algorithms
                </span>
              </div>
            </label>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Order</label>
              <input
                {...register('displayOrder', { valueAsNumber: true })}
                type="number"
                className="w-full h-11 px-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Lower numbers appear first (e.g. 0, 1, 2)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 h-11 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-8 h-11 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {mode === 'create' ? 'Create Partner' : 'Save Changes'}
        </button>
      </div>

      <MediaSelectorDialog
        open={isMediaSelectorOpen}
        onOpenChange={setIsMediaSelectorOpen}
        onSelect={handleMediaSelect}
        multiple={false}
        allowedTypes={['IMAGE']}
        folder="partners"
      />
    </form>
  );
};
