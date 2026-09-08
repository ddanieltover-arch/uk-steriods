import React from 'react';
import { AboutUsPage } from './AboutUsPage';
import { CycleBuilderPage } from './CycleBuilderPage';
import { DeliveryReturnsPage } from './DeliveryReturnsPage';
import { PaymentMethodsPage } from './PaymentMethodsPage';
import { CryptoPaymentGuidesPage } from './CryptoPaymentGuidesPage';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';
import { TermsConditionsPage } from './TermsConditionsPage';

const RESOURCE_PAGES: Record<string, React.FC<{ onNavigate: (path: string) => void }>> = {
  '/about-us': AboutUsPage,
  '/cycle-builder': CycleBuilderPage,
  '/delivery-and-returns': DeliveryReturnsPage,
  '/payment-methods': PaymentMethodsPage,
  '/crypto-payment-guides': CryptoPaymentGuidesPage,
  '/privacy-policy': PrivacyPolicyPage,
  '/terms': TermsConditionsPage,
};

interface ResourceRouterProps {
  path: string;
  onNavigate: (path: string) => void;
}

export const ResourceRouter: React.FC<ResourceRouterProps> = ({ path, onNavigate }) => {
  const Page = RESOURCE_PAGES[path];
  if (!Page) return null;
  return <Page onNavigate={onNavigate} />;
};
