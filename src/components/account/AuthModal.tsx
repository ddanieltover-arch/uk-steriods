import React from 'react';
import { User } from '../../types';
import { X, User as UserIcon } from 'lucide-react';
import { apiFetch } from '../../lib/api/client';
import { CustomerAuthForm } from './CustomerAuthForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserChanged: (user: User | null) => void;
  onNavigateToAccount?: () => void;
  onNavigate?: (path: string) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChanged,
  onNavigateToAccount,
  onNavigate,
  initialMode = 'login',
}) => {
  const [mode, setMode] = React.useState<'login' | 'register'>(initialMode);

  React.useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await apiFetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } finally {
      onUserChanged(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full shadow-2xl relative my-auto overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-teal-400" aria-hidden="true" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider">
              {currentUser
                ? `Signed in as ${currentUser.firstName}`
                : mode === 'login'
                  ? 'Customer sign in'
                  : 'Create account'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {currentUser ? (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="font-bold text-slate-900 text-sm">
                  {currentUser.firstName} {currentUser.lastName}
                </h4>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigateToAccount) onNavigateToAccount();
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs py-3 rounded-xl uppercase tracking-wider cursor-pointer"
              >
                Go to account
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full border border-slate-200 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold text-xs py-2.5 rounded-xl cursor-pointer"
              >
                Sign out
              </button>
            </div>
          ) : (
            <CustomerAuthForm
              mode={mode}
              onModeChange={setMode}
              onAuthenticated={(user) => {
                onUserChanged(user);
                onClose();
                if (onNavigateToAccount) onNavigateToAccount();
              }}
              onForgotPassword={() => {
                onClose();
                if (onNavigate) onNavigate('/reset-password');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
