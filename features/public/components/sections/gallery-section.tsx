import React from 'react';
import { PageSection } from '@/components/layout/page-section';
import { Grid } from '@/components/layout/grid';
import { Button } from '@/components/ui/button';
import { GalleryCard } from '../cards/gallery-card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function GallerySection({ media = [] }: { media?: any[] }) {
  if (!media || media.length === 0) return null;

  return (
    <PageSection 
      className="bg-muted/30"
      title="Impact in Pictures"
      description="Moments captured during our interventions and community programs."
      headerActions={
        <Button asChild variant="ghost" className="shrink-0 group">
          <Link href="/gallery">
            View Full Gallery <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      }
    >
      <Grid cols={4} gap={4}>
        {media.map((item, i) => (
          <GalleryCard key={i} media={item} />
        ))}
      </Grid>
    </PageSection>
  );
}
