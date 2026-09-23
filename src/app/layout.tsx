import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HireVibe India | HR Consulting, Executive Search & Labour Law Compliance',
  description:
    'India’s premier boutique HR consultancy and recruitment firm specializing in tech staffing, CXO executive search, POSH Act 2013 compliance, 4 New Labour Codes, and payroll advisory across Bengaluru, Mumbai, Delhi NCR, and Hyderabad.',
  keywords: [
    'Indian HR Consultancy',
    'Tech Recruitment Bengaluru',
    'CXO Search Mumbai',
    'POSH Act Compliance India',
    'New Labour Codes India',
    'EPF ESIC Compliance',
    'Staffing Agency India',
    'GCC Setup India',
    'CTC Structuring India',
  ],
  icons: {
    icon: '/images/hirevibe-emblem.png',
    apple: '/images/hirevibe-emblem.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
