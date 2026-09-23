import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import {
  Briefcase,
  Users,
  ShieldCheck,
  Award,
  ArrowRight,
  CheckCircle2,
  Building,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const revalidate = 0;

export default async function HomePage() {
  let featuredJobs: any[] = [];

  try {
    featuredJobs = await prisma.job.findMany({
      where: { status: 'ACTIVE', isFeatured: true },
      take: 4,
      include: {
        employer: true,
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    console.error('Notice: featuredJobs fallback active');
  }

  if (!featuredJobs || featuredJobs.length === 0) {
    featuredJobs = [
      {
        id: 'job-1',
        title: 'Principal Distributed Systems Architect',
        department: 'Engineering',
        location: 'Bengaluru, Karnataka',
        jobType: 'Full-time',
        salaryMin: 6500000,
        salaryMax: 9000000,
        description: 'Architecting next-generation transaction processing engines handling 50k TPS for an Indian fintech unicorn.',
        employer: { companyName: 'RazorScale Technologies' },
        _count: { applications: 18 },
      },
      {
        id: 'job-2',
        title: 'Chief People Officer (CHRO)',
        department: 'Human Resources & Executive',
        location: 'Mumbai, Maharashtra',
        jobType: 'Full-time',
        salaryMin: 8000000,
        salaryMax: 12000000,
        description: 'Leading organizational restructuring, talent acquisition, and New Labour Codes compliance across 3,500 employees.',
        employer: { companyName: 'BharatOmni Consumer Brands' },
        _count: { applications: 12 },
      },
      {
        id: 'job-3',
        title: 'VP of Engineering - Cloud & DevOps',
        department: 'Engineering',
        location: 'Hyderabad, Telangana',
        jobType: 'Full-time',
        salaryMin: 7000000,
        salaryMax: 9500000,
        description: 'Heading cloud infrastructure, SRE, and platform engineering for high-security banking infrastructure.',
        employer: { companyName: 'IndoCloud Systems' },
        _count: { applications: 15 },
      },
    ];
  }

  const whatWeDo = [
    {
      title: 'Tech & Lateral Staffing',
      desc: 'Sourcing, screening, and closing mid-to-senior software engineers, tech leads, and product specialists with dedicated buyout assistance.',
      icon: Users,
    },
    {
      title: 'Retained Executive Search',
      desc: 'Confidential C-suite recruitment (CTO, VP Eng, CHRO, CFO) conducted directly by founders with rigorous vetting.',
      icon: Award,
    },
    {
      title: 'Labour Law & Statutory Advisory',
      desc: 'Actionable guidance on EPF, ESIC, POSH Act compliance, internal policy design, and preparation for India’s 4 New Labour Codes.',
      icon: ShieldCheck,
    },
    {
      title: 'Payroll & HR Operations',
      desc: 'Structuring tax-efficient Indian CTCs, ESOP plans, and establishing repeatable onboarding processes for growing startups.',
      icon: TrendingUp,
    },
  ];

  const whoItsFor = [
    {
      title: 'Early-Stage & Seed Startups',
      desc: 'Founders building their first core 10–30 hires who need high-signal candidates without paying bloated enterprise retainer fees.',
      tag: '0 to 1 Scaling',
    },
    {
      title: 'High-Growth Tech Ventures',
      desc: 'Series A–C companies tackling Indian 90-day notice periods, candidate dropouts, and multi-state compliance expansion.',
      tag: 'Scaleups',
    },
    {
      title: 'GCCs & Foreign Subsidiaries',
      desc: 'MNCs establishing technology capability centers in Bengaluru or Hyderabad needing local statutory and compensation guidance.',
      tag: 'India Setup',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-emerald-400 text-xs font-semibold">
              <span>Boutique HR Consultancy & Recruitment Advisory</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Hire Exceptional Talent.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-brand-400">
                Stay Compliant in India.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              We partner directly with founders and HR leaders to hire senior engineers and executives, solve notice period dropouts, and manage Indian statutory compliance.
            </p>

            {/* Clear CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition"
              >
                <span>Hire With Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/jobs"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition"
              >
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Browse Open Positions</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Our Services
          </span>
          <h2 className="text-3xl font-bold text-navy-950 mt-3 tracking-tight">
            What We Do
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Focused recruitment and HR consulting services tailored for the Indian business environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeDo.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-500/40 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-navy-950 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    href="/services"
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200">
              Who We Work With
            </span>
            <h2 className="text-3xl font-bold text-navy-950 mt-3 tracking-tight">
              Built for Modern Employers in India
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoItsFor.map((w, idx) => (
              <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {w.tag}
                </span>
                <h3 className="font-bold text-lg text-navy-950">{w.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Current Openings
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2 tracking-tight">
              Featured Opportunities
            </h2>
          </div>
          <Link
            href="/jobs"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all positions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.slice(0, 3).map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-400 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {job.jobType}
                  </span>
                  <span className="text-xs font-bold text-navy-950">
                    ₹{formatCurrency(job.salaryMin)} – ₹{formatCurrency(job.salaryMax)}
                  </span>
                </div>

                <h3 className="font-bold text-base text-navy-950 mt-3 hover:text-brand-600 transition">
                  <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                </h3>
                <p className="text-xs text-slate-500 mt-1">{job.employer?.companyName || 'Hiring Client'}</p>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2">{job.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {job.location}
                </span>
                <Link
                  href={`/jobs/${job.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-navy-950 hover:bg-brand-600 text-white font-semibold text-xs transition"
                >
                  View Role
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clean Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy-950 p-8 sm:p-12 text-white text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Looking to Hire or Need HR Advisory?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Speak directly with our founding consultants. We’ll discuss your team requirements or compliance questions and share a transparent proposal.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-lg transition"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
