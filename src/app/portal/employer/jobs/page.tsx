import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import EmployerNav from '@/components/portals/EmployerNav';
import EmployerJobsClient from '@/components/portals/EmployerJobsClient';

export const revalidate = 0;

export default async function EmployerJobsPage() {
  const user = await getCurrentUser();
  if (!user || (user.role !== 'EMPLOYER' && user.role !== 'ADMIN')) {
    redirect('/login');
  }

  const employerProfile = user.employerProfile;
  if (!employerProfile) {
    redirect('/portal/employer/profile');
  }

  const jobs = await prisma.job.findMany({
    where: { employerId: employerProfile.id },
    include: {
      _count: {
        select: { applications: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const serializedJobs = jobs.map((j) => ({
    ...j,
    createdAt: j.createdAt.toISOString(),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Mandates Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">
          {employerProfile.companyName} Job Postings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Create, edit, and adjust the publication status of open positions.
        </p>
      </div>

      <EmployerNav />
      <EmployerJobsClient initialJobs={serializedJobs} />
    </div>
  );
}
