import React from 'react';
import Link from 'next/link';
import { Check, ShieldCheck, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const recruitmentTiers = [
    {
      name: 'Lateral Tech & Contingency Staffing',
      fee: '8.33% - 12.5%',
      feeDesc: 'of candidate first-year annual CTC (Paid only upon successful joining)',
      desc: 'Ideal for scaling individual contributors, engineering architects, and middle management across Bengaluru, Hyderabad, Pune, and Delhi NCR.',
      badge: 'Zero Risk • Pay on Joining',
      features: [
        'Dedicated tech recruiting specialist per technology vertical',
        'Vetted pipeline of serving-notice candidates & immediate joiners',
        'Direct notice buyout negotiation & early release coordination',
        'Rigorous technical assessment & reference checks',
        '90-Day free candidate replacement guarantee',
      ],
      cta: 'Submit Lateral Hiring Mandate',
      href: '/contact?service=Contingency',
      popular: false,
    },
    {
      name: 'Retained CXO & Executive Search',
      fee: '25% - 33%',
      feeDesc: 'staged milestone retainer for C-suite, VP, and Country Head mandates',
      desc: 'Confidential executive search personally steered by Pooja Sharma or Vikram Singhania for Unicorns, GCCs, and Tier-1 Indian conglomerates.',
      badge: 'Most Popular for C-Suite',
      features: [
        'Personally steered by Managing Partner / Senior Practice Head',
        'Confidential pan-India & GCC competitor talent mapping',
        '360-degree leadership reputational vetting & reference audit',
        '1-Year executive retention and assimilation assurance',
        'Compensation committee & board presentation dossiers',
        'Nuanced CTC structuring (INR cash, variable, retention bonus & ESOPs)',
      ],
      cta: 'Engage Indian CXO Search',
      href: '/contact?service=ExecutiveSearch',
      popular: true,
    },
  ];

  const retainerTiers = [
    {
      name: 'Startup HR & POSH Starter',
      price: '₹35,000',
      period: '/ month',
      desc: 'Essential HR foundation, employment contracts, and statutory POSH compliance for startups scaling up to 35 employees.',
      features: [
        'Certified External Member empanelment for POSH Internal Committee (IC)',
        'Indian employment agreements & Employee Handbook (Shops & Est. compliant)',
        'Basic CTC structuring & tax-efficient salary templates',
        'Dedicated Indian HR Consultant (up to 15 hours/month)',
        'Email & WhatsApp advisory support within 4 business hours',
      ],
      cta: 'Get Starter Plan',
      href: '/contact?plan=Starter',
    },
    {
      name: 'Growth HR & Labour Code Retainer',
      price: '₹75,000',
      period: '/ month',
      desc: 'Comprehensive people operations and statutory compliance advisory for organizations with 35 to 150 employees.',
      popular: true,
      features: [
        'Everything in Starter Plan',
        '4 New Labour Codes readiness audit & wage definition gap analysis',
        'EPF, ESIC, Gratuity & Professional Tax statutory compliance reviews',
        'Dedicated Senior HR Partner (up to 35 hours/month)',
        'Quarterly manager POSH sensitization & POSH Annual Report filing',
        'Comprehensive exit interview framework & attrition analytics',
      ],
      cta: 'Select Growth Plan',
      href: '/contact?plan=Growth',
    },
    {
      name: 'Enterprise Fractional CHRO',
      price: '₹1,75,000',
      period: '/ month',
      desc: 'Fractional Chief Human Resources Officer and complete outsourced people desk for enterprises scaling past 150 headcount.',
      features: [
        'Everything in Growth Plan',
        'Fractional CHRO leadership for Board & Leadership meetings',
        'Multi-state labour inspection defense & statutory regularization',
        'Bespoke Indian ESOP vesting schemes & executive retention plans',
        'Campus recruitment strategy & pan-India lateral hiring blueprint',
        'On-site labor commissioner representation & dispute mitigation',
      ],
      cta: 'Contact Enterprise Advisory',
      href: '/contact?plan=Enterprise',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-slate-800 px-3 py-1 rounded-full">
            Transparent Engagement Models
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-4">
            Employer Pricing & Consulting Retainers
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Whether you require contingency recruiting, dedicated executive search, or an embedded HR advisory retainer, our fee structures are straightforward and value-aligned.
          </p>
        </div>
      </section>

      {/* Recruitment Models */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Talent Acquisition Engagements
          </span>
          <h2 className="text-3xl font-bold text-navy-950 mt-3 tracking-tight">Recruitment & Executive Search</h2>
          <p className="text-sm text-slate-600 mt-2">
            No hidden costs. Contingency mandates carry zero upfront financial obligation until candidate commences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {recruitmentTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 sm:p-10 border transition-all flex flex-col justify-between ${
                tier.popular
                  ? 'bg-slate-900 text-white border-slate-800 shadow-2xl relative'
                  : 'bg-white text-slate-900 border-slate-200 shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-teal-400 text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                  {!tier.popular && (
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-black tracking-tight">{tier.fee}</span>
                  <p className={`text-xs mt-1 ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                    {tier.feeDesc}
                  </p>
                </div>

                <p className={`text-xs mb-6 leading-relaxed ${tier.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                  {tier.desc}
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-200/40">
                  <h4 className="text-xs font-bold uppercase tracking-wider">Features Included</h4>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className={tier.popular ? 'text-slate-300' : 'text-slate-600'}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={tier.href}
                  className={`block w-full py-3 rounded-xl text-xs font-semibold text-center transition ${
                    tier.popular
                      ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg'
                      : 'bg-navy-950 hover:bg-navy-800 text-white'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription HR Retainers */}
      <section className="bg-slate-100/70 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Subscription & Advisory Retainers
            </span>
            <h2 className="text-3xl font-bold text-navy-950 mt-3 tracking-tight">
              Outsourced HR & Compliance Plans
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Fixed monthly retainer packages offering dedicated senior HR counsel, compliance defense, and people strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {retainerTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-8 border transition-all flex flex-col justify-between ${
                  tier.popular
                    ? 'border-brand-500 shadow-xl ring-2 ring-brand-500/20 relative'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                    Most Selected
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-navy-950">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-navy-950">{tier.price}</span>
                    <span className="text-xs text-slate-400">{tier.period}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{tier.desc}</p>

                  <div className="space-y-3 pt-6 mt-6 border-t border-slate-100">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={tier.href}
                    className={`block w-full py-2.5 rounded-xl text-xs font-semibold text-center transition ${
                      tier.popular
                        ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assurance Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 p-2 px-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Fiduciary Commitment & Service-Level Agreement Guaranteed</span>
        </div>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          All client consulting engagements are governed by formal Master Services Agreements (MSAs) and mutual Non-Disclosure Agreements (NDAs).
        </p>
      </section>
    </div>
  );
}
