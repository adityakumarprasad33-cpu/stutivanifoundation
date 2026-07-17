import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';

export function CTASection() {
  return (
    <Section spacing="loose" className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
      <Container className="relative z-10 flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl max-w-2xl drop-shadow-sm">
          Ready to Make a Difference?
        </h2>
        <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl leading-relaxed">
          Your support enables us to continue our mission. Join our community of changemakers today by volunteering your time or making a donation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
          <Button asChild size="lg" variant="secondary" className="h-14 px-8 rounded-full font-bold text-lg w-full sm:w-auto shadow-level-2 hover:shadow-elevation transition-all text-primary">
            <Link href="/donate">Donate Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full font-bold text-lg w-full sm:w-auto bg-transparent border-primary-foreground/40 hover:bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm transition-all">
            <Link href="/volunteer">Volunteer With Us</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
