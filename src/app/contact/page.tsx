import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, ChevronDown } from 'lucide-react';
import ServiceInquiryForm from '@/components/services/ServiceInquiryForm';

export default function ContactPage() {
  const offices = [
    {
      city: 'Bengaluru (National Headquarters)',
      address: '100 Feet Road, HAL 2nd Stage, Indiranagar',
      stateZip: 'Bengaluru, Karnataka 560038',
      phone: '+91 (080) 4200-8423',
      hours: 'Mon - Fri: 9:30 AM - 6:30 PM IST',
    },
    {
      city: 'Mumbai (Financial Capital Desk)',
      address: 'Maker Maxity, 4th Floor, Bandra Kurla Complex (BKC)',
      stateZip: 'Mumbai, Maharashtra 400051',
      phone: '+91 (022) 6120-8423',
      hours: 'Mon - Fri: 9:30 AM - 6:30 PM IST',
    },
    {
      city: 'Delhi NCR (Corporate & Policy Desk)',
      address: 'DLF Cyber City, Building 10, Tower B',
      stateZip: 'Gurugram, Haryana 122002',
      phone: '+91 (0124) 4900-8423',
      hours: 'Mon - Fri: 9:30 AM - 6:30 PM IST',
    },
    {
      city: 'Hyderabad (Tech & GCC Hub)',
      address: 'Mindspace Madhapur, Building 9, Hitec City',
      stateZip: 'Hyderabad, Telangana 500081',
      phone: '+91 (040) 4800-8423',
      hours: 'Mon - Fri: 9:30 AM - 6:30 PM IST',
    },
  ];

  const faqs = [
    {
      q: 'How does HireVibe solve the 60-90 day Indian notice period and offer dropout problem?',
      a: 'We maintain dedicated talent pools of serving-notice candidates, negotiate official notice period buyouts directly with employers, and deploy high-touch weekly engagement touchpoints (technical immersion, team connects, and joining milestone tracking) to maintain an industry-leading 92%+ joining ratio.',
    },
    {
      q: 'Can you provide a certified POSH External Member for our Internal Committee (IC)?',
      a: 'Yes. Dr. Arvind Swaminathan and our empaneled panel of certified senior advocates and NGO specialists serve as statutory External Members for organizations across India. We assist in IC reconstitution, quarterly meetings, neutral inquiries, and filing the mandatory Annual POSH Report with District Officers.',
    },
    {
      q: 'What is included in your Indian Labour Codes & Statutory Compliance Audit?',
      a: 'Our audit assesses your records against the 4 New Labour Codes (Code on Wages, Social Security, Industrial Relations, OSH), alongside existing compliance across EPF, ESIC, State Professional Tax, CLRA (Contract Labour Regulation & Abolition Act), Minimum Wages, and Gratuity Act provisions.',
    },
    {
      q: 'How do you assist foreign enterprises and MNCs setting up their first India GCC?',
      a: 'We provide end-to-end turnkey HR incubation: state labour registrations (Shops & Establishments), India-compliant employment contracts and policies, benefits design (health insurance, OPD), payroll structuring, and hiring the foundational leadership and engineering team (initial 50 to 500 headcount).',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white pt-20 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-slate-800 px-3 py-1 rounded-full">
            Pan-India Advisory Desks
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-4">
            Initiate a Confidential HR Dialogue
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Whether retaining executive search capabilities, ordering a statutory labour audit, empaneling a POSH External Member, or setting up an India GCC, our Senior Partners are prepared to assist.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Office Locations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                Direct Consultation
              </span>
              <h2 className="text-2xl font-bold text-navy-950 mt-2">Send an Inquiry to Our Senior Practice Desk</h2>
              <p className="text-xs text-slate-500 mt-1">
                Responses are personally coordinated by Pooja Sharma or our Senior Partners within 24 business hours.
              </p>
            </div>

            <ServiceInquiryForm />
          </div>

          {/* Office Directory */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 border border-slate-800">
              <h3 className="text-lg font-bold text-white">Direct Advisory Contact</h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-brand-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Senior Advisory Hotline</span>
                    <span className="font-semibold text-white">+91 (080) 4200-8423</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">General Inquiries & RFP Submissions</span>
                    <span className="font-semibold text-white">advisory@hirevibe.in</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Advisory Hours</span>
                    <span className="font-semibold text-white">Monday - Friday: 9:30 AM - 6:30 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Regional Practice Hubs</h3>

              <div className="space-y-4">
                {offices.map((office, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0 text-xs">
                    <div className="font-bold text-navy-950 text-sm">{office.city}</div>
                    <div className="text-slate-500 mt-0.5">{office.address}</div>
                    <div className="text-slate-500">{office.stateZip}</div>
                    <div className="text-brand-600 font-semibold mt-1">{office.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Indian Ecosystem Insights
          </span>
          <h2 className="text-3xl font-bold text-navy-950 mt-2 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-sm text-navy-950">{faq.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
