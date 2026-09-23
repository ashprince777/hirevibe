'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, Users, MessageSquare, Building2 } from 'lucide-react';

export default function EmployerNav() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/portal/employer', icon: LayoutDashboard },
    { name: 'Job Postings', href: '/portal/employer/jobs', icon: Briefcase },
    { name: 'Applicant Review Pipeline', href: '/portal/employer/applicants', icon: Users },
    { name: 'HR Consulting Requests', href: '/portal/employer/consulting', icon: MessageSquare },
    { name: 'Company Profile', href: '/portal/employer/profile', icon: Building2 },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 mb-8">
      {links.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              active
                ? 'bg-navy-950 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icon className={`w-4 h-4 ${active ? 'text-brand-400' : 'text-slate-400'}`} />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
