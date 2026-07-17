import React, { Suspense } from 'react';
import { AnalyticsFilterProvider } from '@/features/analytics/components/filters/analytics-filter-context';
import { AnalyticsFilterBar } from '@/features/analytics/components/filters/analytics-filter-bar';
import { ExecutiveDashboard } from '@/features/analytics/components/dashboards/executive-dashboard';
import { FinancialDashboard } from '@/features/analytics/components/dashboards/financial-dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsPolicy } from '@/features/analytics/policy/analytics.policy';

export const metadata = {
  title: 'Reports & Analytics | Stuti-Vani Foundation',
};

export default async function AnalyticsPage() {
  await AnalyticsPolicy.canViewAnalytics();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
      </div>

      <AnalyticsFilterProvider>
        <div className="space-y-4">
          <AnalyticsFilterBar />

          <Tabs defaultValue="executive" className="space-y-4">
            <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-2">
              <TabsTrigger value="executive">Executive</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="system">System Health</TabsTrigger>
            </TabsList>

            <TabsContent value="executive">
              <Suspense fallback={<div>Loading Dashboard...</div>}>
                <ExecutiveDashboard />
              </Suspense>
            </TabsContent>

            <TabsContent value="financial">
              <Suspense fallback={<div>Loading Dashboard...</div>}>
                <FinancialDashboard />
              </Suspense>
            </TabsContent>

            {/* Other Dashboards to be mounted similarly, stubbed out for architecture */}
            <TabsContent value="programs">
              <div className="p-8 text-center text-muted-foreground border rounded-lg">Programs Dashboard (Under Construction)</div>
            </TabsContent>
            
            <TabsContent value="projects">
              <div className="p-8 text-center text-muted-foreground border rounded-lg">Projects Dashboard (Under Construction)</div>
            </TabsContent>

            <TabsContent value="events">
              <div className="p-8 text-center text-muted-foreground border rounded-lg">Events Dashboard (Under Construction)</div>
            </TabsContent>
            
            <TabsContent value="volunteers">
              <div className="p-8 text-center text-muted-foreground border rounded-lg">Volunteers Dashboard (Under Construction)</div>
            </TabsContent>

            <TabsContent value="campaigns">
              <div className="p-8 text-center text-muted-foreground border rounded-lg">Campaigns Dashboard (Under Construction)</div>
            </TabsContent>

            <TabsContent value="media">
              <div className="p-8 text-center text-muted-foreground border rounded-lg">Media Dashboard (Under Construction)</div>
            </TabsContent>
            
            <TabsContent value="blogs">
              <div className="p-8 text-center text-muted-foreground border rounded-lg">Blogs Dashboard (Under Construction)</div>
            </TabsContent>

            <TabsContent value="system">
              <div className="p-8 text-center text-muted-foreground border rounded-lg">System Dashboard (Under Construction)</div>
            </TabsContent>
          </Tabs>
        </div>
      </AnalyticsFilterProvider>
    </div>
  );
}
