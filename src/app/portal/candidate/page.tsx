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
  ArrowRight,
  Building,
  MapPin,
  Briefcase,
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

  // Recommended active jobs
  const openJobs = await prisma.job.findMany({
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

  const shortlistedCount = applications.filter((a) =>
    ['SHORTLISTED', 'INTERVIEW', 'OFFERED'].includes(a.status.toUpperCase())
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Candidate Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {user.candidateProfile?.headline || 'Review your applications and explore opportunities'}
          </p>
        </div>

        <Link
          href="/jobs"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition self-start sm:self-auto"
        >
          <Briefcase className="w-4 h-4" />
          <span>Browse All Jobs</span>
        </Link>
      </div>

      <CandidateNav />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Submitted Applications</span>
            <FileText className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-2xl font-bold text-navy-950 mt-2">{applications.length}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Tracked candidacies</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Shortlisted</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2">{shortlistedCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Shortlisted by hiring team</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Uploaded Resume</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {user.candidateProfile?.resumeUrl ? 'Attached' : 'Pending'}
            </span>
          </div>
          <div className="text-sm font-semibold text-navy-950 mt-2 truncate">
            {user.candidateProfile?.resumeUrl ? 'Active CV on file' : 'No CV uploaded'}
          </div>
          <Link
            href="/portal/candidate/profile"
            className="text-[11px] text-brand-600 hover:underline mt-0.5 block"
          >
            Update in Profile ➔
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Applications */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-navy-950">Recent Applications</h3>
            <Link
              href="/portal/candidate/applications"
              className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-3">
              <p className="text-xs text-slate-500">You haven't submitted any job applications yet.</p>
              <Link
                href="/jobs"
                className="inline-block px-4 py-2 bg-navy-950 text-white rounded-xl text-xs font-semibold hover:bg-brand-600 transition"
              >
                Find Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 4).map((app) => {
                const s = app.status.toUpperCase();
                const isShortlisted = ['SHORTLISTED', 'INTERVIEW', 'OFFERED'].includes(s);
                const isRejected = s === 'REJECTED';

                return (
                  <div
                    key={app.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-navy-950 hover:text-brand-600 transition">
                        <Link href={`/jobs/${app.job.id}`}>{app.job.title}</Link>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {app.job.employer.companyName} • Applied {timeAgo(app.appliedAt)}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${
                        isShortlisted
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : isRejected
                          ? 'bg-rose-50 text-rose-700 border-rose-300'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {isShortlisted ? 'Shortlisted' : isRejected ? 'Not Selected' : 'Applied'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Col: Open Roles */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-navy-950">Open Roles</h3>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            {openJobs.length === 0 ? (
              <p className="text-xs text-slate-500">No new positions at this moment.</p>
            ) : (
              openJobs.map((j) => (
                <div key={j.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0 space-y-1">
                  <h4 className="font-bold text-xs text-navy-950 hover:text-brand-600">
                    <Link href={`/jobs/${j.id}`}>{j.title}</Link>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {j.employer.companyName} • {j.location}
                  </p>
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-700">
                      ₹{formatCurrency(j.salaryMin)} – ₹{formatCurrency(j.salaryMax)}
                    </span>
                    <Link
                      href={`/jobs/${j.id}`}
                      className="text-[11px] font-semibold text-brand-600 hover:underline"
                    >
                      View Role ➔
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
