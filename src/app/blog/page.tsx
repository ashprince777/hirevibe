import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Clock, BookOpen, User, ArrowRight, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { category?: string; query?: string };
}) {
  const category = searchParams?.category;
  const query = searchParams?.query;

  const where: any = { isPublished: true };
  if (category && category !== 'All') {
    where.category = category;
  }
  if (query) {
    where.OR = [
      { title: { contains: query } },
      { summary: { contains: query } },
      { content: { contains: query } },
    ];
  }

  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where,
      include: {
        author: true,
      },
      orderBy: { publishedAt: 'desc' },
    });
  } catch (err) {
    console.error('Notice: blogPosts DB query fallback');
  }

  if (!posts || posts.length === 0) {
    posts = [
      {
        id: 'post-1',
        title: 'Mastering the 4 New Indian Labour Codes: Strategic Playbook for HR Leaders',
        slug: 'mastering-4-new-indian-labour-codes',
        category: 'HR Compliance',
        readTime: 8,
        publishedAt: new Date(),
        summary: 'Essential breakdown of the Code on Wages, Social Security, IR, and OSH. How to structure basic pay at 50% without ballooning employer gratuity liabilities.',
        author: { name: 'Pooja Sharma' },
      },
      {
        id: 'post-2',
        title: 'Solving India’s 90-Day Notice Period Dilemma in Lateral Tech Hiring',
        slug: 'solving-indias-90-day-notice-period-dilemma',
        category: 'Talent Acquisition',
        readTime: 6,
        publishedAt: new Date(),
        summary: 'How top tech employers in Bengaluru and Gurugram slash counter-offer reneges using dedicated engagement workflows and notice buyout negotiations.',
        author: { name: 'Rajesh Subramaniam' },
      },
      {
        id: 'post-3',
        title: 'Setting Up a Global Capability Center (GCC) in India: Talent & Compensation Guide',
        slug: 'setting-up-gcc-india-talent-compensation-guide',
        category: 'Leadership & L&D',
        readTime: 10,
        publishedAt: new Date(),
        summary: 'Why MNCs choose Bengaluru, Hyderabad, and Pune for GCC hubs, and how to design executive compensation packages that attract tier-1 Indian leadership.',
        author: { name: 'Vikramaditya Singhania' },
      },
    ];
  }

  const categories = [
    'All',
    'HR Compliance',
    'Talent Acquisition',
    'Compensation & Benefits',
    'Leadership & L&D',
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Blog Hero */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-slate-800 px-3 py-1 rounded-full">
            Thought Leadership
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-4">
            Insights, Compliance & Talent Intelligence
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Strategic briefings on the 4 Indian Labour Codes, POSH Act compliance, CTC benchmarks (₹ LPA), and notice-period solutions curated by our Senior Partners.
          </p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = (!category && cat === 'All') || category === cat;
              return (
                <Link
                  key={cat}
                  href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                    active
                      ? 'bg-navy-950 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          <form action="/blog" method="GET" className="w-full sm:w-auto">
            <input
              type="text"
              name="query"
              defaultValue={query || ''}
              placeholder="Search HR topics..."
              className="w-full sm:w-64 px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
            />
          </form>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-navy-950">No articles found in this category.</p>
            <Link href="/blog" className="text-xs text-brand-600 font-semibold hover:underline mt-2 inline-block">
              View All Articles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={
                        post.coverImage ||
                        'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80'
                      }
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="font-bold text-brand-600 uppercase tracking-wider text-[11px]">
                        {post.category}
                      </span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTimeMinutes} min read</span>
                      </div>
                      <span>•</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>

                    <h2 className="text-xl font-bold text-navy-950 group-hover:text-brand-600 transition leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={
                        post.author.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}`
                      }
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">{post.author.name}</span>
                      <span className="text-[10px] text-slate-400 block">Senior Partner</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:text-brand-700 transition"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
