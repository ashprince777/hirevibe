'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYER' | 'CANDIDATE';
  avatarUrl?: string;
  candidateProfile?: any;
  employerProfile?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  switchDemoUser: (role: 'ADMIN' | 'EMPLOYER' | 'CANDIDATE') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to login' };
      }

      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Network connection error' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const switchDemoUser = async (role: 'ADMIN' | 'EMPLOYER' | 'CANDIDATE') => {
    const creds = {
      ADMIN: { email: 'admin@hirevibe.in', password: 'Admin@123' },
      EMPLOYER: { email: 'recruiter@swifthire.in', password: 'Employer@123' },
      CANDIDATE: { email: 'candidate@rohanverma.dev', password: 'Candidate@123' },
    }[role];

    const result = await login(creds.email, creds.password);
    if (result.success) {
      if (role === 'ADMIN') window.location.href = '/admin';
      else if (role === 'EMPLOYER') window.location.href = '/portal/employer';
      else window.location.href = '/portal/candidate';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser, switchDemoUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
