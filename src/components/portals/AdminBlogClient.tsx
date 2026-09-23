'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, BookOpen, Clock, Tag, X, Eye, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  readTimeMinutes: number;
  publishedAt: string;
}

export default function AdminBlogClient({ initialPosts }: { initialPosts: Post[] }) {
  const { toast } = useToast();
  const [posts, setPosts] = useState(initialPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('HR Compliance');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [readTimeMinutes, setReadTimeMinutes] = useState('6');
  const [coverImage, setCoverImage] = useState('');

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !content) {
      toast('Title, summary, and content are required', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          summary,
          content,
          tags,
          readTimeMinutes,
          coverImage,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast('Article published successfully!', 'success');
        setPosts([
          {
            ...data.post,
            publishedAt: new Date().toISOString(),
          },
          ...posts,
        ]);
        setModalOpen(false);
        setTitle('');
        setSummary('');
        setContent('');
        setTags('');
      } else {
        toast(data.error || 'Failed to publish article', 'error');
      }
    } catch (err) {
      toast('Network error publishing article', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-navy-950">Published Thought Leadership</h2>
          <p className="text-xs text-slate-500">Manage HR insights, compliance advisories, and talent reports</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Article</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                  {post.category}
                </span>
                <span className="text-[11px] text-slate-400">• {post.readTimeMinutes} min read</span>
              </div>

              <h3 className="font-bold text-base text-navy-950 hover:text-brand-600 transition">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{post.summary}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Published {formatDate(post.publishedAt)}</span>
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="flex items-center gap-1 font-semibold text-brand-600 hover:underline"
              >
                <span>View Live</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                  CMS Publishing
                </span>
                <h3 className="text-xl font-bold text-navy-950 mt-1">Publish Thought Leadership</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Navigating Multi-State Labor Regulations & Wage Audits in 2026"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                  >
                    <option>HR Compliance</option>
                    <option>Talent Acquisition</option>
                    <option>Compensation & Benefits</option>
                    <option>Leadership & L&D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Reading Time (Min)</label>
                  <input
                    type="number"
                    value={readTimeMinutes}
                    onChange={(e) => setReadTimeMinutes(e.target.value)}
                    placeholder="6"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Executive Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="A concise 2-sentence briefing summarizing key findings..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Article Body *</label>
                <textarea
                  required
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Article content. Use ### for subheadings and - for bullet points..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Compliance, Labor Law, Retention, Remote Work"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cover Image URL (Optional)</label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Publish to Insights'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
