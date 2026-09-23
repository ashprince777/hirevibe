'use client';

import React, { useState } from 'react';
import { MessageSquare, UserCheck, CheckCircle2, Clock, Save } from 'lucide-react';
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
  employer: {
    name: string;
    email: string;
    employerProfile?: {
      companyName: string;
    } | null;
  };
}

export default function AdminServicesClient({ initialRequests }: { initialRequests: ServiceRequest[] }) {
  const { toast } = useToast();
  const [requests, setRequests] = useState(initialRequests);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Form states per ticket
  const [assignedStates, setAssignedStates] = useState<Record<string, string>>({});
  const [statusStates, setStatusStates] = useState<Record<string, string>>({});
  const [notesStates, setNotesStates] = useState<Record<string, string>>({});

  const consultants = [
    'Pooja Sharma (Managing Partner)',
    'Vikram Singhania (Partner, Executive Search)',
    'Dr. Arvind Swaminathan (Partner, Labour Law & POSH)',
    'Shweta Kulkarni (Director, CTC & Total Rewards)',
  ];

  const handleSave = async (id: string) => {
    setUpdatingId(id);
    const req = requests.find((r) => r.id === id);
    const assignedConsultant = assignedStates[id] !== undefined ? assignedStates[id] : req?.assignedConsultant;
    const status = statusStates[id] !== undefined ? statusStates[id] : req?.status;
    const consultantNotes = notesStates[id] !== undefined ? notesStates[id] : req?.consultantNotes;

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignedConsultant,
          status,
          consultantNotes,
        }),
      });

      if (res.ok) {
        setRequests(
          requests.map((r) =>
            r.id === id ? { ...r, assignedConsultant, status: status || r.status, consultantNotes } : r
          )
        );
        toast('Service request updated & client notification dispatched', 'success');
      } else {
        toast('Failed to update service request', 'error');
      }
    } catch (err) {
      toast('Error saving updates', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {requests.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-xs text-slate-400">
          No advisory requests submitted.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => {
            const currentAssigned =
              assignedStates[req.id] !== undefined ? assignedStates[req.id] : (req.assignedConsultant || '');
            const currentStatus =
              statusStates[req.id] !== undefined ? statusStates[req.id] : req.status;
            const currentNotes =
              notesStates[req.id] !== undefined ? notesStates[req.id] : (req.consultantNotes || '');

            return (
              <div
                key={req.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md">
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

                    <h2 className="text-lg font-bold text-navy-950 mt-2">{req.title}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Client: <strong className="text-slate-800">{req.employer.employerProfile?.companyName || req.employer.name}</strong> • Contact: {req.employer.email} • Submitted {timeAgo(req.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={currentStatus}
                      onChange={(e) => setStatusStates({ ...statusStates, [req.id]: e.target.value })}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {req.details}
                </div>

                {/* Assignment & Notes Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Assign Lead Advisory Partner
                    </label>
                    <select
                      value={currentAssigned}
                      onChange={(e) => setAssignedStates({ ...assignedStates, [req.id]: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                    >
                      <option value="">-- Select Senior Consultant --</option>
                      {consultants.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Advisory Progress Notes (Visible to Client)
                    </label>
                    <input
                      type="text"
                      value={currentNotes}
                      onChange={(e) => setNotesStates({ ...notesStates, [req.id]: e.target.value })}
                      placeholder="e.g. Initial diagnostic call completed; handbook draft in progress."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSave(req.id)}
                    disabled={updatingId === req.id}
                    className="flex items-center gap-1.5 px-5 py-2 bg-navy-950 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{updatingId === req.id ? 'Updating...' : 'Save & Dispatch Notification'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
