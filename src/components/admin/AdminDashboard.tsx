import React from 'react';
import { User as UserType } from '../../types';
import { AdminLayout } from './AdminLayout';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminProductsView } from './AdminProductsView';
import { AdminCategoriesView } from './AdminCategoriesView';
import { AdminBrandsView } from './AdminBrandsView';
import { AdminInventoryView } from './AdminInventoryView';
import { AdminOrdersView } from './AdminOrdersView';
import { AdminCustomersView } from './AdminCustomersView';
import { AdminDiscountsView } from './AdminDiscountsView';
import { AdminReviewsView } from './AdminReviewsView';
import { AdminShippingView } from './AdminShippingView';
import { AdminSettingsView } from './AdminSettingsView';
import { AdminAuditLogView } from './AdminAuditLogView';
import { AdminNotificationsView } from './AdminNotificationsView';

interface AdminDashboardProps {
  currentUser: UserType | null;
  currentPath: string;
  onNavigate: (route: string) => void;
  onBackToStorefront: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  currentPath,
  onNavigate,
  onBackToStorefront,
}) => {
  // Dispatch Subroute
  const renderView = () => {
    if (currentPath === '/admin/products/new') {
      return <AdminProductsView onNavigate={onNavigate} isNew={true} />;
    }
    if (currentPath.startsWith('/admin/products/')) {
      const id = currentPath.replace('/admin/products/', '');
      return <AdminProductsView onNavigate={onNavigate} selectedProductId={id} />;
    }
    if (currentPath === '/admin/products') {
      return <AdminProductsView onNavigate={onNavigate} />;
    }

    if (currentPath === '/admin/categories') {
      return <AdminCategoriesView />;
    }

    if (currentPath === '/admin/brands') {
      return <AdminBrandsView />;
    }

    if (currentPath === '/admin/inventory') {
      return <AdminInventoryView />;
    }

    if (currentPath.startsWith('/admin/orders/')) {
      const orderNumber = currentPath.replace('/admin/orders/', '');
      return <AdminOrdersView onNavigate={onNavigate} selectedOrderNumber={orderNumber} />;
    }
    if (currentPath === '/admin/orders') {
      return <AdminOrdersView onNavigate={onNavigate} />;
    }

    if (currentPath.startsWith('/admin/customers/')) {
      const id = currentPath.replace('/admin/customers/', '');
      return <AdminCustomersView currentUser={currentUser} onNavigate={onNavigate} selectedCustomerId={id} />;
    }
    if (currentPath === '/admin/customers') {
      return <AdminCustomersView currentUser={currentUser} onNavigate={onNavigate} />;
    }

    if (currentPath === '/admin/discounts') {
      return <AdminDiscountsView />;
    }

    if (currentPath === '/admin/reviews') {
      return <AdminReviewsView />;
    }

    if (currentPath === '/admin/shipping') {
      return <AdminShippingView />;
    }

    if (currentPath === '/admin/settings') {
      return <AdminSettingsView currentUser={currentUser} />;
    }

    if (currentPath === '/admin/audit-log') {
      return <AdminAuditLogView />;
    }

    if (currentPath === '/admin/notifications' || currentPath.startsWith('/admin/notifications/')) {
      return <AdminNotificationsView />;
    }

    // Default Dashboard Overview
    return <AdminDashboardOverview onNavigate={onNavigate} />;
  };

  return (
    <AdminLayout
      currentUser={currentUser}
      currentRoute={currentPath}
      onNavigate={onNavigate}
      onExitToStorefront={onBackToStorefront}
    >
      {renderView()}
    </AdminLayout>
  );
};
