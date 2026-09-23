'use client';

import React, { useState, useEffect } from 'react';
import EmployerNav from '@/components/portals/EmployerNav';
import { Building2, Globe, MapPin, UploadCloud, Save, ShieldCheck, Sparkles } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';

export default function EmployerProfilePage() {
  const { toast } = useToast();
  const { refreshUser } = useAuth();

  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [subscriptionTier, setSubscriptionTier] = useState('GROWTH');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/profiles/employer');
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            setCompanyName(data.profile.companyName || '');
            setIndustry(data.profile.industry || '');
            setCompanySize(data.profile.companySize || '');
            setWebsite(data.profile.website || '');
            setLocation(data.profile.location || '');
            setDescription(data.profile.description || '');
            setLogoUrl(data.profile.logoUrl || '');
            setSubscriptionTier(data.profile.subscriptionTier || 'GROWTH');
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalLogoUrl = logoUrl;

      if (logoFile) {
        const formData = new FormData();
        formData.append('file', logoFile);
        formData.append('type', 'logos');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalLogoUrl = uploadData.url;
          setLogoUrl(finalLogoUrl);
        }
      }

      const res = await fetch('/api/profiles/employer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          industry,
          companySize,
          website,
          location,
          description,
          logoUrl: finalLogoUrl,
        }),
      });

      if (res.ok) {
        toast('Company profile saved successfully', 'success');
        await refreshUser();
      } else {
        toast('Failed to update company profile', 'error');
      }
    } catch (err) {
      toast('Network error saving company profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-500">Loading company profile...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Organization Branding
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">Company Profile & Account</h1>
        <p className="text-xs text-slate-500 mt-1">
          This information is displayed to candidates on your job postings and representation dossiers.
        </p>
      </div>

      <EmployerNav />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSave} className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Legal Name *</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Industry Vertical</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Enterprise Cloud Infrastructure"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Headcount</label>
              <input
                type="text"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                placeholder="250-500 employees"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Headquarters Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Indiranagar, Bengaluru, Karnataka"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Website URL</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://company.in"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Company Description & Culture</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summarize your mission, core products, and work culture..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Company Brand Logo</label>
            <div className="flex items-center gap-4">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt={companyName}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                />
              )}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-brand-400 transition bg-slate-50 flex-1">
                <input
                  type="file"
                  id="company-logo"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label htmlFor="company-logo" className="cursor-pointer block space-y-0.5">
                  <UploadCloud className="w-6 h-6 text-brand-500 mx-auto" />
                  <span className="text-xs font-semibold text-slate-700 block">
                    {logoFile ? logoFile.name : 'Upload logo image (PNG, JPG)'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md transition flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>

        {/* Retainer Tier Card */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-brand-400">Current Retainer</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                ACTIVE
              </span>
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">
              {subscriptionTier} Advisory Plan
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your organization has active advisory coverage including multi-state compliance briefings and priority candidate presentation.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Unlimited job posting postings</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Dedicated Senior HR Consultant</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Candidate background verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
