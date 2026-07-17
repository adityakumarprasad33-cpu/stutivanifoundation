import React from 'react';
import { Users, GraduationCap, HeartPulse, Globe2 } from 'lucide-react';

import { PageSection } from '@/components/layout/page-section';
import { Grid } from '@/components/layout/grid';

const impactStats = [
  { icon: GraduationCap, value: '12+', label: 'Girls Sponsored' },
  { icon: HeartPulse, value: 'Regular', label: 'Medical Camps' },
  { icon: Users, value: 'Continuous', label: 'Orphanage Visits' },
  { icon: Globe2, value: 'Active', label: 'Rural Consultations' },
];

export function ImpactSection() {
  return (
    <PageSection 
      className="bg-background"
      title="Our Impact in Numbers"
      description="Measurable change driven by transparency, dedication, and the relentless support of our donors and volunteers."
      headerClassName="text-center mx-auto"
    >
        <Grid cols={4} gap={6}>
          {impactStats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-elevation transition-all duration-300">
              <div className="p-4 bg-primary/10 rounded-full mb-6">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-extrabold tracking-tight mb-3 text-foreground">{stat.value}</div>
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </Grid>
    </PageSection>
  );
}
