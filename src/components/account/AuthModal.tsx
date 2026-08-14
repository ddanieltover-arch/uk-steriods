import { apiFetch } from '../../lib/api/client';
import React, { useState } from 'react';
import { User } from '../../types';
import { X, User as UserIcon, Lock, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserChanged: (user: User | null) => void;
  onNavigateToAccount?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChanged,
  onNavigateToAccount,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/api/v1/auth/login' : '/api/v1/auth/register';
      const payload =
        mode === 'login'
          ? { email, password }
          : { email, password, firstName, lastName, phone };

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
            : data.error || 'Authentication failed. Please check details.';
        throw new Error(msg);
      }

      // Session is HttpOnly cookie; do not store tokens in localStorage

      onUserChanged(data.user);
      onClose();
      if (onNavigateToAccount) {
        onNavigateToAccount();
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiFetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
      });
      onUserChanged(null);
      onClose();
    } catch (err) {
      onUserChanged(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full shadow-2xl relative my-auto overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-teal-400" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider">
              {currentUser ? `Signed in as ${currentUser.firstName}` : mode === 'login' ? 'Customer Sign In' : 'Create Account'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {currentUser ? (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center text-sm">
                  {currentUser.firstName?.[0]}{currentUser.lastName?.[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {currentUser.firstName} {currentUser.lastName}
                  </h4>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  if (onNavigateToAccount) onNavigateToAccount();
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-xs transition-colors uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Go to Customer Dashboard</span>
                <span>→</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full border border-slate-200 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Smith"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    />
                  </div>
                </div>
              )}

              <div className="text-xs space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.co.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg py-2.5 pl-9 pr-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg py-2.5 pl-9 pr-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    />
                  </div>
                </div>

                {mode === 'register' && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="07123 456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-extrabold text-xs py-3 rounded-xl shadow-xs transition-colors uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Processing...' : mode === 'login' ? 'Sign In to Account' : 'Register Account'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setMode(mode === 'login' ? 'register' : 'login');
                  }}
                  className="text-xs text-teal-600 hover:underline font-bold cursor-pointer"
                >
                  {mode === 'login' ? 'New customer? Create an account' : 'Already have an account? Sign In'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
