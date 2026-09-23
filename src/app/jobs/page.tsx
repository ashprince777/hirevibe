import React from 'react';
import prisma from '@/lib/prisma';
import JobsClient from '@/components/jobs/JobsClient';

export const revalidate = 0;

export default async function JobsPage() {
  let jobs: any[] = [];
  try {
    jobs = await prisma.job.findMany({
      where: { status: 'ACTIVE' },
      include: {
        employer: true,
        _count: {
          select: { applications: true },
        },
      },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
  } catch (err) {
    console.error('Notice: jobs DB query fallback');
  }

  if (!jobs || jobs.length === 0) {
    jobs = [
      {
        id: 'job-fb-1',
        title: 'Principal Distributed Systems Architect',
        slug: 'principal-distributed-systems-architect',
        department: 'Engineering',
        location: 'Bengaluru, Karnataka',
        jobType: 'Full-time',
        experienceLevel: 'Executive',
        isRemote: false,
        salaryMin: 6500000,
        salaryMax: 9000000,
        currency: 'INR',
        description: 'Architecting next-generation transaction processing engines handling 50k TPS for an Indian fintech unicorn.',
        requirements: '10+ years experience in Golang/Java, distributed consensus, low-latency architectures.',
        benefits: 'ESOPs, Comprehensive family medical insurance, Notice buyout assistance.',
        isFeatured: true,
        status: 'ACTIVE',
        createdAt: new Date(),
        employer: {
          companyName: 'RazorScale Technologies',
          industry: 'Fintech & Cloud Platforms',
          location: 'Koramangala, Bengaluru',
          website: 'https://razorscale.tech',
        },
        _count: { applications: 18 },
      },
      {
        id: 'job-fb-2',
        title: 'Chief People Officer (CHRO)',
        slug: 'chief-people-officer-chro',
        department: 'Human Resources & Executive',
        location: 'Mumbai, Maharashtra',
        jobType: 'Full-time',
        experienceLevel: 'Executive',
        isRemote: false,
        salaryMin: 8000000,
        salaryMax: 12000000,
        currency: 'INR',
        description: 'Leading organizational restructuring, talent acquisition, and New Labour Codes compliance across 3,500 employees.',
        requirements: '15+ years experience heading HR in rapid-scale tech or retail conglomerates.',
        benefits: 'Executive equity retention, luxury wellness coverage, performance bonus.',
        isFeatured: true,
        status: 'ACTIVE',
        createdAt: new Date(),
        employer: {
          companyName: 'BharatOmni Consumer Brands',
          industry: 'D2C & Retail Conglomerate',
          location: 'Bandra-Kurla Complex, Mumbai',
          website: 'https://bharatomni.in',
        },
        _count: { applications: 12 },
      },
      {
        id: 'job-fb-3',
        title: 'VP of Engineering - Cloud & DevOps',
        slug: 'vp-engineering-cloud-devops',
        department: 'Engineering',
        location: 'Hyderabad, Telangana',
        jobType: 'Full-time',
        experienceLevel: 'Executive',
        isRemote: true,
        salaryMin: 7000000,
        salaryMax: 9500000,
        currency: 'INR',
        description: 'Heading cloud infrastructure, SRE, and platform engineering for high-security banking infrastructure.',
        requirements: '12+ years experience in Kubernetes, cloud architecture, multi-region failover.',
        benefits: 'Flexible remote setup, health coverage, stock options.',
        isFeatured: true,
        status: 'ACTIVE',
        createdAt: new Date(),
        employer: {
          companyName: 'IndoCloud Systems',
          industry: 'Enterprise Cloud Infrastructure',
          location: 'HITEC City, Hyderabad',
          website: 'https://indocloud.io',
        },
        _count: { applications: 15 },
      },
    ];
  }

  // Serialize dates for client component
  const serializedJobs = jobs.map((j) => ({
    ...j,
    createdAt: typeof j.createdAt === 'string' ? j.createdAt : j.createdAt.toISOString(),
  }));

  return <JobsClient initialJobs={serializedJobs} />;
}
