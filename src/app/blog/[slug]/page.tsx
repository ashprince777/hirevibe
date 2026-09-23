import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Clock, ArrowLeft, ArrowRight, Share2, Bookmark, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  let post: any = null;
  try {
    post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
        isPublished: true,
      },
      include: {
        author: true,
      },
    });
  } catch (err) {
    console.error('Notice: blog post query fallback');
  }

  if (!post) {
    notFound();
  }

  let relatedPosts: any[] = [];
  try {
    relatedPosts = await prisma.blogPost.findMany({
      where: {
        category: post.category,
        id: { not: post.id },
        isPublished: true,
      },
      take: 2,
      orderBy: { publishedAt: 'desc' },
    });
  } catch (err) {}

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Insights & Briefings</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="font-bold text-brand-600 uppercase tracking-wider text-[11px] bg-brand-50 px-2.5 py-0.5 rounded-full">
            {post.category}
          </span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{post.readTimeMinutes} min read</span>
          </div>
          <span>•</span>
          <span>Published {formatDate(post.publishedAt)}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-slate-600 leading-relaxed font-medium">{post.summary}</p>

        {/* Author bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <img
              src={
                post.author.avatarUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}`
              }
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-200"
            />
            <div>
              <div className="text-sm font-bold text-navy-950">{post.author.name}</div>
              <div className="text-xs text-slate-500">Managing Director & Senior HR Partner</div>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 max-h-[480px]">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base border-b border-slate-200 pb-12">
        {post.content.split('\n\n').map((paragraph: string, idx: number) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-navy-950 mt-8 mb-3">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <ul key={idx} className="list-disc pl-5 space-y-1">
                {paragraph.split('\n').map((li, lIdx) => (
                  <li key={lIdx}>{li.replace('- ', '')}</li>
                ))}
              </ul>
            );
          }
          return <p key={idx} className="leading-relaxed whitespace-pre-line">{paragraph}</p>;
        })}
      </div>

      {/* Tags */}
      {post.tags && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-bold text-slate-500 mr-1">Filed Under:</span>
          {post.tags.split(',').map((tag: string, tIdx: number) => (
            <span
              key={tIdx}
              className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="pt-10 space-y-6">
          <h3 className="text-xl font-bold text-navy-950">Related Insights & Research</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((r) => (
              <div key={r.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold uppercase text-brand-600">{r.category}</span>
                <h4 className="font-bold text-sm text-navy-950 hover:text-brand-600 transition">
                  <Link href={`/blog/${r.slug}`}>{r.title}</Link>
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">{r.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
