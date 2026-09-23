import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { sendTransactionalEmail } from '@/lib/email';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin role required' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const { status, assignedConsultant, consultantNotes, priority } = body;

    const request = await prisma.serviceRequest.findUnique({
      where: { id },
      include: { employer: true },
    });

    if (!request) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }

    const updated = await prisma.serviceRequest.update({
      where: { id },
      data: {
        status: status !== undefined ? status : undefined,
        assignedConsultant: assignedConsultant !== undefined ? assignedConsultant : undefined,
        consultantNotes: consultantNotes !== undefined ? consultantNotes : undefined,
        priority: priority !== undefined ? priority : undefined,
      },
    });

    // Notify employer of consultant assignment or status change
    if (assignedConsultant && assignedConsultant !== request.assignedConsultant) {
      await sendTransactionalEmail({
        to: request.employer.email,
        userId: request.employer.id,
        subject: `Consultant Assigned to: ${request.title}`,
        title: 'Senior Consultant Assigned',
        message: `${assignedConsultant} has been assigned as your lead HR advisory partner for "${request.title}".`,
        actionUrl: '/portal/employer',
        type: 'SERVICE',
      });
    }

    return NextResponse.json({ message: 'Service request updated', request: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service request' }, { status: 500 });
  }
}
