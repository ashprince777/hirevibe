import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { sendTransactionalEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');

    if (user.role === 'CANDIDATE') {
      const applications = await prisma.application.findMany({
        where: { candidateId: user.id },
        include: {
          job: {
            include: {
              employer: true,
            },
          },
        },
        orderBy: { appliedAt: 'desc' },
      });
      return NextResponse.json({ applications });
    }

    if (user.role === 'EMPLOYER') {
      const employerProfile = user.employerProfile;
      if (!employerProfile) {
        return NextResponse.json({ applications: [] });
      }

      const where: any = {
        job: {
          employerId: employerProfile.id,
        },
      };

      if (jobId) {
        where.jobId = jobId;
      }

      const applications = await prisma.application.findMany({
        where,
        include: {
          candidate: {
            include: {
              candidateProfile: true,
            },
          },
          job: true,
        },
        orderBy: { appliedAt: 'desc' },
      });

      return NextResponse.json({ applications });
    }

    if (user.role === 'ADMIN') {
      const where: any = {};
      if (jobId) where.jobId = jobId;

      const applications = await prisma.application.findMany({
        where,
        include: {
          candidate: {
            include: {
              candidateProfile: true,
            },
          },
          job: {
            include: {
              employer: true,
            },
          },
        },
        orderBy: { appliedAt: 'desc' },
      });

      return NextResponse.json({ applications });
    }

    return NextResponse.json({ applications: [] });
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Please login or register as a candidate to apply' }, { status: 401 });
    }

    if (user.role !== 'CANDIDATE') {
      return NextResponse.json({ error: 'Only candidate accounts can submit job applications' }, { status: 403 });
    }

    const body = await req.json();
    const { jobId, resumeUrl, coverLetter } = body;

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    // Verify job exists and is active
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        employer: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!job || job.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'This job is no longer accepting applications' }, { status: 400 });
    }

    // Check if already applied
    const existing = await prisma.application.findFirst({
      where: {
        jobId,
        candidateId: user.id,
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'You have already applied for this position' }, { status: 409 });
    }

    const finalResumeUrl = resumeUrl || user.candidateProfile?.resumeUrl || '/uploads/resumes/default-resume.pdf';

    const application = await prisma.application.create({
      data: {
        jobId,
        candidateId: user.id,
        resumeUrl: finalResumeUrl,
        coverLetter: coverLetter || null,
        status: 'SUBMITTED',
      },
      include: {
        job: true,
      },
    });

    // Notify Employer via email & in-app notification
    await sendTransactionalEmail({
      to: job.employer.user.email,
      userId: job.employer.userId,
      subject: `New Candidate Application: ${job.title}`,
      title: 'New Candidate Applied',
      message: `${user.name} has submitted an application for "${job.title}". You can review their dossier and resume in your employer portal.`,
      actionUrl: `/portal/employer/applicants?jobId=${job.id}`,
      type: 'APPLICATION',
    });

    // Send confirmation to candidate
    await sendTransactionalEmail({
      to: user.email,
      userId: user.id,
      subject: `Application Confirmed: ${job.title} at ${job.employer.companyName}`,
      title: 'Application Received Successfully',
      message: `Your application for "${job.title}" at ${job.employer.companyName} has been received. Our recruitment consultants and the hiring team will review your profile.`,
      actionUrl: '/portal/candidate/applications',
      type: 'APPLICATION',
    });

    return NextResponse.json({ message: 'Application submitted successfully', application }, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
