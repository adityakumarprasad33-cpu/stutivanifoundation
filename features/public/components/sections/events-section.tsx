import React from 'react';
import { PageSection } from '@/components/layout/page-section';
import { Grid } from '@/components/layout/grid';
import { Button } from '@/components/ui/button';
import { EventCard } from '../cards/event-card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function EventsSection({ events = [] }: { events?: any[] }) {
  if (!events || events.length === 0) return null;

  return (
    <PageSection 
      className="bg-muted/30"
      title="Upcoming Events"
      description="Join us in our upcoming drives, workshops, and community gatherings."
      headerActions={
        <Button asChild variant="ghost" className="shrink-0 group">
          <Link href="/events">
            View Calendar <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      }
    >
      <Grid cols={3} gap={6}>
        {events.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </Grid>
    </PageSection>
  );
}
