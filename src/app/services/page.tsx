import React from 'react';
import Link from 'next/link';
import {
  Users,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileCheck,
  Building2,
  Check,
} from 'lucide-react';
import ServiceInquiryForm from '@/components/services/ServiceInquiryForm';

export default function ServicesPage() {
  const servicePillars = [
    {
      id: 'tech-staffing',
      title: 'Tech & Lateral Staffing (Notice Period Solutions)',
      subtitle: 'Overcoming the 60-90 Day Indian Notice Dilemma',
      icon: Users,
      desc: 'Hiring in Indian tech hubs is plagued by extended notice periods and multi-offer dropouts. Our specialized engineering recruitment desk tracks verified immediate joiners, negotiates notice period buyouts, and deploys high-touch pre-onboarding engagement to ensure 92%+ joining ratios across Bengaluru, Hyderabad, Pune, and Delhi NCR.',
      deliverables: [
        'Curated pipelines of serving notice candidates & immediate joiners',
        'Direct notice buyout negotiation & early release coordination',
        'Rigorous technical assessment & coding scorecard evaluation',
        'Continuous pre-joining engagement to mitigate counter-offers',
        '90-Day free candidate replacement guarantee on all lateral hires',
      ],
      idealFor: 'Product engineering teams, hyper-growth Indian startups, and GCCs needing fast, reliable joining.',
    },
    {
      id: 'cxo-search',
      title: 'Confidential CXO & Executive Search',
      subtitle: 'Retained Leadership for Indian Unicorns & Conglomerates',
      icon: Award,
      desc: 'Securing transformational leadership in India requires deep discretion, board-level gravitas, and nuanced compensation structuring. Our Managing Partners personally steer confidential retained searches for CEOs, CTOs, CFOs, and Chief People Officers across Mumbai BKC, Bengaluru, and Gurugram.',
      deliverables: [
        'Comprehensive talent mapping across tier-1 Indian enterprises & GCCs',
        'Confidential executive compensation benchmarking (INR cash + ESOPs)',
        'In-depth 360° leadership reputation vetting & reference checks',
        'Board presentation dossiers and compensation committee mediation',
        '1-Year executive retention and assimilation guarantee',
      ],
      idealFor: 'Board of Directors, Founders, and PE/VC funds making high-stakes CXO appointments.',
    },
    {
      id: 'labour-codes',
      title: 'Indian Labour Codes & Statutory Audits',
      subtitle: 'Readiness for the 4 New Labour Codes & State Regulations',
      icon: ShieldCheck,
      desc: 'Avoid severe penalties, license cancellations, and director liability under Indian employment statutes. We conduct exhaustive statutory compliance audits across EPF (Employees\' Provident Fund), ESIC, Professional Tax, CLRA (Contract Labour Act), and prepare organizations for the 4 New Labour Codes.',
      deliverables: [
        'Comprehensive multi-state statutory audit (Shops & Est, Factories Act, CLRA)',
        '4 New Labour Codes readiness audit & wage definition gap analysis',
        'EPF, ESIC, Gratuity, and State LWF compliance regularisation',
        'Drafting of legally defensible Indian Employment Agreements & Handbooks',
        'Contractor & vendor workforce compliance auditing to mitigate co-employment risk',
      ],
      idealFor: 'Enterprises with multi-state operations across Karnataka, Maharashtra, Haryana, Telangana, and Tamil Nadu.',
    },
    {
      id: 'posh-icc',
      title: 'POSH Act 2013 & Internal Committee (IC) Governance',
      subtitle: 'Certified External Members & Prevention of Sexual Harassment',
      icon: FileCheck,
      desc: 'Mandatory under the Sexual Harassment of Women at Workplace Act 2013 for any Indian entity with 10+ employees. We provide certified external IC members, conduct neutral inquiry proceedings, train internal committees, and draft the mandatory Annual Report for submission to District Officers.',
      deliverables: [
        'Empanelment of certified Senior Advocates / NGO experts as External IC Members',
        'End-to-end inquiry support following principles of natural justice',
        'Interactive employee sensitization workshops (virtual & on-site in English & Hindi)',
        'Mandatory Annual POSH Report preparation for the District Officer',
        'Annual POSH refresher programs for Executive Leadership & HR teams',
      ],
      idealFor: 'All Indian employers, tech companies, and multinational GCCs with 10+ workforce.',
    },
    {
      id: 'ctc-payroll',
      title: 'Indian CTC Structuring & Total Rewards (₹ LPA)',
      subtitle: 'Tax-Optimized Salary Structuring & Compliance Alignment',
      icon: TrendingUp,
      desc: 'Maximize candidate take-home pay while strictly complying with Indian income tax rules, PF ceilings, and Gratuity Act provisions. We design calibrated salary bands, variable pay formulas, and ESOP pool frameworks benchmarked against Indian tech ecosystem standards.',
      deliverables: [
        'Tax-efficient CTC breakups (Basic 50% rule, HRA, NPS, Special Allowances)',
        'Gratuity liability valuation & actuarial provisioning advisory',
        'Startup ESOP vesting schedules, buyback policies, and pool creation',
        'City-tier salary benchmarking across Bengaluru, Mumbai, NCR, and Tier-2 hubs',
        'Complete payroll compliance advisory (Form 16, TDS, PT, PF ECR reconciliations)',
      ],
      idealFor: 'Firms restructuring CTC bands ahead of new labour codes or scaling hiring post-Series A/B.',
    },
    {
      id: 'gcc-setup',
      title: 'GCC & India Entity Turnkey HR Setup',
      subtitle: 'Global Capability Center Incubation in Bengaluru, Hyderabad & Pune',
      icon: Building2,
      desc: 'Guiding global enterprises and multinational corporations to establish high-yield GCCs in India. From initial Shops & Establishment registrations to hiring the foundational 50 to 500 tech and operational heads.',
      deliverables: [
        'Turnkey entity HR setup & state labor registrations across India',
        'Foundation hiring for Country Head, Engineering Directors, and Core Staff',
        'Indian HR Policy Manuals & localized Code of Conduct',
        'Benefits vendor selection (Group Health Insurance, OPD, Meal Cards, Cabs)',
        'Payroll software implementation & Indian bank tie-up assistance',
      ],
      idealFor: 'Global enterprises establishing or expanding their tech & operations centers in India.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Services Hero */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Pan-India HR & Recruitment Advisory
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-2">
            Strategic Practice Areas for the Indian Ecosystem
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mt-4 leading-relaxed font-normal">
            From tackling the 90-day tech notice period and executive search to Indian Labour Codes, POSH Act compliance, and GCC turnkey setups—our Senior Partners deliver legally watertight, high-velocity outcomes.
          </p>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-3">
            {servicePillars.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
              >
                {p.title.split('(')[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {servicePillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isEven = idx % 2 === 1;

          return (
            <div
              key={pillar.id}
              id={pillar.id}
              className="scroll-mt-24 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                    {pillar.subtitle}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-1">{pillar.title}</h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>

                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wider">Key Deliverables</h4>
                  {pillar.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-bold text-slate-800">Best Suited For: </span>
                  <span className="text-slate-600">{pillar.idealFor}</span>
                </div>
              </div>

              {/* Inquiry Sidebar / Card for each service */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : ''}`}>
                <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-800">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase text-brand-400">Request Advisory Proposal</span>
                    <h3 className="text-lg font-bold text-white">Engage HireVibe for {pillar.title.split('&')[0]}</h3>
                    <p className="text-xs text-slate-400">
                      Submit a tailored scope request. A Senior HR Partner will connect within 24 business hours.
                    </p>
                  </div>

                  <a
                    href="#consultation-inquiry"
                    className="block w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs text-center shadow-lg transition"
                  >
                    Request Scope & Proposal
                  </a>

                  <div className="text-[11px] text-slate-400 space-y-1.5 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                      <span>Zero-obligation initial diagnostic call</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                      <span>Strict confidentiality & NDA compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Interactive Consultation Form Section */}
      <section id="consultation-inquiry" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Enterprise Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-950">
              Request a Custom Advisory Proposal
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Tell us about your organization's hiring goals or HR consulting needs.
            </p>
          </div>

          <ServiceInquiryForm />
        </div>
      </section>
    </div>
  );
}
