'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import { BRANDING } from '@/constants/branding';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroSection() {
  return (
    <Section spacing="none" className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-muted">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
          alt="Children smiling" 
          fill
          priority
          className="object-cover w-full h-full"
        />
      </div>
      
        <Container className="relative z-20 flex flex-col items-center text-center gap-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl drop-shadow-sm leading-[1.1]"
          >
            {BRANDING.ORGANIZATION.TAGLINE}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl font-medium drop-shadow-md"
          >
            {BRANDING.ORGANIZATION.MISSION}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 pt-4"
          >
            <Button asChild size="lg" className="h-14 px-8 rounded-full font-bold text-lg w-full sm:w-auto shadow-level-2 hover:shadow-elevation transition-all">
              <Link href="/donate">
                <Heart className="mr-2 h-5 w-5" /> Donate Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full font-bold text-lg w-full sm:w-auto bg-white/10 text-white hover:bg-white hover:text-black border-white/30 backdrop-blur-sm transition-all">
              <Link href="/volunteer">
                Become a Volunteer <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
  );
}
