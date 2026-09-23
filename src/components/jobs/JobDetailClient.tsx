'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Briefcase,
  Clock,
  Building,
  CheckCircle2,
  Share2,
  Bookmark,
  ArrowLeft,
  UploadCloud,
  X,
  ShieldCheck,
  Globe,
  Sparkles,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function JobDetailClient({
  job,
  hasAppliedInitially = false,
  isSavedInitially = false,
}: {
  job: any;
  hasAppliedInitially?: boolean;
  isSavedInitially?: boolean;
}) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [hasApplied, setHasApplied] = useState(hasAppliedInitially);
  const [isSaved, setIsSaved] = useState(isSavedInitially);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast('Please sign in or register as a candidate to apply', 'error');
      window.location.href = '/login';
      return;
    }

    if (user.role !== 'CANDIDATE') {
      toast('Only candidate accounts can submit applications. Please switch to a Candidate account.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      let uploadedResumeUrl = user.candidateProfile?.resumeUrl || '/uploads/resumes/default-resume.pdf';

      if (resumeFile) {
        const formData = new FormData();
        formData.append('file', resumeFile);
        formData.append('type', 'resumes');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          uploadedResumeUrl = uploadData.url;
        }
      }

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          resumeUrl: uploadedResumeUrl,
          coverLetter,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast(data.error || 'Failed to submit application', 'error');
      } else {
        toast('Application submitted successfully! Your dossier is with the hiring committee.', 'success');
        setHasApplied(true);
        setApplyModalOpen(false);
      }
    } catch (err) {
      toast('Network error during application submission', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleBookmark = async () => {
    if (!user || user.role !== 'CANDIDATE') {
      toast('Please sign in as a candidate to save jobs', 'info');
      return;
    }

    try {
      const res = await fetch('/api/jobs/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: job.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsSaved(data.saved);
        toast(data.message, 'success');
      }
    } catch (err) {
      toast('Failed to bookmark job', 'error');
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast('Position link copied to clipboard', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/jobs" className="hover:text-brand-600 flex items-center gap-1 transition">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Opportunities</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">{job.department}</span>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{job.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Job Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    job.employer.logoUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(job.employer.companyName)}`
                  }
                  alt={job.employer.companyName}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 bg-slate-50"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-navy-950 tracking-tight">{job.title}</h1>
                    {job.isFeatured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span className="font-semibold text-slate-800">{job.employer.companyName}</span>
                    <span>•</span>
                    <span>{job.employer.industry || 'Enterprise'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleBookmark}
                  className={`p-2.5 rounded-xl border transition ${
                    isSaved
                      ? 'bg-brand-50 border-brand-300 text-brand-600'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                  title={isSaved ? 'Saved' : 'Save Job'}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-brand-600' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Compensation</span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Location</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{job.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Work Type</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{job.jobType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Seniority</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{job.experienceLevel}</span>
              </div>
            </div>
          </div>

          {/* Description & Requirements */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
            <div>
              <h2 className="text-base font-bold text-navy-950 mb-3 pb-2 border-b border-slate-100">
                Position Overview
              </h2>
              <p className="whitespace-pre-line text-slate-600">{job.description}</p>
            </div>

            <div>
              <h2 className="text-base font-bold text-navy-950 mb-3 pb-2 border-b border-slate-100">
                Candidate Qualifications & Core Competencies
              </h2>
              <div className="whitespace-pre-line text-slate-600 space-y-2">
                {job.requirements.split('\n').map((line: string, idx: number) => {
                  if (line.trim().startsWith('-')) {
                    return (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{line.replace(/^-\s*/, '')}</span>
                      </div>
                    );
                  }
                  return <p key={idx}>{line}</p>;
                })}
              </div>
            </div>

            {job.benefits && (
              <div>
                <h2 className="text-base font-bold text-navy-950 mb-3 pb-2 border-b border-slate-100">
                  Total Rewards & Benefits Package
                </h2>
                <p className="whitespace-pre-line text-slate-600">{job.benefits}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Apply Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-navy-950">Ready to take the next step?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Applications are reviewed directly by our Senior HR Consulting partners and the employer&apos;s leadership team.
            </p>

            {hasApplied ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>You have applied for this position! Track status in your Candidate Portal.</span>
              </div>
            ) : (
              <button
                onClick={() => setApplyModalOpen(true)}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20 transition flex items-center justify-center gap-2"
              >
                <span>Apply Now for Position</span>
              </button>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Strict candidate confidentiality guaranteed</span>
            </div>
          </div>

          {/* Employer Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-navy-950">About {job.employer.companyName}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {job.employer.description || 'A forward-thinking enterprise partner committed to innovation.'}
            </p>

            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              {job.employer.companySize && (
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>Company Size: {job.employer.companySize}</span>
                </div>
              )}
              {job.employer.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Headquarters: {job.employer.location}</span>
                </div>
              )}
              {job.employer.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <a
                    href={job.employer.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-600 hover:underline truncate"
                  >
                    {job.employer.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Apply Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                  Candidate Application
                </span>
                <h3 className="text-lg font-bold text-navy-950 mt-1">{job.title}</h3>
                <p className="text-xs text-slate-500">{job.employer.companyName}</p>
              </div>
              <button
                onClick={() => setApplyModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Resume / Curriculum Vitae (PDF, DOCX)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-brand-400 transition bg-slate-50">
                  <input
                    type="file"
                    id="modal-resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label htmlFor="modal-resume-upload" className="cursor-pointer block space-y-1">
                    <UploadCloud className="w-7 h-7 text-brand-500 mx-auto" />
                    <span className="text-xs font-semibold text-slate-700 block">
                      {resumeFile ? resumeFile.name : 'Select or drop resume file'}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Max file size 10MB • Will be reviewed by hiring committee
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Cover Note / Pitch to Hiring Executive
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Describe your background, leadership impact, and why you are the ideal fit for this mandate..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition disabled:opacity-50"
                >
                  {submitting ? 'Submitting Application...' : 'Send Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
