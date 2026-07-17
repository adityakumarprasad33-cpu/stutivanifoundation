'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { approveVolunteer } from '@/features/volunteers/actions/volunteer.actions';
import { toast } from 'sonner';

export function ApproveButton({ volunteerId, status }: { volunteerId: string; status: string }) {
  const [isLoading, setIsLoading] = useState(false);

  if (status !== 'APPLIED' && status !== 'PENDING_VERIFICATION') {
    return null;
  }

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      const result = await approveVolunteer(volunteerId);
      if (result.success) {
        toast.success('Volunteer approved and roles updated.');
      } else {
        throw new Error(result.error);
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to approve volunteer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleApprove}
      disabled={isLoading}
      className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
    >
      {isLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}
      Approve
    </Button>
  );
}
