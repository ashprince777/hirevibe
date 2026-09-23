import React from 'react';
import Link from 'next/link';
import { Briefcase, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Award, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Pillars for Boutique HR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Founder-Led Executive Search</h4>
              <p className="text-xs text-slate-400 mt-1">
                Every critical search is managed directly by our founding partners with discretion, speed, and dedicated attention.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Indian Statutory & Labour Compliance</h4>
              <p className="text-xs text-slate-400 mt-1">
                Practical, actionable guidance on EPF, ESIC, POSH Act governance, and preparation for the 4 New Labour Codes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 text-brand-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Notice Period Management</h4>
              <p className="text-xs text-slate-400 mt-1">
                Active candidate pre-onboarding, buyout negotiations, and counter-offer mitigation across Bengaluru and pan-India tech hubs.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-slate-800">
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
              Boutique HR consultancy and recruitment firm helping Indian startups, growing tech ventures, and enterprises hire exceptional talent and stay compliant.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Indiranagar 100 Ft Road, Bengaluru, Karnataka 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+91 98200 12345 / +91 (080) 4200-VIBE</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>advisory@hirevibe.in</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Core Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Tech & Lateral Recruitment
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Retained Executive Search
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Labour Law & POSH Compliance
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Payroll & Operations Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Engagement */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Get in Touch</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/jobs" className="hover:text-white transition">
                  Search Active Openings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Request a Consultation
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition">
                  Candidate Login
                </Link>
              </li>
              <li>
                <Link href="/portal/employer" className="hover:text-white transition">
                  Employer Console
                </Link>
              </li>
            </ul>
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
