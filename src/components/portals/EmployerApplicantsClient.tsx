'use client';

import React, { useState } from 'react';
import {
  Users,
  FileText,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Clock,
  Download,
} from 'lucide-react';
import { formatDate, timeAgo } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

interface Application {
  id: string;
  status: string;
  appliedAt: string;
  resumeUrl: string;
  coverLetter?: string | null;
  job: {
    id: string;
    title: string;
    department: string;
  };
  candidate: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    candidateProfile?: {
      headline?: string | null;
      phone?: string | null;
      location?: string | null;
    } | null;
  };
}

export default function EmployerApplicantsClient({
  initialApplications,
  jobsList,
  selectedJobId = '',
}: {
  initialApplications: Application[];
  jobsList: { id: string; title: string }[];
  selectedJobId?: string;
}) {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [filterJob, setFilterJob] = useState(selectedJobId);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const statusOptions = [
    { value: 'APPLIED', label: 'Applied' },
    { value: 'SHORTLISTED', label: 'Shortlisted' },
    { value: 'REJECTED', label: 'Rejected' },
  ];

  const getCleanStatus = (status: string) => {
    const s = status.toUpperCase();
    if (s === 'SHORTLISTED' || s === 'INTERVIEW' || s === 'OFFERED') return 'SHORTLISTED';
    if (s === 'REJECTED') return 'REJECTED';
    return 'APPLIED';
  };

  const filtered = applications.filter((app) => {
    const cleanAppStatus = getCleanStatus(app.status);
    const matchesJob = !filterJob || app.job.id === filterJob;
    const matchesStatus = filterStatus === 'ALL' || cleanAppStatus === filterStatus;
    return matchesJob && matchesStatus;
  });

  const handleStatusChange = async (appId: string, newStatus: string) => {
    setUpdatingId(appId);
    try {
      const res = await fetch(`/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setApplications(
          applications.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
        );
        toast(`Candidate status updated to: ${newStatus}`, 'success');
      } else {
        toast('Failed to update applicant status', 'error');
      }
    } catch (err) {
      toast('Network error updating applicant', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Filter by Job</label>
            <select
              value={filterJob}
              onChange={(e) => setFilterJob(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 bg-white"
            >
              <option value="">All Job Openings ({applications.length})</option>
              {jobsList.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Application Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="APPLIED">Applied</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Showing <strong className="text-slate-900">{filtered.length}</strong> applicant{filtered.length === 1 ? '' : 's'}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <Users className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-navy-950">No applicants found</h3>
          <p className="text-xs text-slate-500">
            {filterJob || filterStatus !== 'ALL'
              ? 'Try changing or clearing your filters above.'
              : 'As candidates apply to your posted jobs, they will appear here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => {
            const currentStatus = getCleanStatus(app.status);

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={
                        app.candidate.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(app.candidate.name)}`
                      }
                      alt={app.candidate.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-navy-950">{app.candidate.name}</h3>
                        <span className="text-[11px] text-slate-400 font-medium">
                          • for <strong className="text-slate-700">{app.job.title}</strong>
                        </span>
                      </div>

                      {app.candidate.candidateProfile?.headline && (
                        <p className="text-xs text-slate-600 font-medium">
                          {app.candidate.candidateProfile.headline}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.candidate.email}</span>
                        </div>
                        {app.candidate.candidateProfile?.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{app.candidate.candidateProfile.phone}</span>
                          </div>
                        )}
                        <span>Applied {timeAgo(app.appliedAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3-State Status Selector */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-500">Status:</label>
                    <select
                      value={currentStatus}
                      disabled={updatingId === app.id}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none transition ${
                        currentStatus === 'SHORTLISTED'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : currentStatus === 'REJECTED'
                          ? 'bg-rose-50 text-rose-700 border-rose-300'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      <option value="APPLIED">Applied</option>
                      <option value="SHORTLISTED">Shortlisted</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Cover Note & Resume Link */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-600">
                    {app.coverLetter ? (
                      <span><strong>Cover Note:</strong> {app.coverLetter}</span>
                    ) : (
                      <span className="text-slate-400 italic">No cover note provided.</span>
                    )}
                  </div>

                  {app.resumeUrl ? (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resume</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">No resume attached</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
