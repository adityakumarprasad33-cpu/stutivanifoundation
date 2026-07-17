import React from 'react';
import { PageSection } from '@/components/layout/page-section';
import { Grid } from '@/components/layout/grid';
import { Clock, Globe2, Award, BookOpen, Users, Star } from 'lucide-react';

const benefits = [
  {
    title: 'Flexible Hours',
    description: 'Contribute on your own schedule. Whether it’s weekends or a few hours a week, we accommodate your availability.',
    icon: Clock,
  },
  {
    title: 'Community Impact',
    description: 'Directly witness the change you make in rural education and healthcare sectors across India.',
    icon: Globe2,
  },
  {
    title: 'Certificates & LORs',
    description: 'Receive official recognition and Letters of Recommendation for your exceptional dedication and service.',
    icon: Award,
  },
  {
    title: 'Skill Training',
    description: 'Gain access to exclusive workshops and training sessions to develop leadership and organizational skills.',
    icon: BookOpen,
  },
  {
    title: 'Networking',
    description: 'Connect with a diverse group of passionate individuals, corporate partners, and social workers.',
    icon: Users,
  },
  {
    title: 'Recognition',
    description: 'Outstanding volunteers are honored at our annual events and featured across our global platforms.',
    icon: Star,
  },
];

export function VolunteerBenefits() {
  return (
    <PageSection 
      className="bg-muted/30"
      title="Why Volunteer With Us?"
      description="Joining Stuti-Vani Foundation isn&apos;t just about giving back—it&apos;s about growing as a leader and becoming part of a global family dedicated to change."
      headerClassName="text-center mx-auto"
    >
        <Grid cols={3} gap={6}>
          {benefits.map((benefit, i) => (
            <div 
              key={i} 
              className="group flex flex-col p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-elevation transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <benefit.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </Grid>
    </PageSection>
  );
}
