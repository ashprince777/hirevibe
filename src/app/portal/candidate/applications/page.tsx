import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import CandidateNav from '@/components/portals/CandidateNav';
import {
  FileText,
  Clock,
  Building,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { formatDate, timeAgo } from '@/lib/utils';

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

  const getStatusBadge = (status: string) => {
    const s = status.toUpperCase();
    if (s === 'SHORTLISTED' || s === 'INTERVIEW' || s === 'OFFERED') {
      return {
        label: 'Shortlisted',
        style: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        desc: 'Your profile has been shortlisted for this position.',
      };
    }
    if (s === 'REJECTED') {
      return {
        label: 'Not Selected',
        style: 'bg-rose-50 text-rose-700 border-rose-200',
        desc: 'This position has progressed with other candidates.',
      };
    }
    return {
      label: 'Applied',
      style: 'bg-slate-100 text-slate-700 border-slate-200',
      desc: 'Application received and in initial review.',
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Candidate Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">My Applications</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review the status of your submitted job applications.
        </p>
      </div>

      <CandidateNav />

      {applications.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-navy-950">You haven't applied to any roles yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse our open positions to submit your resume for roles that match your experience.
          </p>
          <Link
            href="/jobs"
            className="inline-block px-5 py-2.5 bg-navy-950 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold transition"
          >
            Explore Active Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const badge = getStatusBadge(app.status);

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-600">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-bold text-base text-navy-950 hover:text-brand-600 transition">
                        <Link href={`/jobs/${app.job.id}`}>{app.job.title}</Link>
                      </h2>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {app.job.employer.companyName} • Applied {timeAgo(app.appliedAt)} ({formatDate(app.appliedAt)})
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${badge.style}`}
                    >
                      {badge.label}
                    </span>
                    <span className="text-[11px] text-slate-400">{badge.desc}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {app.job.location}
                    </span>
                    <span>{app.job.jobType}</span>
                  </div>

                  <Link
                    href={`/jobs/${app.job.id}`}
                    className="text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"
                  >
                    <span>View Role</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
