import React from 'react';
import { PageSection } from '@/components/layout/page-section';
import { partnerRepository } from '@/features/partners/services/partner.repository';
import { PartnerLogo } from '../cards/partner-logo';
import Link from 'next/link';
import { HeartHandshake, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function PartnersSection() {
  const partners = await partnerRepository.getActivePartnersWithMedia();

  // Sort by displayOrder, featured, name
  partners.sort((a, b) => {
    if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  if (partners.length === 0) {
    return (
      <PageSection 
        className="bg-muted/30"
        title="Become Our First Partner"
        description="Join us in creating lasting social impact by partnering with the Stuti-Vani Foundation."
        headerClassName="text-center mx-auto mb-10"
      >
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 animate-pulse-slow">
            <HeartHandshake className="w-12 h-12" />
          </div>
          <Button asChild size="lg" className="rounded-full shadow-level-2 hover:shadow-level-3 font-bold px-8 h-14">
            <Link href="/contact?subject=partnership">
              Become a Partner <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </PageSection>
    );
  }

  // To make the marquee infinite, we need to duplicate the items.
  // We'll only duplicate if we are running the marquee.
  const marqueeItems = [...partners, ...partners];

  return (
    <PageSection 
      className="bg-muted/50 overflow-hidden"
      title="Our Trusted Partners"
      description="Collaborating with organizations that share our vision for a better future."
      headerClassName="text-center mx-auto mb-12"
    >
      {/* Desktop Marquee (Hidden on mobile) */}
      <div className="hidden md:flex relative w-full overflow-hidden mask-edges group">
        <div className="flex w-max animate-marquee hover:pause whitespace-nowrap">
          {marqueeItems.map((partner, index) => (
            <div key={`${partner.id}-${index}`} className="flex-shrink-0 px-4">
              <PartnerLogo partner={partner} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Horizontal Scroll (Hidden on desktop) */}
      <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="snap-center shrink-0 first:pl-4 last:pr-4">
            <PartnerLogo partner={partner} />
          </div>
        ))}
      </div>
    </PageSection>
  );
}
