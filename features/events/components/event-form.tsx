'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema, type EventFormData } from '../validation/event.schemas';
import { Button } from '@/components/ui/button';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MediaSelectorDialog } from '@/features/gallery/components/selector/media-selector-dialog';
import Image from 'next/image';

interface EventFormProps {
  initialData?: Partial<EventFormData>;
  onSubmitAction: (data: EventFormData) => Promise<{ success: boolean; error?: string; slug?: string }>;
}

export function EventForm({ initialData, onSubmitAction }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featuredImageSelectorOpen, setFeaturedImageSelectorOpen] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      shortDescription: initialData?.shortDescription || '',
      detailedDescription: initialData?.detailedDescription || '',
      eventType: initialData?.eventType || '',
      category: initialData?.category || '',
      status: initialData?.status || 'DRAFT',
      priority: initialData?.priority || 'NORMAL',
      visibility: initialData?.visibility || 'PUBLIC',
      featured: initialData?.featured || false,
      tags: initialData?.tags || [],
      organizerId: initialData?.organizerId || 'TEMP-ORG-ID', // Should be fetched from context/props
      coordinatorIds: initialData?.coordinatorIds || [],
      volunteerIds: initialData?.volunteerIds || [],
      documents: initialData?.documents || [],
      seo: {
        metaTitle: initialData?.seo?.metaTitle || '',
        metaDescription: initialData?.seo?.metaDescription || '',
        focusKeyword: initialData?.seo?.focusKeyword || '',
        keywords: initialData?.seo?.keywords || [],
        noIndex: initialData?.seo?.noIndex || false,
        noFollow: initialData?.seo?.noFollow || false,
      },
      relations: initialData?.relations || { relatedBlogs: [], galleryReferences: [], futureReports: [] },
      featuredImageId: initialData?.featuredImageId,
      location: initialData?.location || { locationType: 'VENUE' },
      schedule: initialData?.schedule || { startDate: new Date(), endDate: new Date() },
      capacity: initialData?.capacity || { maximumCapacity: 0, expectedAttendance: 0 },
      registrationConfig: initialData?.registrationConfig || { registrationMode: 'NONE', approvalWorkflow: false, allowWaitlist: false, requireTickets: false, requirePayment: false }
    }
  });

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    const res = await onSubmitAction(data);
    if (!res.success) {
      alert(res.error);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="schedule">Schedule & Location</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="seo">SEO & Relations</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input {...register('title')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Detailed Description</label>
            <textarea {...register('detailedDescription')} rows={6} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
            {errors.detailedDescription && <p className="text-red-500 text-sm mt-1">{errors.detailedDescription.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input {...register('category')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Event Type</label>
              <input {...register('eventType')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select {...register('status')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
                <option value="DRAFT">Draft</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="APPROVED">Approved</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="REGISTRATION_OPEN">Registration Open</option>
              </select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
           {/* Date inputs require careful string to date parsing, using Controller for brevity here */}
           <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <Controller
                control={control}
                name="schedule.startDate"
                render={({ field }) => (
                  <input type="datetime-local" 
                         className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                         onChange={(e) => field.onChange(new Date(e.target.value))}
                         value={field.value ? new Date(field.value.getTime() - field.value.getTimezoneOffset() * 60000).toISOString().slice(0,16) : ''}
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <Controller
                control={control}
                name="schedule.endDate"
                render={({ field }) => (
                  <input type="datetime-local" 
                         className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                         onChange={(e) => field.onChange(new Date(e.target.value))}
                         value={field.value ? new Date(field.value.getTime() - field.value.getTimezoneOffset() * 60000).toISOString().slice(0,16) : ''}
                  />
                )}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location Type</label>
              <select {...register('location.locationType')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
                <option value="VENUE">Venue</option>
                <option value="ONLINE">Online</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Venue Name</label>
              <input {...register('location.venueName')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="registration" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Registration Mode</label>
              <select {...register('registrationConfig.registrationMode')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
                <option value="NONE">None</option>
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
                <option value="INVITATION">Invitation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Maximum Capacity</label>
              <input type="number" {...register('capacity.maximumCapacity', { valueAsNumber: true })} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Featured Image</label>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" onClick={() => setFeaturedImageSelectorOpen(true)}>
                <ImageIcon className="w-4 h-4 mr-2" /> Select Image
              </Button>
              {featuredImageUrl && (
                <div className="relative w-32 h-20 rounded overflow-hidden">
                  <Image src={featuredImageUrl} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Meta Title</label>
            <input {...register('seo.metaTitle')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Meta Description</label>
            <textarea {...register('seo.metaDescription')} rows={3} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
          </div>
        </TabsContent>

      </Tabs>

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Save Event
        </Button>
      </div>

      <MediaSelectorDialog 
        open={featuredImageSelectorOpen} 
        onOpenChange={setFeaturedImageSelectorOpen}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSelect={(assets: any) => {
          if (assets && assets.length > 0) {
            setValue('featuredImageId', assets[0].id);
            setFeaturedImageUrl(assets[0].secureUrl || assets[0].url);
          }
          setFeaturedImageSelectorOpen(false);
        }}
      />
    </form>
  );
}
