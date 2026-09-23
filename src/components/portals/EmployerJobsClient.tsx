'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Briefcase, MapPin, IndianRupee, Users, Sparkles, X, Check, Eye } from 'lucide-react';
import { formatCurrency, timeAgo } from '@/lib/utils';
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
  status: string;
  isFeatured: boolean;
  viewsCount: number;
  createdAt: string;
  _count: {
    applications: number;
  };
}

export default function EmployerJobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [location, setLocation] = useState('Bengaluru, Karnataka (Hybrid)');
  const [jobType, setJobType] = useState('Full-time');
  const [experienceLevel, setExperienceLevel] = useState('Senior');
  const [salaryMin, setSalaryMin] = useState('2400000');
  const [salaryMax, setSalaryMax] = useState('3600000');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !requirements) {
      toast('Please fill in title, description, and requirements', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          department,
          location,
          jobType,
          experienceLevel,
          salaryMin,
          salaryMax,
          description,
          requirements,
          benefits,
          isFeatured,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast(data.error || 'Failed to post job', 'error');
      } else {
        toast('New job posted successfully and live on network', 'success');
        setJobs([
          {
            ...data.job,
            createdAt: new Date().toISOString(),
            _count: { applications: 0 },
          },
          ...jobs,
        ]);
        setModalOpen(false);
        // Reset form
        setTitle('');
        setDescription('');
        setRequirements('');
        setBenefits('');
      }
    } catch (err) {
      toast('Error submitting job posting', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (jobId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setJobs(jobs.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j)));
        toast(`Job status updated to ${newStatus}`, 'success');
      } else {
        toast('Failed to update job status', 'error');
      }
    } catch (err) {
      toast('Network error updating status', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-navy-950">Active & Archived Mandates</h2>
          <p className="text-xs text-slate-500">Manage listings, view candidate traffic, and adjust status</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Vacancy</span>
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-navy-950">No job postings yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Create your first open role to begin receiving calibrated candidate applications.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold shadow-sm"
          >
            Create Job Mandate
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-navy-950 hover:text-brand-600 transition">
                    <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      job.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {job.status}
                  </span>
                  {job.isFeatured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>{job.department}</span>
                  <span>•</span>
                  <span>{job.jobType}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>
                    {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                  <span>Posted {timeAgo(job.createdAt)}</span>
                  <span>•</span>
                  <span>{job.viewsCount} views</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <Link
                  href={`/portal/employer/applicants?jobId=${job.id}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold transition"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{job._count.applications} Applicants</span>
                </Link>

                <button
                  onClick={() => handleToggleStatus(job.id, job.status)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                >
                  {job.status === 'ACTIVE' ? 'Close Listing' : 'Reactivate'}
                </button>

                <Link
                  href={`/jobs/${job.id}`}
                  target="_blank"
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                  title="View Public Page"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Job Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                  Post Open Mandate
                </span>
                <h3 className="text-xl font-bold text-navy-950 mt-1">Create New Job Position</h3>
                <p className="text-xs text-slate-500">Candidate applications will route directly to your pipeline.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Principal Cloud Infrastructure Engineer"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                  >
                    <option>Engineering</option>
                    <option>Human Resources</option>
                    <option>Operations</option>
                    <option>Finance</option>
                    <option>Design</option>
                    <option>Product</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                  >
                    <option>Full-time</option>
                    <option>Contract</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>Part-time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Seniority Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                  >
                    <option>Entry-level</option>
                    <option>Mid-level</option>
                    <option>Senior</option>
                    <option>Executive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bengaluru / Mumbai / Remote India"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Min Annual CTC (₹ INR)</label>
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    placeholder="e.g. 2400000 (24 LPA)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Annual CTC (₹ INR)</label>
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    placeholder="e.g. 3600000 (36 LPA)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role Description *</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline core mission, objectives, team structure, and impact..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Candidate Qualifications & Requirements (one per line, prefixed with -) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="- 6+ years enterprise cloud experience&#10;- Mastery of React, Next.js, and TypeScript&#10;- Proven team leadership"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Benefits & Total Rewards</label>
                <input
                  type="text"
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="Comprehensive healthcare, equity grant, 401(k) match, unlimited PTO"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <label htmlFor="featured-toggle" className="text-xs text-slate-700 font-semibold cursor-pointer">
                  Feature this mandate prominently on HireVibe homepage & search top
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
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
                  {submitting ? 'Publishing Mandate...' : 'Publish Job Mandate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
