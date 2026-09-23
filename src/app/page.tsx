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
  TrendingUp,
  Building,
  GraduationCap,
  Sparkles,
  MapPin,
  Clock,
  ChevronRight,
  Star,
  Scale,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const revalidate = 0;

export default async function HomePage() {
  let featuredJobs: any[] = [];
  let testimonials: any[] = [];

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

  try {
    testimonials = await prisma.testimonial.findMany({
      where: { isFeatured: true },
      take: 3,
    });
  } catch (err) {
    console.error('Notice: testimonials fallback active');
  }

  if (!testimonials || testimonials.length === 0) {
    testimonials = [
      {
        id: 'fb-1',
        clientName: 'Vikramaditya Singhania',
        clientRole: 'Chief Human Resources Officer',
        companyName: 'FinFlow Technologies (Bengaluru)',
        quote: 'HireVibe completely transformed our engineering talent acquisition pipeline across Bengaluru and Hyderabad. They solved our 90-day notice period challenges with dedicated candidate engagement and buyout structuring.',
        metric: '94% Joining Ratio',
      },
      {
        id: 'fb-2',
        clientName: 'Sunita Narayanan',
        clientRole: 'VP of People Operations',
        companyName: 'LogiBharat Logistics Unicorn (Gurugram)',
        quote: 'Their audit and advisory on the New Indian Labour Codes and statutory compliance across 14 states was impeccable. We navigated complex EPF and CLRA transitions seamlessly.',
        metric: '100% Audit Readiness',
      },
      {
        id: 'fb-3',
        clientName: 'Rajesh Subramaniam',
        clientRole: 'Founder & CEO',
        companyName: 'AeroDrone Dynamics (Hyderabad)',
        quote: 'Closing retained CXO searches in India requires immense discretion and credibility. HireVibe placed both our CPTO and Chief Legal Officer within 45 days.',
        metric: '45-Day C-Suite Close',
      },
    ];
  }

  const stats = [
    { label: 'Placement Retention Rate', value: '97%', desc: 'Sustained past 12-month tenure' },
    { label: 'Time-to-Shortlist', value: '14 Days', desc: 'Overcoming 90-day notice periods' },
    { label: 'Unicorns & Enterprise Clients', value: '350+', desc: 'Across Bengaluru, Mumbai & NCR' },
    { label: 'Cumulative Placed CTC', value: '₹450 Cr+', desc: 'Executive & engineering payroll' },
  ];

  const practiceAreas = [
    {
      title: 'Tech & Lateral Engineering Staffing',
      desc: 'Precision recruitment across Bengaluru, Hyderabad, and Pune. Active buyout negotiations and notice-period retention management.',
      icon: Users,
      badge: 'Bengaluru & NCR',
      href: '/services#tech-staffing',
    },
    {
      title: 'Retained CXO & Leadership Search',
      desc: 'Confidential C-suite headhunting (CTO, CPTO, CHRO, CFO, COO) with 1-Year executive retention assurance.',
      icon: Award,
      badge: 'C-Suite Retainer',
      href: '/services#cxo-search',
    },
    {
      title: 'New Indian Labour Codes & Statutory Audits',
      desc: 'Code on Wages 50% basic rule transition, EPF & MP Act, ESIC, Gratuity Act, and multi-state Shops & Est compliance.',
      icon: Scale,
      badge: 'Statutory Governance',
      href: '/services#labour-codes',
    },
    {
      title: 'POSH Act 2013 & ICC Advisory',
      desc: 'Internal Complaints Committee constitution, accredited external NGO legal partners, sensitization workshops, and annual district filings.',
      icon: ShieldCheck,
      badge: 'Mandatory Compliance',
      href: '/services#posh',
    },
    {
      title: 'CTC Structuring & Indian Payroll',
      desc: 'Salary banding optimization, Section 80C flexi-benefits, ESOP grant design, and monthly multi-state payroll advisory.',
      icon: TrendingUp,
      badge: 'Total Rewards & Tax',
      href: '/services#ctc-payroll',
    },
    {
      title: 'GCC & India Entity Turnkey Setup',
      desc: 'End-to-end people operations and leadership staffing for US & European MNCs establishing Global Capability Centers in India.',
      icon: Building,
      badge: 'GCC Scale-Up',
      href: '/services#gcc-setup',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-amber-300 text-xs font-semibold backdrop-blur-sm shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>India’s Leading Strategic HR & Recruitment Advisory</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Scale Premier Indian Teams.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-brand-300 to-emerald-300">
                Master Labour Law Compliance.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              From solving the 90-day tech notice period bottleneck in Bengaluru to turnkey POSH, EPF, and Labour Code compliance across Mumbai and Delhi NCR, HireVibe delivers measurable talent outcomes.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>Hire Elite Talent in India</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/jobs"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 border border-slate-700 font-semibold text-sm backdrop-blur-md flex items-center justify-center gap-2 transition"
              >
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>Explore Open Positions (₹ LPA)</span>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Risk Contingency Mandates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Certified POSH & Labour Law Experts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1-Year CXO Retention Assurance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Bar */}
      <section className="-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((stat, idx) => (
            <div key={idx} className={`pt-4 lg:pt-0 ${idx > 0 ? 'lg:pl-6' : ''}`}>
              <div className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">{stat.value}</div>
              <div className="text-sm font-semibold text-slate-800 mt-1">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Practice Areas / Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Specialized Indian HR Solutions
          </span>
          <h2 className="text-3xl font-bold text-navy-950 mt-3 tracking-tight">
            Comprehensive Advisory for India’s High-Growth Ecosystem
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Tailored specifically for Indian tech unicorns, Global Capability Centers (GCCs), and traditional industrial enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:bg-brand-50 group-hover:text-brand-600 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {area.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-950 group-hover:text-brand-600 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{area.desc}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={area.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 group-hover:text-brand-700 transition"
                  >
                    <span>Explore Advisory Scope</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                Verified Indian Mandates
              </span>
              <h2 className="text-3xl font-bold text-navy-950 mt-3 tracking-tight">Featured Positions in India</h2>
              <p className="text-sm text-slate-600 mt-1">
                Hand-picked executive, product, and engineering opportunities across Bengaluru, Mumbai, Gurugram & Hyderabad.
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition"
            >
              <span>View All Indian Vacancies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all hover:border-brand-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          job.employer.logoUrl ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(job.employer.companyName)}`
                        }
                        alt={job.employer.companyName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50"
                      />
                      <div>
                        <h3 className="font-bold text-base text-navy-950 hover:text-brand-600 transition">
                          <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">{job.employer.companyName}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {job.jobType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3.5 line-clamp-2 leading-relaxed">{job.description}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1 font-bold text-slate-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <span className="text-emerald-700 font-black">₹</span>
                      <span className="text-emerald-800">
                        {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.department}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {job._count.applications} candidate{job._count.applications === 1 ? '' : 's'} applied
                  </span>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="px-4 py-1.5 rounded-lg bg-navy-950 hover:bg-brand-600 text-white text-xs font-semibold transition"
                  >
                    View & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Indian Methodology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Built for the Indian Talent Market
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
              Solving India’s Unique Notice Period & Compliance Bottlenecks
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike generic staffing agencies that forward unvetted LinkedIn profiles, HireVibe navigates the intricate realities of Indian tech hiring and multi-state labour departments.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">90-Day Notice Period Mitigation & Buyouts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We coordinate contractual buyouts, structured signing clawbacks, and continuous weekly pre-boarding to drop offer rejection rates below 5%.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Statutory Defence: EPF, ESIC, CLRA & Gratuity</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Our compliance desk ensures 100% legal alignment across all states, liaising directly with EPFO commissioners and state labour officers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Turnkey POSH Act 2013 Governance</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Internal Complaints Committee (ICC) constitution, certified external members, bilingual staff training, and mandatory January 31st district filings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  04
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">1-Year Executive Retention Assurance</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    30, 90, and 180-day milestone check-ins with both candidate and promoter to ensure lasting cultural integration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
                alt="Indian Corporate Advisory"
                className="w-full h-[460px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-200 hidden sm:block max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                  97%
                </div>
                <div>
                  <div className="font-bold text-xs text-navy-950">Indian Retention Rate</div>
                  <div className="text-[11px] text-slate-500">Tech industry average is 64%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-slate-800 px-3 py-1 rounded-full">
              Indian CXO Endorsements
            </span>
            <h2 className="text-3xl font-bold text-white mt-3 tracking-tight">
              Trusted by Promoters, CHROs & Founders
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Hear from leadership teams at Indian unicorns, GCCs, and national enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900/90 rounded-2xl p-7 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">"{t.message}"</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center gap-3">
                  <img
                    src={t.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.clientName)}`}
                    alt={t.clientName}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.clientName}</h4>
                    <p className="text-[11px] text-slate-400">
                      {t.clientRole}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-700 via-amber-600 to-navy-950 p-8 sm:p-14 text-white shadow-2xl">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Upgrade Your Hiring & Indian Statutory Compliance?
            </h2>
            <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
              Schedule a confidential 30-minute discovery call with Managing Partner Pooja Sharma. We will evaluate your hiring pipeline, 90-day notice period challenges, or POSH/Labour Code readiness.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-navy-950 font-bold text-xs shadow-lg transition"
              >
                Schedule Free Diagnostic Call
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-900/80 text-white font-semibold text-xs border border-white/20 transition"
              >
                View Retainers & Hiring Fees (₹)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
