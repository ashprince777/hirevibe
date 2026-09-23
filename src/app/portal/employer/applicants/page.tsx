import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import EmployerNav from '@/components/portals/EmployerNav';
import EmployerApplicantsClient from '@/components/portals/EmployerApplicantsClient';

export const revalidate = 0;

export default async function EmployerApplicantsPage({
  searchParams,
}: {
  searchParams?: { jobId?: string };
}) {
  const user = await getCurrentUser();
  if (!user || (user.role !== 'EMPLOYER' && user.role !== 'ADMIN')) {
    redirect('/login');
  }

  const employerProfile = user.employerProfile;
  if (!employerProfile) {
    redirect('/portal/employer/profile');
  }

  const selectedJobId = searchParams?.jobId || '';

  const jobs = await prisma.job.findMany({
    where: { employerId: employerProfile.id },
    select: { id: true, title: true },
    orderBy: { createdAt: 'desc' },
  });

  const applications = await prisma.application.findMany({
    where: {
      job: { employerId: employerProfile.id },
    },
    include: {
      candidate: {
        include: {
          candidateProfile: true,
        },
      },
      job: {
        select: {
          id: true,
          title: true,
          department: true,
        },
      },
    },
    orderBy: { appliedAt: 'desc' },
  });

  const serializedApps = applications.map((a) => ({
    ...a,
    appliedAt: a.appliedAt.toISOString(),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Candidate Pipeline
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">
          Applicant Dossiers & Candidate Review
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review candidates, inspect CVs, advance interview stages, and record internal notes.
        </p>
      </div>

      <EmployerNav />
      <EmployerApplicantsClient
        initialApplications={serializedApps}
        jobsList={jobs}
        selectedJobId={selectedJobId}
      />
    </div>
  );
}
