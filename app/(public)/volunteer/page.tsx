import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { VolunteerHero } from '@/features/public/components/sections/volunteer-hero';
import { VolunteerBenefits } from '@/features/public/components/sections/volunteer-benefits';
import { ApplicationTimeline } from '@/features/public/components/sections/application-timeline';
import { VolunteerOpportunities } from '@/features/public/components/sections/volunteer-opportunities';
import { FAQSection } from '@/features/public/components/sections/faq-section';
import { CTASection } from '@/features/public/components/sections/cta-section';

export const revalidate = 3600;

export const metadata = generateSeoMetadata({
  title: 'Volunteer',
  description: 'Join the Stuti-Vani Foundation as a volunteer and help us create a sustainable impact.',
  url: '/volunteer',
});

export default function VolunteerPage() {
  return (
    <>
      <VolunteerHero />
      <VolunteerOpportunities />
      <VolunteerBenefits />
      <ApplicationTimeline />
      <FAQSection />
      <CTASection />
    </>
  );
}
