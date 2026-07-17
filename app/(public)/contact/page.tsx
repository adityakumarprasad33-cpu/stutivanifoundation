import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { ContactForm } from '@/features/public/components/forms/contact-form';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { BRANDING } from '@/constants/branding';

export const revalidate = 86400;

export const metadata = generateSeoMetadata({
  title: 'Contact Us',
  description: 'Get in touch with the Stuti-Vani Foundation. We would love to hear from you.',
  url: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader 
        title="Contact Us"
        description="Whether you have a question about our programs, want to volunteer, or are interested in partnering with us, our team is ready to answer all your questions."
        breadcrumbs={[{ label: 'Contact Us' }]}
        className="bg-muted/30"
      />
      
      <Section className="bg-background">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-sm">
                <h2 className="text-3xl font-bold mb-8 text-foreground">Send us a message</h2>
                <ContactForm />
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-muted/30 rounded-3xl p-8 border border-border/50">
                <h3 className="text-xl font-bold mb-6 text-foreground">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-primary mt-0.5 mr-4 shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">
                      {BRANDING.CONTACT.ADDRESS.DISPLAY}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-primary mr-4 shrink-0" />
                    <span className="text-muted-foreground font-medium">{BRANDING.CONTACT.PHONE}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-primary mr-4 shrink-0" />
                    <span className="text-muted-foreground font-medium">{BRANDING.CONTACT.EMAIL}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-primary mr-4 shrink-0" />
                    <span className="text-muted-foreground font-medium">{BRANDING.CONTACT.HOURS}</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64 bg-muted/50 rounded-3xl border border-border/50 flex items-center justify-center text-muted-foreground font-medium overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('/maps-placeholder.png')" }}></div>
                <span className="relative z-10 bg-background/80 px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm">Map View Coming Soon</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
