import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME } from '../../lib/seo/site';

interface ResetPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get('token') || '';

  const [email, setEmail] = useState('');
  const [token, setToken] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/v1/auth/password-reset/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || 'If an account exists for that email address, password reset instructions have been sent.');
    } catch {
      setMessage('If an account exists for that email address, password reset instructions have been sent.');
    } finally {
      setBusy(false);
    }
  };

  const confirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/v1/auth/password-reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unable to reset password.');
      setMessage(data.message || 'Password updated.');
      setTimeout(() => onNavigate('/account'), 1200);
    } catch (err: any) {
      setError(err?.message || 'Unable to reset password.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-slate-50 py-12">
      <SeoHead
        title={`Reset password | ${SITE_NAME}`}
        description="Secure password reset for your UK Performance account."
        robots="noindex,nofollow"
      />
      <Container size="sm">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-8 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Password reset</h1>
            <p className="text-xs text-slate-500 mt-2">
              Request a reset link or enter the token from your email. Passwords are never sent by email.
            </p>
          </div>

          {!tokenFromUrl && (
            <form onSubmit={requestReset} className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Account email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="w-full bg-slate-900 text-white text-xs font-extrabold py-3 rounded-xl cursor-pointer"
              >
                Send reset instructions
              </button>
            </form>
          )}

          <form onSubmit={confirmReset} className="space-y-3 border-t border-slate-100 pt-6">
            <label className="block text-xs font-bold text-slate-700">
              Reset token
              <input
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-mono"
                autoComplete="off"
              />
            </label>
            <label className="block text-xs font-bold text-slate-700">
              New password
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                autoComplete="new-password"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-teal-600 text-white text-xs font-extrabold py-3 rounded-xl cursor-pointer"
            >
              Update password
            </button>
          </form>

          {message && <p className="text-xs font-bold text-teal-700 bg-teal-50 rounded-xl px-3 py-2">{message}</p>}
          {error && <p className="text-xs font-bold text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</p>}
        </div>
      </Container>
    </div>
  );
};
