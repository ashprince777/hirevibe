'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle,
  X,
  UploadCloud,
  FileText,
  Bookmark,
  Share2,
} from 'lucide-react';
import { formatCurrency, timeAgo } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: number | null;
  salaryMax: number | null;
  description: string;
  requirements: string;
  benefits?: string | null;
  isFeatured: boolean;
  createdAt: string;
  employer: {
    id: string;
    companyName: string;
    logoUrl?: string | null;
    industry?: string | null;
    location?: string | null;
  };
  _count?: {
    applications: number;
  };
}

export default function JobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [onlyRemote, setOnlyRemote] = useState(false);

  // Apply Modal state
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const departments = ['All', 'Engineering', 'Human Resources', 'Operations', 'Finance', 'Design'];
  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid'];
  const experienceLevels = ['All', 'Entry-level', 'Mid-level', 'Senior', 'Executive'];

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesQuery =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.employer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === 'All' || job.department === selectedDept;
      const matchesType = selectedType === 'All' || job.jobType === selectedType;
      const matchesLevel = selectedLevel === 'All' || job.experienceLevel === selectedLevel;
      const matchesRemote =
        !onlyRemote ||
        job.jobType.toLowerCase().includes('remote') ||
        job.location.toLowerCase().includes('remote');

      return matchesQuery && matchesDept && matchesType && matchesLevel && matchesRemote;
    });
  }, [initialJobs, searchQuery, selectedDept, selectedType, selectedLevel, onlyRemote]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    if (!user) {
      toast('Please sign in or register as a candidate to submit your application', 'error');
      window.location.href = '/login';
      return;
    }

    if (user.role !== 'CANDIDATE') {
      toast('Only candidate accounts can submit job applications. Please switch to a Candidate account.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      let uploadedResumeUrl = user.candidateProfile?.resumeUrl || '/uploads/resumes/default-resume.pdf';

      // If user uploaded a new file
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
          jobId: applyingJob.id,
          resumeUrl: uploadedResumeUrl,
          coverLetter,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast(data.error || 'Failed to submit application', 'error');
      } else {
        toast('Application submitted successfully! Check Candidate Portal to track progress.', 'success');
        setApplyingJob(null);
        setCoverLetter('');
        setResumeFile(null);
      }
    } catch (err) {
      toast('Network error during application submission', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBookmark = async (jobId: string) => {
    if (!user || user.role !== 'CANDIDATE') {
      toast('Sign in as a candidate to save jobs', 'info');
      return;
    }
    try {
      const res = await fetch('/api/jobs/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId }),
      });
      const data = await res.json();
      if (res.ok) {
        toast(data.message, 'success');
      }
    } catch (err) {
      toast('Failed to bookmark job', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Career Directory
        </span>
        <h1 className="text-3xl font-extrabold text-navy-950 mt-2 tracking-tight">
          Explore Curated Opportunities
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Vetted executive, engineering, and corporate leadership positions directly represented by HireVibe.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role title, skill, or keyword (e.g., Cloud Architect, VP, React)..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
            <input
              type="checkbox"
              checked={onlyRemote}
              onChange={(e) => setOnlyRemote(e.target.checked)}
              className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
            />
            <span>Remote Only</span>
          </label>

          {(searchQuery || selectedDept !== 'All' || selectedType !== 'All' || selectedLevel !== 'All' || onlyRemote) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('All');
                setSelectedType('All');
                setSelectedLevel('All');
                setOnlyRemote(false);
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-2 rounded-xl hover:bg-rose-50 transition whitespace-nowrap"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <div className="flex items-center gap-2 font-bold text-sm text-navy-950 pb-3 border-b border-slate-100">
            <Filter className="w-4 h-4 text-brand-500" />
            <span>Refine Positions</span>
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
              Practice Area / Department
            </label>
            <div className="space-y-1">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedDept === dept
                      ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
              Work Arrangement
            </label>
            <div className="space-y-1">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedType === type
                      ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
              Seniority Level
            </label>
            <div className="space-y-1">
              {experienceLevels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedLevel === lvl
                      ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Job Cards Stream */}
        <main className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>
              Showing <strong className="text-slate-900">{filteredJobs.length}</strong> matching vacancies
            </span>
            <span className="text-[11px] text-slate-400">Direct Employer Mandates</span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-950">No matching positions found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your filters or keyword query to discover other executive and professional roles.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDept('All');
                  setSelectedType('All');
                  setSelectedLevel('All');
                  setOnlyRemote(false);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={
                          job.employer.logoUrl ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(job.employer.companyName)}`
                        }
                        alt={job.employer.companyName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-bold text-base text-navy-950 hover:text-brand-600 transition">
                            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                          </h2>
                          {job.isFeatured && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                              <Sparkles className="w-2.5 h-2.5" /> Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          {job.employer.companyName} • {job.employer.industry || 'Enterprise'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleBookmark(job.id)}
                        className="p-2 text-slate-400 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition"
                        title="Bookmark Job"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">{job.description}</p>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1 font-semibold text-slate-800">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.jobType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Posted {timeAgo(job.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {job.experienceLevel} Level • {job.department}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => setApplyingJob(job)}
                      className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition"
                    >
                      Quick Apply
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      {/* Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                  Submit Candidate Application
                </span>
                <h3 className="text-lg font-bold text-navy-950 mt-1">{applyingJob.title}</h3>
                <p className="text-xs text-slate-500">{applyingJob.employer.companyName}</p>
              </div>
              <button
                onClick={() => setApplyingJob(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-4">
              {/* Resume Upload / Pre-attached */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Resume / Curriculum Vitae (PDF, DOCX)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-brand-400 transition bg-slate-50">
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer block space-y-1">
                    <UploadCloud className="w-7 h-7 text-brand-500 mx-auto" />
                    <span className="text-xs font-semibold text-slate-700 block">
                      {resumeFile ? resumeFile.name : 'Click to select or drag resume file'}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Max file size 10MB • Will also save to your candidate profile
                    </span>
                  </label>
                </div>
              </div>

              {/* Cover Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Cover Note / Pitch to Hiring Executive
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Highlight key achievements, relevant architecture/leadership experience, and compensation expectations..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setApplyingJob(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition disabled:opacity-50"
                >
                  {submitting ? 'Transmitting Application...' : 'Send Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
