import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ caseStudies });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 });
  }
}
