'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  Sparkles,
  ArrowRight,
  X,
  UploadCloud,
  FileText,
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
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Apply Modal state
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const locations = ['All', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Delhi NCR', 'Pune', 'Remote'];
  const jobTypes = ['All', 'Full-time', 'Contract', 'Part-time', 'Remote'];

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesQuery =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.employer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All' ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesType =
        selectedType === 'All' ||
        job.jobType.toLowerCase().includes(selectedType.toLowerCase());

      return matchesQuery && matchesLocation && matchesType;
    });
  }, [initialJobs, searchQuery, selectedLocation, selectedType]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    if (!user) {
      toast('Please sign in or register as a candidate to submit your application', 'error');
      window.location.href = '/login';
      return;
    }

    setSubmitting(true);
    try {
      let resumeUrl = user.avatarUrl || '';

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
          resumeUrl = uploadData.url;
        }
      }

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: applyingJob.id,
          resumeUrl,
          coverNote: coverLetter,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast(data.error || 'Failed to submit application', 'error');
      } else {
        toast('Application submitted successfully! Track it in your Candidate Portal.', 'success');
        setApplyingJob(null);
        setCoverLetter('');
        setResumeFile(null);
      }
    } catch (err) {
      toast('Network error while applying', 'error');
    } finally {
      setSubmitting(false);
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
          Current Openings
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Explore vetted opportunities directly managed by HireVibe.
        </p>
      </div>

      {/* Simplified Search & Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role title, skill, or keyword..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
          {/* Location Filter */}
          <div className="w-full sm:w-44">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 bg-white"
            >
              <option value="All">All Locations</option>
              {locations.filter((l) => l !== 'All').map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type Filter */}
          <div className="w-full sm:w-40">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 bg-white"
            >
              <option value="All">All Job Types</option>
              {jobTypes.filter((t) => t !== 'All').map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery || selectedLocation !== 'All' || selectedType !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('All');
                setSelectedType('All');
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-2 rounded-xl hover:bg-rose-50 transition whitespace-nowrap"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Job Cards List */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-slate-500">
          Showing {filteredJobs.length} position{filteredJobs.length === 1 ? '' : 's'}
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-navy-950">No matching positions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search keywords or clearing location/job type filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('All');
                setSelectedType('All');
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
            >
              Clear Filters
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
                      {job.employer.companyName} • {job.employer.industry || 'Technology'}
                    </p>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                    {job.jobType}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">{job.description}</p>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1 font-semibold text-slate-800">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {formatCurrency(job.salaryMin)} – {formatCurrency(job.salaryMax)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Posted {timeAgo(job.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {job.experienceLevel} Level
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => setApplyingJob(job)}
                    className="px-4 py-1.5 rounded-lg bg-navy-950 hover:bg-brand-600 text-white text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Apply Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setApplyingJob(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">
                Direct Candidate Application
              </span>
              <h3 className="text-xl font-bold text-navy-950 mt-1">{applyingJob.title}</h3>
              <p className="text-xs text-slate-500">
                {applyingJob.employer.companyName} • {applyingJob.location}
              </p>
            </div>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Resume / CV (PDF or DOCX) *
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-brand-400 transition bg-slate-50">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer block space-y-1">
                    <UploadCloud className="w-6 h-6 text-brand-500 mx-auto" />
                    <div className="text-xs font-semibold text-navy-950">
                      {resumeFile ? resumeFile.name : 'Click to select resume file'}
                    </div>
                    <p className="text-[11px] text-slate-400">PDF or Word document (Max 5MB)</p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cover Note / Introduction (Optional)
                </label>
                <textarea
                  rows={3}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Share a brief overview of your background, current notice period, or key accomplishments..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
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
                  className="px-6 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition shadow-md flex items-center gap-1.5"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
