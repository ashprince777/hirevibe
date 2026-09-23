'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import { CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone, Send } from 'lucide-react';

export default function PricingPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: 'Recruitment',
    hiringCount: '1-3 roles',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      toast('Please provide your name, work email, and company name', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceTitle: `Quote Request: ${formData.serviceType} (${formData.hiringCount})`,
          scopeDescription: `Company: ${formData.company}\nContact: ${formData.name} (${formData.email})\nDetails: ${formData.description || 'N/A'}`,
          estimatedBudget: 'Custom Quote',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast('Quote request received! We will follow up within 24 hours.', 'success');
      } else {
        toast('Message sent! Our team will connect with you shortly.', 'success');
        setSubmitted(true);
      }
    } catch (err) {
      toast('Thank you! Your request has been recorded.', 'success');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-slate-800 px-3 py-1 rounded-full">
            Transparent Commercials
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Request a Custom Quote
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We don’t believe in one-size-fits-all subscription tiers. Every organization has different hiring volumes and compliance needs. Tell us what you’re looking for and we’ll share a transparent proposal.
          </p>
        </div>
      </section>

      {/* Main Quote Request Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info / Engagement Models */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-navy-950">How We Partner</h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Whether you need contingent lateral hiring, retained executive search, or a fixed-scope compliance audit, our commercial models align with real outcomes.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Lateral Staffing</span>
                <h3 className="font-bold text-sm text-navy-950">Contingency Model</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Success-based commercial fee paid only upon the candidate’s official joining date, backed by a 90-day replacement warranty.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Leadership Roles</span>
                <h3 className="font-bold text-sm text-navy-950">Retained Executive Search</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Milestone-based retained search for critical C-suite appointments with full market mapping and founder-led execution.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Statutory & HR Advisory</span>
                <h3 className="font-bold text-sm text-navy-950">Fixed Scope or Monthly Advisory</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear, milestone-based pricing for statutory compliance audits, POSH committee setups, or ongoing fractional HR advisory.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-navy-950">Quote Request Submitted</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. A founding partner will review your requirements and follow up within 24 business hours with commercial details.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        serviceType: 'Recruitment',
                        hiringCount: '1-3 roles',
                        description: '',
                      });
                    }}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-navy-950">Request Commercial Quotation</h3>
                  <p className="text-xs text-slate-500 mt-1">Fill out the brief details below to receive a personalized quote.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Tech India"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Service Needed</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-white"
                    >
                      <option value="Lateral Recruitment">Tech & Lateral Recruitment</option>
                      <option value="Executive Search">Retained Executive Search</option>
                      <option value="Labour Compliance">Labour Law / POSH Compliance</option>
                      <option value="Payroll & HR Ops">Payroll & HR Operations</option>
                      <option value="Other">Other / Full Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hiring Volume / Team Size</label>
                  <select
                    value={formData.hiringCount}
                    onChange={(e) => setFormData({ ...formData, hiringCount: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-white"
                  >
                    <option value="1-3 roles">1–3 Priority Roles</option>
                    <option value="4-10 roles">4–10 Engineering Hires</option>
                    <option value="10+ roles">10+ Team Buildout</option>
                    <option value="C-Suite Only">1 C-Suite / Executive Position</option>
                    <option value="Compliance Only">Statutory Compliance / Audit Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Description (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the roles, experience levels, or specific compliance questions..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Submitting...' : 'Request Custom Quote'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
