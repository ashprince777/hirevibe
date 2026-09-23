import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Target,
  Scale,
} from 'lucide-react';

export default function AboutPage() {
  const founders = [
    {
      name: 'Pooja Sharma',
      role: 'Co-Founder & HR Advisory Lead',
      background: 'Over a decade of experience across talent acquisition, employee relations, and Indian statutory compliance.',
      bio: 'Pooja steers HireVibe’s advisory practice, helping growing ventures establish clear employment policies, POSH compliance frameworks, and prepare for the 4 New Labour Codes.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
      focus: ['Statutory Compliance', 'POSH Advisory', 'People Operations'],
    },
    {
      name: 'Vikram Singhania',
      role: 'Co-Founder & Talent Acquisition Lead',
      background: 'Experienced executive recruiter specializing in engineering, product leadership, and C-suite staffing in India.',
      bio: 'Vikram leads candidate search and engagement. He works directly with founders to define role scorecards, source senior technical talent, and negotiate notice period buyouts.',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
      focus: ['Tech Recruitment', 'Leadership Search', 'Notice Buyouts'],
    },
  ];

  const principles = [
    {
      title: 'Founder-Led Attention',
      desc: 'No handing off your hiring mandate to junior coordinators. Every search and advisory scope is managed directly by our co-founders.',
      icon: Users,
    },
    {
      title: 'Practical Compliance',
      desc: 'Clear, actionable guidance on Indian labour laws, POSH governance, and CTC structuring without unnecessary legal jargon.',
      icon: Scale,
    },
    {
      title: 'Active Notice Period Management',
      desc: 'We don’t just forward resumes. We actively track notice period milestones, negotiate buyouts, and maintain candidate commitment.',
      icon: Target,
    },
    {
      title: 'Commercial Transparency',
      desc: 'Simple, fair engagement models with zero hidden fees. We succeed only when our clients make lasting, successful hires.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-slate-800 px-3 py-1 rounded-full">
            Our Story & Mission
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Boutique HR Advisory for Modern Indian Ventures
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Founded in Bengaluru by two experienced talent and HR practitioners dedicated to helping early-stage companies and growing teams hire right and stay compliant.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Why We Started HireVibe
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 tracking-tight">
              A Direct, Honest Alternative to Large Recruitment Agencies
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We started HireVibe with a clear observation: growing startups and mid-sized companies in India are often underserved. Large search firms charge exorbitant retainers while delegating mandates to junior associates. On the other end, volume staffing agencies send hundreds of uncalibrated resumes hoping one sticks.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We built HireVibe to be different: a focused boutique firm where founding partners personally run every search mandate, navigate notice period bottlenecks, and provide clear statutory compliance guidance.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
              alt="HireVibe Founders Discussion"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-white px-3 py-1 rounded-full border border-slate-200">
              Our Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2 tracking-tight">
              How We Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-navy-950">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The 2 Founders */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2 tracking-tight">
            Meet the Founding Team
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Experienced partners managing your engagements directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((f, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <img src={f.avatarUrl} alt={f.name} className="w-full h-64 object-cover" />
                <div className="p-6 space-y-2">
                  <h3 className="font-bold text-lg text-navy-950">{f.name}</h3>
                  <div className="text-xs font-semibold text-brand-600">{f.role}</div>
                  <div className="text-[11px] text-slate-400">{f.background}</div>
                  <p className="text-xs text-slate-600 pt-2 leading-relaxed">{f.bio}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {f.focus.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-semibold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy-950 text-white p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Want to Discuss Your Hiring Plans?
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Speak directly with Pooja or Vikram to evaluate your upcoming engineering mandates or compliance requirements.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-lg transition"
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
