import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { ProgramCard } from '@/features/public/components/cards/program-card';

export const revalidate = 1800;

export const metadata = generateSeoMetadata({
  title: 'Our Programs',
  description: 'Explore the core initiatives of Stuti-Vani Foundation.',
  url: '/programs',
});

export default function ProgramsPage() {
  const programs = [
    { id: '1', slug: 'healthcare-access', title: 'Healthcare Access', description: 'Providing essential medical care to remote villages.', category: 'Healthcare' },
    { id: '2', slug: 'girl-child-education', title: 'Girl Child Education', description: 'Scholarships and mentoring for underprivileged girls.', category: 'Education' },
    { id: '3', slug: 'sustainable-farming', title: 'Sustainable Farming', description: 'Training farmers in modern organic techniques.', category: 'Livelihood' },
  ];

  return (
    <>
      <PageHeader 
        title="Our Programs"
        description="Core initiatives designed to tackle root causes of inequality and build sustainable communities."
        breadcrumbs={[{ label: 'Programs' }]}
        className="bg-muted/30"
      />
      
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(program => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
