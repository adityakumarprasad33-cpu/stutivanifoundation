import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { EventCard } from '@/features/public/components/cards/event-card';

export const revalidate = 300;

export const metadata = generateSeoMetadata({
  title: 'Events Calendar',
  description: 'Upcoming and past events by Stuti-Vani Foundation.',
  url: '/events',
});

export default function EventsPage() {
  const events = [
    { id: '1', slug: 'mega-medical-camp', title: 'Mega Medical Camp', description: 'Free checkups for 1000+ residents.', startDate: new Date(Date.now() + 864000000).toISOString(), location: 'Community Hall, Delhi' },
    { id: '2', slug: 'annual-day-2023', title: 'Annual Day 2023', description: 'Celebrating a year of impact.', startDate: new Date(Date.now() - 8640000000).toISOString(), location: 'Auditorium, Delhi' },
  ];

  return (
    <>
      <PageHeader 
        title="Events Calendar"
        description="Join our upcoming drives, workshops, and community gatherings."
        breadcrumbs={[{ label: 'Events' }]}
        className="bg-muted/30"
      />
      
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
