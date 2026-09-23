import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'CANDIDATE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const savedJobs = await prisma.savedJob.findMany({
      where: { candidateId: user.id },
      include: {
        job: {
          include: {
            employer: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ savedJobs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch saved jobs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'CANDIDATE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { jobId } = await req.json();
    if (!jobId) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 });
    }

    // Toggle saved state
    const existing = await prisma.savedJob.findUnique({
      where: {
        candidateId_jobId: {
          candidateId: user.id,
          jobId,
        },
      },
    });

    if (existing) {
      await prisma.savedJob.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ saved: false, message: 'Job removed from saved list' });
    } else {
      await prisma.savedJob.create({
        data: {
          candidateId: user.id,
          jobId,
        },
      });
      return NextResponse.json({ saved: true, message: 'Job bookmarked successfully' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to toggle saved job' }, { status: 500 });
  }
}
