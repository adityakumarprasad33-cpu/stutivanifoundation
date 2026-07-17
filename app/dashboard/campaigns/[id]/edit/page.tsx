import { DonationPolicy } from '@/features/donations/policy/donation.policy';
import { CampaignRepository } from '@/features/donations/services/campaign.repository';
import { CampaignForm } from '@/features/donations/components/campaign-form';
import { notFound } from 'next/navigation';

export default async function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  await DonationPolicy.canManageCampaigns();

  const resolvedParams = await params;
  const repo = new CampaignRepository();
  const campaign = await repo.getById(resolvedParams.id);

  if (!campaign) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Campaign</h1>
        <p className="text-muted-foreground">Update {campaign.title}.</p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <CampaignForm initialData={campaign} />
      </div>
    </div>
  );
}
