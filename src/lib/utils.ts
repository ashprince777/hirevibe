import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | null | undefined, currency: string = 'INR'): string {
  if (amount == null) return 'Best in Industry';
  // Format as Lakhs Per Annum (LPA) or Crores if over 100k or as standard Indian Rupee
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(1);
    return `₹${cr.replace('.0', '')} Cr`;
  }
  if (amount >= 100000) {
    const lpa = (amount / 100000).toFixed(1);
    return `₹${lpa.replace('.0', '')} LPA`;
  }
  if (amount >= 100) {
    // If entered as direct LPA number like 18, 25, 40
    if (amount <= 200) {
      return `₹${amount} LPA`;
    }
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function timeAgo(dateString: string | Date | null | undefined): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(date);
}

export function getInitials(name: string): string {
  if (!name) return 'HV';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
