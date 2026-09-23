import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin role required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const query = searchParams.get('query');

    const where: any = {};
    if (role && role !== 'ALL') {
      where.role = role;
    }
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { email: { contains: query } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        candidateProfile: {
          select: { headline: true, location: true, yearsOfExperience: true },
        },
        employerProfile: {
          select: { companyName: true, industry: true, location: true },
        },
        _count: {
          select: {
            applications: true,
            serviceRequests: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
