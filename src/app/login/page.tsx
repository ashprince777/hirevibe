'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Briefcase, Shield, Building2, UserCheck, ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchDemoUser } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast('Please enter both email and password', 'error');
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      toast('Signed in successfully', 'success');
      // Redirect based on role or fallback
      router.push('/');
    } else {
      toast(res.error || 'Invalid credentials', 'error');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-2xl font-bold text-navy-950">Welcome Back</h2>
          <p className="text-xs text-slate-500">Sign in to your Candidate, Employer, or Admin portal</p>
        </div>

        {/* 1-Click Demo Logins */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">
            ⚡ 1-Click Instant Demo Login
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => switchDemoUser('ADMIN')}
              className="p-2 rounded-xl bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 text-center transition flex flex-col items-center gap-1 group"
            >
              <Shield className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-slate-800">Admin</span>
              <span className="text-[9px] text-slate-400">Full System</span>
            </button>

            <button
              type="button"
              onClick={() => switchDemoUser('EMPLOYER')}
              className="p-2 rounded-xl bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 text-center transition flex flex-col items-center gap-1 group"
            >
              <Building2 className="w-4 h-4 text-brand-500 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-slate-800">Employer</span>
              <span className="text-[9px] text-slate-400">TechScale</span>
            </button>

            <button
              type="button"
              onClick={() => switchDemoUser('CANDIDATE')}
              className="p-2 rounded-xl bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 text-center transition flex flex-col items-center gap-1 group"
            >
              <UserCheck className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-slate-800">Candidate</span>
              <span className="text-[9px] text-slate-400">Alex Rivera</span>
            </button>
          </div>
        </div>

        {/* Traditional Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <span className="text-[11px] text-brand-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
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
            className="w-full py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          <span>Don't have an account yet? </span>
          <Link href="/register" className="text-brand-600 font-bold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
