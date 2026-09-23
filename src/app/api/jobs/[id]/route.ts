import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Search by ID or slug
    const job = await prisma.job.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        employer: true,
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Increment view count asynchronously
    prisma.job.update({
      where: { id: job.id },
      data: { viewsCount: { increment: 1 } },
    }).catch(() => {});

    // Check if the current user has already applied or saved this job
    const user = await getCurrentUser();
    let hasApplied = false;
    let isSaved = false;

    if (user && user.role === 'CANDIDATE') {
      const existingApplication = await prisma.application.findFirst({
        where: {
          jobId: job.id,
          candidateId: user.id,
        },
      });
      hasApplied = !!existingApplication;

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

    return NextResponse.json({
      job,
      hasApplied,
      isSaved,
    });
  } catch (error: any) {
    console.error('Error fetching job details:', error);
    return NextResponse.json({ error: 'Failed to fetch job details' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'EMPLOYER' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();

    const existingJob = await prisma.job.findUnique({
      where: { id },
      include: { employer: true },
    });

    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Verify ownership if not admin
    if (user.role !== 'ADMIN' && existingJob.employer.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden: You do not own this job posting' }, { status: 403 });
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : undefined,
        department: body.department !== undefined ? body.department : undefined,
        location: body.location !== undefined ? body.location : undefined,
        jobType: body.jobType !== undefined ? body.jobType : undefined,
        experienceLevel: body.experienceLevel !== undefined ? body.experienceLevel : undefined,
        salaryMin: body.salaryMin !== undefined ? parseInt(body.salaryMin, 10) : undefined,
        salaryMax: body.salaryMax !== undefined ? parseInt(body.salaryMax, 10) : undefined,
        description: body.description !== undefined ? body.description : undefined,
        requirements: body.requirements !== undefined ? body.requirements : undefined,
        benefits: body.benefits !== undefined ? body.benefits : undefined,
        status: body.status !== undefined ? body.status : undefined,
        isFeatured: body.isFeatured !== undefined ? Boolean(body.isFeatured) : undefined,
      },
    });

    return NextResponse.json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error: any) {
    console.error('Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'EMPLOYER' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const existingJob = await prisma.job.findUnique({
      where: { id },
      include: { employer: true },
    });

    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (user.role !== 'ADMIN' && existingJob.employer.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.job.delete({ where: { id } });

    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
