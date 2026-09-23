'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, UserCheck, Bookmark, Bell } from 'lucide-react';

export default function CandidateNav() {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', href: '/portal/candidate', icon: LayoutDashboard },
    { name: 'My Applications', href: '/portal/candidate/applications', icon: FileText },
    { name: 'Profile & Resume', href: '/portal/candidate/profile', icon: UserCheck },
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
