import React from 'react';
import { PageSection } from '@/components/layout/page-section';
import { Grid } from '@/components/layout/grid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HeartPulse, GraduationCap, Banknote, CalendarDays, Users2, BookOpenCheck, Camera, Laptop } from 'lucide-react';
import Link from 'next/link';

const opportunities = [
  { id: 1, title: 'Healthcare', description: 'Assist medical professionals in rural health camps and coordinate patient logistics.', icon: HeartPulse },
  { id: 2, title: 'Education', description: 'Tutor students, organize after-school programs, and distribute educational kits.', icon: GraduationCap },
  { id: 3, title: 'Fundraising', description: 'Help run digital campaigns, connect with sponsors, and manage donor relationships.', icon: Banknote },
  { id: 4, title: 'Events', description: 'Manage on-ground events, coordinate volunteers, and ensure smooth operations.', icon: CalendarDays },
  { id: 5, title: 'Community Outreach', description: 'Conduct surveys, build relationships with local leaders, and assess rural needs.', icon: Users2 },
  { id: 6, title: 'Teaching', description: 'Provide specialized vocational training or teach digital literacy to adults.', icon: BookOpenCheck },
  { id: 7, title: 'Media & Design', description: 'Capture event photography, create graphics, and manage social media content.', icon: Camera },
  { id: 8, title: 'Technology', description: 'Maintain IT infrastructure, support data entry, and improve digital platforms.', icon: Laptop },
];

export function VolunteerOpportunities() {
  return (
    <PageSection 
      className="bg-background"
      title="Areas of Contribution"
      description="Whatever your skill set or background, there is a place for you to make a meaningful difference."
      headerClassName="text-center mx-auto"
    >
        <Grid cols={4} gap={6}>
          {opportunities.map((opp) => (
            <Card key={opp.id} className="group cursor-pointer relative h-full hover:border-primary/50">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                  <opp.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  <Link href="/register" className="after:absolute after:inset-0">
                    {opp.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pb-8">
                <p className="text-muted-foreground text-sm leading-relaxed">{opp.description}</p>
                
                {/* Learn More indicator that appears on hover */}
                <div className="absolute bottom-4 left-6 flex items-center text-primary text-sm font-semibold opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Apply Now <span className="ml-1">→</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
    </PageSection>
  );
}
