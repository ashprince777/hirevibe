import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'CANDIDATE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.candidateProfile.findUnique({
      where: { userId: user.id },
      include: { user: true },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch candidate profile' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'CANDIDATE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      headline,
      phone,
      location,
      bio,
      skills,
      experience,
      education,
      portfolioUrl,
      resumeUrl,
      currentCompany,
      yearsOfExperience,
    } = body;

    // Update user name if changed
    if (name && name !== user.name) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name },
      });
    }

    const profile = await prisma.candidateProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        headline,
        phone,
        location,
        bio,
        skills,
        experience: typeof experience === 'string' ? experience : JSON.stringify(experience || []),
        education: typeof education === 'string' ? education : JSON.stringify(education || []),
        portfolioUrl,
        resumeUrl,
        currentCompany,
        yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience, 10) : null,
      },
      update: {
        headline,
        phone,
        location,
        bio,
        skills,
        experience: typeof experience === 'string' ? experience : JSON.stringify(experience || []),
        education: typeof education === 'string' ? education : JSON.stringify(education || []),
        portfolioUrl,
        resumeUrl,
        currentCompany,
        yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience, 10) : null,
      },
    });

    return NextResponse.json({ message: 'Profile updated successfully', profile });
  } catch (error: any) {
    console.error('Error updating candidate profile:', error);
    return NextResponse.json({ error: 'Failed to update candidate profile' }, { status: 500 });
  }
}
