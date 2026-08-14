import React, { useState } from 'react';
import { User } from '../../types';
import { StorageService } from '../../services/storage';
import { X, User as UserIcon, Heart, Package, MapPin, LogOut, CheckCircle2 } from 'lucide-react';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserChanged: (user: User | null) => void;
  onOpenTracking: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChanged,
  onOpenTracking,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'login' | 'profile' | 'orders'>('profile');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const user: User = {
      id: 'usr-' + Date.now(),
      email,
      firstName: firstName || 'Customer',
      lastName: lastName || 'UK',
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    StorageService.setCurrentUser(user);
    onUserChanged(user);
    setActiveTab('profile');
  };

  const handleLogout = () => {
    StorageService.setCurrentUser(null);
    onUserChanged(null);
    setActiveTab('login');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full shadow-2xl relative my-auto overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-teal-400" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider">
              {currentUser ? `Welcome, ${currentUser.firstName}` : 'Customer Portal'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!currentUser ? (
            /* Login / Register Form */
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-lg font-bold text-slate-900">
                  {isRegistering ? 'Create Customer Account' : 'Account Login'}
                </h4>
                <p className="text-xs text-slate-500">
                  Manage your orders, save delivery addresses, and view order history.
                </p>
              </div>

              {isRegistering && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="text-xs space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.co.uk"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all uppercase tracking-wider cursor-pointer"
              >
                {isRegistering ? 'Register Account' : 'Sign In'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-xs text-teal-600 hover:underline font-bold"
                >
                  {isRegistering ? 'Already have an account? Sign In' : 'New customer? Create an account'}
                </button>
              </div>
            </form>
          ) : (
            /* Logged In Dashboard View */
            <div className="space-y-6 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">{currentUser.firstName} {currentUser.lastName}</span>
                  <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Verified Customer</span>
                </div>
                <p className="text-slate-500">{currentUser.email}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => { onClose(); onOpenTracking(); }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-teal-600" />
                    <span>Track Order Status & History</span>
                  </span>
                  <span>→</span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="w-full border border-slate-200 text-slate-600 hover:text-red-600 font-bold p-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
