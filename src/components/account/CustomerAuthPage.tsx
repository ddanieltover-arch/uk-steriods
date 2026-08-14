import React, { useEffect } from 'react';
import { CustomerAuthForm, CustomerAuthMode } from './CustomerAuthForm';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME } from '../../lib/seo/site';
import { User } from '../../types';
import { Container } from '../layout/Container';

interface CustomerAuthPageProps {
  mode: CustomerAuthMode;
  currentUser: User | null;
  onAuthenticated: (user: User) => void;
  onNavigate: (path: string) => void;
}

function nextPathFromLocation(): string {
  const next = new URLSearchParams(window.location.search).get('next');
  if (!next || !next.startsWith('/') || next.startsWith('//')) return '/account';
  return next;
}

export const CustomerAuthPage: React.FC<CustomerAuthPageProps> = ({
  mode,
  currentUser,
  onAuthenticated,
  onNavigate,
}) => {
  useEffect(() => {
    if (currentUser) {
      onNavigate(nextPathFromLocation());
    }
    // Intentionally depend on session only; navigateTo is recreated each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const title = mode === 'login' ? 'Sign in' : 'Create account';

  return (
    <div className="min-h-[70vh] bg-slate-50 py-12">
      <SeoHead
        title={`${title} | ${SITE_NAME}`}
        description={`Sign in or create a ${SITE_NAME} account to track orders and save addresses.`}
        robots="noindex,nofollow"
      />
      <Container size="sm">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm max-w-md mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">Account</p>
          <h1 className="text-2xl font-black text-slate-900 mt-1 mb-2">{title}</h1>
          <p className="text-xs text-slate-500 mb-6">
            {mode === 'login'
              ? 'Use the email and password for your customer account.'
              : 'Create an account to track orders, save addresses, and receive updates from sales@uk-steroids.co.uk.'}
          </p>
          <CustomerAuthForm
            mode={mode}
            onModeChange={(next) => onNavigate(next === 'login' ? '/login' : '/register')}
            onAuthenticated={(user) => {
              onAuthenticated(user);
              onNavigate(nextPathFromLocation());
            }}
            onForgotPassword={() => onNavigate('/reset-password')}
          />
        </div>
      </Container>
    </div>
  );
};
