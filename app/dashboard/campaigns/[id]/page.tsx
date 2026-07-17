import { DonationPolicy } from '@/features/donations/policy/donation.policy';
import { CampaignRepository } from '@/features/donations/services/campaign.repository';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CampaignProgressWidget } from '@/features/donations/components/widgets/financial-widgets';
import { CampaignHealthService } from '@/features/donations/services/campaign-health.service';

export default async function CampaignWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  await DonationPolicy.canViewCampaigns();
  
  const resolvedParams = await params;
  const campaignRepo = new CampaignRepository();
  const campaign = await campaignRepo.getById(resolvedParams.id);
  
  if (!campaign) notFound();

  const health = await CampaignHealthService.computeHealth(campaign.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{campaign.title}</h1>
          <p className="text-muted-foreground">{campaign.visibility} • {campaign.status}</p>
        </div>
        <div className="space-x-2">
          <Link href={`/dashboard/donations/create?campaignId=${campaign.id}`}>
            <Button variant="outline">Log Donation</Button>
          </Link>
          <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
            <Button>Edit Campaign</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
           {/* Detailed Description and other assets */}
           <div className="rounded-lg border bg-card p-6">
             <h3 className="font-semibold mb-2">Description</h3>
             <p className="whitespace-pre-wrap text-sm">{campaign.description}</p>
           </div>
        </div>
        <div>
          <CampaignProgressWidget health={health} />
        </div>
      </div>
    </div>
  );
}
