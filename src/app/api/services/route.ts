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

    if (user.role === 'EMPLOYER') {
      const requests = await prisma.serviceRequest.findMany({
        where: { employerId: user.id },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ requests });
    }

    if (user.role === 'ADMIN') {
      const requests = await prisma.serviceRequest.findMany({
        include: {
          employer: {
            include: {
              employerProfile: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ requests });
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch consulting requests' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Please sign in to submit a service request' }, { status: 401 });
    }

    const body = await req.json();
    const { serviceType, title, details, priority = 'MEDIUM' } = body;

    if (!serviceType || !title || !details) {
      return NextResponse.json({ error: 'Service type, title, and details are required' }, { status: 400 });
    }

    const request = await prisma.serviceRequest.create({
      data: {
        employerId: user.id,
        serviceType,
        title,
        details,
        priority,
        status: 'PENDING',
      },
    });

    // Notify admins
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' },
    });

    for (const admin of admins) {
      await sendTransactionalEmail({
        to: admin.email,
        userId: admin.id,
        subject: `New HR Consulting Request: ${title}`,
        title: 'New Enterprise HR Inquiry',
        message: `${user.name} submitted an HR consulting request for "${serviceType}": ${title}.`,
        actionUrl: '/admin/services',
        type: 'SERVICE',
      });
    }

    // Confirmation to the employer
    await sendTransactionalEmail({
      to: user.email,
      userId: user.id,
      subject: `Inquiry Received: ${title}`,
      title: 'Consulting Request Received',
      message: `Thank you for reaching out to HireVibe. A Senior HR Partner will review your request for "${serviceType}" and contact you within 24 business hours.`,
      actionUrl: '/portal/employer/consulting',
      type: 'SERVICE',
    });

    return NextResponse.json({ message: 'Consulting request submitted successfully', request }, { status: 201 });
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json({ error: 'Failed to submit service request' }, { status: 500 });
  }
}
