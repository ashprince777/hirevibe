import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const query = searchParams.get('query');

    const where: any = { isPublished: true };

    if (category && category !== 'All') {
      where.category = category;
    }

    if (query) {
      where.OR = [
        { title: { contains: query } },
        { summary: { contains: query } },
        { content: { contains: query } },
        { tags: { contains: query } },
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
            avatarUrl: true,
            role: true,
          },
        },
      },
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin role required' }, { status: 403 });
    }

    const body = await req.json();
    const { title, summary, content, category, tags, coverImage, readTimeMinutes } = body;

    if (!title || !summary || !content || !category) {
      return NextResponse.json({ error: 'Missing required article fields' }, { status: 400 });
    }

    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

    const post = await prisma.blogPost.create({
      data: {
        authorId: user.id,
        slug,
        title,
        summary,
        content,
        category,
        tags: tags || null,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
        readTimeMinutes: readTimeMinutes ? parseInt(readTimeMinutes, 10) : 5,
        isPublished: true,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json({ message: 'Article published successfully', post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to publish article' }, { status: 500 });
  }
}
