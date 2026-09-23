import React from 'react';
import prisma from '@/lib/prisma';
import JobsClient from '@/components/jobs/JobsClient';

export const revalidate = 0;

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    where: { status: 'ACTIVE' },
    include: {
      employer: true,
      _count: {
        select: { applications: true },
      },
    },
    orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
  });

  // Serialize dates for client component
  const serializedJobs = jobs.map((j) => ({
    ...j,
    createdAt: j.createdAt.toISOString(),
  }));

  return <JobsClient initialJobs={serializedJobs} />;
}
