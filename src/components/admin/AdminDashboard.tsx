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
import { AdminBlogView } from './AdminBlogView';

interface AdminDashboardProps {
  currentUser: UserType | null;
  currentPath: string;
  onNavigate: (route: string) => void;
  onBackToStorefront: () => void;
  onUserChanged: (user: UserType | null) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  currentPath,
  onNavigate,
  onBackToStorefront,
  onUserChanged,
}) => {
  // Dispatch Subroute
  const pathOnly = currentPath.split('?')[0];
  const renderView = () => {
    if (pathOnly === '/admin/products/new') {
      return <AdminProductsView onNavigate={onNavigate} isNew={true} />;
    }
    if (pathOnly.startsWith('/admin/products/') && pathOnly !== '/admin/products/') {
      const id = pathOnly.replace('/admin/products/', '');
      return <AdminProductsView onNavigate={onNavigate} selectedProductId={id} />;
    }
    if (pathOnly === '/admin/products') {
      return <AdminProductsView onNavigate={onNavigate} />;
    }

    if (pathOnly === '/admin/categories') {
      return <AdminCategoriesView />;
    }

    if (pathOnly === '/admin/brands') {
      return <AdminBrandsView />;
    }

    if (pathOnly === '/admin/inventory') {
      return <AdminInventoryView />;
    }

    if (pathOnly.startsWith('/admin/orders/')) {
      const orderNumber = pathOnly.replace('/admin/orders/', '').split('/')[0];
      return <AdminOrdersView onNavigate={onNavigate} selectedOrderNumber={orderNumber} />;
    }
    if (pathOnly === '/admin/orders') {
      return <AdminOrdersView key={currentPath} onNavigate={onNavigate} />;
    }

    if (pathOnly.startsWith('/admin/customers/')) {
      const id = pathOnly.replace('/admin/customers/', '');
      return <AdminCustomersView currentUser={currentUser} onNavigate={onNavigate} selectedCustomerId={id} />;
    }
    if (pathOnly === '/admin/customers') {
      return <AdminCustomersView currentUser={currentUser} onNavigate={onNavigate} />;
    }

    if (pathOnly === '/admin/discounts') {
      return <AdminDiscountsView />;
    }

    if (pathOnly === '/admin/reviews') {
      return <AdminReviewsView />;
    }

    if (pathOnly === '/admin/shipping') {
      return <AdminShippingView />;
    }

    if (pathOnly === '/admin/settings') {
      return <AdminSettingsView currentUser={currentUser} />;
    }

    if (pathOnly === '/admin/audit-log') {
      return <AdminAuditLogView />;
    }

    if (pathOnly === '/admin/notifications' || pathOnly.startsWith('/admin/notifications/')) {
      return <AdminNotificationsView />;
    }

    if (pathOnly === '/admin/blog/new') {
      return <AdminBlogView onNavigate={onNavigate} isNew />;
    }
    if (pathOnly.startsWith('/admin/blog/')) {
      const id = pathOnly.replace('/admin/blog/', '');
      return <AdminBlogView onNavigate={onNavigate} selectedId={id} />;
    }
    if (pathOnly === '/admin/blog') {
      return <AdminBlogView onNavigate={onNavigate} />;
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
      onUserChanged={onUserChanged}
    >
      {renderView()}
    </AdminLayout>
  );
};
