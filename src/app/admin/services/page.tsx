import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import AdminNav from '@/components/portals/AdminNav';
import AdminServicesClient from '@/components/portals/AdminServicesClient';

export const revalidate = 0;

export default async function AdminServicesPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    redirect('/login');
  }

  const requests = await prisma.serviceRequest.findMany({
    include: {
      employer: {
        include: {
          employerProfile: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const serializedRequests = requests.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
          Inquiry Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">
          Consultation & Quote Inquiries
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review inbound quote requests and advisory inquiries submitted by employers and prospective clients.
        </p>
      </div>

      <AdminNav />
      <AdminServicesClient initialRequests={serializedRequests} />
    </div>
  );
}
