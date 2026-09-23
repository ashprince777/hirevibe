import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import AdminNav from '@/components/portals/AdminNav';
import {
  Users,
  Briefcase,
  FileText,
  MessageSquare,
  ShieldAlert,
  Building2,
  TrendingUp,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { formatDate, timeAgo } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    redirect('/login');
  }

  const [
    totalUsers,
    totalCandidates,
    totalEmployers,
    totalJobs,
    activeJobs,
    totalApplications,
    pendingConsultingRequests,
    totalConsultingRequests,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: 'CANDIDATE' } }),
    prisma.user.count({ where: { role: 'EMPLOYER' } }),
    prisma.job.count(),
    prisma.job.count({ where: { status: 'ACTIVE' } }),
    prisma.application.count(),
    prisma.serviceRequest.count({ where: { status: 'PENDING' } }),
    prisma.serviceRequest.count(),
  ]);

  const recentApplications = await prisma.application.findMany({
    take: 5,
    orderBy: { appliedAt: 'desc' },
    include: {
      candidate: true,
      job: {
        include: {
          employer: true,
        },
      },
    },
  });

  const recentServices = await prisma.serviceRequest.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
    include: {
      employer: true,
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            Executive Admin Desk
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">
            HireVibe Enterprise Administration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Platform governance, candidate volume, active client mandates, and consulting pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/services"
            className="px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition"
          >
            Review Inbound Tickets ({pendingConsultingRequests})
          </Link>
          <Link
            href="/admin/blog"
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition"
          >
            Publish Article
          </Link>
        </div>
      </div>

      <AdminNav />

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Total Accounts</span>
            <Users className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-3xl font-black text-navy-950 mt-2">{totalUsers}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {totalCandidates} Candidates • {totalEmployers} Employers
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Active Mandates</span>
            <Briefcase className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 mt-2">{activeJobs}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">{totalJobs} Total positions posted</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Total Candidacies</span>
            <FileText className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 mt-2">{totalApplications}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Candidate applications lodged</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Pending Advisory</span>
            <MessageSquare className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-rose-600 mt-2">{pendingConsultingRequests}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">{totalConsultingRequests} Total requests</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications Across All Employers */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy-950">Recent System Candidacies</h2>
            <Link href="/admin/jobs" className="text-xs font-semibold text-brand-600 hover:underline">
              Inspect Jobs
            </Link>
          </div>

          <div className="space-y-3">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{app.candidate.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                      {app.status}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    Applied for <strong>{app.job.title}</strong> at {app.job.employer.companyName}
                  </p>
                </div>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">{timeAgo(app.appliedAt)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Incoming HR Consulting Service Tickets */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy-950">Inbound HR Consulting Inquiries</h2>
            <Link href="/admin/services" className="text-xs font-semibold text-brand-600 hover:underline">
              Desk Management
            </Link>
          </div>

          <div className="space-y-3">
            {recentServices.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
                    {req.serviceType}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      req.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900">{req.title}</h3>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Client: {req.employer.name}</span>
                  <span>Lead: {req.assignedConsultant || 'Unassigned'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
