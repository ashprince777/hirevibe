import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import EmployerNav from '@/components/portals/EmployerNav';
import {
  Briefcase,
  Users,
  MessageSquare,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  FileText,
  Building,
} from 'lucide-react';
import { formatCurrency, formatDate, timeAgo } from '@/lib/utils';

export const revalidate = 0;

export default async function EmployerDashboardPage() {
  const user = await getCurrentUser();
  if (!user || (user.role !== 'EMPLOYER' && user.role !== 'ADMIN')) {
    redirect('/login');
  }

  const employerProfile = user.employerProfile;
  if (!employerProfile) {
    redirect('/portal/employer/profile');
  }

  // Fetch employer's jobs
  const jobs = await prisma.job.findMany({
    where: { employerId: employerProfile.id },
    include: {
      _count: {
        select: { applications: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch recent applications for their jobs
  const recentApplications = await prisma.application.findMany({
    where: {
      job: { employerId: employerProfile.id },
    },
    take: 6,
    include: {
      candidate: {
        include: {
          candidateProfile: true,
        },
      },
      job: true,
    },
    orderBy: { appliedAt: 'desc' },
  });

  const activeJobsCount = jobs.filter((j) => j.status === 'ACTIVE').length;
  const totalApplicantsCount = jobs.reduce((sum, j) => sum + j._count.applications, 0);
  const inReviewCount = recentApplications.filter((a) => a.status === 'SHORTLISTED' || a.status === 'INTERVIEW').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Client & Employer Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">
            {employerProfile.companyName} Console
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as <strong className="text-slate-800">{user.name}</strong> • Plan Tier: <strong className="text-brand-600 uppercase">{employerProfile.subscriptionTier || 'GROWTH'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/portal/employer/jobs"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Vacancy</span>
          </Link>
        </div>
      </div>

      <EmployerNav />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Active Postings</span>
            <Briefcase className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-3xl font-black text-navy-950 mt-2">{activeJobsCount}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Live on HireVibe network</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Total Applicants</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 mt-2">{totalApplicantsCount}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Across all job postings</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Shortlisted</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 mt-2">{inReviewCount}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Active candidate pipelines</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Applicants */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy-950">Recent Applicant Submissions</h2>
            <Link
              href="/portal/employer/applicants"
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              Review Pipeline ({totalApplicantsCount})
            </Link>
          </div>

          {recentApplications.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
              <Users className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">No applicants submitted yet for your positions.</p>
              <Link
                href="/portal/employer/jobs"
                className="inline-block px-4 py-2 bg-navy-950 text-white rounded-xl text-xs font-semibold"
              >
                Post a Role
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={
                        app.candidate.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(app.candidate.name)}`
                      }
                      alt={app.candidate.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 bg-slate-50"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-navy-950">{app.candidate.name}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Applied for <strong className="text-slate-700">{app.job.title}</strong> • {timeAgo(app.appliedAt)}
                      </p>
                      {app.candidate.candidateProfile?.headline && (
                        <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-md">
                          {app.candidate.candidateProfile.headline}
                        </p>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/portal/employer/applicants?jobId=${app.job.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-navy-950 hover:bg-brand-600 text-white text-xs font-semibold shrink-0 text-center transition"
                  >
                    Review Dossier
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Quick Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-tr from-navy-950 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold">Hiring for a New Role?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Create a new job posting with CTC bands and requirements. As candidates apply with their resume, review them directly in your Applicants List.
            </p>
            <div className="pt-1">
              <Link
                href="/portal/employer/jobs"
                className="inline-block px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md transition"
              >
                Post New Opening
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
