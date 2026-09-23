import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import CandidateNav from '@/components/portals/CandidateNav';
import { Bookmark, IndianRupee, MapPin, Briefcase, ExternalLink, ArrowRight } from 'lucide-react';
import { formatCurrency, timeAgo } from '@/lib/utils';

export const revalidate = 0;

export default async function CandidateSavedJobsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CANDIDATE') {
    redirect('/login');
  }

  const savedJobs = await prisma.savedJob.findMany({
    where: { candidateId: user.id },
    include: {
      job: {
        include: {
          employer: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Bookmarked Opportunities
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">Saved Positions</h1>
        <p className="text-xs text-slate-500 mt-1">
          Positions you have bookmarked for future review or application.
        </p>
      </div>

      <CandidateNav />

      {savedJobs.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-navy-950">No saved positions</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse our career directory and click the bookmark icon on any job card to save it here.
          </p>
          <Link
            href="/jobs"
            className="inline-block px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-brand-700 transition"
          >
            Explore Active Roles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedJobs.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        item.job.employer.logoUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(item.job.employer.companyName)}`
                      }
                      alt={item.job.employer.companyName}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200 bg-slate-50"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-navy-950 hover:text-brand-600 transition">
                        <Link href={`/jobs/${item.job.id}`}>{item.job.title}</Link>
                      </h3>
                      <p className="text-xs text-slate-500">{item.job.employer.companyName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {item.job.jobType}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1 font-semibold text-slate-800">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {formatCurrency(item.job.salaryMin)} - {formatCurrency(item.job.salaryMax)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.job.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  Saved {timeAgo(item.createdAt)}
                </span>
                <Link
                  href={`/jobs/${item.job.id}`}
                  className="px-4 py-1.5 rounded-xl bg-navy-950 hover:bg-brand-600 text-white text-xs font-semibold transition"
                >
                  View & Apply
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
