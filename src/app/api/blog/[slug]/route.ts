import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: {
        author: {
          select: {
            name: true,
            avatarUrl: true,
            role: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Get related articles in same category
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        category: post.category,
        id: { not: post.id },
        isPublished: true,
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json({ post, relatedPosts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
