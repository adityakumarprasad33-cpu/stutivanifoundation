'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, TrendingUp, Users, Target } from 'lucide-react';
import type { FinancialStatistics } from '../../types/donation.types';
import type { CampaignHealth } from '../../services/campaign-health.service';

export function GlobalFinancialWidgets({ stats }: { stats: FinancialStatistics }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.totalDonations.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Donations</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.monthlyDonations.toLocaleString()}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.averageDonation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Donor Retention</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.donorRetentionRate}%</div>
        </CardContent>
      </Card>
    </div>
  );
}

export function CampaignProgressWidget({ health }: { health: CampaignHealth }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Campaign Progress</CardTitle>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹{health.raisedAmount.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">of ₹{health.goalAmount.toLocaleString()} goal</p>
        <div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${health.progressPercentage}%` }} 
          />
        </div>
        <div className="mt-2 text-xs flex justify-between">
          <span>{health.progressPercentage}% Funded</span>
          <span>{health.donorCount} Donors</span>
        </div>
      </CardContent>
    </Card>
  );
}
