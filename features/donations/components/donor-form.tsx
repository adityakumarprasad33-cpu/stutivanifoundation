'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donorFormSchema, type DonorFormData } from '../validation/donor.schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createDonor, updateDonor } from '../actions/donor.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DonorFormProps {
  initialData?: Partial<DonorFormData> & { id?: string };
}

export function DonorForm({ initialData }: DonorFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DonorFormData>({
    // @ts-expect-error type mismatch
    resolver: zodResolver(donorFormSchema),
    defaultValues: {
      donorType: initialData?.donorType || 'INDIVIDUAL',
      fullName: initialData?.fullName || '',
      organizationName: initialData?.organizationName || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      address: initialData?.address || { country: 'India' },
      taxDetails: initialData?.taxDetails || { eligible80G: true },
      preferences: initialData?.preferences || { anonymousDonation: false, preferredCommunication: 'EMAIL' },
      notes: initialData?.notes || '',
      tags: initialData?.tags || [],
      status: initialData?.status || 'ACTIVE'
    }
  });

  const { register, handleSubmit, setValue, watch } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        const res = await updateDonor(initialData.id, data);
        if (res.success) {
          toast.success('Donor updated successfully');
          router.push(`/dashboard/donors/${initialData.id}`);
        } else toast.error(res.error);
      } else {
        const res = await createDonor(data);
        if (res.success) {
          toast.success('Donor created successfully');
          router.push(`/dashboard/donors/${res.data}`);
        } else toast.error(res.error);
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Donor Type</label>
          <Select value={watch('donorType')} onValueChange={(val: string | null) => setValue('donorType', val as 'INDIVIDUAL')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="INDIVIDUAL">Individual</SelectItem>
              <SelectItem value="CORPORATE">Corporate</SelectItem>
              <SelectItem value="TRUST">Trust</SelectItem>
              <SelectItem value="NGO">NGO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={watch('status')} onValueChange={(val: string | null) => setValue('status', val as 'ACTIVE')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input {...register('fullName')} placeholder="Primary contact name" />
        </div>

        {watch('donorType') !== 'INDIVIDUAL' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Organization Name</label>
            <Input {...register('organizationName')} placeholder="Company / Trust Name" />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" {...register('email')} placeholder="donor@example.com" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <Input {...register('phone')} placeholder="+91 XXXXX XXXXX" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">PAN Number</label>
          <Input {...register('taxDetails.panNumber')} placeholder="ABCDE1234F" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Preferred Communication</label>
          <Select value={watch('preferences.preferredCommunication')} onValueChange={(val: string | null) => setValue('preferences.preferredCommunication', val as 'EMAIL')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="EMAIL">Email</SelectItem>
              <SelectItem value="SMS">SMS</SelectItem>
              <SelectItem value="PHONE">Phone</SelectItem>
              <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
              <SelectItem value="NONE">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Notes</label>
        <Textarea {...register('notes')} placeholder="Any specific requirements or background information" />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : (initialData?.id ? 'Update Donor' : 'Create Donor')}
      </Button>
    </form>
  );
}
