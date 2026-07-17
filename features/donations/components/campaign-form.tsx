'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { campaignFormSchema, type CampaignFormData } from '../validation/campaign.schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createCampaign, updateCampaign } from '../actions/campaign.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CampaignFormProps {
  initialData?: Partial<CampaignFormData> & { id?: string };
}

export function CampaignForm({ initialData }: CampaignFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CampaignFormData>({
    // @ts-expect-error type mismatch
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      goalAmount: initialData?.goalAmount || 100000,
      status: initialData?.status || 'DRAFT',
      visibility: initialData?.visibility || 'PUBLIC',
      startDate: initialData?.startDate || new Date(),
    }
  });

  const { register, handleSubmit, setValue, watch } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        const res = await updateCampaign(initialData.id, data);
        if (res.success) {
          toast.success('Campaign updated successfully');
          router.push(`/dashboard/campaigns/${initialData.id}`); // Should be slug in prod
        } else toast.error(res.error);
      } else {
        const res = await createCampaign(data);
        if (res.success) {
          toast.success('Campaign created successfully');
          router.push(`/dashboard/campaigns`);
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
      <div className="space-y-2">
        <label className="text-sm font-medium">Campaign Title</label>
        <Input {...register('title')} placeholder="Help Build the New Center" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea {...register('description')} rows={5} placeholder="Detailed explanation of the campaign goals" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Goal Amount (INR)</label>
          <Input type="number" {...register('goalAmount', { valueAsNumber: true })} />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={watch('status')} onValueChange={(val: string | null) => setValue('status', val as 'DRAFT')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="PAUSED">Paused</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : (initialData?.id ? 'Update Campaign' : 'Create Campaign')}
      </Button>
    </form>
  );
}
