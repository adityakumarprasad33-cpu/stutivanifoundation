import React from 'react';
import { PageContainer } from '@/components/dashboard/ui/page-container';
import { PageHeader } from '@/components/dashboard/ui/page-header';
import { StatCard } from '@/components/dashboard/ui/stat-card';
import { EmptyState } from '@/components/dashboard/ui/empty-state';
import { requireAuth } from '@/lib/auth/server-guards';
import { Users, LayoutDashboard, HeartHandshake } from 'lucide-react';
import { DonationStatisticsService } from '@/features/donations/services/donation-statistics.service';
import { UserRepository } from '@/features/auth/services/user.repository';
import { VolunteerRepository } from '@/features/volunteers/services/volunteer.repository';
import { ProjectRepository } from '@/features/projects/services/project.repository';

export default async function DashboardOverviewPage() {
  const user = await requireAuth();
  
  // Real stats fetching
  const userRepo = new UserRepository();
  const volRepo = new VolunteerRepository();
  const projRepo = new ProjectRepository();
  
  const [globalStats, donorsQuery, volunteersQuery, projectsQuery] = await Promise.all([
    DonationStatisticsService.getGlobalStatistics(),
    userRepo.query({ filters: [{ field: 'role', operator: '==', value: 'donor' }] }),
    volRepo.query({}),
    projRepo.query({ filters: [{ field: 'status', operator: '==', value: 'ACTIVE' }] })
  ]);

  const totalDonors = donorsQuery.data.length;
  const totalVolunteers = volunteersQuery.data.length;
  const activeProjects = projectsQuery.data.length;
  
  // Currency formatter
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <PageContainer>
      <PageHeader 
        title={`Welcome back, ${user?.displayName?.split(' ')[0] || 'User'}!`} 
        description="Here's what's happening at the foundation today."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Donors"
          value={totalDonors.toString()}
          icon={Users}
          description="Registered donors"
        />
        <StatCard 
          title="Total Donations"
          value={formatCurrency(globalStats.totalDonations)}
          icon={HeartHandshake}
          description="Lifetime received"
        />
        <StatCard 
          title="Active Projects"
          value={activeProjects.toString()}
          icon={LayoutDashboard}
          description="Currently running projects"
        />
        <StatCard 
          title="Total Volunteers"
          value={totalVolunteers.toString()}
          icon={Users}
          description="Total sign-ups"
        />
      </div>

      <div className="mt-8">
        {globalStats.totalDonations === 0 && activeProjects === 0 ? (
          <EmptyState 
            icon={LayoutDashboard}
            title="Dashboard Ready"
            description="Your dashboard will display analytics and activity once you start receiving donations and creating projects."
          />
        ) : (
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
             <p className="text-muted-foreground text-sm">Detailed charts and activity feeds will populate here.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
