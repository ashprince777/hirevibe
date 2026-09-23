import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import AdminNav from '@/components/portals/AdminNav';
import AdminJobsClient from '@/components/portals/AdminJobsClient';

export const revalidate = 0;

export default async function AdminJobsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    redirect('/login');
  }

  const jobs = await prisma.job.findMany({
    include: {
      employer: true,
      _count: {
        select: { applications: true },
      },
    },
    orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
  });

  const serializedJobs = jobs.map((j) => ({
    ...j,
    createdAt: j.createdAt.toISOString(),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
          Marketplace Moderation
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">Manage All Job Postings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Approve, feature on public homepage, or remove job listings from employer accounts.
        </p>
      </div>

      <AdminNav />
      <AdminJobsClient initialJobs={serializedJobs} />
    </div>
  );
}
