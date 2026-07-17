import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

import { PageSection } from '@/components/layout/page-section';
import { Grid } from '@/components/layout/grid';

export function TestimonialsSection() {
  const testimonials = [
    { name: 'Aarav Sharma', role: 'Volunteer', text: 'Working with Stuti-Vani has given me a deep sense of purpose. The sheer scale of impact on the ground is inspiring.' },
    { name: 'Dr. Neha Gupta', role: 'Medical Camp Partner', text: 'Their dedication to rural healthcare is unmatched. We are proud to partner with them in executing free health checkups.' },
    { name: 'Rajesh Kumar', role: 'Beneficiary', text: 'My daughter received a scholarship through their education initiative, changing her future completely.' },
  ];

  return (
    <PageSection 
      className="bg-muted/30"
      title="Voices of Impact"
      description="Hear from those who have witnessed and experienced the Stuti-Vani difference."
      headerClassName="text-center mx-auto"
    >
        <Grid cols={3} gap={6}>
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm relative hover:shadow-elevation transition-all duration-300">
              <div className="absolute top-8 right-8 text-primary/10">
                <Quote className="h-16 w-16" />
              </div>
              <Quote className="h-8 w-8 text-primary/40 mb-6" />
              <p className="text-muted-foreground italic mb-8 leading-relaxed text-lg">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">{t.name.charAt(0)}</div>
                <div>
                  <p className="font-bold text-foreground tracking-tight">{t.name}</p>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Grid>
    </PageSection>
  );
}
