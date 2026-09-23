import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const department = searchParams.get('department') || '';
    const jobType = searchParams.get('jobType') || '';
    const experienceLevel = searchParams.get('experienceLevel') || '';
    const location = searchParams.get('location') || '';
    const featured = searchParams.get('featured');

    const where: any = {
      status: 'ACTIVE',
    };

    if (query) {
      where.OR = [
        { title: { contains: query } },
        { description: { contains: query } },
        { requirements: { contains: query } },
        { employer: { companyName: { contains: query } } },
      ];
    }

    if (department && department !== 'All') {
      where.department = department;
    }

    if (jobType && jobType !== 'All') {
      where.jobType = jobType;
    }

    if (experienceLevel && experienceLevel !== 'All') {
      where.experienceLevel = experienceLevel;
    }

    if (location && location !== 'All') {
      where.location = { contains: location };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        employer: {
          select: {
            id: true,
            companyName: true,
            logoUrl: true,
            industry: true,
            location: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ jobs });
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'EMPLOYER' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized: Employer or Admin role required' }, { status: 403 });
    }

    // Get employer profile
    let employerProfile = user.employerProfile;
    if (!employerProfile) {
      employerProfile = await prisma.employerProfile.create({
        data: {
          userId: user.id,
          companyName: `${user.name}'s Company`,
        },
      });
    }

    const body = await req.json();
    const {
      title,
      department,
      location,
      jobType,
      experienceLevel,
      salaryMin,
      salaryMax,
      currency = 'INR',
      description,
      requirements,
      benefits,
      isFeatured = false,
    } = body;

    if (!title || !department || !location || !jobType || !description || !requirements) {
      return NextResponse.json({ error: 'Missing required job fields' }, { status: 400 });
    }

    // Generate unique slug
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const slug = `${baseSlug}-${randomSuffix}`;

    const job = await prisma.job.create({
      data: {
        employerId: employerProfile.id,
        title,
        slug,
        department,
        location,
        jobType,
        experienceLevel: experienceLevel || 'Mid-level',
        salaryMin: salaryMin ? parseInt(salaryMin, 10) : null,
        salaryMax: salaryMax ? parseInt(salaryMax, 10) : null,
        currency,
        description,
        requirements,
        benefits: benefits || null,
        isFeatured: Boolean(isFeatured),
        status: 'ACTIVE',
      },
      include: {
        employer: true,
      },
    });

    return NextResponse.json({ message: 'Job posted successfully', job }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to post job' }, { status: 500 });
  }
}
