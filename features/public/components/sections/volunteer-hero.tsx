'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeartHandshake, LogIn, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Grid } from '@/components/layout/grid';

export function VolunteerHero() {
  return (
    <Section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-background pt-20">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left -z-10" />
      
      <Container className="relative z-20">
        <Grid cols={2} gap={12} className="items-center">
        {/* Left Side: Copy & CTAs */}
        <div className="flex flex-col space-y-8 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full w-fit mx-auto lg:mx-0"
          >
            <HeartHandshake className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Join Our Mission</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            Empower Lives.<br />
            <span className="text-primary">Drive Change.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Volunteers are the heartbeat of the Stuti-Vani Foundation. Whether you can dedicate a few hours a week or want to join a specific weekend drive, your time and skills are invaluable.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full"
          >
            <Button asChild size="lg" className="h-14 px-8 font-bold text-lg w-full sm:w-auto shadow-level-2">
              <Link href="/register">
                Become a Volunteer <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 font-bold text-lg w-full sm:w-auto">
              <Link href="/login">
                <LogIn className="mr-2 h-5 w-5" /> Already Registered?
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Right Side: Imagery & Glass Cards */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-level-4 border border-border/50"
        >
          <Image 
            src="https://images.unsplash.com/photo-1593113589914-07553f1dc2cb?q=80&w=2070&auto=format&fit=crop" 
            alt="Volunteers teaching children" 
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
          
          {/* Floating Glass Stats */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute bottom-8 left-8 right-8 lg:right-auto bg-glass p-6 rounded-2xl flex items-center justify-between gap-8"
          >
            <div>
              <p className="text-3xl font-extrabold text-white">500+</p>
              <p className="text-sm font-medium text-white/80 uppercase tracking-wider">Active Volunteers</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <p className="text-3xl font-extrabold text-white">50k+</p>
              <p className="text-sm font-medium text-white/80 uppercase tracking-wider">Hours Donated</p>
            </div>
          </motion.div>
        </motion.div>
        </Grid>
      </Container>
    </Section>
  );
}
