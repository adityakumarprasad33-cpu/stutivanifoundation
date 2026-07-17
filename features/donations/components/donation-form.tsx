'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donationFormSchema, type DonationFormData } from '../validation/donation.schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createDonation } from '../actions/donation.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DonationFormProps {
  donorId?: string; // Pre-select donor
  campaignId?: string; // Pre-select campaign
}

export function DonationForm({ donorId, campaignId }: DonationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DonationFormData>({
    // @ts-expect-error type mismatch
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      donorId: donorId || '',
      campaignId: campaignId || undefined,
      amount: 0,
      currency: 'INR',
      paymentMethod: 'BANK_TRANSFER',
      donationStatus: 'COMPLETED',
      donationDate: new Date(),
      purpose: 'General Fund',
      anonymous: false
    }
  });

  const { register, handleSubmit, setValue, watch } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const res = await createDonation(data);
      if (res.success) {
        toast.success('Donation logged successfully');
        router.push(`/dashboard/donations`);
      } else toast.error(res.error);
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Donor ID (Manual override)</label>
          <Input {...register('donorId')} disabled={!!donorId} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input type="number" {...register('amount', { valueAsNumber: true })} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Payment Method</label>
          <Select value={watch('paymentMethod')} onValueChange={(val: string | null) => setValue('paymentMethod', val as 'CASH')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
              <SelectItem value="CHEQUE">Cheque</SelectItem>
              <SelectItem value="UPI">UPI</SelectItem>
              <SelectItem value="CASH">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={watch('donationStatus')} onValueChange={(val: string | null) => setValue('donationStatus', val as 'COMPLETED')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Purpose</label>
          <Input {...register('purpose')} placeholder="e.g. General Fund, Building Fund" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Reference Number (Txn ID)</label>
          <Input {...register('referenceNumber')} placeholder="UPI Ref / Cheque No" />
        </div>

      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Remarks</label>
        <Textarea {...register('remarks')} placeholder="Internal notes about this donation" />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging...' : 'Log Manual Donation'}
      </Button>
    </form>
  );
}
