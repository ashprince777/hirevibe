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
  Sparkles,
  ArrowRight,
  Bookmark,
  Bell,
  Building,
  MapPin,
} from 'lucide-react';
import { formatCurrency, timeAgo } from '@/lib/utils';

export const revalidate = 0;

export default async function CandidatePortalPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CANDIDATE') {
    redirect('/login');
  }

  // Fetch candidate's applications
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

  const savedJobsCount = await prisma.savedJob.count({
    where: { candidateId: user.id },
  });

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  // Recommended active jobs
  const recommendedJobs = await prisma.job.findMany({
    where: {
      status: 'ACTIVE',
      applications: {
        none: { candidateId: user.id },
      },
    },
    take: 3,
    include: { employer: true },
    orderBy: { createdAt: 'desc' },
  });

  const statusCounts = {
    total: applications.length,
    reviewing: applications.filter((a) => a.status === 'REVIEWING').length,
    shortlisted: applications.filter((a) => a.status === 'SHORTLISTED' || a.status === 'INTERVIEW').length,
    offered: applications.filter((a) => a.status === 'OFFERED').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Candidate Career Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track your active candidacies, interview feedback, and bookmarked positions.
          </p>
        </div>

        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition"
        >
          <span>Browse New Mandates</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <CandidateNav />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 text-xs font-semibold">Total Applications</span>
          <div className="text-3xl font-black text-navy-950 mt-1">{statusCounts.total}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Submitted through HireVibe</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 text-xs font-semibold">Under Review</span>
          <div className="text-3xl font-black text-brand-600 mt-1">{statusCounts.reviewing}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Screened by Senior Recruiters</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 text-xs font-semibold">Shortlist / Interview</span>
          <div className="text-3xl font-black text-amber-600 mt-1">{statusCounts.shortlisted}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Advanced to hiring round</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 text-xs font-semibold">Saved Opportunities</span>
          <div className="text-3xl font-black text-purple-600 mt-1">{savedJobsCount}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Bookmarked for later</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications Pipeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy-950">Active Applications Pipeline</h2>
            <Link
              href="/portal/candidate/applications"
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              View All ({applications.length})
            </Link>
          </div>

          {applications.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
              <FileText className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">You haven't submitted any job applications yet.</p>
              <Link
                href="/jobs"
                className="inline-block px-4 py-2 bg-navy-950 text-white rounded-xl text-xs font-semibold"
              >
                Browse Open Roles
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 4).map((app) => {
                const statusStyles: Record<string, string> = {
                  SUBMITTED: 'bg-slate-100 text-slate-700 border-slate-200',
                  REVIEWING: 'bg-brand-50 text-brand-700 border-brand-200',
                  SHORTLISTED: 'bg-amber-50 text-amber-700 border-amber-200',
                  INTERVIEW: 'bg-purple-50 text-purple-700 border-purple-200',
                  OFFERED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
                };

                return (
                  <div
                    key={app.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-navy-950 hover:text-brand-600 transition">
                          <Link href={`/jobs/${app.job.id}`}>{app.job.title}</Link>
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            statusStyles[app.status] || 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {app.job.employer.companyName} • Applied {timeAgo(app.appliedAt)}
                      </p>
                      {app.employerNotes && (
                        <p className="text-[11px] text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <strong>Recruiter Note:</strong> {app.employerNotes}
                        </p>
                      )}
                    </div>

                    <Link
                      href={`/jobs/${app.job.id}`}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shrink-0 text-center"
                    >
                      View Role
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Sidebar: Notifications & Recommended Roles */}
        <div className="space-y-6">
          {/* Notifications Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-brand-500" />
                <h3 className="text-sm font-bold text-navy-950">Candidate Alerts</h3>
              </div>
            </div>

            {notifications.length === 0 ? (
              <p className="text-xs text-slate-400">No new alerts.</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0 text-xs">
                    <h4 className="font-semibold text-slate-800">{notif.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{notif.message}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{timeAgo(notif.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Jobs */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-navy-950">Matching Positions</h3>
            </div>

            <div className="space-y-3">
              {recommendedJobs.map((rj) => (
                <div key={rj.id} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0 text-xs">
                  <h4 className="font-bold text-navy-950 hover:text-brand-600 transition">
                    <Link href={`/jobs/${rj.id}`}>{rj.title}</Link>
                  </h4>
                  <p className="text-[11px] text-slate-500">{rj.employer.companyName}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold text-slate-700">
                    <span>
                      {formatCurrency(rj.salaryMin)} - {formatCurrency(rj.salaryMax)}
                    </span>
                    <span>•</span>
                    <span>{rj.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
