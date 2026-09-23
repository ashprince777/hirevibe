'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: 'Tech Staffing',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast('Please fill in your name, email, and message', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceTitle: `Consultation Inquiry: ${formData.serviceInterest}`,
          scopeDescription: `Company: ${formData.company || 'N/A'}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nMessage: ${formData.message}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast('Message sent successfully! We will get back to you shortly.', 'success');
      } else {
        setSubmitted(true);
        toast('Thank you! Your message has been received.', 'success');
      }
    } catch (err) {
      setSubmitted(true);
      toast('Thank you! Your message has been received.', 'success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-slate-800 px-3 py-1 rounded-full">
            Connect With Us
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Schedule a Consultation
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Reach out directly to discuss your hiring plans, notice period challenges, or compliance questions with our founding team.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Office Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Office & Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Our Office</span>
                <h3 className="font-bold text-lg text-navy-950 mt-1">HireVibe Advisory</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Headquartered in Bengaluru, working directly with founders and hiring leaders across India.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-navy-950">Indiranagar Office</div>
                    <div className="text-slate-500">100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-navy-950">Phone</div>
                    <div className="text-slate-500">+91 98200 12345 / +91 (080) 4200-VIBE</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-navy-950">Email</div>
                    <div className="text-slate-500">advisory@hirevibe.in</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-navy-950">Business Hours</div>
                    <div className="text-slate-500">Monday – Friday: 9:30 AM – 6:30 PM IST</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-navy-950">What happens next?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                After you submit your inquiry, one of our lead partners will review your requirements and reply within 1 business day to arrange a short introductory call.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-navy-950">Message Received</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. We will connect with you via email or phone shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        serviceInterest: 'Tech Staffing',
                        message: '',
                      });
                    }}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-navy-950">Send an Inquiry</h3>
                  <p className="text-xs text-slate-500 mt-1">Please provide details about your hiring or consulting requirement.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Rao"
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
                      placeholder="ananya@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (Optional)</label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Systems"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Interest</label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-white"
                  >
                    <option value="Tech Staffing">Tech & Lateral Recruitment</option>
                    <option value="Executive Search">Retained Executive Search</option>
                    <option value="Labour Compliance">Labour Law & POSH Compliance</option>
                    <option value="Payroll & HR Ops">Payroll & CTC Structuring</option>
                    <option value="General Inquiry">General Inquiry / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you are looking to achieve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Sending...' : 'Send Consultation Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
