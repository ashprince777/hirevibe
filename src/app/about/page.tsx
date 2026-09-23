import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle,
  Linkedin,
  Mail,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  Target,
  Scale,
} from 'lucide-react';

export default function AboutPage() {
  const leadershipTeam = [
    {
      name: 'Pooja Sharma',
      role: 'Managing Partner & Lead Practice Head',
      credentials: 'MBA (HRM), XLRI Jamshedpur | Ex-Tata Sons & Infosys HR Director',
      bio: 'Over 18 years advising Indian Unicorn founders and corporate boards on organizational restructuring, pan-India leadership hiring, and defensible labour governance across multi-state operations.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
      expertise: ['CXO Retained Search', '4 Labour Codes Readiness', 'Board Advisory'],
    },
    {
      name: 'Vikram Singhania',
      role: 'Partner & Head of Executive Search',
      credentials: 'PGDM, IIM Ahmedabad | Former Korn Ferry India Partner',
      bio: 'Specializes in C-level technology, engineering, and digital transformation placements across Bengaluru, Mumbai, and Delhi NCR. Has placed 140+ CXOs with a 97% 2-year retention track record.',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
      expertise: ['CTO / VP Eng Search', 'GCC Country Heads', 'Notice Period Buyouts'],
    },
    {
      name: 'Dr. Arvind Swaminathan',
      role: 'Partner, Indian Labour Law & POSH Governance',
      credentials: 'LL.M., NLSIU Bengaluru | Empaneled POSH External Member',
      bio: 'Leads HireVibe\'s regulatory compliance practice. Guides marquee enterprises through EPF/ESIC inspections, CLRA contractor audits, and presides over statutory POSH Internal Committees across 14 Indian states.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      expertise: ['EPF / ESIC Statutory Audits', 'POSH Act 2013 IC Member', 'CLRA Governance'],
    },
    {
      name: 'Shweta Kulkarni',
      role: 'Director of Total Rewards & CTC Structuring',
      credentials: 'M.A. (HRM & LR), TISS Mumbai | Ex-Aon Hewitt India',
      bio: 'Architects tax-optimized Indian CTC structures, startup ESOP vesting schemes, and compensation bands calibrated against Indian tech and GCC market data.',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
      expertise: ['₹ LPA CTC Structuring', 'Startup ESOP Design', 'Mercer / Aon Benchmarking'],
    },
  ];

  const coreValues = [
    {
      title: 'Fiduciary Integrity',
      desc: 'We place organizational protection and ethical governance above rapid transaction volume. Our advice on Indian labour laws and POSH is uncompromising.',
      icon: Scale,
    },
    {
      title: 'Human Centricity',
      desc: 'Recruitment is fundamentally about human potential. We respect candidate aspirations while proactively solving Indian notice period bottlenecks.',
      icon: HeartHandshake,
    },
    {
      title: 'Data-Driven Precision',
      desc: 'Every salary band in ₹ LPA, competency rubric, and candidate shortlist is grounded in verified Indian market intelligence and psychometric rigor.',
      icon: Target,
    },
    {
      title: 'Enduring Partnership',
      desc: 'We do not disappear after candidate joining. Our 90-day lateral guarantee and 1-year CXO retention assurance ensure sustained high performance.',
      icon: Award,
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-slate-800 px-3 py-1 rounded-full">
            Our Heritage & Purpose
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-4">
            Pioneering Fiduciary Human Capital in India
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            HireVibe India was established to bridge the critical gap between high-velocity lateral staffing and watertight Indian labour statutory governance.
          </p>
        </div>
      </section>

      {/* Story & Heritage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Who We Are
            </span>
            <h2 className="text-3xl font-bold text-navy-950 tracking-tight">
              India's Premier Boutique Advisory for Strategic Search and Labour Compliance
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Headquartered in Indiranagar, Bengaluru, with regional consulting desks at Mumbai BKC and Gurugram Cyber City, HireVibe India advises over 250 high-growth tech companies, GCCs, and diversified Indian conglomerates.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              In India’s fast-moving hiring market, transactional agencies push unqualified profiles that get stuck in 90-day notice periods, while traditional law firms lack operational recruitment empathy. HireVibe bridges this divide: delivering verified immediate joiners and seasoned leaders backed by certified Indian labour law and POSH practitioners.
            </p>

            <div className="pt-3 grid grid-cols-2 gap-4 border-t border-slate-100">
              <div>
                <div className="text-2xl font-bold text-navy-950">250+</div>
                <div className="text-xs text-slate-500">Indian Enterprises & GCCs Advised</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy-950">92%+</div>
                <div className="text-xs text-slate-500">Notice-Period Joining Ratio</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&auto=format&fit=crop&q=80"
              alt="HireVibe India Leadership Meeting"
              className="w-full h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Guiding Principles
            </span>
            <h2 className="text-3xl font-bold text-navy-950 mt-3 tracking-tight">Our Core Values</h2>
            <p className="text-sm text-slate-600 mt-2">
              The ethical standards and operating philosophy that govern every search mandate and advisory engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-navy-950">{val.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Senior Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Expert Advisory
          </span>
          <h2 className="text-3xl font-bold text-navy-950 mt-3 tracking-tight">Executive Leadership Team</h2>
          <p className="text-sm text-slate-600 mt-2">
            Partner with seasoned practitioners holding decades of enterprise recruitment and labor compliance acumen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipTeam.map((leader, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <img src={leader.avatarUrl} alt={leader.name} className="w-full h-56 object-cover" />
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-base text-navy-950">{leader.name}</h3>
                  <div className="text-xs font-semibold text-brand-600">{leader.role}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{leader.credentials}</div>
                  <p className="text-xs text-slate-600 pt-2 leading-relaxed">{leader.bio}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {leader.expertise.map((exp, eIdx) => (
                    <span
                      key={eIdx}
                      className="text-[10px] font-semibold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy-950 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold text-white">Partner with Our Senior Advisory Practice</h3>
            <p className="text-xs text-slate-400">
              Speak with Pooja Sharma or Vikram Singhania regarding your upcoming executive hiring mandates or compliance audit requirements across India.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shrink-0 shadow-lg transition"
          >
            Schedule Discovery Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
