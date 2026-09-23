import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'EMPLOYER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.employerProfile.findUnique({
      where: { userId: user.id },
      include: {
        jobs: true,
      },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch employer profile' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'EMPLOYER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { companyName, logoUrl, industry, companySize, website, location, description } = body;

    const profile = await prisma.employerProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        companyName: companyName || `${user.name}'s Company`,
        logoUrl,
        industry,
        companySize,
        website,
        location,
        description,
      },
      update: {
        companyName,
        logoUrl,
        industry,
        companySize,
        website,
        location,
        description,
      },
    });

    return NextResponse.json({ message: 'Company profile updated successfully', profile });
  } catch (error: any) {
    console.error('Error updating employer profile:', error);
    return NextResponse.json({ error: 'Failed to update employer profile' }, { status: 500 });
  }
}
