import { DonationPolicy } from '@/features/donations/policy/donation.policy';
import { CampaignRepository } from '@/features/donations/services/campaign.repository';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CampaignHealthService } from '@/features/donations/services/campaign-health.service';

export default async function CampaignsPage() {
  await DonationPolicy.canViewCampaigns();
  const repo = new CampaignRepository();
  const { data: campaigns } = await repo.query({ limit: 50 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">Manage fundraising campaigns.</p>
        </div>
        <Link href="/dashboard/campaigns/create">
          <Button>Create Campaign</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map(async (campaign) => {
          // In a real scenario, bulk fetch this or compute ahead, but this is a dashboard shell implementation
          const health = await CampaignHealthService.computeHealth(campaign.id);
          
          return (
            <div key={campaign.id} className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="font-semibold text-lg">{campaign.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{campaign.description}</p>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>₹{health.raisedAmount.toLocaleString()} raised</span>
                  <span className="font-medium">{health.progressPercentage}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${health.progressPercentage}%` }} />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
                <span className={`px-2 py-0.5 rounded-full ${campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {campaign.status}
                </span>
                <div className="space-x-3">
                  <Link href={`/dashboard/campaigns/${campaign.id}`} className="text-primary hover:underline">View</Link>
                  <Link href={`/dashboard/campaigns/${campaign.id}/edit`} className="text-primary hover:underline">Edit</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
