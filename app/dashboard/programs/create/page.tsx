'use client';

import React from 'react';
import { ProgramForm } from '@/features/programs/components/program-form';
import { createProgram } from '@/features/programs/actions/program.actions';
import { type ProgramFormData } from '@/features/programs/validation/program.schemas';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateProgramPage() {
  const router = useRouter();

  const handleSubmit = async (data: ProgramFormData) => {
    const result = await createProgram(data);
    if (result.success) {
      router.push(`/dashboard/programs/${result.slug}`);
    } else {
      alert(`Failed to create program: ${result.error}`);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/programs" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Program</h1>
          <p className="text-sm text-gray-500">Initialize a new organizational initiative.</p>
        </div>
      </div>
      
      <ProgramForm onSubmit={handleSubmit} />
    </div>
  );
}
