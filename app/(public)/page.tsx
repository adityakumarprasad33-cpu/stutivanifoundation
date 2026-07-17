import React from 'react';
import { HeroSection } from '@/features/public/components/sections/hero-section';
import { ImpactSection } from '@/features/public/components/sections/impact-section';
import { ProgramsSection } from '@/features/public/components/sections/programs-section';
import { ProjectsSection } from '@/features/public/components/sections/projects-section';
import { EventsSection } from '@/features/public/components/sections/events-section';
import { BlogsSection } from '@/features/public/components/sections/blogs-section';
import { GallerySection } from '@/features/public/components/sections/gallery-section';
import { PartnersSection } from '@/features/public/components/sections/partners-section';
import { TestimonialsSection } from '@/features/public/components/sections/testimonials-section';
import { NewsletterSection } from '@/features/public/components/sections/newsletter-section';
import { CTASection } from '@/features/public/components/sections/cta-section';
import { FAQSection } from '@/features/public/components/sections/faq-section';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { OrganizationSchema } from '@/features/public/components/structured-data';

import { ProgramRepository } from '@/features/programs/services/program.repository';
import { ProjectRepository } from '@/features/projects/services/project.repository';
import { EventRepository } from '@/features/events/services/event.repository';
import { MediaRepository } from '@/features/gallery/services/media.repository';
import { BlogRepository } from '@/features/blogs/services/blog.repository';


export const revalidate = 300;

export const metadata = generateSeoMetadata({
  title: 'Home',
  url: '/',
});

export default async function HomePage() {
  const programRepo = new ProgramRepository();
  const projectRepo = new ProjectRepository();
  const eventRepo = new EventRepository();
  const mediaRepo = new MediaRepository();
  const blogRepo = new BlogRepository();

  const [
    { data: programs },
    { data: projects },
    { data: events },
    { data: media },
    { data: blogs }
  ] = await Promise.all([
    programRepo.query({ filters: [{ field: 'status', operator: '==', value: 'ACTIVE' }], limit: 3 }),
    projectRepo.query({ filters: [{ field: 'status', operator: '==', value: 'ACTIVE' }], limit: 3 }),
    eventRepo.query({ filters: [{ field: 'status', operator: '==', value: 'PUBLISHED' }], limit: 3 }),
    mediaRepo.query({ filters: [{ field: 'visibility', operator: '==', value: 'public' }, { field: 'status', operator: '==', value: 'READY' }], limit: 6 }),
    blogRepo.query({ filters: [{ field: 'status', operator: '==', value: 'PUBLISHED' }], limit: 3 })
  ]);

  return (
    <>
      <OrganizationSchema />
      <HeroSection />
      <ImpactSection />
      <ProgramsSection programs={programs} />
      <ProjectsSection projects={projects} />
      <EventsSection events={events} />
      <GallerySection media={media} />
      <TestimonialsSection />
      <BlogsSection blogs={blogs} />
      <PartnersSection />
      <FAQSection />
      <NewsletterSection />
      <CTASection />
    </>
  );
}
