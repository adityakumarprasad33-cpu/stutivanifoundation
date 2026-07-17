import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { Breadcrumbs } from '@/features/public/components/layout/breadcrumbs';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { ImpactSection } from '@/features/public/components/sections/impact-section';

import { BRANDING } from '@/constants/branding';

export const revalidate = 86400;

export const metadata = generateSeoMetadata({
  title: 'About Us',
  description: 'Learn about the history, mission, and leadership of the Stuti-Vani Foundation.',
  url: '/about',
});

export default function AboutPage() {
  return (
    <>
      <PageHeader 
        title="Our Story"
        description="Stuti-Vani Foundation is named after Durga (Stuti) and Saraswati (Vani). We are determined to overcome the gender inequality issue in India by helping a girl child with all possible measures. We intend to sponsor the school tuition fees of a girl child, helping bridge the gap and provide affordable private education to children in rural India."
        breadcrumbs={[{ label: 'About Us' }]}
        className="bg-muted/30"
      />
      
      <ImpactSection />
      
      <Section className="bg-background">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {BRANDING.ORGANIZATION.MISSION}
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {BRANDING.ORGANIZATION.VISION}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/30">
        <Container>
          <div className="max-w-3xl mx-auto p-10 bg-background rounded-3xl border border-border/50 shadow-sm">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Workflow</h2>
            <ol className="list-decimal list-outside space-y-4 ml-6 text-lg text-muted-foreground">
              <li className="pl-2">We shortlist the deserved candidates as per our prescribed criteria.</li>
              <li className="pl-2">Find a private school near their home.</li>
              <li className="pl-2">Connect with school authority and finalize monthly & yearly tuition fees.</li>
              <li className="pl-2">Find a donor/sponsor for the child and get approval for full or partial payment.</li>
              <li className="pl-2">Admit the child to school and pay the fees timely.</li>
              <li className="pl-2">Provide books and stationary.</li>
              <li className="pl-2">Maintain a continuous engagement between Donor/Sponsor, School, Child and Family.</li>
            </ol>
          </div>
        </Container>
      </Section>
      
      <Section className="bg-background" id="leadership">
        <Container>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Our Leadership</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated team driving our mission forward.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {BRANDING.ORGANIZATION.TEAM.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center space-y-6 p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-elevation transition-all duration-300">
                <div className="w-40 h-40 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center text-5xl font-bold text-primary">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary font-semibold tracking-wide uppercase text-sm mt-2 mb-4">{member.role}</p>
                  <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
