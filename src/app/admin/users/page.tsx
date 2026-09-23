import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import AdminNav from '@/components/portals/AdminNav';
import { Users, Mail, Shield, Building, UserCheck, Search } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams?: { role?: string; query?: string };
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    redirect('/login');
  }

  const role = searchParams?.role;
  const query = searchParams?.query;

  const where: any = {};
  if (role && role !== 'ALL') {
    where.role = role;
  }
  if (query) {
    where.OR = [
      { name: { contains: query } },
      { email: { contains: query } },
    ];
  }

  const users = await prisma.user.findMany({
    where,
    include: {
      candidateProfile: true,
      employerProfile: true,
      _count: {
        select: {
          applications: true,
          serviceRequests: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
          Identity & Governance
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">Platform User Directory</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review candidate pools, verified corporate employer profiles, and staff accounts.
        </p>
      </div>

      <AdminNav />

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2">
          {['ALL', 'CANDIDATE', 'EMPLOYER', 'ADMIN'].map((r) => {
            const active = (!role && r === 'ALL') || role === r;
            return (
              <a
                key={r}
                href={r === 'ALL' ? '/admin/users' : `/admin/users?role=${r}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  active ? 'bg-navy-950 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {r === 'ALL' ? 'All Roles' : r}
              </a>
            );
          })}
        </div>

        <form action="/admin/users" method="GET" className="w-full sm:w-auto">
          <input
            type="text"
            name="query"
            defaultValue={query || ''}
            placeholder="Search by name or email..."
            className="w-full sm:w-64 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
          />
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Profile Details</th>
                <th className="py-3 px-4">Activity</th>
                <th className="py-3 px-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((u) => {
                const roleBadge =
                  u.role === 'ADMIN'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : u.role === 'EMPLOYER'
                    ? 'bg-brand-50 text-brand-700 border-brand-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200';

                return (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            u.avatarUrl ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}`
                          }
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{u.name}</div>
                          <div className="text-[11px] text-slate-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${roleBadge}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {u.role === 'EMPLOYER' && u.employerProfile ? (
                        <div>
                          <div className="font-bold text-slate-800">{u.employerProfile.companyName}</div>
                          <div className="text-[11px] text-slate-400">
                            {u.employerProfile.industry || 'Enterprise'} • {u.employerProfile.location || 'Remote'}
                          </div>
                        </div>
                      ) : u.role === 'CANDIDATE' && u.candidateProfile ? (
                        <div>
                          <div className="font-medium text-slate-800 truncate max-w-xs">
                            {u.candidateProfile.headline || 'Job Seeker'}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {u.candidateProfile.location || 'Location Not Specified'}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">Internal Staff</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {u.role === 'CANDIDATE' ? (
                        <span>{u._count.applications} applications</span>
                      ) : u.role === 'EMPLOYER' ? (
                        <span>{u._count.serviceRequests} advisory tickets</span>
                      ) : (
                        <span>All privileges</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">{formatDate(u.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
