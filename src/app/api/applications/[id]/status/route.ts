import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { sendTransactionalEmail } from '@/lib/email';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'EMPLOYER' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const { status, employerNotes } = body;

    const validStatuses = ['SUBMITTED', 'REVIEWING', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'REJECTED'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid application status' }, { status: 400 });
    }

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: {
          include: {
            employer: true,
          },
        },
        candidate: true,
      },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Check ownership if employer
    if (user.role !== 'ADMIN' && application.job.employer.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden: You do not manage this job' }, { status: 403 });
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        status: status || application.status,
        employerNotes: employerNotes !== undefined ? employerNotes : application.employerNotes,
      },
      include: {
        candidate: {
          include: {
            candidateProfile: true,
          },
        },
        job: true,
      },
    });

    // Notify candidate if status changed
    if (status && status !== application.status) {
      const statusLabels: Record<string, string> = {
        REVIEWING: 'Under Review',
        SHORTLISTED: 'Shortlisted for Interview Round',
        INTERVIEW: 'Interview Round Scheduled',
        OFFERED: 'Official Job Offer Extended',
        REJECTED: 'Application Status Update',
      };

      const title = `Application Status Update: ${statusLabels[status] || status}`;
      const message = `Your application for "${application.job.title}" at ${application.job.employer.companyName} has moved to: ${statusLabels[status] || status}. Log in to view detailed candidate feedback.`;

      await sendTransactionalEmail({
        to: application.candidate.email,
        userId: application.candidate.id,
        subject: `Update on your application for ${application.job.title}`,
        title,
        message,
        actionUrl: '/portal/candidate/applications',
        type: 'APPLICATION',
      });
    }

    return NextResponse.json({ message: 'Application updated successfully', application: updated });
  } catch (error: any) {
    console.error('Error updating application status:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}
