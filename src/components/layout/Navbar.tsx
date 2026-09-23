'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Briefcase,
  Users,
  ChevronDown,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Sparkles,
  Shield,
  Building2,
  UserCheck,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, switchDemoUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Search Jobs', href: '/jobs' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'HR Insights', href: '/blog' },
    { name: 'Pricing & Retainers', href: '/pricing' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const getPortalLink = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin';
    if (user.role === 'EMPLOYER') return '/portal/employer';
    return '/portal/candidate';
  };

  const getPortalLabel = () => {
    if (!user) return 'Portal';
    if (user.role === 'ADMIN') return 'Admin Governance';
    if (user.role === 'EMPLOYER') return 'Employer Portal';
    return 'Candidate Portal';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      {/* Top Banner for Demo Switcher */}
      <div className="bg-navy-950 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">HireVibe Advisory</span>
            <span className="hidden md:inline text-slate-400">
              | Executive Search, Labour Law Compliance & Strategic HR Consulting
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold px-2.5 py-0.5 rounded-full text-xs transition"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>⚡ Demo Switcher</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {demoMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-68 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-slate-200"
                  onClick={() => setDemoMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase text-slate-400 border-b border-slate-800">
                    Switch Indian Demo Persona
                  </div>
                  <button
                    onClick={() => switchDemoUser('ADMIN')}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex items-center gap-2.5 transition"
                  >
                    <Shield className="w-4 h-4 text-rose-400" />
                    <div>
                      <div className="font-semibold text-white">Pooja Sharma (Admin)</div>
                      <div className="text-[11px] text-slate-400">Managing Partner | Full Governance</div>
                    </div>
                  </button>
                  <button
                    onClick={() => switchDemoUser('EMPLOYER')}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex items-center gap-2.5 transition"
                  >
                    <Building2 className="w-4 h-4 text-brand-400" />
                    <div>
                      <div className="font-semibold text-white">RazorScale Technologies (Employer)</div>
                      <div className="text-[11px] text-slate-400">FinTech Unicorn | Bengaluru Hub</div>
                    </div>
                  </button>
                  <button
                    onClick={() => switchDemoUser('CANDIDATE')}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex items-center gap-2.5 transition"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-white">Rohan Verma (Candidate)</div>
                      <div className="text-[11px] text-slate-400">Staff Full-Stack Architect | Bengaluru</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <span className="text-slate-500">|</span>
            <Link href="/contact" className="hover:text-white transition">
              Call: +91 (080) 4200-VIBE
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group py-1">
            <img
              src="/images/hirevibe-horizontal.png"
              alt="HireVibe HR Consulting"
              className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'text-brand-600 bg-brand-50/70 font-semibold'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-full border border-slate-200 hover:border-slate-300 bg-white transition shadow-sm"
                >
                  <img
                    src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-brand-500"
                  />
                  <span className="text-xs font-semibold text-navy-900 pr-1">{user.name.split(' ')[0]}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                    {user.role}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-fade-in"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      href={getPortalLink()}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-500" />
                      {getPortalLabel()}
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-navy-950 transition"
                >
                  Candidate Login
                </Link>
                <Link
                  href="/portal/employer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-navy-950 hover:bg-navy-900 rounded-lg shadow-sm transition hover:shadow"
                >
                  Employer Console
                </Link>
              </div>
            )}

            <Link
              href="/contact"
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-500/20 transition hover:shadow"
            >
              Request HR Audit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-navy-950 rounded-lg hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href={getPortalLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-brand-600 text-white"
                >
                  {getPortalLabel()}
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold text-slate-800 border border-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold bg-navy-950 text-white"
                >
                  Register Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
