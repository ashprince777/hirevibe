'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Briefcase, Building2, UserCheck, Mail, Lock, User, Building } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const { toast } = useToast();

  const [role, setRole] = useState<'CANDIDATE' | 'EMPLOYER'>('CANDIDATE');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [headline, setHeadline] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast('Please fill in all required fields', 'error');
      return;
    }

    if (password.length < 6) {
      toast('Password must be at least 6 characters', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          companyName: role === 'EMPLOYER' ? companyName : undefined,
          headline: role === 'CANDIDATE' ? headline : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast(data.error || 'Registration failed', 'error');
      } else {
        toast('Account registered successfully! Welcome to HireVibe.', 'success');
        await refreshUser();
        if (role === 'EMPLOYER') {
          router.push('/portal/employer');
        } else {
          router.push('/portal/candidate');
        }
      }
    } catch (err) {
      toast('Network error during registration', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block group py-1">
            <img
              src="/images/hirevibe-horizontal.png"
              alt="HireVibe HR Consulting"
              className="h-14 w-auto mx-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>
          <h2 className="text-2xl font-bold text-navy-950">Create an Account</h2>
          <p className="text-xs text-slate-500">Select your account type to begin</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('CANDIDATE')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
              role === 'CANDIDATE'
                ? 'bg-white text-navy-950 shadow-sm'
                : 'text-slate-500 hover:text-navy-950'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-500" />
            <span>Job Seeker</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('EMPLOYER')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
              role === 'EMPLOYER'
                ? 'bg-white text-navy-950 shadow-sm'
                : 'text-slate-500 hover:text-navy-950'
            }`}
          >
            <Building2 className="w-4 h-4 text-brand-500" />
            <span>Employer / Client</span>
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {role === 'EMPLOYER' ? 'Hiring Contact Name' : 'Full Name'} *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'EMPLOYER' ? 'Marcus Sterling' : 'Alex Rivera'}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>
          </div>

          {role === 'EMPLOYER' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization Name *</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="TechScale Systems Inc."
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
                />
              </div>
            </div>
          )}

          {role === 'CANDIDATE' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Professional Title / Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Senior Full-Stack Engineer | React, Node.js"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password (min 6 characters) *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : `Register as ${role === 'EMPLOYER' ? 'Employer' : 'Candidate'}`}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          <span>Already have an account? </span>
          <Link href="/login" className="text-brand-600 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
