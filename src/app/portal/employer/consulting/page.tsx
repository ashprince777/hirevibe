'use client';

import React, { useState, useEffect } from 'react';
import EmployerNav from '@/components/portals/EmployerNav';
import { MessageSquare, Plus, CheckCircle2, Clock, ShieldCheck, UserCheck, X } from 'lucide-react';
import { formatDate, timeAgo } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

interface ServiceRequest {
  id: string;
  serviceType: string;
  title: string;
  details: string;
  status: string;
  priority: string;
  assignedConsultant?: string | null;
  consultantNotes?: string | null;
  createdAt: string;
}

export default function EmployerConsultingPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [serviceType, setServiceType] = useState('HR Policy & Compliance');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [priority, setPriority] = useState('HIGH');

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !details) {
      toast('Title and project scope are required', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceType, title, details, priority }),
      });

      const data = await res.json();
      if (res.ok) {
        toast('HR Consulting request submitted. A Senior Partner has been notified.', 'success');
        setRequests([data.request, ...requests]);
        setModalOpen(false);
        setTitle('');
        setDetails('');
      } else {
        toast(data.error || 'Failed to submit request', 'error');
      }
    } catch (err) {
      toast('Network error submitting request', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            HR Advisory Retainer
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-2">
            HR Consulting Service Requests
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Submit policy design, multi-state compliance audits, or retained executive search mandates.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Consulting Request</span>
        </button>
      </div>

      <EmployerNav />

      {loading ? (
        <div className="text-center py-12 text-xs text-slate-400">Loading consulting tickets...</div>
      ) : requests.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-navy-950">No service requests active</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Need an employee handbook audit, compensation benchmarking, or leadership training?
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold shadow-sm"
          >
            Create Advisory Ticket
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
                      {req.serviceType}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        req.priority === 'URGENT'
                          ? 'bg-rose-50 text-rose-700'
                          : req.priority === 'HIGH'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {req.priority} Priority
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-navy-950 mt-1.5">{req.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      req.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : req.status === 'IN_PROGRESS'
                        ? 'bg-brand-50 text-brand-800 border-brand-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">{req.details}</p>

              {/* Consultant Assignment & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-brand-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Assigned Advisory Partner</span>
                    <span className="font-semibold text-slate-800">
                      {req.assignedConsultant || 'Pending Senior Partner assignment...'}
                    </span>
                  </div>
                </div>

                {req.consultantNotes && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-800 block text-[11px] mb-0.5">
                      Advisory Progress Note:
                    </span>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{req.consultantNotes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                  Submit Advisory Scope
                </span>
                <h3 className="text-lg font-bold text-navy-950 mt-1">Request HR Consulting</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Practice Area</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                >
                  <option>HR Policy & Compliance</option>
                  <option>Recruitment & Staffing</option>
                  <option>Payroll & Compensation Advisory</option>
                  <option>Executive Search</option>
                  <option>Training & Leadership L&D</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Request Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Multi-State Employee Handbook & Remote Tax Audit"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Urgency / Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                >
                  <option value="LOW">Low (Exploratory / Next Quarter)</option>
                  <option value="MEDIUM">Medium (Within 30 Days)</option>
                  <option value="HIGH">High (Within 14 Days)</option>
                  <option value="URGENT">Urgent (Immediate Review Required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Details & Objectives *</label>
                <textarea
                  required
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Detail the scope, headcount, jurisdictions involved, or specific pain points..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
                >
                  {submitting ? 'Submitting Scope...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
