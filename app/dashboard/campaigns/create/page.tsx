import { DonationPolicy } from '@/features/donations/policy/donation.policy';
import { CampaignForm } from '@/features/donations/components/campaign-form';

export default async function CreateCampaignPage() {
  await DonationPolicy.canManageCampaigns();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>
        <p className="text-muted-foreground">Launch a new fundraising campaign.</p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <CampaignForm />
      </div>
    </div>
  );
}
