import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import CandidateNav from '@/components/portals/CandidateNav';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  Building,
  MapPin,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { formatCurrency, formatDate, timeAgo } from '@/lib/utils';

export const revalidate = 0;

export default async function CandidateApplicationsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CANDIDATE') {
    redirect('/login');
  }

  const applications = await prisma.application.findMany({
    where: { candidateId: user.id },
    include: {
      job: {
        include: {
          employer: true,
        },
      },
    },
    orderBy: { appliedAt: 'desc' },
  });

  const statusBadges: Record<string, { label: string; style: string }> = {
    SUBMITTED: { label: 'Application Submitted', style: 'bg-slate-100 text-slate-700 border-slate-200' },
    REVIEWING: { label: 'Under Review', style: 'bg-brand-50 text-brand-700 border-brand-200' },
    SHORTLISTED: { label: 'Shortlisted for Interview', style: 'bg-amber-50 text-amber-700 border-amber-200' },
    INTERVIEW: { label: 'Interview Scheduled', style: 'bg-purple-50 text-purple-700 border-purple-200' },
    OFFERED: { label: 'Formal Offer Extended', style: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    REJECTED: { label: 'Archived / Not Selected', style: 'bg-rose-50 text-rose-700 border-rose-200' },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Application Tracking
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">My Candidacies & Pipeline</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review application status, interview schedules, and recruiter communications in real time.
        </p>
      </div>

      <CandidateNav />

      {applications.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-navy-950">No applications on file</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Discover roles that align with your background and submit your credentials with one click.
          </p>
          <Link
            href="/jobs"
            className="inline-block px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-brand-700 transition"
          >
            Browse Active Mandates
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const badge = statusBadges[app.status] || {
              label: app.status,
              style: 'bg-slate-100 text-slate-700',
            };

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={
                        app.job.employer.logoUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(app.job.employer.companyName)}`
                      }
                      alt={app.job.employer.companyName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50"
                    />
                    <div>
                      <h2 className="font-bold text-base text-navy-950 hover:text-brand-600 transition">
                        <Link href={`/jobs/${app.job.id}`}>{app.job.title}</Link>
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        {app.job.employer.companyName} • Applied on {formatDate(app.appliedAt)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${badge.style}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Pipeline visual stepper */}
                <div className="grid grid-cols-4 gap-2 pt-1 text-center text-[10px] font-semibold">
                  <div
                    className={`p-2 rounded-lg border ${
                      ['SUBMITTED', 'REVIEWING', 'SHORTLISTED', 'INTERVIEW', 'OFFERED'].includes(app.status)
                        ? 'bg-brand-50 border-brand-300 text-brand-700 font-bold'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    1. Submitted
                  </div>
                  <div
                    className={`p-2 rounded-lg border ${
                      ['REVIEWING', 'SHORTLISTED', 'INTERVIEW', 'OFFERED'].includes(app.status)
                        ? 'bg-brand-50 border-brand-300 text-brand-700 font-bold'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    2. Under Review
                  </div>
                  <div
                    className={`p-2 rounded-lg border ${
                      ['SHORTLISTED', 'INTERVIEW', 'OFFERED'].includes(app.status)
                        ? 'bg-amber-50 border-amber-300 text-amber-700 font-bold'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    3. Interview Round
                  </div>
                  <div
                    className={`p-2 rounded-lg border ${
                      app.status === 'OFFERED'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    4. Offer Extended
                  </div>
                </div>

                {/* Details & Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                  {app.coverLetter && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                      <span className="font-bold text-slate-700 block">Submitted Cover Note</span>
                      <p className="text-slate-600 whitespace-pre-line text-[11px]">{app.coverLetter}</p>
                    </div>
                  )}

                  {app.employerNotes ? (
                    <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 space-y-1">
                      <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        Hiring Team / Recruiter Feedback
                      </span>
                      <p className="text-amber-950 text-[11px] leading-relaxed">{app.employerNotes}</p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 text-[11px]">
                      Awaiting formal feedback from hiring committee.
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Dossier: {app.resumeUrl.split('/').pop()}</span>
                  </div>
                  <Link
                    href={`/jobs/${app.job.id}`}
                    className="text-brand-600 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>View Role Specifications</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
