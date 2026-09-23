import React from 'react';
import Link from 'next/link';
import {
  Users,
  Award,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      id: 'recruitment',
      title: 'Tech & Lateral Recruitment',
      tagline: 'Engineering & Product Hiring with Notice Period Solutions',
      icon: Users,
      desc: 'Hiring software engineers and tech leads in Indian hubs (Bengaluru, Hyderabad, Pune, NCR) is often hindered by 60–90 day notice periods and last-minute counter-offers. We run active candidate pipelines, coordinate notice buyouts, and maintain high engagement from offer to day-one joining.',
      highlights: [
        'Curated pipelines of verified serving-notice and immediate joiners',
        'Direct buyout negotiation and early release coordination',
        'Transparent weekly pipeline reporting and recruiter screening',
        'Candidate replacement warranty on lateral placements',
      ],
    },
    {
      id: 'executive-search',
      title: 'Retained Executive Search',
      tagline: 'Confidential C-Suite & Leadership Appointments',
      icon: Award,
      desc: 'High-stakes leadership roles (CTO, VP Engineering, CHRO, CFO, COO) require utmost discretion and founder-level commitment. Our partners personally lead candidate outreach, compensation benchmarking, and cultural alignment checks.',
      highlights: [
        'Confidential market mapping across top tech companies & GCCs',
        'Total rewards & equity/ESOP structuring advisory',
        'Thorough 360-degree reference and background vetting',
        'Direct partner oversight throughout the recruitment lifecycle',
      ],
    },
    {
      id: 'compliance',
      title: 'Labour Law & POSH Compliance',
      tagline: 'Airtight Statutory Governance Across Indian States',
      icon: ShieldCheck,
      desc: 'Employment laws in India demand strict adherence across state and central jurisdictions. We help startups and mid-market employers establish compliant operations, audit existing records, and draft legally defensible policies.',
      highlights: [
        'Statutory audits across EPF, ESIC, Professional Tax, and CLRA',
        'Preparation for the 4 New Indian Labour Codes & basic wage rules',
        'POSH Act 2013 Internal Committee (ICC) setup and advisory',
        'Standardized employment contracts and compliant employee handbooks',
      ],
    },
    {
      id: 'payroll-ops',
      title: 'Payroll & HR Operations Advisory',
      tagline: 'CTC Structuring, Salary Banding & People Process Design',
      icon: TrendingUp,
      desc: 'Whether you are transitioning from early spreadsheets to structured HR systems or setting up an Indian entity, we design efficient compensation bands and repeatable people operations.',
      highlights: [
        'Tax-effective Indian CTC structuring (flexi-benefits, allowances, gratuity)',
        'Salary banding and compensation benchmarking for tech roles',
        'Onboarding checklists, leave policies, and exit protocols',
        'Vendor advisory for HRMS and payroll software evaluation',
      ],
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-slate-800 px-3 py-1 rounded-full">
            Our Core Practice Areas
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Practical HR Advisory & Talent Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We focus on four key areas where growing organizations in India need clear, reliable, and hands-on support.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {services.map((svc, idx) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.id}
              id={svc.id}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm hover:shadow-md transition grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  <Icon className="w-4 h-4" />
                  <span>{svc.tagline}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-950">{svc.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{svc.desc}</p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Focus Areas</h4>
                  <ul className="space-y-2">
                    {svc.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col justify-between h-full space-y-6">
                <div>
                  <h3 className="font-bold text-base text-navy-950 mb-2">Need support with {svc.title}?</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Connect with our lead consultants to share your requirements and get a realistic timeline and transparent commercial quote.
                  </p>
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(svc.title)}`}
                  className="w-full py-3 rounded-xl bg-navy-950 hover:bg-brand-600 text-white font-semibold text-xs text-center flex items-center justify-center gap-2 transition"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      {/* Unified Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy-950 p-8 sm:p-12 text-white text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Have a Specific Hiring or Compliance Requirement?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Reach out directly. We don’t send generic sales decks — we schedule a brief diagnostic call to understand your needs.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-lg transition"
            >
              <span>Contact Our Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
