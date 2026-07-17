import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { ProjectCard } from '@/features/public/components/cards/project-card';

export const revalidate = 1800;

export const metadata = generateSeoMetadata({
  title: 'Our Projects',
  description: 'On-the-ground projects executing our programmatic vision.',
  url: '/projects',
});

export default function ProjectsPage() {
  const projects = [
    { id: '1', slug: 'mobile-clinic-2024', title: 'Mobile Clinic 2024', description: 'Deployment of 5 new mobile clinic vans.', status: 'ACTIVE' },
    { id: '2', slug: 'school-rebuilding', title: 'School Rebuilding', description: 'Rebuilding primary schools affected by floods.', status: 'COMPLETED' },
    { id: '3', slug: 'women-artisan-coop', title: 'Women Artisan Coop', description: 'Empowering 500 women through handicraft cooperatives.', status: 'ACTIVE' },
  ];

  return (
    <>
      <PageHeader 
        title="Our Projects"
        description="On-the-ground interventions translating our mission into immediate, measurable impact."
        breadcrumbs={[{ label: 'Projects' }]}
        className="bg-background"
      />
      
      <Section className="bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
