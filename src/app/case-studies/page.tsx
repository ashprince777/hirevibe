import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Building,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';

export const revalidate = 0;

export default async function CaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-20 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-slate-800 px-3 py-1 rounded-full">
            Proven Outcomes & ROI
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-4">
            Client Success Stories & Advisory Case Studies
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Examine how high-growth enterprises and institutional organizations partner with HireVibe to achieve rapid recruitment velocity and foolproof HR compliance.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {caseStudies.map((cs, idx) => {
          let metricsObj: Record<string, any> = {};
          try {
            if (cs.metrics) metricsObj = JSON.parse(cs.metrics);
          } catch (e) {}

          return (
            <div
              key={cs.id}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                      {cs.industry}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-slate-600">{cs.serviceProvided}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-navy-950">{cs.clientName}</h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-navy-950 text-xs uppercase tracking-wider mb-1">
                      The Operational Challenge
                    </h4>
                    <p>{cs.challenge}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-navy-950 text-xs uppercase tracking-wider mb-1">
                      The HireVibe Strategic Solution
                    </h4>
                    <p>{cs.solution}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-emerald-800 text-xs uppercase tracking-wider mb-1">
                      Measurable Business Results
                    </h4>
                    <p className="text-emerald-950 font-medium">{cs.results}</p>
                  </div>
                </div>
              </div>

              {/* Metrics & Highlights */}
              <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-400">Key Performance Metrics</h3>

                <div className="space-y-4">
                  {Object.entries(metricsObj).map(([key, val], mIdx) => (
                    <div key={mIdx} className="pb-3 border-b border-slate-800 last:border-0 last:pb-0">
                      <div className="text-2xl sm:text-3xl font-black text-white">{String(val)}</div>
                      <div className="text-xs text-slate-400 capitalize mt-0.5">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="block w-full text-center py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    Schedule Similar Consultation
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 p-8 sm:p-12 text-center text-white border border-slate-800 space-y-4">
          <h3 className="text-2xl font-bold">Have an Ambitious Scaling or Compliance Objective?</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Discuss your requirements with our Senior HR Partners under complete non-disclosure agreement.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition"
            >
              Start Confidential Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
