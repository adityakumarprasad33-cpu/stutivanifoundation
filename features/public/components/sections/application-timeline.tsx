'use client';

import React from 'react';
import { PageSection } from '@/components/layout/page-section';
import { UserPlus, FileText, Search, CheckCircle, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Create Account',
    description: 'Sign up using your email and provide basic contact information.',
    icon: UserPlus,
  },
  {
    title: 'Complete Profile',
    description: 'Tell us about your skills, availability, and areas of interest.',
    icon: FileText,
  },
  {
    title: 'Admin Review',
    description: 'Our team reviews your profile to find the best volunteering fit.',
    icon: Search,
  },
  {
    title: 'Approval',
    description: 'Receive an official welcome email and your unique Volunteer ID.',
    icon: CheckCircle,
  },
  {
    title: 'Portal Access',
    description: 'Log into your dashboard to view tasks, log hours, and track impact.',
    icon: LayoutDashboard,
  },
];

export function ApplicationTimeline() {
  return (
    <PageSection 
      className="bg-background overflow-hidden"
      title="Application Process"
      description="We ensure every volunteer is properly onboarded and equipped to make an immediate impact."
      headerClassName="text-center mx-auto"
    >
        <div className="relative max-w-5xl mx-auto px-4 md:px-0">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-12 right-12 h-0.5 bg-border z-0" />
          
          {/* Connector Line (Mobile) */}
          <div className="md:hidden absolute top-0 bottom-0 left-[31px] w-0.5 bg-border z-0" />

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-12 md:gap-4">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex md:flex-col items-start md:items-center relative group"
              >
                {/* Mobile Active Line Overlay */}
                <div className="md:hidden absolute top-10 bottom-[-48px] left-[15px] w-0.5 bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out z-0" />
                
                {/* Desktop Active Line Overlay */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[50%] right-[-50%] h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out z-0" />
                )}
                
                <div className="shrink-0 w-16 h-16 rounded-full bg-card border-2 border-border flex items-center justify-center relative z-10 group-hover:border-primary group-hover:bg-primary/5 transition-colors duration-300 shadow-sm">
                  <step.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                
                <div className="ml-6 md:ml-0 md:mt-8 md:text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </PageSection>
  );
}
