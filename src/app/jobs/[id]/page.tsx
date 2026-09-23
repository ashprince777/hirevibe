import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import JobDetailClient from '@/components/jobs/JobDetailClient';

export const revalidate = 0;

export default async function JobPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const job = await prisma.job.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
      status: 'ACTIVE',
    },
    include: {
      employer: true,
      _count: {
        select: { applications: true },
      },
    },
  });

  if (!job) {
    notFound();
  }

  const user = await getCurrentUser();
  let hasApplied = false;
  let isSaved = false;

  if (user && user.role === 'CANDIDATE') {
    const existing = await prisma.application.findFirst({
      where: {
        jobId: job.id,
        candidateId: user.id,
      },
    });
    hasApplied = !!existing;

    const saved = await prisma.savedJob.findUnique({
      where: {
        candidateId_jobId: {
          candidateId: user.id,
          jobId: job.id,
        },
      },
    });
    isSaved = !!saved;
  }

  // Increment view counter
  prisma.job.update({
    where: { id: job.id },
    data: { viewsCount: { increment: 1 } },
  }).catch(() => {});

  const serializedJob = {
    ...job,
    createdAt: job.createdAt.toISOString(),
  };

  return (
    <JobDetailClient
      job={serializedJob}
      hasAppliedInitially={hasApplied}
      isSavedInitially={isSaved}
    />
  );
}
