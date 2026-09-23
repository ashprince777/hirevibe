'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  FileText,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Download,
  Save,
} from 'lucide-react';
import { formatDate, timeAgo } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

interface Application {
  id: string;
  status: string;
  appliedAt: string;
  resumeUrl: string;
  coverLetter?: string | null;
  employerNotes?: string | null;
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
      skills?: string | null;
      yearsOfExperience?: number | null;
      portfolioUrl?: string | null;
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

  // Note edits
  const [notesState, setNotesState] = useState<Record<string, string>>({});

  const filtered = applications.filter((app) => {
    const matchesJob = !filterJob || app.job.id === filterJob;
    const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus;
    return matchesJob && matchesStatus;
  });

  const handleStatusChange = async (appId: string, newStatus: string) => {
    setUpdatingId(appId);
    try {
      const currentNotes = notesState[appId] !== undefined ? notesState[appId] : applications.find((a) => a.id === appId)?.employerNotes;

      const res = await fetch(`/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          employerNotes: currentNotes,
        }),
      });

      if (res.ok) {
        setApplications(
          applications.map((a) => (a.id === appId ? { ...a, status: newStatus, employerNotes: currentNotes } : a))
        );
        toast(`Candidate status progressed to: ${newStatus}`, 'success');
      } else {
        toast('Failed to update applicant status', 'error');
      }
    } catch (err) {
      toast('Network error updating applicant', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async (appId: string) => {
    const notes = notesState[appId];
    if (notes === undefined) return;

    try {
      const res = await fetch(`/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employerNotes: notes }),
      });

      if (res.ok) {
        setApplications(
          applications.map((a) => (a.id === appId ? { ...a, employerNotes: notes } : a))
        );
        toast('Recruiter notes saved', 'success');
      }
    } catch (err) {
      toast('Error saving notes', 'error');
    }
  };

  const statusOptions = ['SUBMITTED', 'REVIEWING', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'REJECTED'];

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
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
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
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Pipeline Stage</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
            >
              <option value="ALL">All Stages</option>
              {statusOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Showing <strong className="text-slate-900">{filtered.length}</strong> candidate dossiers
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <Users className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-navy-950">No applicants match this criteria</h3>
          <p className="text-xs text-slate-500">
            Adjust the job mandate or pipeline stage filters above.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => {
            const currentNote = notesState[app.id] !== undefined ? notesState[app.id] : (app.employerNotes || '');

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5"
              >
                {/* Candidate Dossier Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={
                        app.candidate.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(app.candidate.name)}`
                      }
                      alt={app.candidate.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-navy-950">{app.candidate.name}</h3>
                        <span className="text-[11px] text-slate-400 font-medium">
                          • Applied for <strong className="text-slate-700">{app.job.title}</strong>
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
                        {app.candidate.candidateProfile?.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{app.candidate.candidateProfile.location}</span>
                          </div>
                        )}
                        <span>Applied {timeAgo(app.appliedAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stage Status Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Stage:</span>
                    <select
                      value={app.status}
                      disabled={updatingId === app.id}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        app.status === 'SHORTLISTED' || app.status === 'INTERVIEW'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : app.status === 'OFFERED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : app.status === 'REJECTED'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-slate-50 text-slate-800 border-slate-300'
                      }`}
                    >
                      {statusOptions.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Skills tags */}
                {app.candidate.candidateProfile?.skills && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {app.candidate.candidateProfile.skills.split(',').map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-semibold bg-slate-50 text-slate-600 px-2.5 py-0.5 rounded-md border border-slate-100"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Cover Letter */}
                {app.coverLetter && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-bold text-slate-800 block mb-1">Candidate Cover Note:</span>
                    <p className="text-slate-600 whitespace-pre-line leading-relaxed">{app.coverLetter}</p>
                  </div>
                )}

                {/* Recruiter Notes & Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      value={currentNote}
                      onChange={(e) =>
                        setNotesState({ ...notesState, [app.id]: e.target.value })
                      }
                      placeholder="Add recruiter/interview notes (visible to candidate)..."
                      className="w-full sm:w-80 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                    />
                    <button
                      onClick={() => handleSaveNotes(app.id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold shrink-0"
                    >
                      Save Note
                    </button>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resume (CV)</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
