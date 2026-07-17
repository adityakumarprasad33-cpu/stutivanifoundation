import React from 'react';
import { PageSection } from '@/components/layout/page-section';
import { Grid } from '@/components/layout/grid';
import { Button } from '@/components/ui/button';
import { ProgramCard } from '../cards/program-card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ProgramsSection({ programs = [] }: { programs?: any[] }) {
  if (!programs || programs.length === 0) return null;

  return (
    <PageSection 
      className="bg-muted/30"
      title="Featured Programs"
      description="Our core initiatives designed to tackle root causes of inequality."
      headerActions={
        <Button asChild variant="ghost" className="shrink-0 group">
          <Link href="/programs">
            View All Programs <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      }
    >
      <Grid cols={3} gap={6}>
        {programs.map((program, i) => (
          <ProgramCard key={i} program={program} />
        ))}
      </Grid>
    </PageSection>
  );
}
