import React, { useState } from 'react';
import { AlertCircle, Lock, Mail, ShieldCheck } from 'lucide-react';
import { apiFetch } from '../../lib/api/client';
import { User as UserType } from '../../types';
import { SITE_NAME } from '../../lib/seo/site';

interface AdminLoginFormProps {
  onAuthenticated: (user: UserType) => void;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onAuthenticated }) => {
  const [email, setEmail] = useState('sales@uk-steroids.co.uk');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await apiFetch('/api/v1/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg =
          typeof data.error === 'object' && data.error?.message
            ? data.error.message
            : 'Invalid email or password.';
        throw new Error(msg);
      }
      onAuthenticated(data.user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5 shadow-2xl"
      >
        <div className="w-14 h-14 bg-teal-500/15 text-teal-400 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldCheck className="w-7 h-7" aria-hidden="true" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-400">Admin</p>
          <h1 className="text-xl font-black tracking-tight">{SITE_NAME}</h1>
          <p className="text-xs text-slate-400">Sign in with the operations account to manage the store.</p>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-800 bg-red-950/50 px-3 py-2 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        <label className="block space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email</span>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </label>

        <label className="block space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</span>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-60 text-white font-bold text-sm py-3 rounded-xl transition-colors cursor-pointer"
        >
          {loading ? 'Signing in…' : 'Sign in to admin'}
        </button>
      </form>
    </div>
  );
};
