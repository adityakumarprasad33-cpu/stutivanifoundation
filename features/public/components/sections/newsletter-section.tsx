'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';

export function NewsletterSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Architecture hook for NewsletterService
    alert('Newsletter architecture prepared. Registration pending.');
  };

  return (
    <Section className="bg-muted/30 border-t border-border/50">
      <Container>
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">Subscribe to Our Newsletter</h3>
            <p className="text-muted-foreground leading-relaxed">
              Stay updated with our latest impact stories, upcoming events, and ways you can help. No spam, just updates that matter.
            </p>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input type="email" placeholder="Enter your email address" required className="h-12 rounded-lg bg-background" />
              <Button type="submit" className="h-12 px-6 rounded-lg font-semibold shadow-sm">
                <Send className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}
