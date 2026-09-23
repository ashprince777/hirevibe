'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import CandidateNav from '@/components/portals/CandidateNav';
import { User, Phone, MapPin, Briefcase, FileText, UploadCloud, Save, Globe, Award } from 'lucide-react';

export default function CandidateProfilePage() {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/profiles/candidate');
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            setName(data.profile.user.name || '');
            setHeadline(data.profile.headline || '');
            setPhone(data.profile.phone || '');
            setLocation(data.profile.location || '');
            setBio(data.profile.bio || '');
            setSkills(data.profile.skills || '');
            setYearsOfExperience(data.profile.yearsOfExperience ? String(data.profile.yearsOfExperience) : '');
            setPortfolioUrl(data.profile.portfolioUrl || '');
            setResumeUrl(data.profile.resumeUrl || '');
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
      let finalResumeUrl = resumeUrl;

      // Handle resume upload if selected
      if (resumeFile) {
        const formData = new FormData();
        formData.append('file', resumeFile);
        formData.append('type', 'resumes');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalResumeUrl = uploadData.url;
          setResumeUrl(finalResumeUrl);
        }
      }

      const res = await fetch('/api/profiles/candidate', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          headline,
          phone,
          location,
          bio,
          skills,
          yearsOfExperience,
          portfolioUrl,
          resumeUrl: finalResumeUrl,
        }),
      });

      if (res.ok) {
        toast('Candidate profile updated successfully', 'success');
        await refreshUser();
      } else {
        toast('Failed to update profile', 'error');
      }
    } catch (err) {
      toast('Network error saving profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-500">
        Loading profile credentials...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Candidate Credentials
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">Manage Career Profile</h1>
        <p className="text-xs text-slate-500 mt-1">
          Keep your executive summary, core competencies, and resume up to date for hiring managers.
        </p>
      </div>

      <CandidateNav />

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 max-w-4xl">
        {/* Core Identity */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-950 pb-3 border-b border-slate-100 mb-4">
            Identity & Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current City / Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru, Karnataka (or Pune / Hyderabad)"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Years of Relevant Experience</label>
              <input
                type="number"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                placeholder="7"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-950 pb-3 border-b border-slate-100 mb-4">
            Professional Overview
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Professional Title / Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Senior Full-Stack Engineer | Distributed Systems Architect"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Executive Biography</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Highlight your domain leadership, technical proficiencies, and career accomplishments..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Core Skills & Competencies (comma separated)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Next.js, TypeScript, Node.js, AWS, PostgreSQL, Docker"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Portfolio or GitHub / LinkedIn URL</label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://github.com/username or https://linkedin.com/in/username"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* Resume File Management */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-950 pb-3 border-b border-slate-100 mb-4">
            Curriculum Vitae / Resume
          </h2>

          <div className="space-y-3">
            {resumeUrl && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileText className="w-4 h-4 text-brand-600" />
                  <span>Current Resume: <strong className="text-slate-900">{resumeUrl.split('/').pop()}</strong></span>
                </div>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-600 hover:underline font-bold text-[11px]"
                >
                  Download / View File
                </a>
              </div>
            )}

            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-brand-400 transition bg-slate-50">
              <input
                type="file"
                id="profile-resume"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <label htmlFor="profile-resume" className="cursor-pointer block space-y-1">
                <UploadCloud className="w-8 h-8 text-brand-500 mx-auto" />
                <span className="text-xs font-semibold text-slate-700 block">
                  {resumeFile ? resumeFile.name : 'Upload New Resume (PDF / DOCX)'}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Max file size: 10MB • Automatically attached to future job applications
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
            <span>{loading ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
