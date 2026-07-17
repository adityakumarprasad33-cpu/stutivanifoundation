import React from 'react';
import { PageContainer } from '@/components/dashboard/ui/page-container';

export const metadata = {
  title: 'Projects | Dashboard',
  description: 'Manage foundation projects and programs',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer maxWidth="full">
      {children}
    </PageContainer>
  );
}
