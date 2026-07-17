import React from 'react';
import Link from 'next/link';
import { FOOTER_LINKS } from '@/config/public-nav';
import { BRANDING } from '@/constants/branding';
import { Container } from '@/components/layout/container';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl">{BRANDING.ORGANIZATION.NAME}</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              {BRANDING.ORGANIZATION.MISSION}
            </p>
            <div className="text-sm text-muted-foreground mt-4">
              Registration No: {BRANDING.ORGANIZATION.REGISTRATION_NUMBER}
            </div>
            <div className="flex flex-col space-y-1 text-sm text-muted-foreground mt-4">
              <span>{BRANDING.CONTACT.EMAIL}</span>
              <span>{BRANDING.CONTACT.PHONE}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Organization</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.organization.map(link => (
                <li key={link.href}><Link href={link.href} className="hover:text-foreground transition-colors">{link.title}</Link></li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Initiatives</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.initiatives.map(link => (
                <li key={link.href}><Link href={link.href} className="hover:text-foreground transition-colors">{link.title}</Link></li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.resources.map(link => (
                <li key={link.href}><Link href={link.href} className="hover:text-foreground transition-colors">{link.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {BRANDING.ORGANIZATION.NAME}. All rights reserved.</p>
          <ul className="flex items-center gap-4">
            {FOOTER_LINKS.legal.map(link => (
              <li key={link.href}><Link href={link.href} className="hover:text-foreground transition-colors">{link.title}</Link></li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
