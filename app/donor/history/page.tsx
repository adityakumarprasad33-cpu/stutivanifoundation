import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function DonationHistoryPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Donation History
          </h1>
          <p className="text-muted-foreground mt-1">
            Review your past contributions and track your impact over time.
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search donations..."
            className="pl-8 bg-white dark:bg-gray-950"
          />
        </div>
      </div>

      <Card className="border-rose-100 dark:border-rose-900/30 shadow-sm">
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>A complete timeline of your financial support.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-4 border border-rose-100 dark:border-rose-800">
            <History className="w-8 h-8 text-rose-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Donations Found
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Once you make your first donation, it will appear here along with its status and details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
