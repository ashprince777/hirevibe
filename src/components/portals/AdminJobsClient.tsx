'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, Sparkles, Eye, Trash2, Check, X } from 'lucide-react';
import { formatCurrency, timeAgo } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

export default function AdminJobsClient({ initialJobs }: { initialJobs: any[] }) {
  const { toast } = useToast();
  const [jobs, setJobs] = useState(initialJobs);

  const handleToggleFeatured = async (jobId: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !currentFeatured }),
      });

      if (res.ok) {
        setJobs(jobs.map((j) => (j.id === jobId ? { ...j, isFeatured: !currentFeatured } : j)));
        toast(`Job ${!currentFeatured ? 'featured on homepage' : 'unfeatured'}`, 'success');
      }
    } catch (err) {
      toast('Failed to update featured state', 'error');
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
      }
    } catch (err) {
      toast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to permanently delete this job posting?')) return;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' });
      if (res.ok) {
        setJobs(jobs.filter((j) => j.id !== jobId));
        toast('Job deleted from system', 'success');
      }
    } catch (err) {
      toast('Failed to delete job', 'error');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold uppercase text-[10px]">
            <tr>
              <th className="py-3 px-4">Position & Employer</th>
              <th className="py-3 px-4">Department & Level</th>
              <th className="py-3 px-4">Compensation</th>
              <th className="py-3 px-4">Applicants</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        job.employer.logoUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(job.employer.companyName)}`
                      }
                      alt={job.employer.companyName}
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="font-bold text-navy-950 hover:text-brand-600 transition"
                        >
                          {job.title}
                        </Link>
                        {job.isFeatured && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {job.employer.companyName} • {job.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-slate-800">{job.department}</span>
                  <div className="text-[11px] text-slate-400">{job.experienceLevel} Level</div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">
                  {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-slate-900">{job._count.applications}</span> candidates
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      job.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleToggleFeatured(job.id, job.isFeatured)}
                      className={`p-1.5 rounded-lg border text-xs transition ${
                        job.isFeatured
                          ? 'bg-amber-50 border-amber-300 text-amber-700'
                          : 'border-slate-200 text-slate-400 hover:text-amber-600'
                      }`}
                      title={job.isFeatured ? 'Unfeature' : 'Feature on Homepage'}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleToggleStatus(job.id, job.status)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-[11px] font-semibold text-slate-700"
                    >
                      {job.status === 'ACTIVE' ? 'Close' : 'Activate'}
                    </button>

                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                      title="Delete Posting"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
