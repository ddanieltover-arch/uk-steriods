import React from 'react';
import { AboutUsPage } from './AboutUsPage';
import { FaqHubPage } from './FaqHubPage';
import { GlossaryPage } from './GlossaryPage';
import { GeoGuidePage } from './GeoGuidePage';
import { CycleBuilderPage } from './CycleBuilderPage';
import { DeliveryReturnsPage } from './DeliveryReturnsPage';
import { PaymentMethodsPage } from './PaymentMethodsPage';
import { CryptoPaymentGuidesPage } from './CryptoPaymentGuidesPage';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';
import { TermsConditionsPage } from './TermsConditionsPage';
import { getGeoGuide } from '../../lib/seo/geo-guides';

const RESOURCE_PAGES: Record<string, React.FC<{ onNavigate: (path: string) => void }>> = {
  '/about-us': AboutUsPage,
  '/faq': FaqHubPage,
  '/glossary': GlossaryPage,
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
  const guide = getGeoGuide(path);
  if (guide) {
    return <GeoGuidePage guide={guide} onNavigate={onNavigate} />;
  }
  const Page = RESOURCE_PAGES[path];
  if (!Page) return null;
  return <Page onNavigate={onNavigate} />;
};
