'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogFormSchema, type BlogFormData } from '../validation/blog.schemas';
import { RichTextEditor } from './editor/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import { MediaSelectorDialog } from '@/features/gallery/components/selector/media-selector-dialog';
import Image from 'next/image';

interface BlogFormProps {
  initialData?: Partial<BlogFormData>;
  onSubmit: (data: BlogFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function BlogForm({ initialData, onSubmit, isSubmitting }: BlogFormProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'relations'>('content');
  const [featuredImageSelectorOpen, setFeaturedImageSelectorOpen] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null); // For preview only, normally we fetch the actual asset data if editing

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || '',
      category: initialData?.category || '',
      status: initialData?.status || 'DRAFT',
      visibility: initialData?.visibility || 'PUBLIC',
      featured: initialData?.featured || false,
      tags: initialData?.tags || [],
      author: {
        authorId: initialData?.author?.authorId || '',
        coAuthorIds: initialData?.author?.coAuthorIds || []
      },
      seo: {
        metaTitle: initialData?.seo?.metaTitle || '',
        metaDescription: initialData?.seo?.metaDescription || '',
        focusKeyword: initialData?.seo?.focusKeyword || '',
        keywords: initialData?.seo?.keywords || [],
        noIndex: initialData?.seo?.noIndex || false,
        noFollow: initialData?.seo?.noFollow || false,
      },
      relations: initialData?.relations || { relatedBlogs: [], relatedPrograms: [], relatedProjects: [], relatedGalleryAssets: [], relatedReports: [] },
      featuredImageId: initialData?.featuredImageId,
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button type="button" onClick={() => setActiveTab('content')} className={`px-4 py-2 font-medium text-sm ${activeTab === 'content' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Content</button>
        <button type="button" onClick={() => setActiveTab('seo')} className={`px-4 py-2 font-medium text-sm ${activeTab === 'seo' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>SEO</button>
        <button type="button" onClick={() => setActiveTab('relations')} className={`px-4 py-2 font-medium text-sm ${activeTab === 'relations' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Relations</button>
      </div>

      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
              <input {...register('title')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
              <input {...register('slug')} placeholder="Auto-generated if left empty" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt</label>
            <textarea {...register('excerpt')} rows={3} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
              <input {...register('category')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select {...register('status')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="DRAFT">Draft</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visibility</label>
              <select {...register('visibility')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="PUBLIC">Public</option>
                <option value="INTERNAL">Internal Only</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author ID (Placeholder)</label>
            <input {...register('author.authorId')} placeholder="Replace with Author Selector later" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Featured Image</label>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" onClick={() => setFeaturedImageSelectorOpen(true)}>
                <ImageIcon className="mr-2 h-4 w-4" /> Select Featured Image
              </Button>
              {featuredImageUrl && (
                <div className="relative h-12 w-20 bg-gray-100 rounded overflow-hidden">
                  <Image src={featuredImageUrl} alt="Featured" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content *</label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
          </div>
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Title</label>
            <input {...register('seo.metaTitle')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Description</label>
            <textarea {...register('seo.metaDescription')} rows={3} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Focus Keyword</label>
            <input {...register('seo.focusKeyword')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('seo.noIndex')} className="rounded border-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">No Index</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('seo.noFollow')} className="rounded border-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">No Follow</span>
            </label>
          </div>
        </div>
      )}

      {activeTab === 'relations' && (
        <div className="space-y-6">
          <p className="text-sm text-gray-500">Related items UI placeholder (Integration with multi-select comboboxes mapped to Program/Project references).</p>
        </div>
      )}

      <div className="pt-6 flex justify-end gap-4 border-t border-gray-200 dark:border-gray-800">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Blog
        </Button>
      </div>

      <MediaSelectorDialog
        open={featuredImageSelectorOpen}
        onOpenChange={setFeaturedImageSelectorOpen}
        onSelect={(assets) => {
          if (assets.length > 0) {
            setValue('featuredImageId', assets[0].id);
            setFeaturedImageUrl(assets[0].cloudinary?.secureUrl || null);
          }
          setFeaturedImageSelectorOpen(false);
        }}
      />
    </form>
  );
}
