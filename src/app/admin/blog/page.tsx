import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import AdminNav from '@/components/portals/AdminNav';
import AdminBlogClient from '@/components/portals/AdminBlogClient';

export const revalidate = 0;

export default async function AdminBlogPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    redirect('/login');
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  const serializedPosts = posts.map((p) => ({
    ...p,
    publishedAt: p.publishedAt.toISOString(),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
          Content & Thought Leadership
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">
          Insights CMS & Article Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Publish, edit, and categorize strategic briefings and labor law updates.
        </p>
      </div>

      <AdminNav />
      <AdminBlogClient initialPosts={serializedPosts} />
    </div>
  );
}
