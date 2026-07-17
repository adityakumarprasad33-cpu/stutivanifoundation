'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MediaSelectorDialog } from '@/features/gallery/components/selector/media-selector-dialog';
import { volunteerFormSchema, type VolunteerFormData } from '../validation/volunteer.schemas';
import type { Volunteer } from '../types/volunteer.types';
import { toast } from 'sonner';

interface VolunteerFormProps {
  initialData?: Volunteer;
  onSubmit: (data: unknown) => Promise<{ success: boolean; id?: string; slug?: string; error?: string }>;
}

export function VolunteerForm({ initialData, onSubmit }: VolunteerFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImageSelectorOpen, setProfileImageSelectorOpen] = useState(false);


  const form = useForm<VolunteerFormData>({
    // @ts-expect-error - RHF hook type mismatch
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: initialData ? {
      volunteerType: initialData.volunteerType,
      personalInfo: initialData.personalInfo,
      emergencyContact: initialData.emergencyContact,
      address: initialData.address,
      profileDetails: initialData.profileDetails,
      media: initialData.media,
      relations: initialData.relations,
      status: initialData.status,
      verificationStatus: initialData.verificationStatus,
      profileVisibility: initialData.profileVisibility,
      joinDate: initialData.joinDate,
      linkedUserId: initialData.linkedUserId,
    } : {
      volunteerType: 'GENERAL',
      status: 'DRAFT',
      verificationStatus: 'PENDING',
      profileVisibility: 'INTERNAL',
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        bloodGroup: 'UNKNOWN',
      },
      emergencyContact: {},
      address: {},
      profileDetails: {
        skills: [],
        languages: [],
        interests: [],
        tags: []
      },
      media: {
        identityDocumentIds: [],
        medicalDocumentIds: [],
        policeVerificationIds: [],
        certificateIds: [],
        otherDocumentIds: []
      },
      relations: {
        programs: [],
        projects: [],
        events: [],
        gallery: [],
        blogs: [],
        reports: [],
        futureDonationCampaigns: []
      }
    }
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const result = await onSubmit(data);
      if (result.success) {
        toast.success(initialData ? 'Volunteer updated' : 'Volunteer created');
        router.push(`/dashboard/volunteers/${result.slug || initialData?.slug}`);
      } else {
        toast.error(result.error || 'Operation failed');
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{initialData ? 'Edit Volunteer' : 'New Volunteer'}</h2>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Volunteer'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="settings">Settings & Media</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardContent className="pt-6 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">First Name</label>
                <Input {...register('personalInfo.firstName')} />
                {errors.personalInfo?.firstName && <p className="text-sm text-red-500">{errors.personalInfo.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Last Name</label>
                <Input {...register('personalInfo.lastName')} />
                {errors.personalInfo?.lastName && <p className="text-sm text-red-500">{errors.personalInfo.lastName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Email</label>
                <Input type="email" {...register('personalInfo.email')} />
                {errors.personalInfo?.email && <p className="text-sm text-red-500">{errors.personalInfo.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Phone</label>
                <Input {...register('personalInfo.phone')} />
                {errors.personalInfo?.phone && <p className="text-sm text-red-500">{errors.personalInfo.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Blood Group</label>
                <Select 
                  value={watch('personalInfo.bloodGroup')} 
                  onValueChange={(val: string | null) => setValue('personalInfo.bloodGroup', val as 'UNKNOWN')}
                >
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'UNKNOWN'].map(bg => (
                      <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional" className="space-y-4">
          <Card>
            <CardContent className="pt-6 grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Occupation</label>
                <Input {...register('profileDetails.occupation')} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Experience / Background</label>
                <Textarea {...register('profileDetails.experience')} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Bio</label>
                <Textarea {...register('profileDetails.bio')} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardContent className="pt-6 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Status</label>
                <Select 
                  value={watch('status')} 
                  onValueChange={(val: string | null) => setValue('status', val as 'DRAFT')}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['DRAFT', 'APPLIED', 'PENDING_VERIFICATION', 'VERIFIED', 'ACTIVE', 'INACTIVE', 'SUSPENDED'].map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Volunteer Type</label>
                <Select 
                  value={watch('volunteerType')} 
                  onValueChange={(val: string | null) => setValue('volunteerType', val as 'GENERAL')}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['GENERAL', 'CORE_TEAM', 'COORDINATOR', 'MEDICAL', 'TEACHER', 'INTERN', 'CSR', 'CAMPAIGN', 'GUEST'].map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-2 pt-4">
                <label className="text-sm font-medium leading-none">Profile Photo</label>
                <div className="mt-2 flex items-center gap-4">
                  {watch('media.profilePhotoId') ? (
                    <div className="text-sm font-medium text-green-600">Photo Selected</div>
                  ) : (
                    <div className="text-sm text-gray-500">No photo selected</div>
                  )}
                  <Button type="button" variant="outline" onClick={() => setProfileImageSelectorOpen(true)}>
                    Select Photo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <MediaSelectorDialog 
        open={profileImageSelectorOpen} 
        onOpenChange={setProfileImageSelectorOpen}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSelect={(assets: any) => {
          if (assets && assets.length > 0) {
            setValue('media.profilePhotoId', assets[0].id);
          }
        }}
      />
    </form>
  );
}
