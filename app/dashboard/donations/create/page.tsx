import { DonationPolicy } from '@/features/donations/policy/donation.policy';
import { DonationForm } from '@/features/donations/components/donation-form';

export default async function CreateDonationPage({ searchParams }: { searchParams: Promise<{ donorId?: string, campaignId?: string }> }) {
  await DonationPolicy.canManageDonations();
  const resolvedSearchParams = await searchParams;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Log Manual Donation</h1>
        <p className="text-muted-foreground">Record a donation received offline (cash, cheque, direct transfer).</p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <DonationForm donorId={resolvedSearchParams.donorId} campaignId={resolvedSearchParams.campaignId} />
      </div>
    </div>
  );
}
