import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, FileText, Bookmark, CalendarDays, History } from 'lucide-react';
import { requireAuth } from '@/lib/auth/server-guards';
import { DonorRepository } from '@/features/donations/services/donor.repository';

export default async function DonorDashboardPage() {
  const user = await requireAuth();
  
  // Real stats fetching
  const donorRepo = new DonorRepository();
  const { data: donors } = await donorRepo.query({ 
    filters: [{ field: 'linkedUserId', operator: '==', value: user.uid }] 
  });
  const donor = donors.length > 0 ? donors[0] : null;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Donor Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome to your donor portal. Thank you for your continued support!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder Stat Cards */}
        <Card className="border-rose-100 dark:border-rose-900/30 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
            <Heart className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatCurrency(donor?.totalDonationAmount || 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime contribution</p>
          </CardContent>
        </Card>

        <Card className="border-rose-100 dark:border-rose-900/30 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
            <Bookmark className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">0</div>
            <p className="text-xs text-muted-foreground mt-1">Saved or supporting (Upcoming)</p>
          </CardContent>
        </Card>

        <Card className="border-rose-100 dark:border-rose-900/30 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tax Receipts</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{donor?.metrics?.taxReceiptsGenerated || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Available for download</p>
          </CardContent>
        </Card>

        <Card className="border-rose-100 dark:border-rose-900/30 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">0</div>
            <p className="text-xs text-muted-foreground mt-1">Registered events (Upcoming)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-rose-100 dark:border-rose-900/30 shadow-sm col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and donations</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <History className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              No recent activity. When you make a donation or save a campaign, it will appear here.
            </p>
          </CardContent>
        </Card>

        <Card className="border-rose-100 dark:border-rose-900/30 shadow-sm col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Impact Summary</CardTitle>
            <CardDescription>How your contributions are helping</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Make your first donation to see your personalized impact summary.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

