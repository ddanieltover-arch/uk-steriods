import React, { useState } from 'react';
import { AlertCircle, Lock, Mail, User as UserIcon } from 'lucide-react';
import { apiFetch } from '../../lib/api/client';
import { User } from '../../types';

export type CustomerAuthMode = 'login' | 'register';

interface CustomerAuthFormProps {
  mode: CustomerAuthMode;
  onModeChange: (mode: CustomerAuthMode) => void;
  onAuthenticated: (user: User) => void;
  onForgotPassword: () => void;
}

export const CustomerAuthForm: React.FC<CustomerAuthFormProps> = ({
  mode,
  onModeChange,
  onAuthenticated,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/v1/auth/login' : '/api/v1/auth/register';
      const payload =
        mode === 'login'
          ? { email, password }
          : { email, password, confirmPassword, firstName, lastName, phone };

      const res = await apiFetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        const msg =
          typeof data.error === 'object' && data.error?.message
            ? data.error.message
            : 'Authentication failed. Please check your details.';
        throw new Error(msg);
      }

      onAuthenticated(data.user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {mode === 'register' && (
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1" htmlFor="auth-first-name">
              First name *
            </label>
            <input
              id="auth-first-name"
              type="text"
              required
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1" htmlFor="auth-last-name">
              Last name *
            </label>
            <input
              id="auth-last-name"
              type="text"
              required
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
            />
          </div>
        </div>
      )}

      <div className="text-xs space-y-3">
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1" htmlFor="auth-email">
            Email address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
            <input
              id="auth-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-lg py-2.5 pl-9 pr-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1" htmlFor="auth-password">
            Password *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
            <input
              id="auth-password"
              type="password"
              required
              minLength={8}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-lg py-2.5 pl-9 pr-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
            />
          </div>
          {mode === 'register' && (
            <p className="text-[10px] text-slate-400 mt-1">At least 8 characters.</p>
          )}
        </div>

        {mode === 'register' && (
          <>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1" htmlFor="auth-confirm-password">
                Confirm password *
              </label>
              <input
                id="auth-confirm-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1" htmlFor="auth-phone">
                Phone (optional)
              </label>
              <input
                id="auth-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
              />
            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-extrabold text-xs py-3 rounded-xl transition-colors uppercase tracking-wider cursor-pointer"
      >
        {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
      </button>

      {mode === 'login' && (
        <div className="text-center">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs text-slate-500 hover:text-teal-700 font-bold cursor-pointer"
          >
            Forgot password?
          </button>
        </div>
      )}

      <div className="text-center pt-1">
        <button
          type="button"
          onClick={() => {
            setError(null);
            onModeChange(mode === 'login' ? 'register' : 'login');
          }}
          className="text-xs text-teal-600 hover:underline font-bold cursor-pointer inline-flex items-center gap-1"
        >
          <UserIcon className="w-3.5 h-3.5" aria-hidden="true" />
          {mode === 'login' ? 'New customer? Create an account' : 'Already have an account? Sign in'}
        </button>
      </div>
    </form>
  );
};
