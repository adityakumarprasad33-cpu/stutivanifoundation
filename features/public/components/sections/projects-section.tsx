import React from 'react';
import { PageSection } from '@/components/layout/page-section';
import { Grid } from '@/components/layout/grid';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '../cards/project-card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ProjectsSection({ projects = [] }: { projects?: any[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <PageSection 
      className="bg-background"
      title="Active Projects"
      description="On-the-ground interventions creating immediate, measurable impact."
      headerActions={
        <Button asChild variant="ghost" className="shrink-0 group">
          <Link href="/projects">
            View All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      }
    >
      <Grid cols={4} gap={6}>
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </Grid>
    </PageSection>
  );
}
