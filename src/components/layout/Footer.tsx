import React from 'react';
import Link from 'next/link';
import { Briefcase, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Award, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Pillars for Indian HR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Indian Statutory & Labour Compliance</h4>
              <p className="text-xs text-slate-400 mt-1">
                Rigorous multi-state audit readiness across EPF, ESIC, CLRA, Shops & Establishments, and the 4 New Labour Codes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Certified POSH Act 2013 Governance</h4>
              <p className="text-xs text-slate-400 mt-1">
                Internal Complaints Committee (ICC) constitution, external NGO members, employee workshops & mandatory district filings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 text-brand-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Solving Indian 90-Day Notice Periods</h4>
              <p className="text-xs text-slate-400 mt-1">
                Active buyout negotiations, sustained pre-boarding immersion, and counter-offer protection across Bengaluru, NCR & Mumbai.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group py-1">
              <img
                src="/images/hirevibe-horizontal-dark.png"
                alt="HireVibe HR Consulting"
                className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              India's premier boutique HR consultancy and talent recruitment advisory firm. Trusted by Indian tech unicorns, Global Capability Centers (GCCs), and enterprises across Bengaluru, Mumbai, Delhi NCR, and Hyderabad.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Indiranagar Tech Corridor, 100 Ft Road, Bengaluru, Karnataka 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+91 (080) 4200-VIBE / +91 98200 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>advisory@hirevibe.in</span>
              </div>
            </div>
          </div>

          {/* Indian Practice Areas */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Core Practice Areas</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services#tech-staffing" className="hover:text-white transition">
                  Tech & Product Recruitment
                </Link>
              </li>
              <li>
                <Link href="/services#cxo-search" className="hover:text-white transition">
                  Retained CXO & Leadership Search
                </Link>
              </li>
              <li>
                <Link href="/services#labour-codes" className="hover:text-white transition">
                  New Indian Labour Codes Audit
                </Link>
              </li>
              <li>
                <Link href="/services#posh" className="hover:text-white transition">
                  POSH Act 2013 & ICC Advisory
                </Link>
              </li>
              <li>
                <Link href="/services#ctc-payroll" className="hover:text-white transition">
                  CTC Structuring & Payroll Advisory
                </Link>
              </li>
              <li>
                <Link href="/services#gcc-setup" className="hover:text-white transition">
                  GCC (Global Capability Center) Setup
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Seekers */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Portals & Seekers</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/jobs" className="hover:text-white transition">
                  Search Active Roles (Bengaluru/NCR/Mumbai)
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition">
                  Candidate Career Portal
                </Link>
              </li>
              <li>
                <Link href="/portal/employer" className="hover:text-white transition">
                  Employer / Client Console
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Hiring Fees & HR Retainers (₹)
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition">
                  Indian Unicorn Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Indian HR Legal Briefings
                </Link>
              </li>
            </ul>
          </div>

          {/* Indian HR Executive Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Indian HR Executive Digest</h4>
            <p className="text-xs text-slate-400 mb-3">
              Fortnightly briefing on Indian labor notifications, CTC tax optimization, and tech compensation benchmarks.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="chro@company.in"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              <button
                type="button"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white rounded-lg px-3 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <span>Subscribe Briefing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HireVibe Talent Advisory India Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition">
              Privacy Policy (DPDP Act 2023)
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition">
              Terms of Engagement
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition">
              Equal Opportunity Employer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
