import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin role required' }, { status: 403 });
    }

    const [
      totalUsers,
      totalCandidates,
      totalEmployers,
      totalJobs,
      activeJobs,
      totalApplications,
      pendingConsultingRequests,
      totalConsultingRequests,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'CANDIDATE' } }),
      prisma.user.count({ where: { role: 'EMPLOYER' } }),
      prisma.job.count(),
      prisma.job.count({ where: { status: 'ACTIVE' } }),
      prisma.application.count(),
      prisma.serviceRequest.count({ where: { status: 'PENDING' } }),
      prisma.serviceRequest.count(),
    ]);

    const recentApplications = await prisma.application.findMany({
      take: 6,
      orderBy: { appliedAt: 'desc' },
      include: {
        candidate: { select: { name: true, email: true, avatarUrl: true } },
        job: { select: { title: true, employer: { select: { companyName: true } } } },
      },
    });

    const recentServiceRequests = await prisma.serviceRequest.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        employer: { select: { name: true, email: true } },
      },
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        totalCandidates,
        totalEmployers,
        totalJobs,
        activeJobs,
        totalApplications,
        pendingConsultingRequests,
        totalConsultingRequests,
      },
      recentApplications,
      recentServiceRequests,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
